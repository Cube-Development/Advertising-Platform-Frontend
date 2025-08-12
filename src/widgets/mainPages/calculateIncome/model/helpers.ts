export const calculateProfit = (
  subs: number,
  categoryMultiplier: number,
  platformMultiplier: number,
  formatMultiplier: number,
  postsCount: number,
): { postPrice: number; totalPrice: number } => {
  const basePrice = (subs / 1000) * 0.5;
  const postPrice =
    basePrice * categoryMultiplier * platformMultiplier * formatMultiplier;
  const totalPrice = postPrice * postsCount;
  return { postPrice, totalPrice };
};
