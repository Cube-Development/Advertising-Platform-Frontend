import { ChatIcon, HappySmileIcon, MoreIcon } from '@shared/assets';
import { offerStatus } from '@shared/config/offerFilter';
import { IBloggerOfferCard } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface BloggerOfferCardProps {
    card: IBloggerOfferCard;
    SeeLinkBtn: FC,
    SendLinkBtn: FC,
    AcceptOfferBtn: FC,
    RejectOfferBtn: FC,
    SeeReasonBtn: FC,
}

export const BloggerOfferCard: FC<BloggerOfferCardProps> = ({
    card,
    SeeLinkBtn,
    SendLinkBtn,
    AcceptOfferBtn,
    RejectOfferBtn,
    SeeReasonBtn,
}) => {

    const { t } = useTranslation();
    return (
        <div className={styles.card}>
            <div className={styles.channel__preview}>
                <div>
                    <img src={card.img} alt="" />
                    <div>
                        <p>{card.name}</p>
                        <span>{card.category}</span>
                    </div>
                    <div>
                        <span>№{card.id}</span>
                        <span>{card.date}</span>
                    </div>
                </div>
                <hr />
                <div className={styles.status}>
                    <p>
                        {card.status === offerStatus.active
                        ?
                        t(`offers_blogger.card.status.active`)
                        : card.status === offerStatus.check
                        ?
                        t(`offers_blogger.card.status.check`)
                        : card.status === offerStatus.wait
                        ?
                        t(`offers_blogger.card.status.wait`)
                        : card.status === offerStatus.complite
                        ?
                        t(`offers_blogger.card.status.complite`)
                        : card.status === offerStatus.cancel
                        ?
                        t(`offers_blogger.card.status.cancel`)
                        : card.status === offerStatus.moderation
                        ?
                        t(`offers_blogger.card.status.moderation`)
                        : card.status === offerStatus.uncomplite
                        ?
                        t(`offers_blogger.card.status.reject`)
                        :
                        <></>
                        }
                    </p>
                </div>
            </div>

            <div className={styles.channel__column}>
                    <div>
                        <p>
                            {t(`offers_blogger.card.date`)}
                        </p>
                        <span>
                            {card.date_from} - {card.date_to}
                        </span>
                    </div>
                    <hr />
                    <div>
                        <p>
                            {t(`offers_blogger.card.accommodation`)}
                        </p>
                        <span>
                            {card.accommodation}
                        </span>
                    </div>
            </div>
            <div className={styles.channel__column}>
                <div>
                    <p>
                        {t(`offers_blogger.card.time`)}
                    </p>
                    <span>
                        {card.time_from} - {card.time_to}
                    </span>
                </div>
                <hr />
                <div>
                    <p>
                        {t(`offers_blogger.card.price`)}
                    </p>
                    <span>
                        {card.price.toLocaleString()} {t(`symbol`)}
                    </span>
                </div>
            </div>
            <div className={styles.card__info}>
                {
                    card.status === offerStatus.active
                    ?
                    <div>
                        <div>
                            <p>
                                {t(`offers_blogger.offer_status.active.title`)}
                            </p>
                            {/* <span>
                                {t(`offers_blogger.offer_status.check.text`)}
                            </span> */}
                        </div>
                        <div>
                            <SeeLinkBtn />
                            <SendLinkBtn />
                        </div>
                    </div>

                    : card.status === offerStatus.check
                    ?
                    <div>
                        <p>
                            {t(`offers_blogger.offer_status.check.title`)}
                        </p>
                        <span>
                            {t(`offers_blogger.offer_status.check.text`)}
                        </span>
                    </div>
                    : card.status === offerStatus.wait
                    ?
                    <div>
                        <div>
                            <p>
                                {t(`offers_blogger.offer_status.wait.title`)}
                            </p>
                            <span>
                                {t(`offers_blogger.offer_status.wait.text`)}
                            </span>
                        </div>
                        <div>
                            <RejectOfferBtn />
                            <AcceptOfferBtn />
                            <SeeLinkBtn />
                        </div>
                    </div>
                    : card.status === offerStatus.complite
                    ?
                    <HappySmileIcon />
                    : card.status === offerStatus.cancel
                    ?
                    <div>
                        <p>
                            {t(`offers_blogger.offer_status.cancel.title`)}
                        </p>
                        <span>
                            {t(`offers_blogger.offer_status.cancel.text`)}
                        </span>
                    </div>
                    : card.status === offerStatus.moderation
                    ?
                    <div>
                        <span>
                            {t(`offers_blogger.offer_status.moderation.text`)}
                        </span>
                    </div>
                    : card.status === offerStatus.uncomplite
                    ?
                    <div>
                        <div>
                            <p>
                                {t(`offers_blogger.offer_status.reject.title`)}
                            </p>
                            <span>
                                {t(`offers_blogger.offer_status.reject.text`)}
                            </span>
                        </div>
                        <div>
                            <SeeReasonBtn />
                        </div>
                    </div>
                    :
                    <></>
                }

            </div>
            {
                (card.status !== offerStatus.complite && card.status !== offerStatus.cancel && card.status !== offerStatus.moderation) &&

                <div className={styles.card__more}>
                    <div>
                        <button>
                            <MoreIcon />
                        </button>
                    </div>
                    <div className={styles.chat__btn}>
                        <button>
                            <ChatIcon />
                        </button>
                    </div>
                </div>

            }
           
        </div>
    );
};