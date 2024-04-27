import { ArrowIcon3, BackIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PlatformTopProps {
  channel_id?: string;
}

export const PlatformTop: FC<PlatformTopProps> = ({ channel_id }) => {
  const { t } = useTranslation();
  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <button>
          <BackIcon />
        </button>
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
