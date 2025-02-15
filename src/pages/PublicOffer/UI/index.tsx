import { languages } from "@shared/config";
import { public_offer } from "@shared/content";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const PublicOfferPage: FC = () => {
  useClearCookiesOnPage();
  const { i18n } = useTranslation();
  const lang =
    i18n.language === languages.ru
      ? languages.ru
      : i18n.language === languages.en
        ? languages.en
        : languages.uz;
  return (
    <section className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{public_offer[`${lang}`].title}</h1>
        <div className={styles.content__wrapper}>
          <h2 className={styles.subtitle}>
            {public_offer[`${lang}`].subtitle}
          </h2>
          <div className={styles.description}>
            {public_offer[`${lang}`].description.map((des, index) => (
              <p key={index}>{des.content}</p>
            ))}
          </div>
          <div className={styles.definations}>
            <h2>{public_offer[`${lang}`].definations.title}</h2>
            <div>
              {public_offer[`${lang}`].definations.options.map((def, index) => (
                <p key={index}>{def.content}</p>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            {public_offer[`${lang}`].content.map((opt, index) => (
              <div className={styles.option} key={index}>
                <h4>{opt.title}</h4>
                <div className={styles.option__sub}>
                  {opt.content.map((sub, index) => (
                    <p key={index}>{sub.content}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
