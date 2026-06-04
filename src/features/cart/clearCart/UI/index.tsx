import {
  useClearCommonCartMutation,
  useClearProjectCartMutation,
  useClearPublicCartMutation,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { MyButton, useToast } from "@shared/ui";
import { queryParamKeys, QueryParamsUUID } from "@shared/utils";
import Cookies from "js-cookie";
import { Loader, Trash2 } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

type ClearCartProps = {
  disabled?: boolean;
};

export const ClearCart: FC<ClearCartProps> = ({ disabled }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID);
  const projectId = QueryParamsUUID(queryParamKeys.saveProject);

  const [clearCommonCart, { isLoading: isLoadingCommon }] =
    useClearCommonCartMutation();
  const [clearPublicCart, { isLoading: isLoadingPublic }] =
    useClearPublicCartMutation();
  const [clearProjectCart, { isLoading: isLoadingProject }] =
    useClearProjectCartMutation();

  const isLoading = isLoadingCommon || isLoadingPublic || isLoadingProject;

  const handleClearCart = async (): Promise<void> => {
    if (disabled || isLoading) return;

    try {
      if (!isAuth && guestId) {
        await clearPublicCart({ guest_id: guestId }).unwrap();
      } else if (isAuth && role === ENUM_ROLES.ADVERTISER && !projectId) {
        await clearCommonCart().unwrap();
      } else if (isAuth && projectId) {
        await clearProjectCart({ project_id: projectId }).unwrap();
      }

      toast({
        variant: "success",
        title: t("toasts.cart.clear.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.cart.clear.error"),
      });
      console.error("Ошибка при очистке корзины", error);
    }
  };

  return (
    <MyButton
      className={styles.button}
      disabled={disabled || isLoading}
      onClick={handleClearCart}
    >
      {isLoading ? (
        <Loader className="size-5 animate-spin stroke-[2px]" />
      ) : (
        <Trash2 className="size-5 stroke-[2px]" />
      )}
    </MyButton>
  );
};
