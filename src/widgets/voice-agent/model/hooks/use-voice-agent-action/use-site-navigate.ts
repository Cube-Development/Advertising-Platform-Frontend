import { useRoomContext } from "@livekit/components-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ENUM_AGENT_EVENT_TYPE,
  ENUM_NAVIGATION_SCREENS,
  ENUM_VOICE_AGENT_ACTIONS,
  MAP_SCREEN_TO_PATH,
} from "../../constants";
import { sendVoiceAgentData } from "../../helpers";
import { useAppSelector } from "@shared/hooks";
import {
  useCreatePostAdvertiser,
  useCreatePostManager,
} from "@features/cart/createPost/model";
import { ENUM_ROLES } from "@entities/user";

export function useSiteNavigate(): {
  handleNavigate: (
    screen: ENUM_NAVIGATION_SCREENS,
    params?: Record<string, string>,
  ) => Promise<void>;
} {
  const navigate = useNavigate();
  const room = useRoomContext();
  const { role, isAuth } = useAppSelector((state) => state.user);
  const { createPostAdvertiser } = useCreatePostAdvertiser();
  const { createPostManager } = useCreatePostManager();

  const handleNavigate = useCallback(
    async (
      screen: ENUM_NAVIGATION_SCREENS,
      params?: Record<string, string>,
    ) => {
      let path = MAP_SCREEN_TO_PATH[screen];

      if (screen === ENUM_NAVIGATION_SCREENS.CREATE_ORDER) {
        await handleCreateOrder();
      }

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, value);
        });
      }

      console.log(`Navigating to screen "${screen}" (path: ${path})`);
      navigate(path);

      // Отправляем ACK агенту
      if (room) {
        await sendVoiceAgentData(room, {
          $ack: true,
          type: ENUM_AGENT_EVENT_TYPE.ACTION_REQUIRED,
          action: ENUM_VOICE_AGENT_ACTIONS.NAVIGATE_USER,
          screen: screen,
          status: "success",
        });
      }
    },
    [navigate, room],
  );

  const handleCreateOrder = useCallback(async () => {
    console.log(
      "Voice Agent: Executing ORDER_FINALIZATION flow before navigate",
    );
    if (!isAuth) {
      throw new Error("User must be authenticated to create order");
    }
    if (role === ENUM_ROLES.ADVERTISER) {
      await createPostAdvertiser();
    } else {
      await createPostManager();
    }
  }, []);

  return { handleNavigate };
}
