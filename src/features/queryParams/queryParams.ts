type QueryParams = {
  code?: string | null;
  sessionState?: string | null;
  state?: string | null;
};

export const QueryParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams: QueryParams = {};

  // Добавляем ключи и значения только для существующих параметров запроса
  if (urlParams.has("code")) {
    queryParams.code = urlParams.get("code");
  }
  if (urlParams.has("session_state")) {
    queryParams.sessionState = urlParams.get("session_state");
  }
  if (urlParams.has("state")) {
    queryParams.state = urlParams.get("state");
  }

  return queryParams;
};
