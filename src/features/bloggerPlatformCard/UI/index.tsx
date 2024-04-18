import {
  ArrowSmallVerticalIcon,
  ArrowLongHorizontalIcon,
  CancelIcon,
  CompliteIcon,
  MoreIcon,
  ProtectIcon2,
  RatingIcon,
  RocketIcon,
  StarIcon4,
  WaitIcon,
} from "@shared/assets";
import { FeatherIcon } from "@shared/assets/icons/feather";
import { platformStatusFilter } from "@shared/config/platformFilter";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  IActiveChannel,
  IBlockedChannel,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
} from "@shared/types/channelStatus";
import { useAppSelector } from "@shared/store";
import { MyButton } from "@shared/ui";
import {
  useActivateChannelMutation,
  useDeactivateChannelMutation,
} from "@shared/store/services/channelService";

interface BloggerPlatformCardProps {
  card:
    | IActiveChannel
    | IInactiveChannel
    | IModerationRejectChannel
    | IBlockedChannel
    | IModerationChannel;
  SeeOffersBtn: FC;
  SeeReasonBtn: FC;
  RepeatOfferBtn: FC;
  ActivateBtn: FC;
  SupportBtn: FC;
}

export const BloggerPlatformCard: FC<BloggerPlatformCardProps> = ({
  card,
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
  const [deactivateChannel] = useDeactivateChannelMutation();

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
              <p>{card.name}</p>
              <span>{card.category}</span>
            </div>
            <div className={styles.card__description__top__icons}>
              {statusFilter === platformStatusFilter.banned ? (
                <p>{(card as IBlockedChannel).blocked_date}</p>
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
              new Date((card as IModerationRejectChannel).reapplication_date) <
                new Date() ? (
              <div className={styles.card__info__top}>
                <span>
                  {t(`platforms_blogger.repeat_date`)} -{" "}
                  {(card as IModerationRejectChannel).reapplication_date}
                </span>
              </div>
            ) : statusFilter === platformStatusFilter.moderationReject ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.repeat`)}</span>
              </div>
            ) : statusFilter === platformStatusFilter.inactive ? (
              <div
                className={styles.card__info__top}
                onClick={() => {
                  activateChannel(card.id);
                }}
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
                  ).channel_orders.in_progress.toLocaleString()}
                </p>
              </div>
              <div>
                <WaitIcon />
                <p>
                  {(
                    card as IActiveChannel
                  ).channel_orders.wait.toLocaleString()}
                </p>
              </div>
              <div>
                <CompliteIcon />
                <p>
                  {(
                    card as IActiveChannel
                  ).channel_orders.completed.toLocaleString()}
                </p>
              </div>
              <div>
                <CancelIcon />
                <p>
                  {(
                    card as IActiveChannel
                  ).channel_orders.canceled_rejected.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.card__more}>
          <div>
            <button>
              <MoreIcon />
            </button>
          </div>
        </div>
      </div>
      {isSubcardOpen && (
        <div className={styles.platform__events}>
          <button>
            <p>{t(`platform_btn.description`)}</p>
          </button>
          <button>
            <p>{t(`platform_btn.calendar`)}</p>
          </button>
          <button>
            <p>{t(`platform_btn.reviews`)}</p>
          </button>
        </div>
      )}

      <MyButton
        buttons_type={isSubcardOpen ? "button__white" : "button__blue"}
        className={styles.card__btn}
        onClick={() => handleChangeOpenSubcard()}
      >
        {isSubcardOpen
          ? t(`orders_advertiser.card.see_less`)
          : t(`orders_advertiser.card.see_more`)}
        <ArrowSmallVerticalIcon
          className={
            isSubcardOpen
              ? "active__icon rotate"
              : "default__icon__white rotate_down"
          }
        />
      </MyButton>
    </div>
  );
};
