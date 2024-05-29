import { ArrowSmallVerticalIcon, CopyIcon, MoreIcon } from "@shared/assets";
import { accordionTypes } from "@shared/config/accordion";
import { IManagerNewProjectCard } from "@shared/types/managerProjects";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ManagerNewProjectCardProps {
  card: IManagerNewProjectCard;
  ManagerNewProjectStartBtn: FC;
  SendToBotBtn: FC;
}

export const ManagerNewProjectCard: FC<ManagerNewProjectCardProps> = ({
  card,
  ManagerNewProjectStartBtn,
  SendToBotBtn,
}) => {
  const { t } = useTranslation();
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  const accordionRef = useRef(null);

  const handleClickOutside = () => {
    const state = (accordionRef.current! as HTMLElement).getAttribute(
      "data-state",
    );
    state === accordionTypes.open
      ? setSubcardOpen(true)
      : setSubcardOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div className={styles.card}>
        <div className={styles.card__id}>
          <p>№ {card.id}</p>
        </div>
        <div className={styles.card__date}>
          <p>{card.date}</p>
        </div>
        <div className={styles.card__tarif}>
          <p>{t("orders_manager.card.tarif")}:</p>
          <span>{card.tarif}</span>
        </div>
        <div className={styles.card__price}>
          <p>{t("orders_manager.card.cost")}:</p>
          <span>
            {card.price.toLocaleString()} {t("symbol")}
          </span>
        </div>
        <ManagerNewProjectStartBtn />
        <MoreIcon />
      </div>

      <AccordionItem value={`item-${card.id}`} ref={accordionRef}>
        <AccordionContent>
          <div className={styles.subcard}>
            <div className={styles.subcard__left}>
              <div className={styles.comment}>
                <p>{t("orders_manager.subcard.comment")}</p>
                <span>{card.comment}</span>
              </div>
              <div className={styles.link}>
                <p>{t("orders_manager.subcard.link")}</p>
                <ul>
                  {card.url.map((url, index) => (
                    <li key={index}>
                      <span>{url}</span>
                      <CopyIcon />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.subcard__right}>
              <div className={styles.file}>
                <div className={styles.file__top}>
                  <p>{t("orders_manager.subcard.file")}</p>
                  <span> {t("orders_manager.subcard.download_all")}</span>
                </div>
                <ul className={styles.file__all}>
                  {/* {card.file.map((file, index) => (
                  <li key={index}>
                    <span>{file}</span>
                  </li>
                ))} */}
                </ul>
              </div>
              <SendToBotBtn />
            </div>
          </div>
        </AccordionContent>

        <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
          <div
            className={styles.card__btn}
            onClick={() => handleChangeOpenSubcard()}
          >
            {isSubcardOpen
              ? t(`orders_manager.card.see_less`)
              : t(`orders_manager.card.see_task`)}

            <ArrowSmallVerticalIcon
              className={
                isSubcardOpen
                  ? "default__icon__white rotate"
                  : "default__icon__white rotate__down"
              }
            />
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </div>
  );
};
