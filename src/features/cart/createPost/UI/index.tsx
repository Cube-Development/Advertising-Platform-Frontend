import {
  cartStatusFilter,
  useCheckCartMutation,
  useCreateCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { ArrowLongHorizontalIcon, LoginIcon } from "@shared/assets";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector, useCurrentPathEnum } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import {
  AccountsLoader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import Cookies from "js-cookie";
import { CircleX } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface CreatePostProps {}

export const CreatePost: FC<CreatePostProps> = ({}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [createCart, { isLoading: isLoadingCart }] = useCreateCartMutation();
  const [createProjectCart, { isLoading: isLoadingProjectCart }] =
    useCreateProjectCartMutation();
  const [checkProjectCart] = useCheckCartMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateCart = () => {
    if (isAuth && role === ENUM_ROLES.ADVERTISER) {
      !isLoadingCart &&
        createCart()
          .unwrap()
          .then((data) => {
            Cookies.set(ENUM_COOKIES_TYPES.PROJECT_ID, data.project_id);
            navigate(ENUM_PATHS.CREATE_ORDER);
          })
          .catch((error) => {
            console.error("Ошибка во время создания корзины", error);
            toast({
              variant: "error",
              title: t("toasts.cart.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          });
    } else if (isAuth && role === ENUM_ROLES.MANAGER) {
      // должен быть запрос на проверку общей суммы в корзине манагера проекта и бюджета этого проекта
      const projectId = Cookies.get(ENUM_COOKIES_TYPES.PROJECT_ID) || "";
      !isLoadingProjectCart &&
        createProjectCart({
          project_id: projectId,
          language: language?.id || USER_LANGUAGES_LIST[0].id,
        })
          .unwrap()
          .then(() => {
            checkProjectCart({
              project_id: projectId,
            })
              .unwrap()
              .then((data) => {
                if (data.state === cartStatusFilter.success) {
                  navigate(ENUM_PATHS.CREATE_ORDER);
                } else if (
                  data.state === cartStatusFilter.channel_to_be_replaced
                ) {
                  Cookies.set(ENUM_COOKIES_TYPES.IS_CHANNEL_REPLACED, "true");
                  navigate(ENUM_PATHS.CREATE_ORDER);
                } else if (data.state === cartStatusFilter.amount) {
                  toast({
                    variant: "error",
                    title: t("cart.check.amount"),
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
                } else if (data.state === cartStatusFilter.not_found) {
                  toast({
                    variant: "error",
                    title: t("cart.check.not_found"),
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
                } else if (data.state === cartStatusFilter.no_data) {
                  toast({
                    variant: "error",
                    title: t("cart.check.no_data"),
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
                }
              })
              .catch((error) => {
                console.error("Ошибка во время создания корзины", error);
                toast({
                  variant: "error",
                  title: t("toasts.cart.error"),
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                });
              });
          })
          .catch((error) => {
            console.error("Ошибка во время создания корзины", error);
            toast({
              variant: "error",
              title: t("toasts.cart.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          });
    } else {
      toast({
        variant: "error",
        title: t("toasts.auth.token.alert"),
      });
    }
  };

  const currentPath = useCurrentPathEnum();

  return (
    <>
      {isAuth ? (
        <MyButton
          buttons_type="button__green"
          onClick={handleCreateCart}
          className={styles.button}
        >
          <p>{t(`cart_btn.create_post`)}</p>
          {isLoadingCart || isLoadingProjectCart ? (
            <div className="loader">
              <AccountsLoader />
            </div>
          ) : (
            <ArrowLongHorizontalIcon className="icon__white" />
          )}
        </MyButton>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton buttons_type="button__green" className={styles.button}>
              <p>{t(`cart_btn.create_post`)}</p>
              <ArrowLongHorizontalIcon className="icon__white" />
            </MyButton>
          </DialogTrigger>
          <DialogContent className={styles.content}>
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
            <DialogClose>
              <p className={styles.close}>
                <CircleX
                  width={30}
                  height={30}
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth={1.5}
                />
              </p>
            </DialogClose>
            <div className={styles.text}>
              <p className={styles.text__title}>
                {t("registration_alert.title")}
              </p>
              <p className={styles.text__description}>
                {t("registration_alert.description")}
              </p>
              <p className={`gradient_color ${styles.text__call_to_action}`}>
                {t("registration_alert.call_to_action")}
              </p>
            </div>
            <DialogFooter className="pt-[20px]">
              <Link
                to={`${ENUM_PATHS.LOGIN}${currentPath}`}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={`${ENUM_PATHS.REGISTRATION}${currentPath}`}
                className={`${styles.btns__register} truncate`}
              >
                {t("registration")}
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
