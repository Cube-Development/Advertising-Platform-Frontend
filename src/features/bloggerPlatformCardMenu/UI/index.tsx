import { CancelIcon2, MoreIcon } from "@shared/assets";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { paths } from "@shared/routing";
import { useAppSelector } from "@shared/store";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface BloggerPlatformCardMenuProps {
  channelId: string;
  DeleteChannel: FC<{ channelId: string; onChange: () => void }>;
}

export const BloggerPlatformCardMenu: FC<BloggerPlatformCardMenuProps> = ({
  channelId,
  DeleteChannel,
}) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log(menuRef);
    console.log(menuRef.current);
    // console.log(!menuRef.current.contains(event.target as Node))
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

  const { statusFilter } = useAppSelector((state) => state.filter);

  const handleModalOpen = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button onClick={(e) => toggleMenu(e)}>
        <MoreIcon />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.top}>
            <p>{t("platforms_blogger.menu.title")}</p>
            <button onClick={(e) => toggleMenu(e)}>
              <CancelIcon2 />
            </button>
          </div>
          <ul>
            <Link to={paths.addPlatform}>
              <li>{t("platforms_blogger.menu.edit")}</li>
            </Link>
            {statusFilter === platformStatusFilter.active && (
              <li>{t("platforms_blogger.menu.deactivate")}</li>
            )}
            <li className={styles.delete} onClick={(e) => handleModalOpen(e)}>
              {t("platforms_blogger.menu.delete")}
            </li>
          </ul>
        </div>
      )}

      {isModalOpen && (
        <DeleteChannel channelId={channelId} onChange={handleModalClose} />
      )}
    </div>
  );
};
