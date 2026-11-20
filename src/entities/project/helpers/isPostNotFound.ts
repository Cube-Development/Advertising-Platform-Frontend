import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

/**
 * `GET /post/order` без загруженного поста отвечает
 * `404 {"message": "Post not found"}` — это не ошибка, а «поста ещё нет»:
 * тост не нужен, кнопку просмотра просто не показываем.
 * Остальные ошибки бэкенд отдаёт с 400.
 */
export const isPostNotFound = (
  error: FetchBaseQueryError | SerializedError | undefined,
): boolean => !!error && "status" in error && error.status === 404;
