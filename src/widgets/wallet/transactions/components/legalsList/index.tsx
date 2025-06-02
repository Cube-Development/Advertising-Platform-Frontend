import { ILegalCard, ILegalCardShort, LegalCard } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface LegalsListProps {
  accounts: ILegalCardShort[] | undefined;
  activeAccount: ILegalCard | null;
  changeActiveAccount: (account: ILegalCardShort) => void;
  isReadLegalsLoading?: boolean;
  isOneLegalLoading?: boolean;
  readLegalsError?: any;
  oneLegalError?: any;
}

export const LegalsList: FC<LegalsListProps> = ({
  accounts,
  activeAccount,
  changeActiveAccount,
  isReadLegalsLoading,
  isOneLegalLoading,
  readLegalsError,
  oneLegalError,
}) => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperCore | null>(null);
  const screen = useWindowWidth();

  const handleChangeStepSwiper = (account: ILegalCardShort, index: number) => {
    changeActiveAccount(account);
    swiperRef.current?.slideTo(index);
  };
  return (
    <>
      {accounts && accounts?.length > 0 && (
        <div className={styles.profile}>
          {screen >= BREAKPOINT.LG && (
            <p className={styles.title}>{t("wallet.use_data")}</p>
          )}
          {screen >= BREAKPOINT.LG ? (
            <div
              className={`${styles.all__profile} ${accounts && accounts?.length > 5 ? styles.scroll : ""}`}
            >
              {accounts &&
              accounts?.length > 0 &&
              !isReadLegalsLoading &&
              !readLegalsError ? (
                <>
                  {accounts?.map((account, index) => (
                    <div
                      onClick={() => changeActiveAccount(account)}
                      key={index}
                    >
                      <LegalCard
                        account={account}
                        key={index}
                        isActive={activeAccount?.legal_id === account?.legal_id}
                        isOneLegalLoading={isOneLegalLoading}
                        oneLegalError={oneLegalError}
                      />
                    </div>
                  ))}
                </>
              ) : (
                isReadLegalsLoading && !readLegalsError && <h1>Loading...</h1>
              )}
            </div>
          ) : accounts &&
            accounts?.length > 0 &&
            !isReadLegalsLoading &&
            !readLegalsError ? (
            <div className="swipper__carousel">
              <Swiper
                className="swipper__wrapper"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, EffectCoverflow]}
                spaceBetween={10}
                slidesPerView={1.1}
                breakpoints={{
                  768: {
                    slidesPerView: 2.1,
                    spaceBetween: 15,
                  },
                  576: {
                    slidesPerView: 1.7,
                  },
                  375: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                  },
                }}
              >
                {accounts?.map((account, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => handleChangeStepSwiper(account, index)}
                  >
                    <LegalCard
                      account={account}
                      key={index}
                      isActive={activeAccount?.legal_id === account?.legal_id}
                      isOneLegalLoading={isOneLegalLoading}
                      oneLegalError={oneLegalError}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            isReadLegalsLoading && !readLegalsError && <h1>Loading...</h1>
          )}
        </div>
      )}
    </>
  );
};
