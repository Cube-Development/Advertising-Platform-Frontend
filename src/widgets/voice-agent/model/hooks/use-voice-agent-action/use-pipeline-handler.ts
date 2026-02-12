import { useProjectNameMutation } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { useRoomContext } from "@livekit/components-react";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setExternalField, useChangeBlur } from "@widgets/createOrder/model";
import Cookies from "js-cookie";
import { useCallback } from "react";
import {
  ENUM_CREATE_ORDER_ACTIONS,
  ENUM_PIPELINE,
  ENUM_VOICE_AGENT_ACTIONS,
} from "../../constants";
import { sendVoiceAgentData } from "../../helpers";
import { IPipelineIntent } from "../../types";
import { useAddToCart } from "./use-add-to-cart";
import { useSiteNavigate } from "./use-site-navigate";

export function usePipelineHandler() {
  const room = useRoomContext();
  const dispatch = useAppDispatch();
  const { handleNavigate } = useSiteNavigate();
  const { handleAddToCart, handleRemoveFromCart } = useAddToCart();
  const [updateProjectName] = useProjectNameMutation();
  const { role, isAuth } = useAppSelector((state) => state.user);

  // const { createPostAdvertiser } = useCreatePostAdvertiser();
  // const { createPostManager } = useCreatePostManager();
  const { handleOnChangeBlur } = useChangeBlur();

  const sendAck = useCallback(
    async (
      intent: IPipelineIntent,
      status: "success" | "error" | "partial",
      payload: any = {},
      error: any = null,
    ) => {
      if (!room) return;

      await sendVoiceAgentData(room, {
        $ack: true,
        pipeline: intent.pipeline,
        step: intent.step,
        status,
        payload,
        error,
      });
    },
    [room],
  );

  const handlePipeline = useCallback(
    async (intent: IPipelineIntent) => {
      console.log("Voice Agent: Pipeline Intent Received:", intent);
      console.log("Voice Agent: Current URL:", window.location.href);
      console.log("Voice Agent: All Available Cookies:", document.cookie);

      try {
        if (intent.action === ENUM_VOICE_AGENT_ACTIONS.REMOVE_FROM_CART) {
          const items = intent.payload.ids;
          if (items && Array.isArray(items)) {
            console.log(
              "Voice Agent: Executing REMOVE_FROM_CART with items:",
              items,
            );
            await handleRemoveFromCart(items);
          }
        } else if (intent.pipeline === ENUM_PIPELINE.ORDER_CREATION) {
          console.log(
            "Voice Agent: ORDER_CREATION pipeline received",
            intent.payload,
          );

          if (intent.step === ENUM_CREATE_ORDER_ACTIONS.POST_TEXT) {
            console.log("Voice Agent: Setting post text via Redux bridge");
            dispatch(
              setExternalField({
                name: "postText",
                value: intent.payload.post_text,
              }),
            );
            handleOnChangeBlur("datetime");
          } else if (intent.step === ENUM_CREATE_ORDER_ACTIONS.SCHEDULE) {
            console.log(
              "Voice Agent: Setting schedule via Redux bridge",
              intent.payload.schedule,
            );
            dispatch(
              setExternalField({
                name: "schedule",
                value: intent.payload.schedule,
              }),
            );

            const nextBlur = role === ENUM_ROLES.AGENCY ? "prices" : "payment";
            handleOnChangeBlur(nextBlur);
          } else if (intent.step === ENUM_CREATE_ORDER_ACTIONS.CAMPAIGN_NAME) {
            const urlParams = new URLSearchParams(window.location.search);
            let projectId =
              urlParams.get("projectId") || urlParams.get("project_id");

            if (!projectId) {
              const match = window.location.pathname.match(
                /\/createorder\/([^\/]+)/,
              );
              if (match) projectId = match[1];
            }

            if (!projectId) {
              projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
            }

            if (projectId) {
              await updateProjectName({
                project_id: projectId,
                name: intent.payload.campaign_name,
              }).unwrap();
            } else {
              const errorMsg =
                "PROJECT_ID not found in URL or cookies. Action aborted.";
              console.error("Voice Agent: SET_FIELD failed -", errorMsg);
              await sendAck(intent, "error", {}, { message: errorMsg });
              return;
            }

            handleOnChangeBlur("post");
          }
        } else if (intent.action === ENUM_VOICE_AGENT_ACTIONS.CONFIRM) {
          console.log("Voice Agent: CONFIRM action received", intent.payload);
        } else {
          console.log(
            `Voice Agent: Action ${intent.action} received but not explicitly handled yet`,
            intent.payload,
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
        await sendAck(intent, "success");
      } catch (error) {
        console.error("Voice Agent: Action execution failed", error);
        await sendAck(intent, "error", {}, { message: String(error) });
      }
    },
    [
      sendAck,
      handleNavigate,
      handleAddToCart,
      handleRemoveFromCart,
      updateProjectName,
      dispatch,
      handleOnChangeBlur,
    ],
  );

  return { handlePipeline };
}
