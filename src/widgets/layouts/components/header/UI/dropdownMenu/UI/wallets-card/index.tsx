import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";
import { WalletCard } from "@shared/ui";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { Wallet } from "lucide-react";
import { UnrealizedWallet } from "@features/wallet";

export const WalletsCard: FC = () => {
  const { t } = useTranslation();
  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE | null>(
    ENUM_WALLETS_TYPE.DEPOSIT,
  );
  const { balance, deposit_wallet, profit_wallet, spending_wallet } =
    useAppSelector((state) => state.wallet);

  const swiperRef = useRef<SwiperCore | null>(null);

  const handleChangeStepSwiper = (type: ENUM_WALLETS_TYPE, index: number) => {
    swiperRef.current?.slideTo(index);
    setWalletType(type);
  };

  const WALLETS: {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>
          <Wallet className={styles.icon} />
          <span>{t("wallets.title")}:</span>
        </p>
        <p className={styles.amount}>
          {Math.floor(balance).toLocaleString()} <span>{t("symbol")}</span>
        </p>
      </div>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1.7}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
          },
        }}
        className="!p-0"
        // className="!p-0 rounded-[16px] overflow-hidden"
      >
        {WALLETS.map(({ amount, variant, type }, index) => (
          <SwiperSlide key={variant}>
            <WalletCard
              amount={amount}
              variant={variant}
              isActive={type === walletType}
              onClick={() => handleChangeStepSwiper(type, index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <UnrealizedWallet />
    </div>
  );
};
