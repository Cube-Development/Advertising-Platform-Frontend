import { StarIcon3, SadSmileIcon } from "@shared/assets";
import { useAppSelector } from "@shared/store";
import { IStartProjectProps } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { projectTypesFilter } from "@entities/project";

interface ZeroProjectProps {
  listLength: boolean;
  NewProjectBtn: FC<IStartProjectProps>;
  TurnkeyProjectBtn: FC<IStartProjectProps>;
}

export const ZeroProject: FC<ZeroProjectProps> = ({
  listLength,
  NewProjectBtn,
  TurnkeyProjectBtn,
}) => {
  const { t } = useTranslation();
  const { typeFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.no__project}>
      <div className={styles.smile}>
        {typeFilter === projectTypesFilter.savedProject ? (
          <>
            <div>
              <StarIcon3 />
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
  );
};
