// type QueryParams = {
//   code?: string | null;
//   sessionState?: string | null;
//   state?: string | null;
//   channel_id?: string | null;
//   add_channel?: string | null;
//   order_type?: string | null;
//   project_status?: string | null;
//   telegram_role?: string | null;
// };

// export const QueryParams = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const queryParams: QueryParams = {};

//   // Добавляем ключи и значения только для существующих параметров запроса
//   if (urlParams.has("code")) {
//     queryParams.code = urlParams.get("code");
//   }
//   if (urlParams.has("session_state")) {
//     queryParams.sessionState = urlParams.get("session_state");
//   }
//   if (urlParams.has("state")) {
//     queryParams.state = urlParams.get("state");
//   }
//   if (urlParams.has("channel_id")) {
//     queryParams.channel_id = urlParams.get("channel_id");
//   }
//   if (urlParams.has("add_channel")) {
//     queryParams.add_channel = urlParams.get("add_channel");
//   }
//   if (urlParams.has("order_type")) {
//     queryParams.order_type = urlParams.get("order_type");
//   }
//   if (urlParams.has("project_status")) {
//     queryParams.project_status = urlParams.get("project_status");
//   }
//   if (urlParams.has("telegram_role")) {
//     queryParams.telegram_role = urlParams.get("telegram_role");
//   }

//   return queryParams;
// };

export enum queryParamKeys {
  code = "code",
  sessionState = "session_state",
  state = "state",
  channelId = "channel_id",
  projectId = "project_id",
  orderId = "order_id",
  addChannel = "add_channel",
  projectType = "project_type",
  projectStatus = "project_status",
  offerStatus = "offer_status",
  channelStatus = "channel_status",
  telegramRole = "telegram_role",
  permission = "permission",
}

type QueryParamsType = Partial<Record<queryParamKeys, string | null>>;

export const QueryParams = (): QueryParamsType => {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams: QueryParamsType = {};

  Object.values(queryParamKeys).forEach((key) => {
    if (urlParams.has(key)) {
      queryParams[key] = urlParams.get(key);
    }
  });
  return queryParams;
};

export const buildPathWithQuery = (
  basePath: string,
  params: Record<string, string | undefined | null>,
) => {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value) // Убираем пустые значения
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value as string }), {}),
  ).toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
};
