import { IAdminUserData } from "@entities/admin";
import { CancelIcon2, MoreIcon } from "@shared/assets";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface UserCardMenuProps {
  card: IAdminUserData;
}

export const UserCardMenu: FC<UserCardMenuProps> = ({ card }) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button onClick={(e) => toggleMenu(e)}>
        <MoreIcon className="icon__grey" />
      </button>

      {isMenuOpen && (
        <ul className={styles.menu}>
          <li>{t("admin_panel.users.card.menu.details")}</li>
          <li>{t("admin_panel.users.card.menu.send_message")}</li>
          <li>{t("admin_panel.users.card.menu.edit")}</li>
          <li>{t("admin_panel.users.card.menu.unblock")}</li>
        </ul>
      )}
    </div>
  );
};
