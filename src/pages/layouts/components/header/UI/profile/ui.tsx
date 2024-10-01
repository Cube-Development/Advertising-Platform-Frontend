import { roles, useLogoutMutation } from "@entities/user";
import { ProfileIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
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
  const { role } = useAppSelector((state) => state.user);

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
      navigate(role === roles.advertiser ? paths.main : paths.mainBlogger);
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
            <Link to={paths.profile}>
              <li onClick={handleButtonClick}>{t("my_profile.data")}</li>
            </Link>
            <Link to={paths.profile}>
              <li onClick={handleButtonClick}>{t("my_profile.settings")}</li>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <li className={styles.logout}>{t("logout")}</li>
              </DialogTrigger>
              <DialogContent className={`${styles.content} gap-[0px]`}>
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
                    <LogOut width={20} height={20} />
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
