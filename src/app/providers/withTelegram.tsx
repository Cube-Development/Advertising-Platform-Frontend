import { roles, toggleRole } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { QueryParams } from "@shared/utils";
import { FC, useEffect } from "react";

export const withTelegram = (Component: React.FC) => {
  const WithTelegramWrapper: FC = (props) => {
    const tg = window?.Telegram?.WebApp;
    const dispatch = useAppDispatch();

    const { telegram_role } = QueryParams();

    useEffect(() => {
      if (tg) {
        tg.expand();
        tg.enableClosingConfirmation();
        tg.ready();
      }
      if (telegram_role) dispatch(toggleRole(telegram_role as roles));
    }, []);

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return WithTelegramWrapper;
};
