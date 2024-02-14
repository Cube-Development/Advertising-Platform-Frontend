import { MyProjectAdvSubcard } from '@entities/myProjectAdvSubcard';
import { CancelIcon, CompliteIcon, MoreIcon, RocketIcon, SearchIcon, WaitIcon } from '@shared/assets';
import { orderStatus } from '@shared/config/status';
import { IChannelChat, IItemCard } from '@shared/types/common';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface MyProjectAdvCardProps {
    card: IItemCard;
    FeedbackBtn: FC,
    AcceptBtn: FC,
    RejectBtn: FC,
    CheckBtn: FC,
    SeeBtn: FC,
    ChannelChatBtn: FC<IChannelChat>,
}

export const MyProjectAdvCard: FC<MyProjectAdvCardProps> = ({
    card, 
    FeedbackBtn, 
    AcceptBtn,
    RejectBtn,
    CheckBtn,
    SeeBtn,
    ChannelChatBtn,
}) => {
    const [isSubcardOpen, setSubcardOpen] = useState(false);
    const { t } = useTranslation();

    const handleChangeOpenSubcard = (): void => {
        setSubcardOpen(!isSubcardOpen);
    };

    return (
        <div className={styles.card}>
        <div className={styles.card__top}>
            <div className={styles.card__left}>
                <p>
                    Кампания для Сubeinc
                </p>
                <span>
                    <small>
                        №{card.id}
                    </small>
                    <small>
                        {card.date}
                    </small>
                </ span>
                <hr />
                <div>
                    <p>
                        {card.status === orderStatus.completed
                        ?
                        t('profile_advertiser.card.status.complited')
                        :
                        t('profile_advertiser.card.status.active')
                        }
                    </p>
                </div>

            </div>
            <div className={styles.card__right}>
                <div className={styles.card__data}>
                    <div>
                        <p>{t('profile_advertiser.card.channels')}:</p>
                        <span>{card.channels.toLocaleString()}</span>
                    </div>
                    <div>
                        <p>{t('profile_advertiser.card.views')}:</p>
                        <span>~ {card.views.toLocaleString()}</span>
                    </div>
                    <div>
                        <p>{t('profile_advertiser.card.cost')}:</p>
                        <span>{card.cost.toLocaleString()} {t('symbol')}</span>
                    </div>
                </div>
                <hr />
                <div className={styles.card__info}>
                    <div>
                        <CompliteIcon />
                        <p>{card.complite.toLocaleString()}</p>
                    </div>
                    <div>
                        <CancelIcon />
                        <p>{card.cancel.toLocaleString()}</p>
                    </div>
                    <div>
                        <WaitIcon />
                        <p>{card.wait.toLocaleString()}</p>
                    </div>
                    <div>
                        <RocketIcon />
                        <p>{card.start.toLocaleString()}</p>
                    </div>
                    <div>
                        <SearchIcon />
                        <p>{card.consideration.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className={styles.card__more}>
                <button>
                    <MoreIcon />
                </button>
            </div>
        </div>

        {isSubcardOpen &&
        
        <div className={styles.subcard}>
            {card.channels_list.map((subcard, index) =>
                <MyProjectAdvSubcard key={index} 
                    subcard={subcard} 
                    FeedbackBtn={FeedbackBtn} 
                    AcceptBtn={AcceptBtn}
                    RejectBtn={RejectBtn}
                    CheckBtn={CheckBtn}
                    SeeBtn={SeeBtn}
                    ChannelChatBtn={ChannelChatBtn}
                    status={card.status}
                />
            )}
        </div>
        } 
        <button className={`${styles.card__btn} ${isSubcardOpen ? styles.less : styles.more }`}
            onClick={() => handleChangeOpenSubcard()}>
            {isSubcardOpen ? t(`profile_advertiser.card.see_less`) :  t(`profile_advertiser.card.see_more`)}
        </button>
    </div>
    );
};