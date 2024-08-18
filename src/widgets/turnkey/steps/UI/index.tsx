import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IStep } from "@shared/types/translate";
import {
  CalendarCheckmarkIcon,
  CalendarClockIcon,
  DocumentCheckmarkIcon,
  GraphCheckmarkIcon,
  HandshakeIcon,
  LoveNoteIcon,
  PresentationBoardIcon,
  Spline,
  Spline2,
} from "@shared/assets";
import { MyButton } from "@shared/ui";
import { BREAKPOINT } from "@shared/config";

interface DecorativeElementProps {
  elements: number;
}

const DecorativeElement: FC<DecorativeElementProps> = ({ elements }) => {
  return (
    <div className={styles.decorative__element}>
      <div className={styles.point__wrapper}>
        {Array.from({ length: elements }).map((_, index) => (
          <div key={index} className={styles.point} />
        ))}
      </div>
    </div>
  );
};

export const Steps: FC = () => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);
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

  const stepTwoIcons = [
    <CalendarCheckmarkIcon />,
    <DocumentCheckmarkIcon />,
    <CalendarClockIcon />,
    <PresentationBoardIcon />,
    <HandshakeIcon />,
    <GraphCheckmarkIcon />,
  ];

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="layout">
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t("turnkey.how_it_works.title")}</h1>
          <div className={styles.content}>
            <div className={`${styles.content__step} ${styles.left}`}>
              <div className={styles.item__content}>
                <div className={styles.content__step__text}>
                  <div className={styles.step__subtitle}>
                    <p>{t("turnkey.how_it_works.step_1.title")}</p>
                  </div>
                  <ul typeof="d">
                    {stepOne.map((text, index) => (
                      <li key={index}>{text.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <big className={styles.item__step}>
                <p>1</p>
              </big>
            </div>
            {screen > BREAKPOINT.SM ? (
              <div className={styles.content__spline}>
                <Spline />
              </div>
            ) : (
              <DecorativeElement elements={10} />
            )}
            <div className={`${styles.content__step} ${styles.right}`}>
              <big className={styles.item__step}>
                <p>2</p>
              </big>
              <div className={styles.item__content}>
                <div className={styles.content__step__services}>
                  <div className={styles.content__step__absolute}>
                    <p>{t("turnkey.how_it_works.step_2.title")}</p>
                  </div>
                  <ul>
                    {stepTwo.map((text, index) => (
                      <li key={index} className={styles.content__step__li}>
                        {stepTwoIcons[index]}
                        <span>{text.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {screen > BREAKPOINT.SM ? (
              <div className={styles.content__spline}>
                <Spline2 />
              </div>
            ) : (
              <DecorativeElement elements={10} />
            )}
            <div className={`${styles.content__step} ${styles.left}`}>
              <div className={styles.item__content}>
                <div className={styles.content__step__purchase}>
                  <div className={styles.step__subtitle}>
                    <p>{t("turnkey.how_it_works.step_3.title")}</p>
                  </div>
                  <ul>
                    {stepThree.map((text, index) => (
                      <li key={index} className={styles.content__step__li}>
                        <LoveNoteIcon />
                        <span>{text.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <big className={styles.item__step}>
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
