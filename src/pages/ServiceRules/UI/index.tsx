import { FC } from "react";
import { useFindLanguage } from "@entities/user";
import { service_roles } from "@shared/content";
import { useClearCookiesOnPage } from "@shared/hooks";
import styles from "./styles.module.scss";

export const ServiceRulesPage: FC = () => {
  useClearCookiesOnPage();
  const language = useFindLanguage();
  const lang = language.name as keyof typeof service_roles;
  return (
    <section className="container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{service_roles[`${lang}`].title}</h1>
        <div className={styles.content__wrapper}>
          <h2 className={styles.subtitle}>
            {service_roles[`${lang}`].subtitle}
          </h2>
          <p className={styles.date}>{service_roles[`${lang}`].date}</p>
          <div className={styles.description}>
            {service_roles[`${lang}`].description.map((des, index) => (
              <p key={index}>{des.content}</p>
            ))}
          </div>
          <div className={styles.content}>
            {service_roles[`${lang}`].content.map((opt, index) => (
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
