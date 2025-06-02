export const getCommissionAmount = (
  amount: number,
  commission: number,
  isFeeIncluded: boolean,
) => {
  let commissionAmount: number;
  let receivedAmount: number;

  if (isFeeIncluded) {
    // Комиссия включена в сумму
    commissionAmount = amount * (commission / (100 + commission));
    receivedAmount = amount - commissionAmount;
  } else {
    // Комиссия сверху
    commissionAmount = amount * (commission / 100);
    receivedAmount = amount;
    amount += commissionAmount; // если нужно видеть общую сумму с комиссией
  }

  return {
    commissionAmount: parseFloat(commissionAmount.toFixed(2)),
    receivedAmount: parseFloat(receivedAmount.toFixed(2)),
    finallyAmount: parseFloat((commissionAmount + receivedAmount).toFixed(2)),
  };
};

export const getMaxWithdrawAmount = (balance: number, commission: number) => {
  const maxWithdrawAmount = balance / (1 + commission / 100);

  return {
    maxWithdraw: parseFloat(maxWithdrawAmount.toFixed(2)),
  };
};
