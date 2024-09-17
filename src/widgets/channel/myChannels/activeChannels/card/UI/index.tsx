import {
  CancelIcon,
  CompliteIcon,
  FeatherIcon,
  ProtectIcon2,
  RatingIcon,
  RocketIcon,
  StarIcon4,
} from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
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
  IActiveChannel,
  IBlockedChannel,
  IInactiveChannel,
  IModerationChannel,
  IModerationRejectChannel,
  channelStatusFilter,
  useActivateChannelMutation,
} from "@entities/channel";
import { ToastAction, useToast } from "@shared/ui";
import { offerStatusFilter } from "@entities/offer";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { Cog } from "lucide-react";

interface ChannelCardProps {
  card:
    | IActiveChannel
    | IInactiveChannel
    | IModerationRejectChannel
    | IBlockedChannel
    | IModerationChannel;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
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

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div className={styles.card}>
        <div className={styles.card__base}>
          <div className={styles.card__logo}>
            <div className={styles.logo}>
              <div className={styles.logo__img_wrapper}>
                <img src={card.avatar} alt="" />
              </div>
              {statusFilter === channelStatusFilter.active ||
              statusFilter === channelStatusFilter.inactive ? (
                <RatingIcon />
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
          <div className={styles.status_lg}>
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
                <div className={styles.wait_block}>
                  {t(`platforms_blogger.card.new`)}:{" "}
                  {(card as IActiveChannel)?.channel_orders?.wait}
                </div>
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
              <SeeReason reason={(card as IModerationRejectChannel)?.reason} />
              <RepeatModeration />
            </div>
          ) : statusFilter === channelStatusFilter.banned ? (
            <div className={styles.card__info__bottom2}>
              <SeeReason reason={(card as IBlockedChannel)?.reason} />
              <Support />
            </div>
          ) : (
            <div className={styles.card__info__bottom}>
              {statusFilter === channelStatusFilter.active && (
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
                  <CompliteIcon />
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
      {statusFilter === channelStatusFilter.active ? (
        <div className={styles.platform__events}>
          <Link
            to={`${paths.addChannel}?channel_id=${card?.id}`}
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
            to={`${paths.channel.replace(":id", card?.id)}`}
            className={`${styles.edit} truncate`}
          >
            <p>{t(`platform_btn.reviews`)}</p>
          </Link>
        </div>
      ) : (
        statusFilter === channelStatusFilter.inactive && (
          <div className={`${styles.platform__events} ${styles.inactive}`}>
            <Link
              to={`${paths.addChannel}?channel_id=${card?.id}`}
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
              to={`${paths.channel.replace(":id", card?.id)}`}
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
