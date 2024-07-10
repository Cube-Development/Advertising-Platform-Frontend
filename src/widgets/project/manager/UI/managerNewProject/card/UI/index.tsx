import { ArrowSmallVerticalIcon, CopyIcon, MoreIcon } from "@shared/assets";
import { accordionTypes } from "@shared/config";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IManagerNewProjectCard } from "@entities/project";
import { SendToBot, StartProject } from "@features/project";

interface ManagerNewProjectCardProps {
  card: IManagerNewProjectCard;
}

export const ManagerNewProjectCard: FC<ManagerNewProjectCardProps> = ({
  card,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
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

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      variant: "default",
      title: "Скопировано",
    });
  };

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div className={styles.card}>
        <div className={styles.card__id}>
          <p>№ {card?.id}</p>
        </div>
        <div className={styles.card__date}>
          <p>{card?.tariff_date}</p>
        </div>
        <div className={styles.card__tarif}>
          <p>{t("orders_manager.card.tarif")}:</p>
          <span>{card?.tariff_name}</span>
        </div>
        <div className={styles.card__price}>
          <p>{t("orders_manager.card.cost")}:</p>
          <span>
            {card?.budget?.toLocaleString()} {t("symbol")}
          </span>
        </div>
        <StartProject project_id={card?.project_id} />
        <MoreIcon />
      </div>

      <AccordionItem value={`item-${card.id}`} ref={accordionRef}>
        <AccordionContent>
          <div className={styles.subcard}>
            <div className={styles.subcard__left}>
              <div className={styles.comment}>
                <p>{t("orders_manager.subcard.comment")}</p>
                <span>{card?.comment}</span>
              </div>
              <div className={styles.link}>
                <p>{t("orders_manager.subcard.link")}</p>
                <ul>
                  {card?.links?.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                      <button onClick={() => handleCopyLink(link)}>
                        <CopyIcon />
                      </button>
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
              <SendToBot />
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
