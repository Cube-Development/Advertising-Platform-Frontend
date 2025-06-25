import { FC } from "react";
import styles from "./styles.module.scss";
import {
  ENUM_NAVIGATION_CARD_ITEM_TYPE,
  NAVIGATION_CARD_LIST,
} from "../../model";
import { cn } from "@shared/ui/shadcn-ui/lib/utils";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "@shared/hooks";
import { BREAKPOINT } from "@shared/config";
import { ArrowSmallVerticalIcon } from "@shared/assets";

interface INavigationCardProps {
  currentTab: ENUM_NAVIGATION_CARD_ITEM_TYPE;
  onClick: (tab: ENUM_NAVIGATION_CARD_ITEM_TYPE) => void;
}

export const NavigationCard: FC<INavigationCardProps> = ({
  currentTab,
  onClick,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={cn(styles.wrapper, "frame")}>
          {NAVIGATION_CARD_LIST.map((item, index) => (
            <button
              key={index}
              className={cn(
                styles.row,
                currentTab === item.type && styles.active,
              )}
              onClick={() => onClick(item.type)}
            >
              <div>
                <item.icon size={18} className={styles.icon} />
                <p
                  className={cn(
                    styles.label,
                    currentTab === item.type && "gradient_color",
                  )}
                >
                  {t(item.label)}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.mobile__wrapper}>
          {NAVIGATION_CARD_LIST.map((item, index) => (
            <button
              key={index}
              className={cn(styles.row, "frame")}
              onClick={() => onClick(item.type)}
            >
              <div>
                <item.icon size={18} className={styles.icon} />
                <p className={cn(styles.label)}>{t(item.label)}</p>
              </div>
              <div className={styles.arrow}>
                <ArrowSmallVerticalIcon />
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
