export enum transactionStatus {
  reject = 0,
  complite = 1,
  pending = 2,
}

export const adminTransactionStatus = [
  {
    name: "admin_panel.transactions.card.status.complite",
    id: transactionStatus.complite,
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
