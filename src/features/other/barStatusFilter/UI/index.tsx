import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  advManagerProjectStatus,
  advManagerProjectStatusFilter,
  advMyProjectStatus,
  managerProjectStatus,
  managerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { roles } from "@entities/user";
import { bloggerOfferStatus, offerStatusFilter } from "@entities/offer";
import { bloggerChannelStatus, channelStatusFilter } from "@entities/channel";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";
import { BREAKPOINT } from "@shared/config";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface BarStatusFilterProps {
  page: pageFilter;
  changeStatus: (
    status:
      | channelStatusFilter
      | offerStatusFilter
      | myProjectStatusFilter
      | advManagerProjectStatusFilter
      | managerProjectStatusFilter
      | string,
  ) => void;
  typeFilter?: string;
  statusFilter:
    | channelStatusFilter
    | offerStatusFilter
    | myProjectStatusFilter
    | advManagerProjectStatusFilter
    | managerProjectStatusFilter
    | string;
}

export const BarStatusFilter: FC<BarStatusFilterProps> = ({
  page,
  changeStatus,
  typeFilter,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);
  const toggleStatus = (status: string) => {
    changeStatus(status);
  };
  const swiperRef = useRef<SwiperCore | null>(null);
  const [screen, setScreen] = useState<number>(window.innerWidth);

  const projectStatus =
    page === pageFilter.order &&
    typeFilter === projectTypesFilter.myProject &&
    role === roles.advertiser
      ? advMyProjectStatus
      : page === pageFilter.order &&
          typeFilter === projectTypesFilter.managerProject &&
          role === roles.advertiser
        ? advManagerProjectStatus
        : page === pageFilter.order && role === roles.manager
          ? managerProjectStatus
          : page === pageFilter.offer
            ? bloggerOfferStatus
            : bloggerChannelStatus;

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
      // console.log("activeIndex", activeIndex, projectStatus[activeIndex]?.type)
      toggleStatus(projectStatus[activeIndex]?.type);
    }
  };

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={styles.subtypes}>
          <ul>
            {projectStatus.map((type, index) => (
              <li
                key={index}
                className={statusFilter === type.type ? styles.active : ""}
                onClick={() => toggleStatus(type.type)}
              >
                {t(type.name)}
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
                  // onClick={() => toggleStatus(type.type)}
                >
                  {t(type.name)}
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
