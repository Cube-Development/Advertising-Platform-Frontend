import { BackIcon, ProfileIcon2 } from '@shared/assets';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

export const ProfileTop: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <button>
                <BackIcon/>
            </button>

            <div>
                <p>{t(`add_profile.add_profile`)}</p>
                <ProfileIcon2/>
            </div>
            
        </div>
    );
};