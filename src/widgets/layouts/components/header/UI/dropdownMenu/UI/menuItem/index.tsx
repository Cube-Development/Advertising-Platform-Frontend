import { LoginModal } from "@features/user";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { ENUM_ACCORDION_TYPES } from "@shared/config";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@shared/ui";
import { GripVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IMenuItems } from "../../../../model";
import styles from "./styles.module.scss";

export const MenuItem: React.FC<IMenuItems> = ({
  item,
  onChange,
  openTitle,
  isAuth,
  viewsInfo,
}) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(
    openTitle === item.item.title,
  );

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    const state = (accordionRef.current! as HTMLElement).getAttribute(
      "data-state",
    );
    state === ENUM_ACCORDION_TYPES.OPEN
      ? setIsActive(true)
      : setIsActive(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AccordionItem
      value={`item-${item.item.title}`}
      ref={accordionRef}
      className="border-0"
    >
      <div className={styles.charper}>
        {item.subItems ? (
          <AccordionTrigger>
            <div className={`${styles.row} ${isActive ? styles.active : ""}`}>
              <div className={styles.row__title}>
                {item.item.img && (
                  <item.item.img
                    className={`${isActive ? "icon__white" : ""}`}
                  />
                )}
                {t(item.item.title!)}
              </div>
              <ArrowSmallVerticalIcon
                className={isActive ? "icon__white rotate" : "rotate__down"}
              />
              {viewsInfo && !!viewsInfo?.count && (
                <div className={styles.badge}>
                  <span>{viewsInfo?.count}</span>
                </div>
              )}
            </div>
          </AccordionTrigger>
        ) : item.item.isDialog && !isAuth ? (
          <LoginModal
            trigger={
              <span>
                <AccordionTrigger>
                  <div
                    className={`${styles.row} ${isActive ? styles.active : ""}`}
                  >
                    <div className={styles.row__title}>
                      {item.item.img && <item.item.img />}
                      {t(item.item.title!)}
                    </div>
                  </div>
                </AccordionTrigger>
              </span>
            }
          />
        ) : (
          <Link to={item.item.path!} onClick={() => onChange(item.item.path!)}>
            <AccordionTrigger>
              <div className={`${styles.row} ${isActive ? styles.active : ""}`}>
                <div className={styles.row__title}>
                  {item.item.img && <item.item.img />}
                  {t(item.item.title!)}
                  {viewsInfo && !!viewsInfo?.count && (
                    <div className={styles.badge}>
                      <span>{viewsInfo?.count}</span>
                    </div>
                  )}
                </div>
              </div>
            </AccordionTrigger>
          </Link>
        )}
        {item?.subItems && (
          <AccordionContent>
            <ul>
              {item.subItems?.map((subItem) => (
                <Link
                  to={subItem.path!}
                  key={subItem.title}
                  onClick={() => onChange(item.item.path!)}
                >
                  <li>
                    <GripVertical width={20} height={20} stroke="#0BADC2" />
                    {t(subItem.title!)}
                    {viewsInfo &&
                      !!viewsInfo?.count &&
                      !!viewsInfo?.values.find(
                        (value) => subItem?.type === value?.type,
                      )?.count && (
                        <div className={styles.badge}>
                          <span>
                            {viewsInfo?.values.find(
                              (value) => subItem?.type === value?.type,
                            )?.count || 0}
                          </span>
                        </div>
                      )}
                  </li>
                </Link>
              ))}
            </ul>
          </AccordionContent>
        )}
      </div>
    </AccordionItem>
  );
};
