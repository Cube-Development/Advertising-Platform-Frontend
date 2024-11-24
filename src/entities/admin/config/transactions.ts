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
