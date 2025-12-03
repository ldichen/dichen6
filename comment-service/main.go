package main

import (
	"database/sql"
	"log"
	"strings"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/mattn/go-sqlite3"
)

type Comment struct {
	ID          int        `json:"id"`
	PostSlug    string     `json:"post_slug"`
	ParentID    *int       `json:"parent_id"`    // 父评论 ID（null 表示顶级评论）
	AuthorName  string     `json:"author_name"`
	AuthorEmail string     `json:"author_email"`
	Content     string     `json:"content"`
	CreatedAt   time.Time  `json:"created_at"`
	Replies     []*Comment `json:"replies,omitempty"` // 子评论列表
}

var db *sql.DB

// 用户限流器
type UserRateLimiter struct {
	mu      sync.RWMutex
	records map[string][]time.Time // key: "name:email", value: timestamps
}

var userLimiter = &UserRateLimiter{
	records: make(map[string][]time.Time),
}

func main() {
	// Initialize database
	var err error
	db, err = initDB()
	if err != nil {
		log.Fatal("Failed to initialize database:", err)
	}
	defer db.Close()

	// Start cleanup goroutine
	go userLimiter.cleanupOldRecords()

	// Create Fiber app
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	// CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Routes
	app.Post("/api/comments", createComment)
	app.Get("/api/comments", getComments)
	app.Delete("/api/comments/:id", deleteComment)

	// Health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	// Start server
	log.Println("Comment service starting on :8080")
	if err := app.Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}

// Initialize SQLite database
func initDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./comments.db")
	if err != nil {
		return nil, err
	}

	// Create table with parent_id for replies
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS comments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			post_slug TEXT NOT NULL,
			parent_id INTEGER DEFAULT NULL,
			author_name TEXT NOT NULL,
			author_email TEXT NOT NULL,
			content TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
		);
		CREATE INDEX IF NOT EXISTS idx_post_slug ON comments(post_slug, created_at);
		CREATE INDEX IF NOT EXISTS idx_parent_id ON comments(parent_id);
	`)
	if err != nil {
		return nil, err
	}

	return db, nil
}

// Check if user can post (max 2 comments per minute per user)
func (rl *UserRateLimiter) canPost(name, email string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	key := strings.ToLower(name) + ":" + strings.ToLower(email)
	now := time.Now()
	oneMinuteAgo := now.Add(-1 * time.Minute)

	// Get existing records for this user
	records := rl.records[key]

	// Filter out old records (older than 1 minute)
	var recent []time.Time
	for _, t := range records {
		if t.After(oneMinuteAgo) {
			recent = append(recent, t)
		}
	}

	// Check if user has exceeded limit
	if len(recent) >= 2 {
		return false
	}

	// Add new record
	recent = append(recent, now)
	rl.records[key] = recent

	return true
}

// Cleanup old records periodically
func (rl *UserRateLimiter) cleanupOldRecords() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		twoMinutesAgo := now.Add(-2 * time.Minute)

		for key, records := range rl.records {
			var recent []time.Time
			for _, t := range records {
				if t.After(twoMinutesAgo) {
					recent = append(recent, t)
				}
			}

			if len(recent) == 0 {
				delete(rl.records, key)
			} else {
				rl.records[key] = recent
			}
		}
		rl.mu.Unlock()
	}
}

// Create a new comment
func createComment(c *fiber.Ctx) error {
	var comment Comment
	if err := c.BodyParser(&comment); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	// Validation
	if comment.PostSlug == "" {
		return fiber.NewError(fiber.StatusBadRequest, "post_slug is required")
	}
	if comment.AuthorName == "" {
		return fiber.NewError(fiber.StatusBadRequest, "author_name is required")
	}
	if comment.AuthorEmail == "" {
		return fiber.NewError(fiber.StatusBadRequest, "author_email is required")
	}
	if comment.Content == "" {
		return fiber.NewError(fiber.StatusBadRequest, "content is required")
	}
	if len(comment.Content) > 1000 {
		return fiber.NewError(fiber.StatusBadRequest, "content must be less than 1000 characters")
	}

	// Check user rate limit
	if !userLimiter.canPost(comment.AuthorName, comment.AuthorEmail) {
		return fiber.NewError(fiber.StatusTooManyRequests, "Too many comments. Please wait a minute before commenting again.")
	}

	// If replying to a comment, verify parent exists
	if comment.ParentID != nil {
		var exists bool
		err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM comments WHERE id = ?)", *comment.ParentID).Scan(&exists)
		if err != nil || !exists {
			return fiber.NewError(fiber.StatusBadRequest, "Parent comment not found")
		}
	}

	// Insert into database
	result, err := db.Exec(`
		INSERT INTO comments (post_slug, parent_id, author_name, author_email, content)
		VALUES (?, ?, ?, ?, ?)
	`, comment.PostSlug, comment.ParentID, comment.AuthorName, comment.AuthorEmail, comment.Content)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to create comment")
	}

	id, err := result.LastInsertId()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to get comment ID")
	}

	comment.ID = int(id)
	comment.CreatedAt = time.Now()
	comment.Replies = []*Comment{}

	return c.Status(fiber.StatusCreated).JSON(comment)
}

// Get comments for a specific post (hierarchical structure)
func getComments(c *fiber.Ctx) error {
	postSlug := c.Query("post_slug")
	if postSlug == "" {
		return fiber.NewError(fiber.StatusBadRequest, "post_slug parameter is required")
	}

	// Get all comments for this post
	rows, err := db.Query(`
		SELECT id, post_slug, parent_id, author_name, author_email, content, created_at
		FROM comments
		WHERE post_slug = ?
		ORDER BY created_at ASC
	`, postSlug)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to fetch comments")
	}
	defer rows.Close()

	// Map to store all comments by ID
	commentsMap := make(map[int]*Comment)
	var allComments []*Comment
	var topLevelComments []*Comment

	for rows.Next() {
		var comment Comment
		var parentID sql.NullInt64

		err := rows.Scan(
			&comment.ID,
			&comment.PostSlug,
			&parentID,
			&comment.AuthorName,
			&comment.AuthorEmail,
			&comment.Content,
			&comment.CreatedAt,
		)
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "Failed to parse comment")
		}

		if parentID.Valid {
			pid := int(parentID.Int64)
			comment.ParentID = &pid
		}

		comment.Replies = []*Comment{}
		commentsMap[comment.ID] = &comment
		allComments = append(allComments, &comment)
	}

	// Build hierarchical structure - use allComments to preserve order
	for _, comment := range allComments {
		if comment.ParentID == nil {
			// Top-level comment
			topLevelComments = append(topLevelComments, comment)
		} else {
			// Reply to another comment
			if parent, exists := commentsMap[*comment.ParentID]; exists {
				parent.Replies = append(parent.Replies, comment)
			}
		}
	}

	if topLevelComments == nil {
		topLevelComments = []*Comment{}
	}

	return c.JSON(topLevelComments)
}

// Delete a comment by ID
func deleteComment(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return fiber.NewError(fiber.StatusBadRequest, "comment ID is required")
	}

	result, err := db.Exec("DELETE FROM comments WHERE id = ?", id)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete comment")
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to verify deletion")
	}

	if rowsAffected == 0 {
		return fiber.NewError(fiber.StatusNotFound, "Comment not found")
	}

	return c.SendStatus(fiber.StatusNoContent)
}
