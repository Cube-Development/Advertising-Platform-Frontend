import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompliteIcon,
  ProtectIcon2,
  RatingIcon,
  RocketIcon,
  StarIcon4,
  WaitIcon,
} from "@shared/assets";
import { FeatherIcon } from "@shared/assets/icons/feather";
import { accordionTypes } from "@shared/config/accordion";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { useAppSelector } from "@shared/store";
import { useActivateChannelMutation } from "@shared/store/services/channelService";
import {
  IActiveChannel,
  IBlockedChannel,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
} from "@shared/types/channelStatus";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/shadcn-ui/ui/accordion";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BloggerPlatformCardProps {
  card:
    | IActiveChannel
    | IInactiveChannel
    | IModerationRejectChannel
    | IBlockedChannel
    | IModerationChannel;
  SeeOffersBtn: FC;
  ChannelDescriptionBtn: FC<{ channel_id: string }>;
  BloggerPlatformCardMenu: FC<{
    channel_id: string;
    DeleteChannel: FC<{ channel_id: string; onChange: () => void }>;
  }>;
  DeleteChannel: FC<{ channel_id: string; onChange: () => void }>;
  SeeReasonBtn: FC;
  RepeatOfferBtn: FC;
  ActivateBtn: FC;
  SupportBtn: FC;
}

export const BloggerPlatformCard: FC<BloggerPlatformCardProps> = ({
  card,
  ChannelDescriptionBtn,
  DeleteChannel,
  BloggerPlatformCardMenu,
  SeeOffersBtn,
  SeeReasonBtn,
  RepeatOfferBtn,
  ActivateBtn,
  SupportBtn,
}) => {
  const { t } = useTranslation();
  const [isSubcardOpen, setSubcardOpen] = useState(false);

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };

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
        console.log("Успешная активация");
      })
      .catch((error) => console.error("Ошибка при активации канала: ", error));
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
          <img src={card.avatar} alt="" />
          {statusFilter === platformStatusFilter.active ||
          statusFilter === platformStatusFilter.inactive ? (
            <RatingIcon />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.card__description}>
          <div className={styles.card__description__top}>
            <div className={styles.card__description__top__text}>
              <p>{card?.name}</p>
              <span>{card?.category}</span>
            </div>
            <div className={styles.card__description__top__icons}>
              {statusFilter === platformStatusFilter.banned ? (
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
              {statusFilter === platformStatusFilter.active ? (
                t(`platforms_blogger.card.status.active`)
              ) : statusFilter === platformStatusFilter.moderationReject ? (
                t(`platforms_blogger.card.status.reject`)
              ) : statusFilter === platformStatusFilter.inactive ? (
                t(`platforms_blogger.card.status.deactivate`)
              ) : statusFilter === platformStatusFilter.banned ? (
                t(`platforms_blogger.card.status.ban`)
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>

        <div className={styles.card__info}>
          <>
            {statusFilter === platformStatusFilter.active ? (
              <div className={styles.card__info__offers}>
                <span></span>
                <SeeOffersBtn />
              </div>
            ) : statusFilter === platformStatusFilter.moderationReject &&
              new Date((card as IModerationRejectChannel)?.reapplication_date) <
                new Date() ? (
              <div className={styles.card__info__top}>
                <span>
                  {t(`platforms_blogger.repeat_date`)} -{" "}
                  {(card as IModerationRejectChannel)?.reapplication_date}
                </span>
              </div>
            ) : statusFilter === platformStatusFilter.moderationReject ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.repeat`)}</span>
              </div>
            ) : statusFilter === platformStatusFilter.inactive ? (
              <div
                className={styles.card__info__top}
                onClick={handleActiveChannel}
              >
                <ActivateBtn />
              </div>
            ) : statusFilter === platformStatusFilter.banned ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.ban`)}</span>
              </div>
            ) : (
              <></>
            )}
          </>

          {statusFilter === platformStatusFilter.moderationReject ? (
            <div className={styles.card__info__bottom2}>
              <SeeReasonBtn />
              <RepeatOfferBtn />
            </div>
          ) : statusFilter === platformStatusFilter.banned ? (
            <div className={styles.card__info__bottom2}>
              <SeeReasonBtn />
              <SupportBtn />
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
            <BloggerPlatformCardMenu
              channel_id={card?.id}
              DeleteChannel={DeleteChannel}
            />
          </div>
        </div>
      </div>

      <AccordionItem value={`item-${card.id}`} ref={accordionRef}>
        <AccordionContent>
          <div className={styles.platform__events}>
            <ChannelDescriptionBtn channel_id={card?.id} />
            <button>
              <p>{t(`platform_btn.calendar`)}</p>
            </button>
            <button>
              <p>{t(`platform_btn.reviews`)}</p>
            </button>
          </div>
        </AccordionContent>

        <AccordionTrigger onClick={() => handleChangeOpenSubcard()}>
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
