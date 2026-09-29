export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return fallback;
  }

  const data = (error as { data?: unknown }).data;
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof (data as { message?: unknown }).message === "string"
  ) {
    return (data as { message: string }).message;
  }

  return fallback;
};
