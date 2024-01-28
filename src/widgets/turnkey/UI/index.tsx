import { BuyTarif } from '@features/buyTarif';
import { PriceList } from '@features/priceList';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface TurnkeyProps {
    page: string;
}

export const Turnkey: FC<TurnkeyProps> = ({page}) => {
    const { t } = useTranslation();

    return (
        <section className={styles.turnkey__wrapper}>
          <div className={styles.turnkey__column}>
            <div className={styles.turnkey__row}>
              <img src="images/common/key.svg" alt="" />
              <h1 className={styles.turnkey__title}>
                {t(`${page}.turnkey_title`)}
              </h1>
            </div>

            <h2 className={styles.turnkey__subtitle}>
              {t(`${page}.turnkey_subtitle`)}
            </h2>
            <p className={styles.turnkey__text}>
              {t(`${page}.turnkey_text`)}
            </p>
          </div>
          <PriceList tarifs={t(`${page}.tarifs_list`, { returnObjects: true })}  buyBtn={<BuyTarif/>} />
      </section>
    );
};