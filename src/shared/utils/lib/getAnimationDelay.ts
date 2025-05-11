interface IGetAnimationDelay {
  index: number;
  currentPage: number;
  total: number;
  elements: number;
}

export const getAnimationDelay = ({
  index,
  currentPage,
  total,
  elements,
}: IGetAnimationDelay) => {
  const missing = currentPage * elements - total;
  return (index + missing) % elements;
};
