import { PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Registration } from "@features/other";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

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

  const screen = useWindowWidth();

  let custom = 0;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={PAGE_ANIMATION.viewport}
      variants={PAGE_ANIMATION.animationVision}
      custom={custom++}
      className={styles.wrapper}
    >
      <div className="container">
        <div className={styles.content}>
          <motion.h1
            custom={custom++}
            variants={PAGE_ANIMATION.animationUp}
            className={styles.title}
          >
            {t(`${page}.how_title`)}
          </motion.h1>
          {screen >= 992 ? (
            <div className={styles.steps}>
              <div className={styles.steps__column}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationUp}
                  className={styles.steps__column__items}
                >
                  <p>1</p>
                  <DecorativeElement />
                  <div className={styles.registration__xl}>
                    <span>{StepsList[0].stage}</span>
                    <motion.div
                      custom={custom + 5}
                      variants={PAGE_ANIMATION.animationVision}
                    >
                      <Registration />
                    </motion.div>
                  </div>
                  <div className={styles.text}></div>
                </motion.div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationDown}
                  className={`${styles.steps__column__items} ${styles.two}`}
                >
                  <p>2</p>
                  <DecorativeElement />
                  <span>{StepsList[1].stage}</span>
                  <div className={styles.text}></div>
                </motion.div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationUp}
                  className={styles.steps__column__items}
                >
                  <p>3</p>
                  <DecorativeElement />
                  <span>{StepsList[2].stage}</span>
                  <div className={styles.text}></div>
                </motion.div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationDown}
                  className={`${styles.steps__column__items} ${styles.four}`}
                >
                  <p>4</p>
                  <DecorativeElement />
                  <span>{StepsList[3].stage}</span>
                  <div className={styles.text}></div>
                </motion.div>
              </div>
              <div className={styles.gap} />
              <div className={styles.steps__column}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationUp}
                  className={styles.steps__column__items}
                >
                  <p>5</p>
                  <DecorativeElement />
                  <span>{StepsList[4].stage}</span>
                </motion.div>
                <div className={styles.text}></div>
              </div>
            </div>
          ) : screen < BREAKPOINT.LG && screen > BREAKPOINT.MD ? (
            <div className={styles.steps__md}>
              <div className={`${styles.steps__md__row} ${styles.one}`}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationLeft}
                  className={styles.steps__md__row__items}
                >
                  <div className={styles.registration}>
                    <span>{StepsList[0].stage}</span>
                    <motion.div
                      custom={custom + 5}
                      variants={PAGE_ANIMATION.animationVision}
                    >
                      <Registration />
                    </motion.div>
                  </div>
                  <DecorativeElementRow isRight={true} elements={18} />
                  <p>1</p>
                </motion.div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.two}`}>
                <div></div>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationRight}
                  className={styles.steps__md__row__items}
                >
                  <p>2</p>
                  <DecorativeElementRow isRight={false} elements={21} />
                  <span>{StepsList[1].stage}</span>
                </motion.div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.three}`}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationLeft}
                  className={styles.steps__md__row__items}
                >
                  <span>{StepsList[2].stage}</span>
                  <DecorativeElementRow isRight={true} elements={21} />
                  <p>3</p>
                </motion.div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.four}`}>
                <div></div>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationRight}
                  className={styles.steps__md__row__items}
                >
                  <p>4</p>
                  <DecorativeElementRow isRight={false} elements={13} />
                  <span>{StepsList[3].stage}</span>
                </motion.div>
              </div>
              <div className={`${styles.steps__md__row} ${styles.five}`}>
                <motion.div
                  custom={custom++}
                  variants={PAGE_ANIMATION.animationLeft}
                  className={styles.steps__md__row__items}
                >
                  <span>{StepsList[4].stage}</span>
                  <DecorativeElementRow isRight={true} elements={8} />
                  <p>5</p>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className={styles.steps__xs}>
              <motion.div
                custom={custom++}
                variants={PAGE_ANIMATION.animationRight}
                className={`${styles.steps__xs__row} ${styles.one}`}
              >
                <div className={`${styles.number} ${styles.left}`}>
                  <p>1</p>
                  <div className={styles.point} />
                </div>
                <div>
                  <div className={styles.registration}>
                    <span>{StepsList[0].stage}</span>
                    <motion.div
                      custom={custom++}
                      variants={PAGE_ANIMATION.animationVision}
                    >
                      <Registration />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                custom={custom++}
                variants={PAGE_ANIMATION.animationLeft}
                className={`${styles.steps__xs__row} ${styles.two}`}
              >
                <div className={styles.text}>
                  <span>{StepsList[1].stage}</span>
                </div>
                <div className={`${styles.number} ${styles.right}`}>
                  <div className={styles.point} />
                  <p>2</p>
                </div>
              </motion.div>
              <motion.div
                custom={custom++}
                variants={PAGE_ANIMATION.animationRight}
                className={`${styles.steps__xs__row} ${styles.three}`}
              >
                <div className={`${styles.number} ${styles.left}`}>
                  <p>3</p>
                  <div className={styles.point} />
                </div>
                <div className={styles.text}>
                  <span>{StepsList[2].stage}</span>
                </div>
              </motion.div>
              <motion.div
                custom={custom++}
                variants={PAGE_ANIMATION.animationLeft}
                className={`${styles.steps__xs__row} ${styles.four}`}
              >
                <div className={styles.text}>
                  <span>{StepsList[3].stage}</span>
                </div>
                <div className={`${styles.number} ${styles.right}`}>
                  <div className={styles.point} />
                  <p>4</p>
                </div>
              </motion.div>
              <motion.div
                custom={custom++}
                variants={PAGE_ANIMATION.animationRight}
                className={`${styles.steps__xs__row} ${styles.five}`}
              >
                <div className={`${styles.number} ${styles.left}`}>
                  <p>5</p>
                  <div className={styles.point} />
                </div>
                <div className={styles.text}>
                  <span>{StepsList[4].stage}</span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      {/* <Registration /> */}
    </motion.section>
  );
};
