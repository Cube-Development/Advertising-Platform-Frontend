import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ProtectIcon3 } from "@shared/assets";
import { CreatePosts } from "@features/createPost";
import { CART } from "@shared/config/common";
import { ICart } from "@shared/types/cart";
import { useCreateCartMutation } from "@shared/store/services/advOrdersService";
import { useAppSelector } from "@shared/store";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";

interface CreatePostProps {
  cart: ICart;
}

export const CreatePost: FC<CreatePostProps> = ({ cart }) => {
  const { t } = useTranslation();

  // let { views, cost, subs } = cards.reduce(
  //   (totals, channel) => {
  //     const selected_format = channel.format.find(
  //       (format) => format.format === channel.selected_format,
  //     )!;
  //     totals.views += selected_format.views;
  //     totals.cost += selected_format.price;
  //     totals.subs += channel.subscribers;
  //     return totals;
  //   },
  //   { views: 0, cost: 0, subs: 0 },
  // );

  // cost = Math.round(cost * (1 + CART.commission / 100));

  const { isAuth } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [createCart] = useCreateCartMutation();

  const handleCreateCart = () => {
    if (isAuth) {
      createCart()
        .unwrap()
        .then((data) => {
          Cookies.set("project_id", data.project_id);
          navigate(paths.createOrder);
        })
        .catch((error) => {
          console.error("Ошибка во время создания корзины", error);
          alert("У вас недостаточно средств, нужно пополнить баланс");
        });
    } else {
      alert("Нужно авторизоваться чтобы продолжить");
    }
  };

  return (
    <div className={styles.sticky_block}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div>
            <ProtectIcon3 />
          </div>
          <p>{t("cart.create_post.title")}</p>
          <span>{t("cart.create_post.text")}</span>
        </div>
        <div className={styles.data}>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.subscribers")}</p>
            <span>{cart?.channels?.length?.toLocaleString()}</span>
          </div>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.views")}</p>
            <span>{cart?.coverage?.toLocaleString()}</span>
          </div>
          <div className={styles.data__row}>
            <p>{t("cart.create_post.commission")}</p>
            <span>{CART.commission}%</span>
          </div>
        </div>
        <div className={styles.finnaly}>
          <p>{t("cart.create_post.commission")}:</p>
          <span>
            {cart?.amount?.toLocaleString()} {t("symbol")}
          </span>
        </div>
        <div
          className={`${styles.button} ${!cart?.channels?.length && "deactive"}`}
        >
          <CreatePosts onClick={handleCreateCart} />
        </div>
      </div>
    </div>
  );
};
