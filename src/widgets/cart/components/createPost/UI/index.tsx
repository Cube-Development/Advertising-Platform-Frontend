import { CART, ICart } from "@entities/project";
import { ApplyPromocode, CreatePost as CreatePostBtn } from "@features/cart";
import { ProtectIcon3 } from "@shared/assets";
import { BREAKPOINT, PAGE_ANIMATION } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_ROLES } from "@entities/user";
import { selectIsApplyingPromocode, selectPromocode } from "@entities/wallet";
import { LoginPremiumAccess, LoginToViewMore } from "@features/user";
import { Skeleton } from "@shared/ui";
import { queryParamKeys, QueryParamsUUID } from "@shared/utils";

interface CreatePostProps {
  cart: ICart;
  role: ENUM_ROLES;
  isLoading: boolean;
}

export const CreatePost: FC<CreatePostProps> = ({ cart, role, isLoading }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const { isPremiumUser, isAuth } = useAppSelector((state) => state.user);
  /** Сохранённый проект (`save_project`): скидка считается по его корзине, `null` — общая корзина */
  const projectId = QueryParamsUUID(queryParamKeys.saveProject) || null;
  const { discount } = useAppSelector(selectPromocode(projectId));
  /** Промокод — у рекламодателя: в общей корзине и в корзине сохранённого проекта, не у гостя */
  const hasPromocode = isAuth && role === ENUM_ROLES.ADVERTISER;
  /** Идёт «Применить»: «Создать пост» ждёт — иначе проект создастся раньше, чем код ляжет в корзину */
  const isWaitingPromocode =
    useAppSelector(selectIsApplyingPromocode) && hasPromocode;
  const hasUnavailableFormat = cart?.channels?.some(
    (channel) => channel.format_unavailable,
  );

  // const isModal = !isAuth || !isPremiumUser;
  const isModal = false;
  const Modal = () =>
    !isAuth ? (
      <LoginToViewMore />
    ) : !isPremiumUser ? (
      <LoginPremiumAccess />
    ) : null;
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
                {isLoading ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <span>{cart?.subscribers?.toLocaleString()}</span>
                )}
              </div>
              <div className={styles.info}>
                <p>{t("cart.create_post.views")}</p>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span>
                    {isModal ? <Modal /> : cart?.coverage?.toLocaleString()}
                  </span>
                )}
              </div>
              {role !== ENUM_ROLES.AGENCY && (
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
        {screen <= BREAKPOINT.MD && role !== ENUM_ROLES.AGENCY && (
          <div className={styles.commission_mobile}>
            <p>{t("cart.create_post.commission")}</p>
            <span>{CART.commission}%</span>
          </div>
        )}
        {role !== ENUM_ROLES.AGENCY && (
          <>
            {screen <= BREAKPOINT.MD && (
              <div className={styles.info}>
                <p>{t("cart.create_post.views")}</p>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span>
                    {isModal ? <Modal /> : cart?.coverage?.toLocaleString()}
                  </span>
                )}
              </div>
            )}
            {hasPromocode && (
              <div className={styles.promocode}>
                {/* Смена корзины — новое поле: код другой корзины в нём не остаётся */}
                <ApplyPromocode
                  key={projectId ?? "common"}
                  amount={cart?.amount}
                  projectId={projectId}
                />
                {discount && (
                  <div className={styles.promocode__discount}>
                    <p>{t("cart.promocode.discount")}:</p>
                    <span>
                      −{discount.discount_amount.toLocaleString()} {t("symbol")}
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className={styles.finnaly__text}>
              <p className={`${styles.finnaly_long}`}>
                {t("cart.create_post.finnaly")}:
              </p>
              <p className={`${styles.finnaly_short}`}>
                {t("cart.create_post.finnaly_short")}:
              </p>
              <span className="truncate flex flex-col md:items-center items-end gap-1">
                {isLoading ? (
                  <Skeleton className="h-5 w-40" />
                ) : hasPromocode && discount ? (
                  <>
                    <s className={styles.promocode__before}>
                      {discount.amount_before.toLocaleString()} {t("symbol")}
                    </s>
                    {discount.amount_after.toLocaleString()} {t("symbol")}
                  </>
                ) : (
                  <>
                    {cart?.amount?.toLocaleString()} {t("symbol")}
                  </>
                )}
                <span className="md:!text-xs mobile-xl:!text-[10px] !text-[8px] !font-medium">
                  {t("cart.create_post.vat_info")}
                </span>
              </span>
            </div>
          </>
        )}
        <div
          className={`${styles.button} ${(!cart?.channels?.length || isWaitingPromocode) && "deactive"}`}
        >
          <CreatePostBtn
            hasUnavailableFormat={hasUnavailableFormat}
            disabled={isWaitingPromocode}
          />
        </div>
      </div>
    </motion.div>
  );
};
