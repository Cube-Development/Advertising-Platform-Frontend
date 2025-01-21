import { IMenuItems } from "@entities/admin";
import { ArrowSmallVerticalIcon, LoginIcon } from "@shared/assets";
import { accordionTypes } from "@shared/config";
import { paths } from "@shared/routing";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui";
import { CircleX, GripVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
    state === accordionTypes.open ? setIsActive(true) : setIsActive(false);
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
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className={`${styles.content} gap-[0px]`}>
              <DialogTitle className="sr-only"></DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
              <DialogClose>
                <p className={styles.close}>
                  <CircleX
                    width={30}
                    height={30}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={1.5}
                  />
                </p>
              </DialogClose>
              <div className={styles.text}>
                <p className={styles.text__title}>
                  {t("registration_alert.title")}
                </p>
                <p className={styles.text__description}>
                  {t("registration_alert.description")}
                </p>
                <p className={styles.text__call_to_action}>
                  {t("registration_alert.call_to_action")}
                </p>
              </div>
              <DialogFooter className="pt-[20px]">
                <Link
                  to={paths.login}
                  className={`${styles.btns__login} truncate`}
                  onClick={() => onChange("")}
                >
                  {t("login")}
                  <LoginIcon />
                </Link>
                <Link
                  to={paths.registration}
                  className={`${styles.btns__register} truncate`}
                  onClick={() => onChange("")}
                >
                  {t("registration")}
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                    <GripVertical width={20} height={20} stroke="#4772e6" />
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
