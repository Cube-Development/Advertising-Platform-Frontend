import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import {
  advManagerProjectStatusFilter,
  managerProjectStatusFilter,
  myProjectStatusFilter,
} from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface IProjectType {
  id?: number;
  name: string;
  type:
    | channelStatusFilter
    | myProjectStatusFilter
    | advManagerProjectStatusFilter
    | managerProjectStatusFilter
    | offerStatusFilter;
}

interface BarStatusFilterProps {
  changeStatus: (
    status:
      | channelStatusFilter
      | offerStatusFilter
      | myProjectStatusFilter
      | advManagerProjectStatusFilter
      | managerProjectStatusFilter
      | string,
  ) => void;
  statusFilter:
    | channelStatusFilter
    | offerStatusFilter
    | myProjectStatusFilter
    | advManagerProjectStatusFilter
    | managerProjectStatusFilter
    | string;
  projectStatus: IProjectType[];
  badge?: { status: string; count: number }[];
}

export const BarStatusFilter: FC<BarStatusFilterProps> = ({
  changeStatus,
  statusFilter,
  projectStatus,
  badge,
}) => {
  const { t } = useTranslation();
  const toggleStatus = (status: string) => {
    changeStatus(status);
  };
  const swiperRef = useRef<SwiperCore | null>(null);
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

  const handleChangeStepSwiper = (
    type:
      | channelStatusFilter
      | offerStatusFilter
      | myProjectStatusFilter
      | advManagerProjectStatusFilter
      | managerProjectStatusFilter,
    index: number,
  ) => {
    toggleStatus(type);
    swiperRef.current?.slideTo(index);
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.activeIndex;
      toggleStatus(projectStatus[activeIndex]?.type);
    }
  };

  return (
    <>
      {screen > BREAKPOINT.LG ? (
        <div className={styles.subtypes}>
          <ul>
            {projectStatus.map((type, index) => (
              <li
                key={index}
                className={statusFilter === type.type ? styles.active : ""}
                onClick={() => toggleStatus(type.type)}
              >
                {t(type.name)}
                {!!badge && (
                  // !!badge?.find((el) => el?.status === type?.type)?.count &&
                  <div className={styles.badge}>
                    <span>
                      {badge?.find((el) => el?.status === type?.type)?.count}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="swipper__carousel">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={0}
            slidesPerView={3}
            breakpoints={{
              576: {
                slidesPerView: 4.2,
              },
              375: {
                slidesPerView: 2.2,
              },
            }}
            className={styles.subtypes}
            onSlideChange={handleSlideChange}
          >
            {projectStatus.map((type, index) => (
              <SwiperSlide
                key={index}
                onClick={() => handleChangeStepSwiper(type.type, index)}
              >
                <li
                  key={index}
                  className={statusFilter === type.type ? styles.active : ""}
                >
                  {t(type.name)}
                  {!!badge && (
                    // !!badge?.find((el) => el?.status === type?.type)?.count &&
                    <div className={styles.badge}>
                      <span>
                        {badge?.find((el) => el?.status === type?.type)?.count}
                      </span>
                    </div>
                  )}
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
