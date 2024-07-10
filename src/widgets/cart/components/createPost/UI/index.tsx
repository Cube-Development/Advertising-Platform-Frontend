import { ProtectIcon3 } from "@shared/assets";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { CreatePost as CreatePostBtn } from "@features/cart";
import { ToastAction, useToast } from "@shared/ui";
import { CART, ICart } from "@entities/catalog";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { useCreateCartMutation } from "@entities/project";

interface CreatePostProps {
  cart: ICart;
}

export const CreatePost: FC<CreatePostProps> = ({ cart }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          toast({
            variant: "error",
            title: t("toasts.cart.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          // alert("У вас недостаточно средств, нужно пополнить баланс");
        });
    } else {
      toast({
        variant: "error",
        title: t("toasts.auth.token.alert"),
      });
      // alert("Нужно авторизоваться чтобы продолжить");
    }
  };

  return (
    <div className={styles.sticky_block}>
      <div className={styles.wrapper}>
        {screen >= BREAKPOINT.MD && (
          <>
            <div className={styles.icon}>
              <div>
                <ProtectIcon3 />
              </div>
            </div>
            <div className={styles.data}>
              <div className={styles.data__text}>
                <p>{t("cart.create_post.title")}</p>
                <span>{t("cart.create_post.text")}</span>
              </div>
              <div className={styles.data__info}>
                <div className={styles.info}>
                  <p>{t("cart.create_post.subscribers")}</p>
                  <span>{cart?.channels?.length?.toLocaleString()}</span>
                </div>
                <div className={styles.info}>
                  <p>{t("cart.create_post.views")}</p>
                  <span>{cart?.coverage?.toLocaleString()}</span>
                </div>
                <div className={styles.info}>
                  <p>{t("cart.create_post.commission")}</p>
                  <span>{CART.commission}%</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.finnaly}>
          <div className={styles.finnaly__text}>
            <p>{t("cart.create_post.finnaly")}:</p>
            <span>
              {cart?.amount?.toLocaleString()} {t("symbol")}
            </span>
          </div>
          <div
            className={`${styles.button} ${!cart?.channels?.length && "deactive"}`}
          >
            <CreatePostBtn onClick={handleCreateCart} />
          </div>
        </div>
      </div>
    </div>
  );
};
