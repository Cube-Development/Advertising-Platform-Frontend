import { LIVEKIT_TOKEN_ENDPOINT } from "../constants/constants";
import { getUserIdentity } from "../helpers";

interface ILiveKitTokenResponse {
  token: string;
  serverUrl: string;
}

export async function getLivekitToken(): Promise<ILiveKitTokenResponse> {
  const userName = getUserIdentity();
  console.log("Getting LiveKit token for:", userName);

  const response = await fetch(
    `${LIVEKIT_TOKEN_ENDPOINT}?name=${encodeURIComponent(userName)}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.statusText}`);
  }

  const { token, serverUrl } = await response.json();

  return {
    token,
    serverUrl,
  };
}
