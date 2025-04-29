import {
  ENUM_ROLES,
  useGetUserQueryQuery,
  useLogoutMutation,
} from "@entities/user";
import { ProfileIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui";
import { CircleX, LogOut } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface ProfileProps {
  toggleLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ toggleLogout }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { data: user } = useGetUserQueryQuery(undefined, { skip: !isAuth });

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };
  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      logout();
      toggleLogout();
      navigate(
        role === ENUM_ROLES.ADVERTISER
          ? ENUM_PATHS.MAIN
          : ENUM_PATHS.MAIN_BLOGGER,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.profile} ref={menuRef}>
      <button onClick={handleButtonClick}>
        <ProfileIcon />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <li className="font-bold text-[10px] truncate max-w-[70vw]">
              {user?.email}
            </li>
            <Dialog>
              <DialogTrigger asChild>
                <li className={styles.logout}>{t("logout")}</li>
              </DialogTrigger>
              <DialogContent className={`${styles.content} gap-[0px]`}>
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
                  <p className={styles.text__title}>{t("logout_title")}</p>
                  <p className={styles.text__description}>
                    {t("logout_description")}
                  </p>
                </div>
                <DialogFooter className="pt-[20px]">
                  <li
                    className={`${styles.btns__login} truncate`}
                    onClick={handleLogout}
                  >
                    {t("logout")}
                    <LogOut width={20} height={20} stroke="#8e54e9" />
                  </li>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ul>
        </div>
      )}
    </div>
  );
};
