import { StarIcon5, SadSmileIcon } from "@shared/assets";
import { IStartProjectProps } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_PROJECT_TYPES } from "@entities/project";

interface ZeroProjectProps {
  listLength: boolean;
  NewProjectBtn: FC<IStartProjectProps>;
  TurnkeyProjectBtn: FC<IStartProjectProps>;
  typeFilter: string;
}

export const ZeroProject: FC<ZeroProjectProps> = ({
  listLength,
  NewProjectBtn,
  TurnkeyProjectBtn,
  typeFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.no__project}>
        <div className={styles.smile}>
          {typeFilter === ENUM_PROJECT_TYPES.SAVED_PROJECT ? (
            <>
              <div>
                <StarIcon5 />
              </div>
              <p>{t(`orders_advertiser.no_template`)}</p>
            </>
          ) : (
            <>
              <div>
                <SadSmileIcon />
              </div>
              <p>{t(`orders_advertiser.no_project`)}</p>
            </>
          )}
        </div>
        <div className={styles.buttons}>
          <NewProjectBtn listLength={listLength} />
          <p>{t(`orders_advertiser.or`)}</p>
          <TurnkeyProjectBtn listLength={listLength} />
        </div>
      </div>
    </div>
  );
};
