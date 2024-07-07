import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IStep } from "@shared/types/translate";
import { Spline, Spline2 } from "@shared/assets";
import { MyButton } from "@shared/ui";

interface StepsProps {}

export const Steps: FC<StepsProps> = () => {
  const { t } = useTranslation();
  const stepOne: IStep[] = t("turnkey.how_it_works.step_1.text", {
    returnObjects: true,
  });

  const stepTwo: IStep[] = t("turnkey.how_it_works.step_2.text", {
    returnObjects: true,
  });

  const stepThree: IStep[] = t("turnkey.how_it_works.step_3.text", {
    returnObjects: true,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="layout">
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("turnkey.how_it_works.title")}</h1>
          <div className={styles.content}>
            <div className={`${styles.content__step} ${styles.left}`}>
              <div className={styles.content__step__text}>
                <p>{t("turnkey.how_it_works.step_1.title")}</p>
                <ul>
                  {stepOne.map((text, index) => (
                    <li key={index}>{text.text}</li>
                  ))}
                </ul>
              </div>
              <big>
                <p>1</p>
              </big>
            </div>
            <div className={styles.content__spline}>
              <Spline />
            </div>
            <div className={`${styles.content__step} ${styles.right}`}>
              <big>
                <p>2</p>
              </big>
              <div className={styles.content__step__services}>
                <div className={styles.content__step__subtitle}>
                  <p>{t("turnkey.how_it_works.step_2.title")}</p>
                </div>
                <ul>
                  {stepTwo.map((text, index) => (
                    <li key={index}>
                      <p>{text.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.content__spline}>
              <Spline2 />
            </div>
            <div className={`${styles.content__step} ${styles.left}`}>
              <div className={styles.content__step__purchase}>
                <p>{t("turnkey.how_it_works.step_3.title")}</p>
                <ul>
                  {stepThree.map((text, index) => (
                    <li key={index}>{text.text}</li>
                  ))}
                </ul>
              </div>
              <big>
                <p>3</p>
              </big>
            </div>
          </div>
          <div className={styles.bottom} onClick={handleClick}>
            <MyButton buttons_type="button__orange" className={styles.button}>
              {t("turnkey.how_it_works.choose_tarif")}
            </MyButton>
          </div>
        </div>
      </div>
    </section>
  );
};
