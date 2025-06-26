import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { WalletDepositCard, WalletProfitCard } from "@shared/ui";
import { FC, useRef } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";

interface IWalletsBarProps {
  walletType: ENUM_WALLETS_TYPE | null;
  totalAmount?: number;
  setWalletType: (type: ENUM_WALLETS_TYPE) => void;
}

export const WalletsBar: FC<IWalletsBarProps> = ({
  walletType,
  totalAmount,
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
            disabled={(totalAmount || 0) > deposit_wallet}
          />
          <WalletProfitCard
            amount={profit_wallet}
            isActive={walletType === ENUM_WALLETS_TYPE.PROFIT}
            onClick={() => setWalletType(ENUM_WALLETS_TYPE.PROFIT)}
            disabled={(totalAmount || 0) > profit_wallet}
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
            <SwiperSlide>
              <WalletDepositCard
                amount={deposit_wallet}
                isActive={walletType === ENUM_WALLETS_TYPE.DEPOSIT}
                onClick={() =>
                  handleChangeStepSwiper(ENUM_WALLETS_TYPE.DEPOSIT, 0)
                }
                disabled={(totalAmount || 0) > deposit_wallet}
              />
            </SwiperSlide>
            <SwiperSlide>
              <WalletProfitCard
                amount={profit_wallet}
                isActive={walletType === ENUM_WALLETS_TYPE.PROFIT}
                onClick={() =>
                  handleChangeStepSwiper(ENUM_WALLETS_TYPE.PROFIT, 1)
                }
                disabled={(totalAmount || 0) > profit_wallet}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};
