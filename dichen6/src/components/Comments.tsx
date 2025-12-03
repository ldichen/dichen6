/*
 * @Author: DiChen
 * @Date: 2025-12-03 11:30:00
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-03 17:07:18
 */
import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "../contexts/I18nContext";

interface Comment {
  id: number;
  parent_id?: number | null;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  replies?: Comment[];
}

interface CommentsProps {
  postSlug: string;
}

const API_BASE_URL = "http://localhost:8080/api";

// LocalStorage keys
const STORAGE_KEY_NAME = "comment_author_name";
const STORAGE_KEY_EMAIL = "comment_author_email";

export const Comments: React.FC<CommentsProps> = ({ postSlug }) => {
  const { lang } = useI18n();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyToName, setReplyToName] = useState<string>("");

  // Load user info from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem(STORAGE_KEY_NAME);
    const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Load comments
  useEffect(() => {
    loadComments();
  }, [postSlug]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/comments?post_slug=${encodeURIComponent(postSlug)}`
      );

      if (!response.ok) {
        throw new Error("Failed to load comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Error loading comments:", err);
      setError(
        lang === "zh"
          ? "这家伙服务器崩了都不知道，快去提醒他维护！"
          : "This guy's server crashed and didn't even know it, go remind him to maintain it!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Submit comment or reply
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !content.trim()) {
      setError(
        lang === "zh" ? "请填写所有必填字段" : "Please fill in all fields"
      );
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload: any = {
        post_slug: postSlug,
        author_name: name.trim(),
        author_email: email.trim(),
        content: content.trim(),
      };

      if (replyTo !== null) {
        payload.parent_id = replyTo;
      }

      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Check if it's a rate limit error
        if (response.status === 429) {
          throw new Error(
            lang === "zh"
              ? "操作太频繁，请一分钟后再试"
              : "Too many comments. Please wait a minute before trying again."
          );
        }

        throw new Error(errorData.error || "Failed to submit comment");
      }

      // Save user info to localStorage
      localStorage.setItem(STORAGE_KEY_NAME, name.trim());
      localStorage.setItem(STORAGE_KEY_EMAIL, email.trim());

      // Reload all comments to get updated structure
      await loadComments();

      // Clear form
      setContent("");
      setReplyTo(null);
      setReplyToName("");
    } catch (err: any) {
      console.error("Error submitting comment:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle reply button click
  const handleReply = (commentId: number, authorName: string) => {
    setReplyTo(commentId);
    setReplyToName(authorName);
    setError(null);
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyTo(null);
    setReplyToName("");
    setContent("");
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (lang === "zh") {
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Count total comments (including replies)
  const countComments = (comments: Comment[]): number => {
    let count = comments.length;
    comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        count += countComments(comment.replies);
      }
    });
    return count;
  };

  // Render comment form
  const renderCommentForm = (targetCommentId: number | null = null) => {
    const isReplyForm = targetCommentId !== null;

    return (
      <div
        className={`${
          isReplyForm ? "ml-14 mt-3 " : "mt-8"
        } bg-white dark:bg-gray-900  px-24`}
      >
        {isReplyForm && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {lang === "zh"
                ? `回复 @${replyToName}`
                : `Reply to @${replyToName}`}
            </span>
            <button
              onClick={cancelReply}
              className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span className="icon-[tabler--x] w-4 h-4"></span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
              placeholder={lang === "zh" ? "昵称" : "Name"}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={100}
              placeholder={lang === "zh" ? "邮箱" : "Email"}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={1000}
            rows={3}
            placeholder={
              lang === "zh" ? "写下你的评论..." : "Write your comment..."
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {content.length} / 1000
            </span>
            <button
              type="submit"
              disabled={submitting || !name || !email || !content}
              className="px-4 py-2 text-sm font-medium bg-accent-primary text-white rounded-full hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting
                ? lang === "zh"
                  ? "发送中..."
                  : "Sending..."
                : lang === "zh"
                ? "发送"
                : "Send"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  const totalComments = countComments(comments);

  return (
    <div className="not-prose  pt-8 ">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {lang === "zh" ? "评论" : "Comments"}
        {totalComments > 0 && (
          <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
            ({totalComments})
          </span>
        )}
      </h3>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Main comment form (only shown when not replying) */}
      {!replyTo && renderCommentForm()}

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              parentId={undefined}
              replyTo={replyTo}
              onReply={handleReply}
              renderCommentForm={renderCommentForm}
              formatDate={formatDate}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {lang === "zh"
            ? "暂无评论，快来抢沙发！"
            : "No comments yet. Be the first to comment!"}
        </div>
      )}
    </div>
  );
};

// Separate CommentItem component to use hooks properly
interface CommentItemProps {
  comment: Comment;
  depth: number;
  parentId?: number;
  replyTo: number | null;
  onReply: (commentId: number, authorName: string) => void;
  renderCommentForm: (commentId: number) => React.ReactNode;
  formatDate: (dateString: string) => string;
  lang: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth,
  parentId,
  replyTo,
  onReply,
  renderCommentForm,
  formatDate,
  lang,
}) => {
  const isReply = depth > 0;
  const showReplyForm = replyTo === comment.id;
  const avatarRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<{
    top: number;
    height: number;
  } | null>(null);

  // Calculate connection line position
  useEffect(() => {
    if (isReply && avatarRef.current && parentId) {
      const updateLinePosition = () => {
        const currentAvatar = avatarRef.current;
        const parentComment = document.querySelector(
          `[data-comment-id="${parentId}"]`
        );
        const parentAvatar = parentComment?.querySelector(".avatar-marker");

        if (currentAvatar && parentAvatar && parentComment) {
          // const currentRect = currentAvatar.getBoundingClientRect();
          const parentRect = parentAvatar.getBoundingClientRect();
          const containerRect = currentAvatar
            .closest(".relative")
            ?.getBoundingClientRect();

          if (containerRect) {
            // Calculate line from parent avatar center to current avatar top
            // const parentCenter = parentRect.top + parentRect.height / 2;
            // const currentTop = currentRect.top;

            // Convert to container-relative coordinates
            // const lineTop = parentCenter - containerRect.top;
            // const lineHeight = currentTop - parentCenter;

            const top = parentRect.top - containerRect.top + 54;
            const height = -top + 10;

            setLineStyle({ top: top, height: height });
          }
        }
      };

      // Initial calculation
      updateLinePosition();

      // Find parent comment container to observe
      const parentComment = document.querySelector(
        `[data-comment-id="${parentId}"]`
      );

      // Use MutationObserver to detect DOM changes (like reply form appearing)
      const mutationObserver = new MutationObserver(updateLinePosition);

      // Observe both current and parent containers
      if (parentComment) {
        mutationObserver.observe(parentComment, {
          childList: true,
          subtree: true,
        });
      }

      const currentContainer = avatarRef.current.closest(".relative");
      if (currentContainer) {
        mutationObserver.observe(currentContainer, {
          childList: true,
          subtree: true,
        });
      }

      // Also use ResizeObserver for height changes
      const resizeObserver = new ResizeObserver(updateLinePosition);
      if (avatarRef.current) {
        resizeObserver.observe(avatarRef.current);
      }
      if (parentComment) {
        resizeObserver.observe(parentComment);
      }

      window.addEventListener("resize", updateLinePosition);

      return () => {
        mutationObserver.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateLinePosition);
      };
    }
  }, [isReply, parentId, showReplyForm, comment.replies]);

  return (
    <div className="relative" data-comment-id={comment.id}>
      {/* Connection line for replies - dynamically positioned */}
      {isReply && lineStyle && (
        <div
          className="absolute w-0.5 bg-gray-400 dark:bg-gray-700"
          style={{
            left: "calc(6rem + 1.2rem)",
            top: `${lineStyle.top}px`,
            height: `${lineStyle.height}px`,
          }}
        />
      )}

      {/* Comment content */}
      <div className="relative flex gap-3 py-3 px-24 border-b border-gray-200 dark:border-gray-800">
        {/* Avatar */}
        <div
          ref={avatarRef}
          className="flex-shrink-0 relative z-10 avatar-marker"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-gray-400 flex items-center justify-center text-white font-semibold">
            {comment.author_name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="px-1 py-1">
            <div className="flex items-center font-bold text-gray-900 dark:text-white mb-0.5">
              <span className="font-bold text-base mr-1 text-gray-700 dark:text-gray-200">
                {comment.author_name}
              </span>
              <span className="font-normal text-base mr-1 text-gray-400 dark:text-gray-500">
                {" · "}
              </span>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                {formatDate(comment.created_at)}
              </span>
            </div>
            <p className="text-sm mt-2 text-gray-900 dark:text-gray-200 whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-4 mt-2">
            <button
              onClick={() => onReply(comment.id, comment.author_name)}
              className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-accent-primary dark:hover:text-accent-primary font-medium transition-colors"
            >
              <span className="icon-[tabler--message-circle] w-3.5 h-3.5"></span>
              {lang === "zh" ? "回复" : "Reply"}
            </button>
          </div>
        </div>
      </div>

      {/* Reply form (shown directly under this comment) */}
      {showReplyForm && renderCommentForm(comment.id)}

      {/* Render nested replies - no indentation, just connection line */}
      {comment.replies && comment.replies.length > 0 && (
        <>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              parentId={comment.id}
              replyTo={replyTo}
              onReply={onReply}
              renderCommentForm={renderCommentForm}
              formatDate={formatDate}
              lang={lang}
            />
          ))}
        </>
      )}
    </div>
  );
};
