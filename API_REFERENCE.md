# 📖 API Reference — Universal Media Hub

## Auth
- `POST /api/auth/login` — Login user
- `POST /api/auth/register` — Register new user

## Media
- `GET /api/media/:category` — Get media by category (tv, radio, audio, video)
- `POST /api/admin/media/:category` — Upload new media
- `DELETE /api/admin/media/:category/:id` — Delete media (moves to Trash)
- `POST /api/admin/media/restore/:id` — Restore from Trash

## Trash
- `GET /api/admin/trash` — View trash
- `DELETE /api/admin/trash/purge` — Permanently clear trash
- `GET /api/admin/trash/download/:id` — Download trashed file