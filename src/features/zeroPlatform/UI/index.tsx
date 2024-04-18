import { SadSmileIcon, HappySmileIcon } from "@shared/assets";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { useAppSelector } from "@shared/store";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ZeroPlatformProps {
  AddPlatformBtn: FC;
}

export const ZeroPlatform: FC<ZeroPlatformProps> = ({ AddPlatformBtn }) => {
  const { t } = useTranslation();
  const { statusFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.wrapper}>
      <div className={styles.smile}>
        {statusFilter === platformStatusFilter.banned ? (
          <>
            <div>
              <HappySmileIcon />
            </div>
            <p>{t(`platforms_blogger.no_banned`)}</p>
          </>
        ) : (
          <>
            <div>
              <SadSmileIcon />
            </div>
            <p>{t(`platforms_blogger.no_platform`)}</p>
          </>
        )}
      </div>
      <AddPlatformBtn />
      {/* <div className={styles.buttons}>
      </div> */}
    </div>
  );
};
