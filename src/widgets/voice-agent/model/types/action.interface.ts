import { ENUM_PATHS } from "@shared/routing";

export enum ENUM_VOICE_ACTIONS {
  NAVIGATE_USER = "navigate_user",
  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
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
  channels?: any[]; // Новый формат: массив объектов
  ids?: string[]; // Старый формат: массив строк
}

export interface RemoveFromCartAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_ACTIONS.REMOVE_FROM_CART;
  ids: string[];
}

export interface IPipelineIntent {
  type: "PIPELINE_INTENT";
  pipeline: string;
  step: string;
  action: string;
  payload: Record<string, any>;
}

export type IVoiceAgentAction =
  | NavigateUserAction
  | AddToCartAction
  | RemoveFromCartAction
  | IPipelineIntent;
