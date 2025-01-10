export enum cartStatusFilter {
  success = 1,
  amount = -1,
  channel_to_be_replaced = -2,
  not_found = -3,
  no_data = -4,
}

export const cartStatus = [
  {
    type: cartStatusFilter.success,
  },
  {
    type: cartStatusFilter.amount,
    error: "cart.check.amount",
  },
  {
    type: cartStatusFilter.channel_to_be_replaced,
    error: "cart.check.channel_to_be_replaced",
  },
  {
    type: cartStatusFilter.not_found,
    error: "cart.check.not_found",
  },
  {
    type: cartStatusFilter.no_data,
    error: "cart.check.no_data",
  },
];
