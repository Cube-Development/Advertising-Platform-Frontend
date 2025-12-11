import type { VoiceAgentConfig } from "./types";

export const VOICE_AGENT_CONFIG: VoiceAgentConfig = {
  pageTitle: "Voice Agent",
  pageDescription: "AI-powered voice assistant",

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  startButtonText: "Start conversation",
  livekitUrl: import.meta.env.VITE_LIVEKIT_URL,
};
