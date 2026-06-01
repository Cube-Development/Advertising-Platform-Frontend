import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { cn, MyButton, WalletCard } from "@shared/ui";
import { AlertCircle, ArrowRight } from "lucide-react";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UnrealizedWallet } from "@features/wallet";

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
  const { t } = useTranslation();
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
    variant: "deposit" | "profit" | "individual";
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
      variant: "individual",
      type: ENUM_WALLETS_TYPE.SPENDING,
    },
  ];

  const WALLETS =
    wallets?.map(
      (type) => ALL_WALLETS?.find((wallet) => wallet.type === type)!,
    ) || [];

  const requiredAmount = totalAmount ?? 0;
  const hasNoSufficientWallet =
    requiredAmount > 0 &&
    WALLETS.length > 0 &&
    WALLETS.every(({ amount }) => amount < requiredAmount);

  const insufficientBalanceAlert = hasNoSufficientWallet ? (
    <div className="mt-2.5 flex flex-col gap-3 rounded-xl bg-[rgba(12,162,184,0.1)] p-3">
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--Personal-colors-main)]" />
        <p className="text-sm font-medium leading-snug text-[var(--Personal-colors-black)]">
          {t("wallets.insufficient_balance")}
        </p>
      </div>
      <Link to={ENUM_PATHS.WALLET_TOP_UP} className="w-full">
        <MyButton
          buttons_type="button__white"
          className="flex w-full items-center justify-center gap-2 rounded-xl text-xs text-[var(--Personal-colors-main)]"
        >
          {t("wallets.top_up_action")}
          <ArrowRight className="h-4 w-4" />
        </MyButton>
      </Link>
    </div>
  ) : null;

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
          {insufficientBalanceAlert}
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
          {insufficientBalanceAlert}
        </div>
      )}
      <UnrealizedWallet />
    </>
  );
};
