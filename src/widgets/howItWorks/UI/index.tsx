import { Registration } from "@features/registration";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface HowItWorksProps {
  page: string;
}

const DecorativeElement: FC = () => {
  return (
    <div className={styles.decorative__element__XL}>
      <div className={styles.point__wrapper}>
        <div className={styles.point}></div>
        <div className={styles.subpoint__wrapper}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className={styles.subpoint} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DecorativeElementRowProps {
  isRight: boolean;
  elements: number;
}

const DecorativeElementRow: FC<DecorativeElementRowProps> = ({
  isRight,
  elements,
}) => {
  return (
    <div className={styles.decorative__element__Md}>
      <div className={styles.point__wrapper}>
        {isRight ? (
          <>
            <div className={styles.subpoint__wrapper}>
              {Array.from({ length: elements }).map((_, index) => (
                <div key={index} className={styles.subpoint} />
              ))}
            </div>
            <div className={styles.point}></div>
          </>
        ) : (
          <>
            <div className={styles.point}></div>
            <div className={styles.subpoint__wrapper}>
              {Array.from({ length: elements }).map((_, index) => (
                <div key={index} className={styles.subpoint} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const HowItWorks: FC<HowItWorksProps> = ({ page }) => {
  const { t } = useTranslation();
  const StepsList: any[] = t(`${page}.how_list`, {
    returnObjects: true,
  });

  const [screen, setScreen] = useState<number>(window.innerWidth);

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
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{t(`${page}.how_title`)}</h1>
          {screen >= 992 ? (
            <div className={styles.steps}>
              <div className={styles.steps__column}>
                <div className={styles.steps__column__items}>
                  <p>1</p>
                  <DecorativeElement />
                  <div className={styles.registration__xl}>
                    <span>{StepsList[0].stage}</span>
                    <Registration />
                  </div>
                  <div className={styles.text}></div>
                </div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <div className={`${styles.steps__column__items} ${styles.two}`}>
                  <p>2</p>
                  <DecorativeElement />
                  <span>{StepsList[1].stage}</span>
                  <div className={styles.text}></div>
                </div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <div className={styles.steps__column__items}>
                  <p>3</p>
                  <DecorativeElement />
                  <span>{StepsList[2].stage}</span>
                  <div className={styles.text}></div>
                </div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <div
                  className={`${styles.steps__column__items} ${styles.four}`}
                >
                  <p>4</p>
                  <DecorativeElement />
                  <span>{StepsList[3].stage}</span>
                  <div className={styles.text}></div>
                </div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <div className={styles.steps__column__items}>
                  <p>5</p>
                  <DecorativeElement />
                  <span>{StepsList[4].stage}</span>
                </div>
                <div className={styles.text}></div>
              </div>
            </div>
          ) : screen < 992 && screen > 768 ? (
            <div className={styles.steps__md}>
              <div className={`${styles.steps__md__row} ${styles.one}`}>
                <div className={styles.steps__md__row__items}>
                  <div className={styles.registration}>
                    <span>{StepsList[0].stage}</span>
                    <div>
                      <Registration />
                    </div>
                  </div>
                  <DecorativeElementRow isRight={true} elements={18} />
                  <p>1</p>
                </div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.two}`}>
                <div></div>
                <div className={styles.steps__md__row__items}>
                  <p>2</p>
                  <DecorativeElementRow isRight={false} elements={21} />
                  <span>{StepsList[1].stage}</span>
                </div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.three}`}>
                <div className={styles.steps__md__row__items}>
                  <span>{StepsList[2].stage}</span>
                  <DecorativeElementRow isRight={true} elements={21} />
                  <p>3</p>
                </div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.four}`}>
                <div></div>
                <div className={styles.steps__md__row__items}>
                  <p>4</p>
                  <DecorativeElementRow isRight={false} elements={13} />
                  <span>{StepsList[3].stage}</span>
                </div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.five}`}>
                <div className={styles.steps__md__row__items}>
                  <span>{StepsList[4].stage}</span>
                  <DecorativeElementRow isRight={true} elements={8} />
                  <p>5</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.steps__xs}>
              <div className={`${styles.steps__xs__row} ${styles.one}`}>
                <div className={`${styles.number} ${styles.left}`}>
                  <p>1</p>
                  <div className={styles.point} />
                </div>
                <div>
                  <div className={styles.registration}>
                    <span>{StepsList[0].stage}</span>
                    <div>
                      <Registration />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.steps__xs__row} ${styles.two}`}>
                <div className={styles.text}>
                  <span>{StepsList[1].stage}</span>
                </div>
                <div className={`${styles.number} ${styles.right}`}>
                  <div className={styles.point} />
                  <p>2</p>
                </div>
              </div>
              <div className={`${styles.steps__xs__row} ${styles.three}`}>
                <div className={`${styles.number} ${styles.left}`}>
                  <p>3</p>
                  <div className={styles.point} />
                </div>
                <div className={styles.text}>
                  <span>{StepsList[2].stage}</span>
                </div>
              </div>
              <div className={`${styles.steps__xs__row} ${styles.four}`}>
                <div className={styles.text}>
                  <span>{StepsList[3].stage}</span>
                </div>
                <div className={`${styles.number} ${styles.right}`}>
                  <div className={styles.point} />
                  <p>4</p>
                </div>
              </div>
              <div className={`${styles.steps__xs__row} ${styles.five}`}>
                <div className={`${styles.number} ${styles.left}`}>
                  <p>5</p>
                  <div className={styles.point} />
                </div>
                <div className={styles.text}>
                  <span>{StepsList[4].stage}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Registration /> */}
    </section>
  );
};
