export enum transactionStatus {
  reject = 0,
  complete = 1,
  pending = 2,
}

export const adminTransactionStatus = [
  {
    name: "admin_panel.transactions.card.status.complete",
    id: transactionStatus.complete,
  },
  {
    name: "admin_panel.transactions.card.status.reject",
    id: transactionStatus.reject,
  },
  {
    name: "admin_panel.transactions.card.status.pending",
    id: transactionStatus.pending,
  },
];

export enum adminTransactionForm {
  page = "page",
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
