type ApiErrorData = { detail?: string } | string;

const getErrorDetail = (error: unknown): string | null => {
  const data = (error as { data?: ApiErrorData })?.data;
  if (!data) return null;
  return typeof data === "string" ? data : data.detail ?? null;
};

export const getGoogleAuthErrorKey = (error: unknown): string => {
  if (getErrorDetail(error) === "OAUTH_USER_ALREADY_EXISTS") {
    return "toasts.authorization.oauth_user_already_exists";
  }
  return "toasts.authorization.google_error";
};
