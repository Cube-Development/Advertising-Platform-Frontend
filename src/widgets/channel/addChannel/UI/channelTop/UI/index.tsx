import { ArrowIcon3, BackIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { addChannelQueries } from "@shared/config/addChannelQueries";

interface ChannelTopProps {
  channel_id?: string;
  query?: string;
}

export const ChannelTop: FC<ChannelTopProps> = ({ channel_id, query }) => {
  const { t } = useTranslation();
  const path = channel_id
    ? paths.myChannels
    : query === addChannelQueries.main
      ? paths.mainBlogger
      : query === addChannelQueries.offers
        ? paths.offers
        : paths.myChannels;
  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <Link to={path}>
          <BackIcon />
        </Link>
        <div>
          <p>
            {channel_id
              ? t(`add_platform.edit_platform`)
              : t(`add_platform.add_platform`)}
          </p>
          <ArrowIcon3 />
        </div>
      </div>
    </div>
  );
};
