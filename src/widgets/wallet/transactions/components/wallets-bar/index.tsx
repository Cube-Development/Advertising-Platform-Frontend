import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { WalletDepositCard, WalletProfitCard } from "@shared/ui";
import { FC, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

interface IWalletsBarProps {
  walletType: ENUM_WALLETS_TYPE;
  setWalletType: (type: ENUM_WALLETS_TYPE) => void;
}

export const WalletsBar: FC<IWalletsBarProps> = ({
  walletType,
  setWalletType,
}) => {
  const screen = useWindowWidth();
  const { deposit_wallet, profit_wallet } = useAppSelector(
    (state) => state.wallet,
  );
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleChangeStepSwiper = (type: ENUM_WALLETS_TYPE, index: number) => {
    swiperRef.current?.slideTo(index);
    setWalletType(type);
  };

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={styles.wallets}>
          <WalletDepositCard
            amount={deposit_wallet}
            isActive={walletType === ENUM_WALLETS_TYPE.DEPOSIT}
            onClick={() => setWalletType(ENUM_WALLETS_TYPE.DEPOSIT)}
          />
          <WalletProfitCard
            amount={profit_wallet}
            isActive={walletType === ENUM_WALLETS_TYPE.PROFIT}
            onClick={() => setWalletType(ENUM_WALLETS_TYPE.PROFIT)}
          />
        </div>
      ) : (
        <div className="swipper__carousel">
          <Swiper
            className="swipper__wrapper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, EffectCoverflow]}
            spaceBetween={10}
            slidesPerView={1.2}
          >
            <SwiperSlide
              onClick={() =>
                handleChangeStepSwiper(ENUM_WALLETS_TYPE.DEPOSIT, 0)
              }
            >
              <WalletDepositCard
                amount={deposit_wallet}
                isActive={walletType === ENUM_WALLETS_TYPE.DEPOSIT}
              />
            </SwiperSlide>
            <SwiperSlide
              onClick={() =>
                handleChangeStepSwiper(ENUM_WALLETS_TYPE.PROFIT, 1)
              }
            >
              <WalletProfitCard
                amount={profit_wallet}
                isActive={walletType === ENUM_WALLETS_TYPE.PROFIT}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};
