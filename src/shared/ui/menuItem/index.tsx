import { ArrowIcon } from "@shared/assets";
import { IMenuItems } from "@shared/types/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const MenuItem: React.FC<IMenuItems> = ({
  item,
  changeCharper,
  chapter,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.charper}>
      <div
        className={`${styles.row} ${chapter === item.item.title && styles.active}`}
        onClick={() => changeCharper(item.item.title, !!item.subItems)}
      >
        {item.subItems ? (
          <>
            <div className={styles.row__title}>
              {item.item.img && <item.item.img />}
              {t(item.item.title)}
            </div>
            <ArrowIcon />
          </>
        ) : (
          <Link to={item.item.path!}>
            <div className={styles.row__title}>
              {item.item.img && <item.item.img />}
              {t(item.item.title)}
            </div>
          </Link>
        )}
      </div>
      {item.subItems && chapter === item.item.title && (
        <ul>
          {item.subItems.map((subItem, index) => (
            <Link to={subItem.path!}>
              <li
                key={subItem.title}
                onClick={() => changeCharper(item.item.title, !!item.subItems)}
              >
                {t(subItem.title)}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
