import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { WalletCard } from "@shared/ui";
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
  setWalletType: (type: ENUM_WALLETS_TYPE | null) => void;
}

export const WalletsBar: FC<IWalletsBarProps> = ({
  walletType,
  totalAmount,
  setWalletType,
}) => {
  const screen = useWindowWidth();
  const { deposit_wallet, profit_wallet, spending_wallet } = useAppSelector(
    (state) => state.wallet,
  );
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleChangeStepSwiper = (type: ENUM_WALLETS_TYPE, index: number) => {
    swiperRef.current?.slideTo(index);
    setWalletType(type);
  };
  const WALLETS: {
    amount: number;
    variant: "deposit" | "profit" | "spending";
    type: ENUM_WALLETS_TYPE;
  }[] = [
    {
      amount: deposit_wallet,
      variant: "deposit",
      type: ENUM_WALLETS_TYPE.DEPOSIT,
    },
    {
      amount: profit_wallet,
      variant: "profit",
      type: ENUM_WALLETS_TYPE.PROFIT,
    },
    {
      amount: spending_wallet,
      variant: "spending",
      type: ENUM_WALLETS_TYPE.SPENDING,
    },
  ];

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={styles.wallets}>
          {WALLETS.map(({ amount, variant, type }) => (
            <WalletCard
              key={variant}
              amount={amount}
              isActive={walletType === type}
              variant={variant}
              onClick={() => setWalletType(type)}
              disabled={(totalAmount || 0) > amount}
            />
          ))}
        </div>
      ) : (
        <div className="swipper__carousel">
          <Swiper
            className="swipper__wrapper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, EffectCoverflow]}
            spaceBetween={15}
            slidesPerView={1.6}
          >
            {WALLETS.map(({ amount, variant, type }, index) => (
              <SwiperSlide key={variant}>
                <WalletCard
                  amount={amount}
                  isActive={walletType === type}
                  variant={variant}
                  disabled={(totalAmount || 0) > amount}
                  onClick={() => handleChangeStepSwiper(type, index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
