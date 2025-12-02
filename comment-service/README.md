# Comment Service

极简博客评论服务 - Go + Fiber + SQLite

## 功能特性

✅ **用户限流** - 每个用户（昵称+邮箱）每分钟最多 2 条评论
✅ **嵌套回复** - 支持两级回复（最多嵌套 2 层）
✅ **层级结构** - 自动构建评论树状结构
✅ **级联删除** - 删除父评论会自动删除所有子回复
✅ **双语支持** - 错误提示支持中英文

## 运行服务

```bash
go run main.go
```

服务将在 `http://localhost:8080` 运行

## 编译

```bash
go build -o comment-service
./comment-service
```

## API 端点

### 创建评论或回复
```
POST /api/comments
Content-Type: application/json

# 创建顶级评论
{
  "post_slug": "AI4Everything/example",
  "author_name": "张三",
  "author_email": "zhangsan@example.com",
  "content": "写得真好！"
}

# 回复评论（添加 parent_id）
{
  "post_slug": "AI4Everything/example",
  "parent_id": 1,
  "author_name": "李四",
  "author_email": "lisi@example.com",
  "content": "同意楼上！"
}
```

**限流规则**:
- 同一用户（昵称+邮箱组合）每分钟最多发 2 条评论
- 超限返回 `429 Too Many Requests`

### 获取评论（层级结构）
```
GET /api/comments?post_slug=AI4Everything/example
```

返回示例：
```json
[
  {
    "id": 1,
    "post_slug": "AI4Everything/example",
    "parent_id": null,
    "author_name": "张三",
    "author_email": "zhangsan@example.com",
    "content": "写得真好！",
    "created_at": "2025-12-03T12:00:00Z",
    "replies": [
      {
        "id": 2,
        "parent_id": 1,
        "author_name": "李四",
        "content": "同意楼上！",
        "replies": []
      }
    ]
  }
]
```

### 删除评论
```
DELETE /api/comments/:id
```

**注意**: 删除父评论会级联删除所有子回复

### 健康检查
```
GET /health
```

## 数据库

SQLite 数据库文件：`comments.db`（自动创建）

### 表结构
```sql
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_slug TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL,        -- 父评论 ID
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);
```

## 限流机制

### 全局限流
移除了全局 IP 限流，只保留用户级别限流

### 用户限流
- **规则**: 每个用户（昵称+邮箱）每分钟最多 2 条评论
- **实现**: 内存中维护用户评论时间戳
- **清理**: 每 5 分钟自动清理过期记录
- **错误信息**: "Too many comments. Please wait a minute before commenting again."

## 技术栈

- **Go 1.x**
- **Fiber v2** - 高性能 Web 框架
- **SQLite3** - 嵌入式数据库
- **sync.RWMutex** - 并发安全的限流器
