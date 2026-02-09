import { useState } from "react";
import { Link } from "react-router-dom";
import { ENUM_WALLETS_TYPE, useGetBalanceQuery } from "@entities/wallet";
import { USER_ROLES } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  MyButton,
} from "@shared/ui";
import { X } from "lucide-react";
import { ENUM_PATHS } from "@shared/routing";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import { useTranslation } from "react-i18next";

export const UnrealizedWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { data: balance } = useGetBalanceQuery(undefined, {
    skip: !isAuth || !USER_ROLES.includes(role),
  });

  const unrealizedWallet = balance?.items?.find(
    (item) => item.wallet === ENUM_WALLETS_TYPE.PREPAYMENT,
  );

  if (!unrealizedWallet?.balance) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-[#FDB022] bg-white p-2 mobile-xl:p-3 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex mobile-xl:min-w-6 min-w-5 mobile-xl:size-6 size-5 items-center justify-center rounded-full bg-[#FDB022] text-sm font-semibold text-white">
              !
            </div>
            <div className="flex flex-col gap-1">
              <p className="md:text-base mobile-xl:text-xs text-[10px] font-normal">
                <span className="sr-only font-semibold">
                  {t("unrealized_wallet.action.attention")}{" "}
                </span>
                {t("unrealized_wallet.action.you_have_money")}
                <span className="font-semibold">
                  {unrealizedWallet.balance.toLocaleString("ru-RU")}{" "}
                  {t("symbol")}
                </span>
              </p>
            </div>
          </div>

          <DialogTrigger asChild>
            <button className="underline flex-shrink-0 text-right mobile-xl:text-xs text-[10px] font-normal text-[#FDB022] transition-colors hover:text-orange-700">
              {t("unrealized_wallet.action.button")}
            </button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="w-[95vw] max-w-[600px] rounded-lg p-3 mobile-xl:p-4 md:p-5">
        <DialogTitle className="relative mobile-xl:text-lg text-base font-semibold text-gray-900">
          {t("unrealized_wallet.content.title")}
          <DialogClose
            className="absolute right-0 top-[50%] translate-y-[-50%] text-black hover:text-gray-600 cursor-pointer"
            asChild
          >
            <X className="mobile-xl:size-6 size-5 stroke-[1px]" />
          </DialogClose>
        </DialogTitle>

        <DialogDescription className="sr-only"></DialogDescription>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 mobile-xl:text-sm text-[10px] font-semibold text-gray-900">
              {t("unrealized_wallet.content.first_title")}
            </h3>
            <p className="mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              {t("unrealized_wallet.content.first_description")}
            </p>
          </div>

          <div>
            <h4 className="mb-2 mobile-xl:text-sm text-[10px] font-semibold text-gray-900">
              {t("unrealized_wallet.content.second_title")}
            </h4>
            <ul className="space-y-1 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>
                  {t("unrealized_wallet.content.first_second_description")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>
                  {t("unrealized_wallet.content.second_second_description")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>
                  {t("unrealized_wallet.content.third_second_description")}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 mobile-xl:text-sm text-[10px] font-semibold text-gray-900">
              {t("unrealized_wallet.content.third_title")}
            </h4>
            <p className="mb-2 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              {t("unrealized_wallet.content.third_description")}
            </p>
            <ol className="space-y-1 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">1.</span>
                <span>
                  {t("unrealized_wallet.content.third_description_option_1")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">2.</span>
                <span>
                  {t("unrealized_wallet.content.third_description_option_2")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">3.</span>
                <span>
                  {t("unrealized_wallet.content.third_description_option_3")}
                </span>
              </li>
            </ol>
          </div>
        </div>
        <Link
          to={`${ENUM_PATHS.OFFERS}?offer_status=${ENUM_OFFER_STATUS.COMPLETED}&access=true`}
          className="flex-1 mobile-xl:text-sm text-[10px] font-normal md:flex-initial"
        >
          <MyButton
            onClick={() => setIsOpen(false)}
            className="rounded-lg w-full mobile-xl:text-sm text-[10px] font-normal"
          >
            {t("unrealized_wallet.content.button")}
          </MyButton>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
