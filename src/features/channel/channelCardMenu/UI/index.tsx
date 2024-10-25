import { CancelIcon2, MoreIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface ChannelCardMenuProps {
  channel_id: string;
  DeleteChannel: FC<{ channel_id: string; onChange: () => void }>;
  DeactivateChannel: FC<{ channel_id: string; onChange: () => void }>;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ChannelCardMenu: FC<ChannelCardMenuProps> = ({
  channel_id,
  DeleteChannel,
  DeactivateChannel,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isDeactivateModalOpen, setDeactivateModalOpen] =
    useState<boolean>(false);

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

  const handleDeleteModalOpen = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setDeleteModalOpen(!isDeleteModalOpen);
  };
  const handleDeactivateModalOpen = (
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    event.stopPropagation();
    setDeactivateModalOpen(!isDeactivateModalOpen);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeactivateModalClose = () => {
    setDeactivateModalOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button onClick={(e) => toggleMenu(e)}>
        <MoreIcon />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.top}>
            <p className="gradient_color truncate">
              {t("platforms_blogger.menu.title")}
            </p>
            <button onClick={(e) => toggleMenu(e)}>
              <CancelIcon2 />
            </button>
          </div>
          <ul>
            <Link to={`${paths.addChannel}?channel_id=${channel_id}`}>
              <li>{t("platforms_blogger.menu.edit")}</li>
            </Link>
            {statusFilter === channelStatusFilter.active && (
              <li onClick={(e) => handleDeactivateModalOpen(e)}>
                {t("platforms_blogger.menu.deactivate")}
              </li>
            )}
            <li
              className={styles.delete}
              onClick={(e) => handleDeleteModalOpen(e)}
            >
              {t("platforms_blogger.menu.delete")}
            </li>
          </ul>
        </div>
      )}
      {isDeactivateModalOpen && (
        <DeactivateChannel
          channel_id={channel_id}
          onChange={handleDeactivateModalClose}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteChannel
          channel_id={channel_id}
          onChange={handleDeleteModalClose}
        />
      )}
    </div>
  );
};
