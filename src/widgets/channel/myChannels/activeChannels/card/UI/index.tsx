import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  FeatherIcon,
  ProtectIcon2,
  RatingIcon,
  RocketIcon,
  StarIcon4,
  WaitIcon,
} from "@shared/assets";
import { useAppSelector } from "@shared/store";
import { useActivateChannelMutation } from "@shared/store/services/channelService";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  ActivateChannel,
  ChannelCardMenu,
  ChannelDescription,
  DeleteChannel,
  RepeatModeration,
  SeeOffers,
  Support,
} from "@features/channel";
import { SeeReason } from "@features/other";
import {
  IActiveChannel,
  IBlockedChannel,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
  channelStatusFilter,
} from "@entities/channel";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ToastAction,
  useToast,
} from "@shared/ui";
import { accordionTypes } from "@shared/config";

interface ChannelCardProps {
  card:
    | IActiveChannel
    | IInactiveChannel
    | IModerationRejectChannel
    | IBlockedChannel
    | IModerationChannel;
}

export const ChannelCard: FC<ChannelCardProps> = ({ card }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubcardOpen, setSubcardOpen] = useState(false);

  // const handleChangeOpenSubcard = (): void => {
  //   setSubcardOpen(!isSubcardOpen);
  // };

  const { statusFilter } = useAppSelector((state) => state.filter);

  function getRandomValues() {
    // Предположим, что здесь получаются произвольные значения
    return {
      author: Math.random() < 0.5, // Пример: вероятность 50%
      verified: Math.random() < 0.5, // Пример: вероятность 50%
      partner: Math.random() < 0.5, // Пример: вероятность 50%
    };
  }
  const { author, verified, partner } = getRandomValues();

  const [activateChannel] = useActivateChannelMutation();
  const handleActiveChannel = () => {
    activateChannel(card.id)
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.channel.activate.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.channel.activate.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("Ошибка при активации канала: ", error);
      });
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
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.card__logo}>
          <div className={styles.logo}>
            <img src={card.avatar} alt="" />
            {statusFilter === channelStatusFilter.active ||
            statusFilter === channelStatusFilter.inactive ? (
              <RatingIcon />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.card__description}>
          <div className={styles.card__description__top}>
            <div className={styles.card__description__top__text}>
              <p>{card?.name}</p>
              <span>{card?.category}</span>
            </div>
            <div className={styles.card__description__top__icons}>
              {statusFilter === channelStatusFilter.banned ? (
                <p>{(card as IBlockedChannel)?.blocked_date}</p>
              ) : (
                <div>
                  {author && <FeatherIcon />}
                  {verified && <ProtectIcon2 />}
                  {partner && <StarIcon4 />}
                </div>
              )}
            </div>
          </div>
          <div className={styles.status}>
            <p>
              {statusFilter === channelStatusFilter.active ? (
                t(`platforms_blogger.card.status.active`)
              ) : statusFilter === channelStatusFilter.moderationReject ? (
                t(`platforms_blogger.card.status.reject`)
              ) : statusFilter === channelStatusFilter.inactive ? (
                t(`platforms_blogger.card.status.deactivate`)
              ) : statusFilter === channelStatusFilter.banned ? (
                t(`platforms_blogger.card.status.ban`)
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>

        <div className={styles.card__info}>
          <>
            {statusFilter === channelStatusFilter.active ? (
              <div className={styles.card__info__offers}>
                <span></span>
                <SeeOffers />
              </div>
            ) : statusFilter === channelStatusFilter.moderationReject &&
              new Date((card as IModerationRejectChannel)?.reapplication_date) <
                new Date() ? (
              <div className={styles.card__info__top}>
                <span>
                  {t(`platforms_blogger.repeat_date`)} -{" "}
                  {(card as IModerationRejectChannel)?.reapplication_date}
                </span>
              </div>
            ) : statusFilter === channelStatusFilter.moderationReject ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.repeat`)}</span>
              </div>
            ) : statusFilter === channelStatusFilter.inactive ? (
              <div
                className={styles.card__info__top}
                onClick={handleActiveChannel}
              >
                <ActivateChannel />
              </div>
            ) : statusFilter === channelStatusFilter.banned ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.ban`)}</span>
              </div>
            ) : (
              <></>
            )}
          </>

          {statusFilter === channelStatusFilter.moderationReject ? (
            <div className={styles.card__info__bottom2}>
              <SeeReason />
              <RepeatModeration />
            </div>
          ) : statusFilter === channelStatusFilter.banned ? (
            <div className={styles.card__info__bottom2}>
              <SeeReason />
              <Support />
            </div>
          ) : (
            <div className={styles.card__info__bottom}>
              <div>
                <RocketIcon />
                <p>
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.in_progress?.toLocaleString()}
                </p>
              </div>
              <div>
                <WaitIcon />
                <p>
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.wait?.toLocaleString()}
                </p>
              </div>
              <div>
                <CompliteIcon />
                <p>
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.completed?.toLocaleString()}
                </p>
              </div>
              <div>
                <CancelIcon />
                <p>
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.canceled_rejected?.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.card__more}>
          <div>
            <ChannelCardMenu
              channel_id={card?.id}
              DeleteChannel={DeleteChannel}
            />
          </div>
        </div>
      </div>

      <AccordionItem value={`item-${card.id}`} ref={accordionRef}>
        <AccordionContent>
          <div className={styles.platform__events}>
            <ChannelDescription channel_id={card?.id} />
            <button>
              <p>{t(`platform_btn.calendar`)}</p>
            </button>
            <button>
              <p>{t(`platform_btn.reviews`)}</p>
            </button>
          </div>
        </AccordionContent>

        <AccordionTrigger>
          <div className={styles.card__btn}>
            {isSubcardOpen
              ? t(`platforms_blogger.card.see_less`)
              : t(`platforms_blogger.card.see_more`)}
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
