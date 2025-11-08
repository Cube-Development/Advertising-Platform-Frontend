import { CART, ICart } from "@entities/project";
import { CreatePost as CreatePostBtn } from "@features/cart";
import { ProtectIcon3 } from "@shared/assets";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_ROLES } from "@entities/user";

interface CreatePostProps {
  cart: ICart;
  role: ENUM_ROLES;
}

export const CreatePost: FC<CreatePostProps> = ({ cart, role }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();

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
                <span>{cart?.subscribers?.toLocaleString()}</span>
              </div>
              <div className={styles.info}>
                <p>{t("cart.create_post.views")}</p>
                <span>{cart?.coverage?.toLocaleString()}</span>
              </div>
              {role !== ENUM_ROLES.MANAGER && (
                <div className={styles.info}>
                  <p>{t("cart.create_post.commission")}</p>
                  <span>{CART.commission}%</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className={styles.finnaly}>
        {screen <= BREAKPOINT.MD && role !== ENUM_ROLES.MANAGER && (
          <div className={styles.commission_mobile}>
            <p>{t("cart.create_post.commission")}</p>
            <span>{CART.commission}%</span>
          </div>
        )}
        {role !== ENUM_ROLES.MANAGER && (
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
        )}
        <div
          className={`${styles.button} ${!cart?.channels?.length && "deactive"}`}
        >
          <CreatePostBtn />
        </div>
      </div>
    </motion.div>
  );
};
