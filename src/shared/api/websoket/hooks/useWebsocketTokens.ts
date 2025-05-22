import {
  useGetAuthTokenMutation,
  useGetWebsocketTokenMutation,
} from "@entities/communication";

export const useWebsocketTokens = () => {
  const [getWebsocketToken] = useGetWebsocketTokenMutation();
  const [getAuthToken] = useGetAuthTokenMutation();

  const getTokens = async (channel: string) => {
    const authData = await getAuthToken().unwrap();
    const authToken = authData.token;

    const data = await getWebsocketToken({ channel }).unwrap();
    const token = data.token;

    return { authToken, token };
  };

  return { getTokens };
};
