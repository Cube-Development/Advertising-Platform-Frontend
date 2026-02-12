import { Room } from "livekit-client";

/**
 * Отправляет подтверждение (ACK) или любое событие агенту через data stream.
 */
export async function sendVoiceAgentData(room: Room, payload: any) {
  if (!room || !room.localParticipant) return;

  const dataString = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);

  try {
    await room.localParticipant.publishData(data, {
      reliable: true,
      topic: "agent-events",
    });
    console.log("Voice Agent: Sent Data:", dataString);
  } catch (error) {
    console.error("Voice Agent: Failed to send data", error);
  }
}
