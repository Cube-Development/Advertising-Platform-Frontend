import { ArrowIcon3, RoundIcon } from "@shared/assets";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { StepChevron } from "./step-chevron";
import { SWIPER_CONFIG } from "@widgets/channel/add-channel/model";

interface IChannelStepTabs {
  step: { step: number; completedStep: number };
  channel_id?: string;
  onChangeStep: (step: number) => void;
}

export const ChannelStepTabs: FC<IChannelStepTabs> = ({
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
            <p className={`gradient_color ${styles.title}`}>
              {channel_id
                ? t(`add_platform.title.edit`)
                : t(`add_platform.title.add`)}
            </p>
            <ArrowIcon3 />
          </div>
        </div>
        <div className={styles.flag__xl}>
          <div className={styles.flags__wrapper}>
            {SWIPER_CONFIG.map((item, index) => (
              <StepChevron
                key={index}
                step={item.step}
                title={item.title}
                current_step={step}
                onChangeStep={handleChangeStep}
                isStart={index === 0}
                isEnd={index === SWIPER_CONFIG.length - 1}
              />
            ))}
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
        {SWIPER_CONFIG.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleChangeStepSwiper(item.step)}
          >
            <StepChevron
              step={item.step}
              title={item.title}
              current_step={step}
              onChangeStep={handleChangeStep}
              isStart={index === 0}
              isEnd={index === SWIPER_CONFIG.length - 1}
            />
          </SwiperSlide>
        ))}
        <RoundIcon />
      </Swiper>
    </>
  );
};
