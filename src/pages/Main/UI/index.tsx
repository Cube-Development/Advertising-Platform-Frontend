import { FC } from "react";
import styles from "./styles.module.scss";
import {
  AccommList,
  BasicInfoList,
  OptionList,
  PartnerList,
  PriceList,
} from "@features/mainPage";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const MainPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className={styles.top__wrapper}>
        <div className="container">
          <div className={styles.top__row}>
            <div className={styles.top__right}>
              <h1 className={styles.top__title}>
                {t("main_page_advertiser.title")}
              </h1>
              <h3 className={styles.top__subtitle}>
                {t("main_page_advertiser.subtitle")}
              </h3>

              <OptionList options={t("main_page_advertiser.options", { returnObjects: true })} />
              <MyButton>{t("main_page_advertiser.btn_catalog")}</MyButton>

            </div>

            <div>
              <img src="images/assets/MainImage.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.services__wrapper}>
        <div className="container">
          <h2 className={styles.services__title}>
            {t("main_page_advertiser.services")}
          </h2>
          <BasicInfoList infos={t("main_page_advertiser.basic_information", { returnObjects: true })} />
        </div>
      </section>

      <section className={styles.partners__wrapper}>
        <h1 className={styles.partners__title}>
          {t("main_page_advertiser.confidence")}
        </h1>

        <div className={styles.partners__block}>
          <PartnerList partners={t("main_page_advertiser.partners", { returnObjects: true })} />
          <PartnerList partners={t("main_page_advertiser.partners", { returnObjects: true })} />
        </div>
      </section>

      <section className={styles.how__wrapper}></section>

      <section className={styles.why__wrapper}>
        <div className="container">
          <h1 className={styles.why__title}>{t("main_page_advertiser.why")}</h1>
          <AccommList accomms={t("main_page_advertiser.accomms", { returnObjects: true })} />
        </div>
      </section>

      <section className={styles.cta__wrapper}>
        <div className="container">
          <div className={styles.cta__column}>
            <div className={styles.cta__row}>
              <img src="images/common/key.svg" alt="" />
              <h1 className={styles.cta__title}>
                {t("main_page_advertiser.start_advertising")}
              </h1>
            </div>

            <h2 className={styles.cta__subtitle}>
              {t("main_page_advertiser.choose_tarif")}
            </h2>
            <p className={styles.cta__text}>
              {t("main_page_advertiser.tarif_info")}
            </p>
          </div>

          <PriceList tarifs={t("main_page_advertiser.tarifs", { returnObjects: true })} />
        </div>
      </section>
    </>
  );
};
