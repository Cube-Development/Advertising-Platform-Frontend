import { paths } from '@shared/routing';
import { MyButton } from '@shared/ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const BuyTarif: FC = () => {
    const { t } = useTranslation();

    return (
        <Link to={paths.login} >
            <MyButton className={styles.button}>
                {t(`buy`)}
            </MyButton>
        </Link>
    );
};