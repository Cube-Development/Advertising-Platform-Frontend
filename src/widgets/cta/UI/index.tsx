import { OptionCard } from '@entities/optionCard';
import { SeeCatalog } from '@features/seeCatalog';
import { IOption } from '@shared/types/translate';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from "./styles.module.scss";

interface CtaProps {
    page: string;
}

export const Cta: FC<CtaProps> = ({page}) => {
    const { t } = useTranslation();
    const options: IOption[] = t(`${page}.cta_list`, { returnObjects: true }) 

    return (
        <section className={styles.cta__wrapper}>
            <div className="container">
            <div className={styles.cta__row}>
                <div className={styles.cta__right}>
                    <h1 className={styles.cta__title}>
                        {t(`${page}.cta_title`)}
                    </h1>
                    <h3 className={styles.cta__subtitle}>
                        {t(`${page}.cta_subtitle`)}
                    </h3>
                    <div className={styles.options}>
                        {options.map((option, index) => (
                            <OptionCard key={index} option={option} />
                        ))}
                        </div>
                    <SeeCatalog />
                </div>
                <div>
                    <img src="images/assets/MainImage.png" alt="" />
                </div>
            </div>
            </div>
      </section>
    );
};