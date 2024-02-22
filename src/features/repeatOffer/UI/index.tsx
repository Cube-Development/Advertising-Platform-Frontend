import { ArrowIcon2 } from '@shared/assets';
import { MyButton } from '@shared/ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';


export const RepeatOffer: FC = () => {
    const { t } = useTranslation();
    return (
        <MyButton className={styles.button}>
            <div>
                {t(`platform_btn.repeat`)}
                <ArrowIcon2 />
            </div>
        </MyButton>
    );
};