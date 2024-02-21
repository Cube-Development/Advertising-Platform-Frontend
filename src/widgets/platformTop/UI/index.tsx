import { ArrowIcon3, BackIcon } from '@shared/assets';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

export const PlatformTop: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <button>
                <BackIcon/>
            </button>

            <div>
                <p>{t(`add_platform.add_platform`)}</p>
                <ArrowIcon3/>
            </div>
            
        </div>
    );
};