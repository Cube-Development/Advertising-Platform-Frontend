import { Registration } from '@features/registration';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface HowItWorksProps {
    page: string;
}

export const HowItWorks: FC<HowItWorksProps> = ({page}) => {
    const { t } = useTranslation();

    return (
        <section className={styles.how__wrapper}>
            <div className="container">
                <h1 className={styles.how__title}>
                    {t(`${page}.how_title`)}
                </h1>
            <Registration />
            </div>
      </section>
    );
};