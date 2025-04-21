export enum ADMIN_TRANSACTION_STATUS {
  COMPLETE = 1,
  PENDING = 2,
  REJECT = 3,
}

export const ADMIN_TRANSACTION_STATUS_LIST = [
  {
    name: "admin_panel.transactions.card.status.complete",
    id: ADMIN_TRANSACTION_STATUS.COMPLETE,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    id: ADMIN_TRANSACTION_STATUS.REJECT,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    id: ADMIN_TRANSACTION_STATUS.PENDING,
  },
];

export const ADMIN_TRANSACTION_BAR_FILTER = [
  {
    name: "admin_panel.transactions.card.status.complete",
    type: ADMIN_TRANSACTION_STATUS.COMPLETE,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    type: ADMIN_TRANSACTION_STATUS.REJECT,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    type: ADMIN_TRANSACTION_STATUS.PENDING,
  },
];

export enum ADMIN_TRANSACTION_FORM {
  PAGE = "page",
  STATUS = "status",
}

export enum TRANSACTION_ID_STATUS {
  TURNOVER = 3,
  USER = 4,
}

export const ADMIN_TRANSACTION_ID_LIST = [
  {
    name: "admin_panel.transactions.card.details.identification.turnover",
    id: TRANSACTION_ID_STATUS.TURNOVER,
  },
  {
    name: "admin_panel.transactions.card.details.identification.user",
    id: TRANSACTION_ID_STATUS.USER,
  },
];
