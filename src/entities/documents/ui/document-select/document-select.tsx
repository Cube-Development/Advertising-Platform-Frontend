import {
  ENUM_DOCUMENT_STATUS_TAB,
  IDocumentTab,
} from "@entities/documents/types";
import { cn, CustomMiniTabItem, CustomMiniTabs } from "@shared/ui";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface IDocumentSelectProps {
  tabs: IDocumentTab[];
  activeTab: ENUM_DOCUMENT_STATUS_TAB;
  onClick: (tab: IDocumentTab) => void;
}

export const DocumentSelect: FC<IDocumentSelectProps> = ({
  tabs,
  activeTab,
  onClick,
}) => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.activeIndex;
      swiperRef.current.slideTo(activeIndex);
      onClick(tabs[activeIndex]);
    }
  };
  return (
    <>
      <div className="hidden md:block">
        <CustomMiniTabs>
          {tabs.map((item) => (
            <CustomMiniTabItem
              key={item.tabStatus}
              onClick={() => onClick(item)}
              active={activeTab === item.tabStatus}
              className="flex items-center gap-2"
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors duration-200 ",
                  activeTab === item.tabStatus
                    ? "text-white bg-[#4d37b3]"
                    : "text-gray-600",
                )}
              >
                <item.icon size={20} />
              </div>
              {t(item.label)}
            </CustomMiniTabItem>
          ))}
        </CustomMiniTabs>
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        spaceBetween={0}
        slidesPerView={1.7}
        className="block !p-1 bg-gray-100 md:hidden rounded-xl"
        breakpoints={{
          576: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
        }}
      >
        {tabs.map((item, index) => (
          <SwiperSlide key={item?.tabStatus}>
            <CustomMiniTabItem
              key={item.tabStatus}
              active={activeTab === item.tabStatus}
              className="flex items-center w-full gap-2"
              onClick={() => {
                onClick(item), swiperRef.current?.slideTo(index);
              }}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors duration-200 ",
                  activeTab === item.tabStatus
                    ? "text-white bg-[#4d37b3]"
                    : "text-gray-600",
                )}
              >
                <item.icon size={20} />
              </div>
              {t(item.label)}
            </CustomMiniTabItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
