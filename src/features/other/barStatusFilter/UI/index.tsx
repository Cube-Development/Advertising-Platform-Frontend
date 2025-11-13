import { ENUM_CHANNEL_STATUS } from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_AGENCY_PROJECT_STATUS,
} from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface IProjectType {
  id?: number;
  name: string;
  type:
    | ENUM_CHANNEL_STATUS
    | ENUM_ADV_MY_PROJECT_STATUS
    | ENUM_ADV_MANAGER_PROJECT_STATUS
    | ENUM_MANAGER_PROJECT_STATUS
    | ENUM_OFFER_STATUS
    | ENUM_AGENCY_PROJECT_STATUS;
}

interface BarStatusFilterProps {
  changeStatus: (
    status:
      | ENUM_CHANNEL_STATUS
      | ENUM_OFFER_STATUS
      | ENUM_ADV_MY_PROJECT_STATUS
      | ENUM_ADV_MANAGER_PROJECT_STATUS
      | ENUM_MANAGER_PROJECT_STATUS
      | ENUM_AGENCY_PROJECT_STATUS
      | string,
  ) => void;
  statusFilter:
    | ENUM_CHANNEL_STATUS
    | ENUM_OFFER_STATUS
    | ENUM_ADV_MY_PROJECT_STATUS
    | ENUM_ADV_MANAGER_PROJECT_STATUS
    | ENUM_MANAGER_PROJECT_STATUS
    | ENUM_AGENCY_PROJECT_STATUS
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
  const screen = useWindowWidth();

  const handleChangeStepSwiper = (
    type:
      | ENUM_CHANNEL_STATUS
      | ENUM_OFFER_STATUS
      | ENUM_ADV_MY_PROJECT_STATUS
      | ENUM_ADV_MANAGER_PROJECT_STATUS
      | ENUM_MANAGER_PROJECT_STATUS
      | ENUM_AGENCY_PROJECT_STATUS,
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
                {!!badge &&
                  !!badge?.find((el) => el?.status === type?.type)?.count && (
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
            slidesPerView={2.2}
            breakpoints={{
              576: {
                slidesPerView: 4.2,
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
                  {!!badge &&
                    !!badge?.find((el) => el?.status === type?.type)?.count && (
                      <div className={styles.badge}>
                        <span>
                          {
                            badge?.find((el) => el?.status === type?.type)
                              ?.count
                          }
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
