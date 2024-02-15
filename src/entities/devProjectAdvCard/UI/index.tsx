import { TemplateIcon2 } from '@shared/assets';
import { projectTypes } from '@shared/config/filter';
import { useAppSelector } from '@shared/store';
import { IDevItemCard } from '@shared/types/common';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface DevProjectAdvCardProps {
    card: IDevItemCard;
    ContinueBtn: FC
}

export const DevProjectAdvCard: FC<DevProjectAdvCardProps> = ({card, ContinueBtn}) => {
    const { t } = useTranslation();
    const { typeFilter } = useAppSelector((state) => state.filterReducer);
    
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <p>
                   {card.name}
                </p>
                <span>
                    <small>
                        №{card.id}
                    </small>
                    <small>
                        {card.date}
                    </small>
                </ span>
            </div>

            <div className={styles.info}>
                <p>
                    {t('profile_advertiser.card.tarif')}:
                </p>
                <span>
                    {card.tarif}
                </span>
            </div>

            <div className={styles.info}>
                <p>
                    {t('profile_advertiser.card.cost')}:
                </p>
                <span>
                    {card.cost.toLocaleString()}  {t('symbol')}
                </span>
            </div>

            {typeFilter === projectTypes.savedProject
            ?
            <>
                <div className={styles.status}>
                    <TemplateIcon2 />
                    {t('profile_advertiser.order_status.template.title')}
                </div>
                <ContinueBtn />
            </>
            :
            <div className={styles.status}>
                {card.status}
            </div>
            }

        </div>
    );
};