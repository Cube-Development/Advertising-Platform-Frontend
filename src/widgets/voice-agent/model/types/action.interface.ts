import { ENUM_PATHS } from "@shared/routing";

export enum ENUM_VOICE_ACTIONS {
  NAVIGATE_USER = "navigate_user",
  ADD_TO_CART = "add_to_cart",
}
interface IBaseVoiceAgentAction {
  type: "ACTION_REQUIRED";
  action: ENUM_VOICE_ACTIONS;
}

export interface NavigateUserAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_ACTIONS.NAVIGATE_USER;
  path: ENUM_PATHS;
}

export interface AddToCartAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_ACTIONS.ADD_TO_CART;
  ids: string[];
}

export type IVoiceAgentAction = NavigateUserAction | AddToCartAction;
