export enum ADMIN_COMPLAINT_PRIORITY {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export const ADMIN_COMPLAINT_PRIORITY_STATUS_LIST = [
  {
    name: "admin_panel.complaints.card.priority_status.low",
    id: ADMIN_COMPLAINT_PRIORITY.LOW,
  },
  {
    name: "admin_panel.complaints.card.priority_status.medium",
    id: ADMIN_COMPLAINT_PRIORITY.MEDIUM,
  },
  {
    name: "admin_panel.complaints.card.priority_status.high",
    id: ADMIN_COMPLAINT_PRIORITY.HIGH,
  },
];

export enum ADMIN_COMPLAINT_STATUS {
  WAIT = 1,
  ACTIVE = 2,
  COMPLETE = 3,
}

export const ADMIN_COMPLAINT_STATUS_LIST = [
  {
    name: "admin_panel.complaintInfo.card.status.wait",
    id: ADMIN_COMPLAINT_STATUS.WAIT,
  },
  {
    name: "admin_panel.complaintInfo.card.status.active",
    id: ADMIN_COMPLAINT_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.complaintInfo.card.status.complete",
    id: ADMIN_COMPLAINT_STATUS.COMPLETE,
  },
];

export const ADMIN_COMPLAINT_BAR_FILTER = [
  {
    name: "admin_panel.complaints.types.wait",
    type: ADMIN_COMPLAINT_STATUS.WAIT,
  },
  {
    name: "admin_panel.complaints.types.active",
    type: ADMIN_COMPLAINT_STATUS.ACTIVE,
  },
  {
    name: "admin_panel.complaints.types.complete",
    type: ADMIN_COMPLAINT_STATUS.COMPLETE,
  },
];

export enum ADMIN_COMPLAINT_FORM {
  PAGE = "page",
  STATUS = "order_complaint_status",
}
