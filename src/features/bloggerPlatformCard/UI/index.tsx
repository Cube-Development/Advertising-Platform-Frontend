import {
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
import { platformStatus } from "@shared/config/platformFilter";
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

  return (
    <div className={styles.card}>
      {/* <div className={styles.card__top}>
        <div className={styles.channel__logo}>
          <img src={card.avatar} alt="" />
          {statusFilter === platformStatus.active ||
          statusFilter === platformStatus.inactive ? (
            <RatingIcon />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.card__description}>
          <div>
            <div>
              <p>{card.name}</p>
              <span>{card.category}</span>
            </div>
            <div>
              {statusFilter === platformStatus.moderationReject ||
              statusFilter === platformStatus.banned ? (
                <p>{card. .date_event}</p>
              ) : (
                <div>
                  {card.author && <FeatherIcon />}
                  {card.verified && <ProtectIcon2 />}
                  {card.partner && <StarIcon4 />}
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className={styles.status}>
            <p>
              {statusFilter === platformStatus.active ? (
                t(`platforms_blogger.card.status.active`)
              ) : statusFilter === platformStatus.moderationReject ? (
                t(`platforms_blogger.card.status.reject`)
              ) : statusFilter === platformStatus.inactive ? (
                t(`platforms_blogger.card.status.deactivate`)
              ) : statusFilter === platformStatus.banned ? (
                t(`platforms_blogger.card.status.ban`)
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>

        <div className={styles.card__right}>
          <div className={styles.card__offers}>
            {statusFilter === platformStatus.active ? (
              <>
                <p>
                  {t(`platforms_blogger.offers_count`)}
                  {": "}
                  <span
                    className={card.offers !== 0 ? styles.offers_exist : ""}
                  >
                    {card.offers}
                  </span>
                </p>
                <SeeOffersBtn />
              </>
            ) : statusFilter === platformStatus.moderationReject && card.date ? (
              <small>
                {t(`platforms_blogger.repeat_date`)} - {card.date}
              </small>
            ) : statusFilter === platformStatus.moderationReject &&
              !card.date ? (
              <small>{t(`platforms_blogger.repeat`)}</small>
            ) : statusFilter === platformStatus.inactive ? (
              <ActivateBtn />
            ) : statusFilter === platformStatus.banned ? (
              <small>{t(`platforms_blogger.ban`)}</small>
            ) : (
              <></>
            )}
          </div>
          <hr />

          {statusFilter === platformStatus.moderationReject ? (
            <div className={styles.card__info2}>
              <SeeReasonBtn />
              <RepeatOfferBtn />
            </div>
          ) : statusFilter === platformStatus.banned ? (
            <div className={styles.card__info2}>
              <SeeReasonBtn />
              <SupportBtn />
            </div>
          ) : (
            <div className={styles.card__info}>
              <div>
                <RocketIcon />
                <p>{card.start!.toLocaleString()}</p>
              </div>
              <div>
                <WaitIcon />
                <p>{card.wait!.toLocaleString()}</p>
              </div>
              <div>
                <CompliteIcon />
                <p>{card.complite!.toLocaleString()}</p>
              </div>
              <div>
                <CancelIcon />
                <p>{card.cancel!.toLocaleString()}</p>
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
        <div className={styles.platform_events}>
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

      <button
        className={`${styles.card__btn} ${
          isSubcardOpen ? styles.less : styles.more
        }`}
        onClick={() => handleChangeOpenSubcard()}
      >
        {isSubcardOpen
          ? t(`orders_advertiser.card.see_less`)
          : t(`orders_advertiser.card.see_more`)}
      </button> */}
    </div>
  );
};
