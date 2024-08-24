import { CART, ICart, useCreateCartMutation } from "@entities/project";
import { CreatePost as CreatePostBtn } from "@features/cart";
import { ProtectIcon3 } from "@shared/assets";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface CreatePostProps {
  cart: ICart;
}

export const CreatePost: FC<CreatePostProps> = ({ cart }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      animate="visible"
      variants={PAGE_ANIMATION.animationRight}
    >
      {screen >= BREAKPOINT.MD && (
        <>
          <div className={styles.icon}>
            <ProtectIcon3 />
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
          <p className={`${styles.finnaly_long}`}>
            {t("cart.create_post.finnaly")}:
          </p>
          <p className={`${styles.finnaly_short}`}>
            {t("cart.create_post.finnaly_short")}:
          </p>
          <span className="truncate">
            {cart?.amount?.toLocaleString()} {t("symbol")}
          </span>
        </div>
        <div
          className={`${styles.button} ${!cart?.channels?.length && "deactive"}`}
        >
          <CreatePostBtn onClick={handleCreateCart} />
        </div>
      </div>
    </motion.div>
  );
};
