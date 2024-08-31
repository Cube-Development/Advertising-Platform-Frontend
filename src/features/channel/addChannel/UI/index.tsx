import { IAddChannelQuery } from "@entities/channel";
import { AuthStateGenerator } from "@entities/user";
import { LoginIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const AddChannel: FC<IAddChannelQuery> = ({ props, path }) => {
  const { t } = useTranslation();

  const handleRegistrationClick = () => {
    const { registrationLink } = AuthStateGenerator();
    window.location.href = registrationLink;
  };

  const handleLoginClick = () => {
    const { loginLink } = AuthStateGenerator();
    window.location.href = loginLink;
  };
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      {isAuth ? (
        <Link to={path}>
          <MyButton {...props}>{t(`btn_add_platform`)}</MyButton>
        </Link>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <MyButton {...props}>{t(`btn_add_platform`)}</MyButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("registration_alert.title")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("registration_alert.description")}
                <AlertDialogAction>
                  <a onClick={handleRegistrationClick}>
                    <button>{t("registration")}</button>
                  </a>
                </AlertDialogAction>
                <AlertDialogAction>
                  <a onClick={handleLoginClick}>
                    <button>{t("login")}</button>
                    <LoginIcon />
                  </a>
                </AlertDialogAction>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {t("registration_alert.close")}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
