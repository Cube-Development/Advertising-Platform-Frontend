import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { QueryParams } from "@shared/functions";
import { login, roles, toggleRole, useGetTokensMutation } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { useTransferPublicMutation } from "@entities/project";
import { ToastAction, useToast } from "@shared/ui";

type DecodedToken = {
  role: roles;
};

export const HandleAuth = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [getTokens] = useGetTokensMutation();
  const dispatch = useAppDispatch();
  const { code, state } = QueryParams();
  const navigate = useNavigate();

  // transfer Public Cart
  const guestId = Cookies.get("guest_id");
  const transferCart = (id: string) => {
    transferPublic({ guest_id: id })
      .unwrap()
      .then(() => {
        Cookies.remove("guest_id");
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.auth.cart.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("Ошибка при трансфере корзины", error);
      });
  };
  const [transferPublic] = useTransferPublicMutation();

  const handleAuthTokens = async (code: string) => {
    const genState = Cookies.get("genState");
    if (state === genState) {
      getTokens({ authorization_code: code })
        .unwrap()
        .then((data) => {
          dispatch(login(data));
          const decoded: DecodedToken = jwtDecode(data.access_token);
          dispatch(login(data));
          navigate(
            decoded.role === roles.advertiser ? paths.main : paths.mainBlogger,
          );
          dispatch(toggleRole(decoded?.role));
          Cookies.remove("genState");
          guestId && transferCart(guestId);
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.auth.token.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("Ошибка получения токена:", error);
        });
    }
  };

  useEffect(() => {
    if (code && state) {
      handleAuthTokens(code);
    }
  }, [code, state]);

  return <></>;
};
