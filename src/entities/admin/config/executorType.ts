export type ExecutorType = "all" | "self_connect" | "agency";

export const EXECUTOR_TYPE = {
  ALL: "all",
  SELF_CONNECT: "self_connect",
  AGENCY: "agency",
} as const satisfies Record<string, ExecutorType>;

/** default для /manage/* */
export const MANAGE_EXECUTOR_TYPE_DEFAULT = EXECUTOR_TYPE.ALL;

/** default для /adv-admin/channels */
export const CHANNELS_EXECUTOR_TYPE_DEFAULT = EXECUTOR_TYPE.ALL;

export const EXECUTOR_TYPE_TABS = [
  {
    name: "track_orders.executor_type.all",
    type: EXECUTOR_TYPE.ALL,
  },
  {
    name: "track_orders.executor_type.self_connect",
    type: EXECUTOR_TYPE.SELF_CONNECT,
  },
  {
    name: "track_orders.executor_type.agency",
    type: EXECUTOR_TYPE.AGENCY,
  },
] as const;
