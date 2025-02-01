import {
  cartStatusFilter,
  useCheckCartMutation,
  useCreateCartMutation,
  useCreateProjectCartMutation,
} from "@entities/project";
import { roles } from "@entities/user";
import { ArrowLongHorizontalIcon, LoginIcon } from "@shared/assets";
import { Languages } from "@shared/config";
import { useAppSelector, useCurrentPathEnum } from "@shared/hooks";
import { paths } from "@shared/routing";
import {
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
  const { t, i18n } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [createCart] = useCreateCartMutation();
  const [createProjectCart] = useCreateProjectCartMutation();
  const [checkProjectCart] = useCheckCartMutation();
  const { toast } = useToast();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const navigate = useNavigate();

  const handleCreateCart = () => {
    if (isAuth && role === roles.advertiser) {
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
        });
    } else if (isAuth && role === roles.manager) {
      // должен быть запрос на проверку общей суммы в корзине манагера проекта и бюджета этого проета
      const projectId = Cookies.get("project_id") || "";
      createProjectCart({
        project_id: projectId,
        language: language?.id || Languages[0].id,
      })
        .unwrap()
        .then(() => {
          checkProjectCart({
            project_id: projectId,
          })
            .unwrap()
            .then((data) => {
              if (data.state === cartStatusFilter.success) {
                navigate(paths.createOrder);
              } else if (
                data.state === cartStatusFilter.channel_to_be_replaced
              ) {
                Cookies.set("channel_to_be_replaced", "true");
                navigate(paths.createOrder);
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
          <ArrowLongHorizontalIcon className="icon__white" />
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
                to={`${paths.login}${currentPath}`}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={`${paths.registration}${currentPath}`}
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
