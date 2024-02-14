import { EyeIcon, ManIcon, SubsIcon, WomanIcon } from '@shared/assets';
import { projectTypes } from '@shared/config/filter';
import { chating, orderStatus } from '@shared/config/status';
import { IChannelChat, ISubitemCard } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ProjectAdvSubcardProps {
    subcard: ISubitemCard;
    FeedbackBtn: FC,
    AcceptBtn: FC,
    RejectBtn: FC,
    CheckBtn: FC,
    SeeBtn: FC,
    ChangeChannelBtn: FC,
    ChannelChatBtn: FC<IChannelChat>,
    status: number
    typeFilter: string
}


export const ProjectAdvSubcard: FC<ProjectAdvSubcardProps> = ({
    subcard, 
    FeedbackBtn, 
    AcceptBtn,
    RejectBtn,
    CheckBtn,
    SeeBtn,
    ChannelChatBtn,
    ChangeChannelBtn,
    status,
    typeFilter    
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.subcard__row}>
            <div className={styles.subcard__left}>
                <div className={styles.channel__preview}>
                    <div className={styles.channel__logo}>
                        <img src={`images/partners/${subcard.img}`} alt="" />
                    </div>
                    <div className={styles.channel__rate}>

                    </div>
                    <p>
                        {subcard.name}
                    </p>
                    <span>
                        {subcard.category}
                    </span>
                </div>
                <div className={styles.channel__column}>
                    <div>
                        <p>
                            {t(`profile_advertiser.subcard.date`)}
                        </p>
                        <span>
                            {subcard.date_from} - {subcard.date_to}
                        </span>
                    </div>
                    <hr />
                    <div>
                        <p>
                            {t(`profile_advertiser.subcard.accommodation`)}
                        </p>
                        <span>
                            {subcard.accommodation}
                        </span>
                    </div>
                </div>
                <div className={styles.channel__column}>
                    <div>
                        <p>
                            {t(`profile_advertiser.subcard.time`)}
                        </p>
                        <span>
                            {subcard.time_from} - {subcard.time_to}
                        </span>
                    </div>
                    <hr />
                    <div>
                        <p>
                            {t(`profile_advertiser.subcard.price`)}
                        </p>
                        <span>
                            {subcard.price.toLocaleString()} {t(`symbol`)}
                        </span>
                    </div>
                </div>
                <div className={styles.channel__info}>
                    <div className={styles.channel__info_row}>
                        <div className={styles.info}>
                            <div>
                                <SubsIcon />
                            </div>
                            <span>
                                {subcard.subs.toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.info}>
                            <div>
                                <EyeIcon />
                            </div>
                            <span>
                                {subcard.views.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className={styles.channel__info_middle}>
                        <div>
                            <ManIcon />
                        </div> 
                        <div className={styles.colorline} style={{}}>
                            22
                        </div>
                        <div>
                            <WomanIcon />
                        </div>                                 

                    </div>
                    <div className={styles.channel__info_row}>
                        <div className={styles.info}>
                            <p>
                                ER:
                            </p>
                            <span>
                                {subcard.ER}%
                            </span>
                        </div>
                        <div className={styles.info}>
                            <p>
                                CPV:
                            </p>
                            <span>
                                {subcard.CPV.toLocaleString()} {t(`symbol`)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>    
            <div className={styles.subcard__status}>
                {subcard.status === orderStatus.rejected
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.rejected.title`)}</p>
                    {
                    typeFilter === projectTypes.managerProject 
                    ? <span>{t(`profile_advertiser.order_status.rejected.text2`)}</span>
                    : status === orderStatus.completed || <span>{t(`profile_advertiser.order_status.rejected.text`)}</span>
                    }
                    
                </div>
                : subcard.status === orderStatus.completed
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.completed.title`)}</p>
                    <FeedbackBtn/>
                </div>
                : subcard.status === orderStatus.posted
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.posted.title`)}</p>
                    {typeFilter === projectTypes.managerProject ||
                    <>
                        <span>{t(`profile_advertiser.order_status.posted.text`)}</span>
                        <div>
                            <AcceptBtn />
                            <RejectBtn />
                        </div>
                            
                    </>
                    }
                    <CheckBtn />
                </div>
                :  subcard.status === orderStatus.accepted
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.accepted.title`)}</p>
                    {typeFilter === projectTypes.managerProject || <span>{t(`profile_advertiser.order_status.accepted.text`)}</span>}
                    {<SeeBtn/>}
                </div>
                : subcard.status === orderStatus.moderation
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.moderation.title`)}</p>
                    <span>
                        {t(`profile_advertiser.order_status.moderation.text`)}
                        <small>
                        {t(`profile_advertiser.order_status.moderation.small`)}
                        </small>
                    </span>
                </div>
                : subcard.status === orderStatus.waiting
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.waiting.title`)}</p>
                    {<SeeBtn/>}
                </div>
                : subcard.status === orderStatus.agreed
                ?
                <div>
                    <p>{t(`profile_advertiser.order_status.agreed.title`)}</p>
                    {<ChangeChannelBtn/>}
                    {<CheckBtn/>}
                </div>
                :
                <></>
                }
            </div>   
            {typeFilter !== projectTypes.managerProject && 
                <div  className={styles.subcard__right}>
                {
                chating.includes(subcard.status) && 
                    <div>
                        <ChannelChatBtn id={1} />
                    </div>
                }
                </div>
            }
            
        </div>
    );
};