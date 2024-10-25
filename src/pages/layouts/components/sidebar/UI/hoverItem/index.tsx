import { IMenuItem } from "@pages/layouts/components/config";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface HoverItemProps {
  item: IMenuItem;
}

export const HoverItem: FC<HoverItemProps> = ({ item }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className="gradient_color">{t(item.item.title || "")}</p>
      </div>
      {item.subItems && (
        <ul>
          {item.subItems.map((page, index) => (
            <Link to={page.path!} key={index}>
              <li>{t(page.title || "")}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
