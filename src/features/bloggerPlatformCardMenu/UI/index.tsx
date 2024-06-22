import { CancelIcon2, MoreIcon } from "@shared/assets";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { paths } from "@shared/routing";
import { useAppSelector } from "@shared/store";
import { useDeactivateChannelMutation } from "@shared/store/services/channelService";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface BloggerPlatformCardMenuProps {
  channel_id: string;
  DeleteChannel: FC<{ channel_id: string; onChange: () => void }>;
}

export const BloggerPlatformCardMenu: FC<BloggerPlatformCardMenuProps> = ({
  channel_id,
  DeleteChannel,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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

  const { statusFilter } = useAppSelector((state) => state.filter);

  const handleModalOpen = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [deactivateChannel] = useDeactivateChannelMutation();

  const handleDeactiveChannel = () => {
    deactivateChannel(channel_id)
      .unwrap()
      .then(() => {
        handleModalClose();
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.channel.deactivate.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.channel.activate.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("Ошибка деактивации: ", error);
      });
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
            <Link to={`${paths.addPlatform}?channel_id=${channel_id}`}>
              <li>{t("platforms_blogger.menu.edit")}</li>
            </Link>
            {statusFilter === platformStatusFilter.active && (
              <li onClick={handleDeactiveChannel}>
                {t("platforms_blogger.menu.deactivate")}
              </li>
            )}
            <li className={styles.delete} onClick={(e) => handleModalOpen(e)}>
              {t("platforms_blogger.menu.delete")}
            </li>
          </ul>
        </div>
      )}

      {isModalOpen && (
        <DeleteChannel channel_id={channel_id} onChange={handleModalClose} />
      )}
    </div>
  );
};
