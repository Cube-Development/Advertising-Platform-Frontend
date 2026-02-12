import { ENUM_PATHS } from "@shared/routing";

import {
  ENUM_VOICE_AGENT_ACTIONS,
  ENUM_AGENT_EVENT_TYPE,
  ENUM_PIPELINE,
} from "../constants";
import { ENUM_NAVIGATION_SCREENS } from "../constants/navigation-intents";

interface IBaseVoiceAgentAction {
  type: ENUM_AGENT_EVENT_TYPE.ACTION_REQUIRED;
  action: ENUM_VOICE_AGENT_ACTIONS;
}

export interface NavigateUserAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_AGENT_ACTIONS.NAVIGATE_USER;
  screen: ENUM_NAVIGATION_SCREENS;
}

export interface AddToCartAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_AGENT_ACTIONS.ADD_TO_CART;
  channels?: any[];
  ids?: string[];
}

export interface RemoveFromCartAction extends IBaseVoiceAgentAction {
  action: ENUM_VOICE_AGENT_ACTIONS.REMOVE_FROM_CART;
  ids: string[];
}

export interface IPipelineIntent {
  type: ENUM_AGENT_EVENT_TYPE.PIPELINE_INTENT;
  pipeline: ENUM_PIPELINE;
  step: string;
  action: ENUM_VOICE_AGENT_ACTIONS;
  payload: IOrderCreationIntent;
}

export interface IOrderCreationIntent {
  campaign_name: string;
  post_text: string;
  schedule: any;
  ids?: string[];
}

export type IVoiceAgentAction =
  | NavigateUserAction
  | AddToCartAction
  | RemoveFromCartAction
  | IPipelineIntent;
