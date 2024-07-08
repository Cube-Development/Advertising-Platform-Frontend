import { useAppDispatch } from "@shared/store";
import { userSlice } from "@shared/store/reducers";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { roles } from "@shared/config/roles";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";
import { useGetTokensMutation } from "@shared/store/services/authService";
import { useTransferPublicMutation } from "@shared/store/services/cartService";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { useTranslation } from "react-i18next";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { QueryParams } from "@shared/functions";

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
          dispatch(userSlice.actions.login(data));
          const decoded: DecodedToken = jwtDecode(data.access_token);
          dispatch(userSlice.actions.login(data));
          navigate(
            decoded.role === roles.advertiser ? paths.main : paths.mainBlogger,
          );
          dispatch(userSlice.actions.toggleRole(decoded?.role));
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
