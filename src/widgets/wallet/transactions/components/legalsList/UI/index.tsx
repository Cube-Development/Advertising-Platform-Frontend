import { ILegalCard, ILegalCardShort, LegalCard } from "@entities/wallet";
import { SadSmileIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

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
    <>
      <div className={styles.profile}>
        <p className={styles.title}>{t("wallet.use_data")}</p>
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
                  <LegalCard
                    account={account}
                    key={index}
                    changeActiveAccount={() => changeActiveAccount(account)}
                    isActive={activeAccount?.legal_id === account?.legal_id}
                    isOneLegalLoading={isOneLegalLoading}
                    oneLegalError={oneLegalError}
                  />
                ))}
              </>
            ) : isReadLegalsLoading && !readLegalsError ? (
              <h1>Loading...</h1>
            ) : (
              <div className={styles.empty}>
                <SadSmileIcon />
                <p className={styles.empty__text}>{t("wallet.empty_data")}</p>
                {readLegalsError && <h1>Ошибка запроса...</h1>}
              </div>
            )}
          </div>
        ) : accounts &&
          accounts?.length > 0 &&
          !isReadLegalsLoading &&
          !readLegalsError ? (
          <div className="swipper__carousel">
            <Swiper
              className="swipper__wrapper"
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
                <SwiperSlide key={index}>
                  <LegalCard
                    account={account}
                    key={index}
                    changeActiveAccount={() => changeActiveAccount(account)}
                    isActive={activeAccount?.legal_id === account?.legal_id}
                    isOneLegalLoading={isOneLegalLoading}
                    oneLegalError={oneLegalError}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : isReadLegalsLoading && !readLegalsError ? (
          <h1>Loading...</h1>
        ) : (
          <div className={`${styles.empty} ${styles.mini}`}>
            <SadSmileIcon />
            <p className={styles.empty__text}>{t("wallet.empty_data")}</p>
            {readLegalsError && <h1>Ошибка запроса...</h1>}
          </div>
        )}
      </div>
    </>
  );
};
