import { useRoomContext } from "@livekit/components-react";
import { useCallback } from "react";
import { IPipelineIntent } from "../../types";
import { useSiteNavigate } from "./use-site-navigate";
import { useAddToCart } from "./use-add-to-cart";
import { ENUM_PATHS } from "@shared/routing";
import { useProjectNameMutation } from "@entities/project";
import Cookies from "js-cookie";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_ROLES } from "@entities/user";
import {
  useCreatePostAdvertiser,
  useCreatePostManager,
} from "@features/cart/createPost/model/hooks";
import { setExternalField, useChangeBlur } from "@widgets/createOrder/model";

export function usePipelineHandler() {
  const room = useRoomContext();
  const dispatch = useAppDispatch();
  const { handleNavigate } = useSiteNavigate();
  const { handleAddToCart, handleRemoveFromCart } = useAddToCart();
  const [updateProjectName] = useProjectNameMutation();
  const { role, isAuth } = useAppSelector((state) => state.user);

  const { createPostAdvertiser } = useCreatePostAdvertiser();
  const { createPostManager } = useCreatePostManager();
  const { handleOnChangeBlur } = useChangeBlur();

  const sendAck = useCallback(
    async (
      intent: IPipelineIntent,
      status: "success" | "error" | "partial",
      payload: any = {},
      error: any = null,
    ) => {
      if (!room) return;

      const ackData = JSON.stringify({
        $ack: true,
        pipeline: intent.pipeline,
        step: intent.step,
        status,
        payload,
        error,
      });

      const encoder = new TextEncoder();
      const data = encoder.encode(ackData);

      await room.localParticipant.publishData(data, {
        reliable: true,
        topic: "agent-events",
      });

      console.log("Voice Agent: Sent ACK:", ackData);
    },
    [room],
  );

  const handlePipeline = useCallback(
    async (intent: IPipelineIntent) => {
      console.log("Voice Agent: Pipeline Intent Received:", intent);
      console.log("Voice Agent: Current URL:", window.location.href);
      console.log("Voice Agent: All Available Cookies:", document.cookie);

      try {
        if (intent.action === "NAVIGATE") {
          const path = intent.payload.path;
          if (path) {
            if (path === ENUM_PATHS.CREATE_ORDER) {
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
            } else {
              console.log("Voice Agent: Executing NAVIGATE to", path);
              await handleNavigate(path);
            }
          }
        } else if (intent.action === "ADD_TO_CART") {
          const items =
            intent.payload.channels ||
            intent.payload.channelIds ||
            intent.payload.ids;
          if (items && Array.isArray(items)) {
            console.log(
              "Voice Agent: Executing ADD_TO_CART with items:",
              items,
            );
            await handleAddToCart(items);
          }
        } else if (intent.action === "REMOVE_FROM_CART") {
          const items = intent.payload.channelIds || intent.payload.ids;
          if (items && Array.isArray(items)) {
            console.log(
              "Voice Agent: Executing REMOVE_FROM_CART with items:",
              items,
            );
            await handleRemoveFromCart(items);
          }
        } else if (
          intent.action === "SET_FIELD" ||
          intent.action === "GENERATE_TEXT"
        ) {
          console.log(
            "Voice Agent: SET_FIELD/GENERATE_TEXT action received",
            intent.payload,
          );

          const field =
            intent.payload.field ||
            (intent.action === "GENERATE_TEXT" ? "postText" : "");
          const value = intent.payload.value || intent.payload.text;

          if (field === "postText" && value) {
            console.log("Voice Agent: Setting post text via Redux bridge");
            dispatch(setExternalField({ name: "postText", value }));
            handleOnChangeBlur("datetime");
          } else if (field === "schedule" && value) {
            console.log(
              "Voice Agent: Setting schedule via Redux bridge",
              value,
            );
            dispatch(setExternalField({ name: "schedule", value }));

            // Определяем, какую секцию открыть следующей
            const nextBlur = role === ENUM_ROLES.AGENCY ? "prices" : "payment";
            handleOnChangeBlur(nextBlur);
          } else if ((field === "campaignName" || field === "name") && value) {
            // 1. Пытаемся достать ID из URL (query params)
            const urlParams = new URLSearchParams(window.location.search);
            let projectId =
              urlParams.get("projectId") || urlParams.get("project_id");

            // 2. Пытаемся достать ID из URL (path params через regex если query пусто)
            if (!projectId) {
              const match = window.location.pathname.match(
                /\/createorder\/([^\/]+)/,
              );
              if (match) projectId = match[1];
            }

            // 3. Смотрим в куки
            if (!projectId) {
              projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
              console.log("Voice Agent: ID from Cookies:", projectId);
            }

            if (projectId) {
              console.log(
                `Voice Agent: Updating project ${projectId} name to:`,
                value,
              );
              await updateProjectName({
                project_id: projectId,
                name: value,
              }).unwrap();
              console.log("Voice Agent: Name update successful");
            } else {
              const errorMsg =
                "PROJECT_ID not found in URL or cookies. Action aborted.";
              console.error("Voice Agent: SET_FIELD failed -", errorMsg);
              await sendAck(intent, "error", {}, { message: errorMsg });
              return;
            }

            handleOnChangeBlur("post");
          }
        } else if (intent.action === "CONFIRM") {
          console.log("Voice Agent: CONFIRM action received", intent.payload);
        } else {
          console.log(
            `Voice Agent: Action ${intent.action} received but not explicitly handled yet`,
            intent.payload,
          );
        }

        // Simulate a small delay for better UX
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
      isAuth,
      role,
      createPostAdvertiser,
      createPostManager,
    ],
  );

  return { handlePipeline };
}
