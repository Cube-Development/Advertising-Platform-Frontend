import { FC } from "react";
import styles from "./styles.module.scss";
import { CartList } from "./cartList";
import { CreatePost } from "./createPost";
import { RecomendationList } from "@widgets/cartBlock/UI/recomendationList";

export const CartBlock: FC = () => {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.cards}>
          <CartList />
          <RecomendationList />
        </div>
        <CreatePost />
      </div>
    </div>
  );
};
