import { AccommList } from '@features/accommList';
import { StartAdv } from '@features/startAdv';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface WhyChooseUsProps {
    page: string;
}

export const WhyChooseUs: FC<WhyChooseUsProps> = ({page}) => {
    const { t } = useTranslation();
    return (
        <section className={styles.why__wrapper}>
        <div className="container">
          <h1 className={styles.why__title}>
            {t(`${page}.why_title`)}
            </h1>
          <AccommList accomms={t(`${page}.accomms_list`, { returnObjects: true })} startAdvBtn={<StartAdv/>}/>
        </div>
      </section>
    );
};