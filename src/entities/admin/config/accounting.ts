export enum ADMIN_ACCOUNTING_STATUS {
  COMPLETED = 1,
  PENDING = 2,
  REJECTED = 3,
}

export enum ADMIN_ACCOUNTING_TYPE {
  TOP_UP = 1,
  WITHDRAW = 2,
}

export enum ADMIN_ACCOUNTING_PERIOD_DAYS {
  ALL = 0,
  TODAY = 1,
  WEEK = 7,
  MONTH = 30,
}

// export const ADMIN_ACCOUNTING_STATUS_LIST = [
//   {
//     name: "admin_panel.accounting.card.status.top_up",
//     id: ADMIN_ACCOUNTING_STATUS.TOP_UP,
//   },
//   {
//     name: "admin_panel.accounting.card.status.withdraw",
//     id: ADMIN_ACCOUNTING_STATUS.REFUND,
//   },
//   {
//     name: "admin_panel.accounting.card.status.refund",
//     id: ADMIN_ACCOUNTING_STATUS.WITHDRAW,
//   },
// ];

// export const ADMIN_ACCOUNTING_FILTER_TABS_LIST = [
//   {
//     name: "admin_panel.accounting.card.status.top_up",
//     type: ADMIN_ACCOUNTING_STATUS.TOP_UP,
//   },
//   {
//     name: "admin_panel.accounting.card.status.withdraw",
//     type: ADMIN_ACCOUNTING_STATUS.REFUND,
//   },
//   {
//     name: "admin_panel.accounting.card.status.refund",
//     type: ADMIN_ACCOUNTING_STATUS.WITHDRAW,
//   },
// ];

// export enum ADMIN_TRANSACTION_FORM {
//   PAGE = "page",
//   STATUS = "status",
// }

// export enum TRANSACTION_ID_STATUS {
//   TURNOVER = 3,
//   USER = 4,
// }

// export const ADMIN_TRANSACTION_ID_LIST = [
//   {
//     name: "admin_panel.accounting.card.details.identification.turnover",
//     id: TRANSACTION_ID_STATUS.TURNOVER,
//   },
//   {
//     name: "admin_panel.accounting.card.details.identification.user",
//     id: TRANSACTION_ID_STATUS.USER,
//   },
// ];
