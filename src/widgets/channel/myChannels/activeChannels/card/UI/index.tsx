import {
  IActiveChannel,
  IBlockedChannel,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
  ENUM_CHANNEL_STATUS,
  useActivateChannelMutation,
} from "@entities/channel";
import { platformToIcon } from "@entities/project";
import {
  ActivateChannel,
  ChannelCardMenu,
  DeactivateChannel,
  DeleteChannel,
  RepeatModeration,
  SeeOffers,
  Support,
} from "@features/channel";
import { SeeReason } from "@features/other";
import {
  CancelIcon,
  CompleteIcon,
  FeatherIcon,
  ProtectIcon2,
  RatingIcon,
  RocketIcon,
  StarIcon4,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { Cog } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface ChannelCardProps {
  card:
    | IActiveChannel
    | IInactiveChannel
    | IModerationRejectChannel
    | IBlockedChannel
    | IModerationChannel;
  statusFilter: ENUM_CHANNEL_STATUS;
}

export const ChannelCard: FC<ChannelCardProps> = ({ card, statusFilter }) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  function getRandomValues() {
    // Предположим, что здесь получаются произвольные значения
    return {
      author: Math.random() < 0.5, // Пример: вероятность 50%
      verified: Math.random() < 0.5, // Пример: вероятность 50%
      partner: Math.random() < 0.5, // Пример: вероятность 50%
    };
  }
  const { author, verified, partner } = getRandomValues();

  const [activateChannel, { isLoading }] = useActivateChannelMutation();
  const handleActiveChannel = () => {
    !isLoading &&
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
          });
          console.error("Ошибка при активации канала: ", error);
        });
  };

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div className={styles.platform__icon}>
        {card?.platform && card?.platform in platformToIcon
          ? platformToIcon[card.platform!]()
          : "..."}
      </div>
      <div className={styles.card}>
        <div className={styles.card__base}>
          <div className={styles.card__logo}>
            <div className={styles.logo}>
              <div className={styles.logo__img_wrapper}>
                <img src={card.avatar} alt="" />
              </div>
              {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE ||
              statusFilter === ENUM_CHANNEL_STATUS.INACTIVE ? (
                <RatingIcon
                  rate={(card as IActiveChannel | IInactiveChannel)?.rate || 0}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={`${styles.card__description} truncate`}>
            <div className={styles.card__description__top}>
              <div className={styles.card__description__top__text}>
                <p className="truncate">{card?.name}</p>
                <span className="truncate">{card?.category}</span>
              </div>
              <div className={styles.card__description__top__icons}>
                {statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
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
                {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE ? (
                  t(`platforms_blogger.card.status.active`)
                ) : statusFilter === ENUM_CHANNEL_STATUS.REJECTED ? (
                  t(`platforms_blogger.card.status.reject`)
                ) : statusFilter === ENUM_CHANNEL_STATUS.INACTIVE ? (
                  t(`platforms_blogger.card.status.deactivate`)
                ) : statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
                  t(`platforms_blogger.card.status.ban`)
                ) : (
                  <></>
                )}
              </p>
            </div>
          </div>
          <div className={styles.status_lg}>
            <p>
              {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE ? (
                t(`platforms_blogger.card.status.active`)
              ) : statusFilter === ENUM_CHANNEL_STATUS.REJECTED ? (
                t(`platforms_blogger.card.status.reject`)
              ) : statusFilter === ENUM_CHANNEL_STATUS.INACTIVE ? (
                t(`platforms_blogger.card.status.deactivate`)
              ) : statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
                t(`platforms_blogger.card.status.ban`)
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
        <div className={styles.card__info}>
          <>
            {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE ? (
              <div className={styles.card__info__offers}>
                <div className={styles.wait_block}>
                  {t(`platforms_blogger.card.new`)}:{" "}
                  {(card as IActiveChannel)?.channel_orders?.wait}
                </div>
                <SeeOffers />
              </div>
            ) : statusFilter === ENUM_CHANNEL_STATUS.REJECTED &&
              new Date((card as IModerationRejectChannel)?.reapplication_date) <
                new Date() ? (
              <div className={styles.card__info__top}>
                <span>
                  {t(`platforms_blogger.repeat_date`)} -{" "}
                  {(card as IModerationRejectChannel)?.reapplication_date}
                </span>
              </div>
            ) : statusFilter === ENUM_CHANNEL_STATUS.REJECTED ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.repeat`)}</span>
              </div>
            ) : statusFilter === ENUM_CHANNEL_STATUS.INACTIVE ? (
              <div
                className={styles.card__info__top}
                onClick={handleActiveChannel}
              >
                <ActivateChannel />
              </div>
            ) : statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
              <div className={styles.card__info__top}>
                <span>{t(`platforms_blogger.ban`)}</span>
              </div>
            ) : (
              <></>
            )}
          </>

          {statusFilter === ENUM_CHANNEL_STATUS.REJECTED ? (
            <div className={styles.card__info__bottom2}>
              <SeeReason reason={(card as IModerationRejectChannel)?.reason} />
              <RepeatModeration />
            </div>
          ) : statusFilter === ENUM_CHANNEL_STATUS.BANNED ? (
            <div className={styles.card__info__bottom2}>
              <SeeReason reason={(card as IBlockedChannel)?.reason} />
              <Support />
            </div>
          ) : (
            <div className={styles.card__info__bottom}>
              {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE && (
                <div>
                  <figure>
                    <RocketIcon />
                  </figure>
                  <p className="truncate">
                    {(
                      card as IActiveChannel
                    )?.channel_orders?.in_progress?.toLocaleString()}
                  </p>
                </div>
              )}
              <div>
                <figure>
                  <CompleteIcon />
                </figure>
                <p className="truncate">
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.completed?.toLocaleString()}
                </p>
              </div>
              <div>
                <figure>
                  <CancelIcon />
                </figure>
                <p className="truncate">
                  {(
                    card as IActiveChannel
                  )?.channel_orders?.canceled_rejected?.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.card__more}>
          <ChannelCardMenu
            channel_id={card?.id}
            DeleteChannel={DeleteChannel}
            DeactivateChannel={DeactivateChannel}
            statusFilter={statusFilter}
          />
        </div>
      </div>
      {statusFilter === ENUM_CHANNEL_STATUS.ACTIVE ? (
        <div className={styles.platform__events}>
          <Link
            // to={`${paths.addChannel}?channel_id=${card?.id}`}
            to={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
              [queryParamKeys.channelId]: card?.id,
            })}
            className={`${styles.edit} truncate`}
          >
            <div>
              <Cog />
            </div>
            <p>{t("platform_description.edit_btn")}</p>
          </Link>
          <button className="truncate">
            <p>{t(`platform_btn.calendar`)}</p>
          </button>
          <Link
            to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.id)}`}
            className={`${styles.edit} truncate`}
          >
            <p>{t(`platform_btn.reviews`)}</p>
          </Link>
        </div>
      ) : (
        statusFilter === ENUM_CHANNEL_STATUS.INACTIVE && (
          <div className={`${styles.platform__events} ${styles.inactive}`}>
            <Link
              // to={`${paths.addChannel}?channel_id=${card?.id}`}
              to={buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
                [queryParamKeys.channelId]: card?.id,
              })}
              className={`${styles.edit} truncate`}
            >
              <div>
                <Cog />
              </div>
              <p>{t("platform_description.edit_btn")}</p>
            </Link>
            <button className="truncate">
              <p>{t(`platform_btn.calendar`)}</p>
            </button>
            <Link
              to={`${ENUM_PATHS.CHANNEL.replace(":id", card?.id)}`}
              className={`${styles.edit} truncate`}
            >
              <p>{t(`platform_btn.reviews`)}</p>
            </Link>
          </div>
        )
      )}
    </div>
  );
};
