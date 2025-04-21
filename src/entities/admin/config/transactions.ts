export enum adminTransactionTypesFilter {
  reject = 3,
  complete = 1,
  pending = 2,
}

export const adminTransactionStatus = [
  {
    name: "admin_panel.transactions.card.status.complete",
    id: adminTransactionTypesFilter.complete,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    id: adminTransactionTypesFilter.reject,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    id: adminTransactionTypesFilter.pending,
  },
];

export const adminTransactionTypes = [
  {
    name: "admin_panel.transactions.card.status.complete",
    type: adminTransactionTypesFilter.complete,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    type: adminTransactionTypesFilter.reject,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    type: adminTransactionTypesFilter.pending,
  },
];

export enum adminTransactionForm {
  page = "page",
  status = "status",
}

export enum identificationType {
  turnover = 3,
  user = 4,
}

export const adminIdentificationStatus = [
  {
    name: "admin_panel.transactions.card.details.identification.turnover",
    id: identificationType.turnover,
  },
  {
    name: "admin_panel.transactions.card.details.identification.user",
    id: identificationType.user,
  },
];
