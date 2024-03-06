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
import { IBloggerPlatformCard } from "@shared/types/common";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";


interface BloggerPlatformCardProps {
  card: IBloggerPlatformCard;
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

  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.channel__logo}>
          <img src={card.img} alt="" />
          {card.status === platformStatus.active ||
          card.status === platformStatus.deactivate ? (
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
              {card.status === platformStatus.reject ||
              card.status === platformStatus.ban ? (
                <p>{card.date_event}</p>
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
              {card.status === platformStatus.active ? (
                t(`platforms_blogger.card.status.active`)
              ) : card.status === platformStatus.reject ? (
                t(`platforms_blogger.card.status.reject`)
              ) : card.status === platformStatus.deactivate ? (
                t(`platforms_blogger.card.status.deactivate`)
              ) : card.status === platformStatus.ban ? (
                t(`platforms_blogger.card.status.ban`)
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>

        <div className={styles.card__right}>
          <div className={styles.card__offers}>
            {card.status === platformStatus.active ? (
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
            ) : card.status === platformStatus.reject && card.date ? (
              <small>
                {t(`platforms_blogger.repeat_date`)} - {card.date}
              </small>
            ) : card.status === platformStatus.reject && !card.date ? (
              <small>{t(`platforms_blogger.repeat`)}</small>
            ) : card.status === platformStatus.deactivate ? (
              <ActivateBtn />
            ) : card.status === platformStatus.ban ? (
              <small>{t(`platforms_blogger.ban`)}</small>
            ) : (
              <></>
            )}
          </div>
          <hr />

          {card.status === platformStatus.reject ? (
            <div className={styles.card__info2}>
              <SeeReasonBtn />
              <RepeatOfferBtn />
            </div>
          ) : card.status === platformStatus.ban ? (
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
      </button>
    </div>
  );
};
