type QueryParams = {
  code?: string | null;
  sessionState?: string | null;
  state?: string | null;
  channel_id?: string | null;
  add_channel?: string | null;
  order_type?: string | null;
  project_status?: string | null;
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
  if (urlParams.has("channel_id")) {
    queryParams.channel_id = urlParams.get("channel_id");
  }
  if (urlParams.has("add_channel")) {
    queryParams.add_channel = urlParams.get("add_channel");
  }
  if (urlParams.has("order_type")) {
    queryParams.order_type = urlParams.get("order_type");
  }
  if (urlParams.has("project_status")) {
    queryParams.project_status = urlParams.get("project_status");
  }

  return queryParams;
};
