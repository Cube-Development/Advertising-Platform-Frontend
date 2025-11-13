import { ENUM_ROLES } from "@entities/user";
import { LoginModal } from "@features/user";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { AccountsLoader, MyButton, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useCreatePostAdvertiser, useCreatePostManager } from "../model";
import styles from "./styles.module.scss";

interface CreatePostProps {}

export const CreatePost: FC<CreatePostProps> = ({}) => {
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const { createPostAdvertiser, isLoading: isLoadingAdvertiser } =
    useCreatePostAdvertiser();
  const { createPostManager, isLoading: isLoadingManager } =
    useCreatePostManager();

  const handleCreateCart = async () => {
    if (!isAuth) {
      toast({
        variant: "error",
        title: t("toasts.auth.token.alert"),
      });
      return;
    }

    if (role === ENUM_ROLES.ADVERTISER) {
      await createPostAdvertiser();
    } else if (role === ENUM_ROLES.MANAGER || role === ENUM_ROLES.AGENCY) {
      await createPostManager();
    }
  };

  if (!isAuth) {
    return (
      <LoginModal
        trigger={
          <MyButton buttons_type="button__green" className={styles.button}>
            <p>{t(`cart_btn.create_post`)}</p>
            <ArrowLongHorizontalIcon className="icon__white" />
          </MyButton>
        }
      />
    );
  }

  return (
    <MyButton
      buttons_type="button__green"
      onClick={handleCreateCart}
      className={styles.button}
    >
      <p>{t(`cart_btn.create_post`)}</p>
      {isLoadingAdvertiser || isLoadingManager ? (
        <div className="loader">
          <AccountsLoader />
        </div>
      ) : (
        <ArrowLongHorizontalIcon className="icon__white" />
      )}
    </MyButton>
  );
};
