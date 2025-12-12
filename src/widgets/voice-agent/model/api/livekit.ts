import { LIVEKIT_TOKEN_ENDPOINT } from "../constants/constants";
import { getUserIdentity } from "../helpers";
/**
 * Получение LiveKit токена для подключения
 */
export async function getLivekitToken(): Promise<string> {
  const userName = getUserIdentity();
  console.log("Getting LiveKit token for:", userName);

  const response = await fetch(
    `${LIVEKIT_TOKEN_ENDPOINT}?name=${encodeURIComponent(userName)}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  return response.text();
}
