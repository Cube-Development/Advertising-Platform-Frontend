import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { cn, WalletCard } from "@shared/ui";
import { FC, useRef } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface IWalletsBarProps {
  walletType: ENUM_WALLETS_TYPE | null;
  totalAmount?: number;
  setWalletType: (type: ENUM_WALLETS_TYPE | null) => void;
  direction?: "row" | "column";
  wallets?: ENUM_WALLETS_TYPE[];
}

export const WalletsBar: FC<IWalletsBarProps> = ({
  walletType,
  totalAmount,
  setWalletType,
  direction = "row",
  wallets = [
    ENUM_WALLETS_TYPE.DEPOSIT,
    ENUM_WALLETS_TYPE.PROFIT,
    ENUM_WALLETS_TYPE.SPENDING,
  ],
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
  const ALL_WALLETS: {
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

  const WALLETS =
    wallets?.map(
      (type) => ALL_WALLETS?.find((wallet) => wallet.type === type)!,
    ) || [];

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div
          className={cn(
            "grid gap-2.5",
            direction === "row"
              ? `grid-rows-${WALLETS.length}`
              : `grid-cols-${WALLETS.length}`,
          )}
        >
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
