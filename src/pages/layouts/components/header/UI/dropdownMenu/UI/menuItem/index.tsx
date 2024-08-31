import { ArrowSmallVerticalIcon } from "@shared/assets";
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
import { GripVertical } from "lucide-react";

export const MenuItem: React.FC<IMenuItems> = ({
  item,
  onChange,
  openTitle,
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
