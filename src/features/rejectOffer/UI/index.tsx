import { MyButton } from '@shared/ui';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

export const RejectOffer: FC = () => {
    const { t } = useTranslation();
    return (
        <MyButton className={styles.button}>
            {t(`offer_btn.reject`)}
        </MyButton>
    );
};