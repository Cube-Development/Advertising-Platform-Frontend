import { ArrowSmallVerticalIcon, LoginIcon } from "@shared/assets";
import { accordionTypes } from "@shared/config/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { IMenuItems } from "@pages/layouts/components/config";
import { CircleX, GripVertical } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@shared/ui";
import { paths } from "@shared/routing";

export const MenuItem: React.FC<IMenuItems> = ({
  item,
  onChange,
  openTitle,
  isAuth,
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
    <AccordionItem value={`item-${item.item.title}`} ref={accordionRef}>
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
                >
                  {t("login")}
                  <LoginIcon />
                </Link>
                <Link
                  to={paths.registration}
                  className={`${styles.btns__register} truncate`}
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
                </div>
              </div>
            </AccordionTrigger>
          </Link>
        )}

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
                </li>
              </Link>
            ))}
          </ul>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
};
