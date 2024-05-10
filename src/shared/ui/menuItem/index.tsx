import { ArrowSmallVerticalIcon } from "@shared/assets";
import { IMenuItems } from "@shared/types/common";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { accordionTypes } from "@shared/config/accordion";
import { paths } from "@shared/routing";

export const MenuItem: React.FC<IMenuItems> = ({ item }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    const state = (accordionRef.current! as HTMLElement).getAttribute(
      "data-state",
    );
    state === accordionTypes.open ? setIsActive(true) : setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AccordionItem value={`item-${item.item.title}`} ref={accordionRef}>
      <div className={styles.charper}>
        {item.subItems ? (
          <AccordionTrigger>
            <div className={`${styles.row} ${isActive ? styles.active : ""}`}>
              <div className={styles.row__title}>
                {item.item.img && <item.item.img />}
                {t(item.item.title)}
              </div>
              <ArrowSmallVerticalIcon
                className={
                  isActive
                    ? "default__icon__white rotate"
                    : "default__icon__black rotate__down"
                }
              />
            </div>
          </AccordionTrigger>
        ) : (
          <Link to={item.item.path!}>
            <AccordionTrigger>
              <div
                className={`${styles.row} ${isActive ? styles.active : ""} ${item.item.path === paths.faq && styles.faq}`}
              >
                <div className={styles.row__title}>
                  {item.item.img && <item.item.img />}
                  {t(item.item.title)}
                </div>
              </div>
            </AccordionTrigger>
          </Link>
        )}

        {item.subItems && (
          <AccordionContent>
            <ul>
              {item.subItems.map((subItem) => (
                <Link to={subItem.path!} key={subItem.title}>
                  <li>{t(subItem.title)}</li>
                </Link>
              ))}
            </ul>
          </AccordionContent>
        )}
      </div>
    </AccordionItem>
  );
};
