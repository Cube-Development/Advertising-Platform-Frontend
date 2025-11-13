import { Link } from "react-router-dom";
import {
  platformToIcon,
  useGetPostQuery,
  IAdvProjectSubcard,
  GetPostRes,
} from "@entities/project";
import {
  ArrowSmallVerticalIcon,
  BoyIcon,
  EyeIcon,
  GirlIcon,
  RatingIcon,
  SubsIcon,
} from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_PATHS } from "@shared/routing";
import { platformTypesNum } from "@entities/platform";

interface AdvSavedSubcardProps {
  subcard: IAdvProjectSubcard;
  SeePostBtn: FC<{ post: GetPostRes; post_deeplink: string }>;
}

export const AdvSavedSubcard: FC<AdvSavedSubcardProps> = ({
  subcard,
  SeePostBtn,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const screen = useWindowWidth();
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const { data: post, error } = useGetPostQuery({ order_id: subcard.id });

  if (error) {
    toast({
      variant: "error",
      title: t("toasts.orders_advertiser.reject_post.error"),
    });
    console.error("error: ", error);
  }

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

  return (
    <div className={`${styles.wrapper} ${styles.no__chat}`}>
      <div className={`${styles.subcard} ${styles.grid}`}>
        <div className={styles.platform__icon}>
          {subcard?.platform && subcard?.platform in platformToIcon
            ? platformToIcon[subcard?.platform as platformTypesNum]()
            : "..."}
        </div>
        <div className={styles.subcard__left}>
          <div className={styles.subcard__left__description}>
            <Link
              to={`${ENUM_PATHS.CHANNEL.replace(":id", subcard?.channel_id || subcard?.id)}`}
              target="_blank"
              className={styles.subcard__left__description__logo}
            >
              <img src={subcard?.avatar} alt="" />
            </Link>
            <div className={styles.subcard__left__description__rate}>
              <RatingIcon rate={subcard?.rate || 0} />
            </div>
            <div className={styles.subcard__left__description__title}>
              <p className="truncate">{subcard?.name}</p>
              <span className="truncate">{subcard?.category}</span>
            </div>
          </div>
          <div className={styles.subcard__left__info}>
            <div className={styles.info__column}>
              <div
                className={`${styles.info__wrapper}  ${styles.first} ${styles.top}`}
              >
                <div>
                  <p>{t(`orders_advertiser.subcard.date`)}</p>
                  <span className="truncate">
                    {typeof subcard?.publish_date === "object"
                      ? subcard?.publish_date?.date_from +
                        " - " +
                        subcard?.publish_date?.date_to
                      : subcard?.publish_date}
                  </span>
                </div>
              </div>
              <div className={styles.info__wrapper}>
                <div>
                  <p>{t(`orders_advertiser.subcard.price`)}</p>
                  <span>
                    {subcard?.price?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.info__column}>
              <div className={`${styles.info__wrapper} ${styles.top}`}>
                <div>
                  <p>{t(`orders_advertiser.subcard.time`)}</p>
                  <span>
                    {subcard?.publish_time?.time_from} -{" "}
                    {subcard?.publish_time?.time_to}
                  </span>
                </div>
              </div>
              <div className={`${styles.info__wrapper} ${styles.last}`}>
                <div>
                  <p>{t(`orders_advertiser.subcard.accommodation`)}</p>
                  <span className="truncate">{subcard?.format?.small}</span>
                </div>
              </div>
            </div>
          </div>
          {screen > BREAKPOINT.LG && (
            <div className={styles.subcard__left__data}>
              <div className={styles.subcard__left__data__row}>
                <div className={styles.info}>
                  <div>
                    <SubsIcon />
                  </div>
                  <span>{subcard?.subscribers?.toLocaleString()}</span>
                </div>
                <div className={styles.info}>
                  <div>
                    <EyeIcon />
                  </div>
                  <span>{subcard?.views?.toLocaleString()}</span>
                </div>
              </div>
              <div className={styles.subcard__left__data__middle}>
                <div>
                  <BoyIcon />
                </div>
                <div
                  className="colorline"
                  style={
                    { "--male": `${subcard?.male}%` } as React.CSSProperties
                  }
                  data-male={`${subcard?.male}%`}
                  data-female={`${subcard?.female}%`}
                />
                <div>
                  <GirlIcon />
                </div>
              </div>
              <div className={styles.subcard__left__data__row}>
                <div className={styles.info}>
                  <p>ER:</p>
                  <span>{subcard?.er}%</span>
                </div>
                <div className={styles.info}>
                  <p>CPV:</p>
                  <span>
                    {subcard?.cpv?.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {screen > BREAKPOINT.MD && (
          <div className={styles.subcard__cancel}>
            <p>{t(`orders_advertiser.order_status.template.title`)}</p>
            <SeePostBtn post={post!} post_deeplink={subcard?.post_deeplink} />
          </div>
        )}
      </div>
      {screen < BREAKPOINT.LG && screen >= BREAKPOINT.MD ? (
        <Accordion type="single" collapsible>
          <AccordionItem
            value={`item-${subcard?.id}`}
            className={styles.channel__data__md}
          >
            <AccordionTrigger onClick={handleChangeOpenSubcard}>
              <div className={styles.channel__data_row}>
                <div className={styles.data}>
                  <div>
                    <SubsIcon />
                  </div>
                  <span>{subcard?.subscribers?.toLocaleString()}</span>
                </div>
                <div className={styles.data}>
                  <div>
                    <EyeIcon />
                  </div>
                  <span>{subcard?.views!.toLocaleString()}</span>
                </div>
                <div className={styles.arrow}>
                  <ArrowSmallVerticalIcon
                    className={
                      isSubcardOpen
                        ? "icon__grey rotate"
                        : "icon__grey rotate__down"
                    }
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className={styles.channel__content}>
              <div className={styles.channel__data_middle}>
                <div className={styles.middle}>
                  <div>
                    <BoyIcon />
                  </div>
                  <div
                    className="colorline"
                    style={
                      { "--male": `${subcard?.male}%` } as React.CSSProperties
                    }
                    data-male={`${subcard?.male}%`}
                    data-female={`${subcard?.female}%`}
                  />
                  <div>
                    <GirlIcon />
                  </div>
                </div>
              </div>
              <div className={styles.channel__data_row}>
                <div className={styles.data}>
                  <p>ER:</p>
                  <span>{subcard?.er}%</span>
                </div>
                <div className={styles.data}>
                  <p>CPV:</p>
                  <span>
                    {subcard?.cpv!.toLocaleString()} {t(`symbol`)}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : screen < BREAKPOINT.MD ? (
        <div className={styles.channel__xs}>
          <div className={styles.channel__data__xs}>
            <div className={styles.channel__data_row}>
              <div className={styles.data}>
                <div>
                  <SubsIcon />
                </div>
                <span>{subcard?.subscribers?.toLocaleString()}</span>
              </div>
              <div className={styles.data}>
                <div>
                  <EyeIcon />
                </div>
                <span>{subcard?.views!.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {screen <= BREAKPOINT.MD && (
        <div className={styles.subcard__cancel}>
          <p>{t(`orders_advertiser.order_status.template.title`)}</p>
          <SeePostBtn post={post!} post_deeplink={subcard?.post_deeplink} />
        </div>
      )}
    </div>
  );
};
