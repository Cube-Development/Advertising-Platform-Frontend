import { ArrowIcon3, BackIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { addChannelQueries } from "@entities/channel";

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
    <>
      <div className={styles.wrapper}>
        <Link to={path}>
          <BackIcon />
        </Link>
        <div>
          <p>
            {channel_id
              ? t(`add_platform.title.edit`)
              : t(`add_platform.title.add`)}
          </p>
          <ArrowIcon3 />
        </div>
      </div>
    </>
  );
};
