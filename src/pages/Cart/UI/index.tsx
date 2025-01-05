// import { Cart } from "@widgets/cart";
// import { FC } from "react";

// export const CartPage: FC = () => {
//   return <Cart />;
// };

import React, { Suspense } from "react";

// Ленивый импорт компонента Cart
const Cart = React.lazy(() =>
  import("@widgets/cart").then((module) => ({ default: module.Cart })),
);

export const CartPage = () => {
  return (
    <Suspense fallback={<div>Loading Cart...</div>}>
      <Cart />
    </Suspense>
  );
};
