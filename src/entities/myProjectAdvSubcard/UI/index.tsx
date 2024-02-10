import { EyeIcon, ManIcon, SubsIcon, WomanIcon } from '@shared/assets';
import { ISubitemCard } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface MyProjectAdvSubcardProps {
    subcard: ISubitemCard;
}

export const MyProjectAdvSubcard: FC<MyProjectAdvSubcardProps> = ({subcard}) => {
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
            <div className={styles.subcard__right}>
                kkkk
            </div>   
        </div>
    );
};