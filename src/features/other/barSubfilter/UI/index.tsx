import { PROFILE_STATUS } from "@entities/wallet";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

type IBarFilter<T> = {
  type: T;
  name: string;
};

type IFilterOption<T> = {
  type: T;
  id?: PROFILE_STATUS;
};

type BarSubFilterProps<T> = {
  tab: T;
  tab_list: IBarFilter<T>[];
  changeTab: (filter: T) => void;
  badge?: { status: string; count: number }[];
  isFixedColumns?: boolean;
  resetValues?: () => void;
};

export const BarSubFilter = <T,>({
  tab,
  tab_list,
  changeTab,
  badge,
  isFixedColumns = false,
  resetValues = () => {},
}: BarSubFilterProps<T>) => {
  const { t } = useTranslation();
  const [options, filter] = [tab_list, tab];

  const toggleBar = (option: IFilterOption<T>) => {
    changeTab(option.type as T);
    resetValues();
  };
  return (
    <div className={styles.types}>
      <ul
        className={`${styles.common} ${isFixedColumns ? styles.isFixed : ""}`}
        style={
          {
            "--translateIndex": `${options.findIndex((option) => filter === option.type)}`,
            "--lengthFilter": `${options.length}`,
          } as React.CSSProperties
        }
      >
        {options.map((option, index) => (
          <li
            key={index}
            className={` ${filter === option.type ? styles.active : ""}`}
            onClick={() => toggleBar(option as any)}
          >
            <p className="truncate gradient_color">{t(option.name)}</p>
            {!!badge &&
              !!badge?.find((el) => el?.status === option?.type)?.count && (
                <div className={styles.badge}>
                  <span>
                    {badge?.find((el) => el?.status === option?.type)?.count}
                  </span>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
