import { ArrowIcon3, RoundIcon } from "@shared/assets";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface ChannelTopProps {
  step: { step: number; completedStep: number };
  channel_id?: string;
  onChangeStep: (step: number) => void;
}

export const ChannelTop: FC<ChannelTopProps> = ({
  channel_id,
  step,
  onChangeStep,
}) => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore | null>(null);
  const handleChangeStep = (newStep: number) => {
    if (newStep <= step.completedStep + 1) {
      onChangeStep(newStep);
    }
  };

  const handleStyles = (currentFlag: number) => {
    return `${
      step.completedStep >= currentFlag
        ? styles.complited
        : step.step === currentFlag
          ? styles.active
          : step.completedStep + 1 === currentFlag
            ? styles.default
            : styles.disabled
    }`;
  };

  const handleChangeStepSwiper = (newStep: number) => {
    if (newStep <= step.completedStep + 1) {
      swiperRef.current?.slideTo(newStep - 1);
      onChangeStep(newStep);
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      if (swiperRef.current.realIndex > step.completedStep) {
        swiperRef.current.slideTo(step.completedStep); // Возвращаемся на последний разрешенный слайд
      } else {
        const activeIndex = swiperRef.current.activeIndex;
        handleChangeStep(activeIndex + 1);
      }
    }
  };

  useEffect(() => {
    swiperRef.current?.slideTo(step.completedStep);
  }, [step.completedStep]);

  useEffect(() => {
    swiperRef.current?.slideTo(step.step - 1);
  }, [step.step]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title__wrapper}>
          <div>
            <p className={styles.title}>
              {channel_id
                ? t(`add_platform.title.edit`)
                : t(`add_platform.title.add`)}
            </p>
            <ArrowIcon3 />
          </div>
        </div>
        <div className={styles.flag__xl}>
          <div className={styles.flags__wrapper}>
            <div
              onClick={() => handleChangeStep(1)}
              className={styles.flag_wrap}
            >
              <div className={styles.flag_wrap_2}>
                <div
                  className={`${styles.flag} ${styles.start} ${handleStyles(1)}`}
                >
                  <p>1 {t("add_platform.chevron.step")}</p>
                  <span>{t("add_platform.chevron.identification")}</span>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleChangeStep(2)}
              className={`${step.completedStep + 1 >= 2 ? styles.flag_wrap : ""}`}
            >
              <div className={styles.flag_wrap_2}>
                <div className={`${styles.flag} ${handleStyles(2)}`}>
                  <p>2 {t("add_platform.chevron.step")}</p>
                  <span>{t("add_platform.chevron.description")}</span>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleChangeStep(3)}
              className={`${step.completedStep + 1 >= 3 ? styles.flag_wrap : ""}`}
            >
              <div className={styles.flag_wrap_2}>
                <div
                  className={`${styles.flag} ${styles.end} ${handleStyles(3)}`}
                >
                  <p>3 {t("add_platform.chevron.step")}</p>
                  <span>{t("add_platform.chevron.accept")}</span>
                </div>
              </div>
            </div>
          </div>
          <RoundIcon />
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={0}
        slidesPerView={1.1}
        className={styles.flag__xs}
      >
        <SwiperSlide onClick={() => handleChangeStepSwiper(1)}>
          <div onClick={() => handleChangeStep(1)} className={styles.flag_wrap}>
            <div className={styles.flag_wrap_2}>
              <div
                className={`${styles.flag} ${styles.start} ${handleStyles(1)}`}
              >
                <p>1 {t("add_platform.chevron.step")}</p>
                <span>{t("add_platform.chevron.identification")}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => handleChangeStepSwiper(2)}>
          <div
            className={`${step.completedStep + 1 >= 2 ? styles.flag_wrap : ""}`}
          >
            <div className={styles.flag_wrap_2}>
              <div className={`${styles.flag} ${handleStyles(2)}`}>
                <p>2 {t("add_platform.chevron.step")}</p>
                <span>{t("add_platform.chevron.description")}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => handleChangeStepSwiper(3)}>
          <div
            className={`${step.completedStep + 1 >= 3 ? styles.flag_wrap : ""}`}
          >
            <div className={styles.flag_wrap_2}>
              <div
                className={`${styles.flag} ${styles.end} ${handleStyles(3)}`}
              >
                <p>3 {t("add_platform.chevron.step")}</p>
                <span>{t("add_platform.chevron.accept")}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <RoundIcon />
      </Swiper>
    </>
  );
};
