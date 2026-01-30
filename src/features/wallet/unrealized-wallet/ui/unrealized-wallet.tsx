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

export const UnrealizedWallet = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                <span className="sr-only font-semibold">Внимание! </span>У вас
                есть деньги на авансовом кошельке:{" "}
                <span className="font-semibold">
                  {unrealizedWallet.balance.toLocaleString("ru-RU")} сум
                </span>
              </p>
            </div>
          </div>

          <DialogTrigger asChild>
            <button className="underline flex-shrink-0 text-right mobile-xl:text-xs text-[10px] font-normal text-[#FDB022] transition-colors hover:text-orange-700">
              Подробнее
            </button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="w-[95vw] max-w-[600px] rounded-lg p-3 mobile-xl:p-4 md:p-5">
        <DialogTitle className="relative mobile-xl:text-lg text-base font-semibold text-gray-900">
          Авансовые средства
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
              Потенциально заработанные средства
            </h3>
            <p className="mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              Это средства, которые уже закреплены за вами, но пока недоступны
              для вывода.
            </p>
          </div>

          <div>
            <h4 className="mb-2 mobile-xl:text-sm text-[10px] font-semibold text-gray-900">
              В эту сумму входят:
            </h4>
            <ul className="space-y-1 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>
                  оплаты по активным заказам, которые ещё не выполнены;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>ожидающие заказы, принятые выми, но не завершённые;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0">•</span>
                <span>
                  выполненные заказы, по которым вы ещё не отправили
                  счёт-фактуру и акт.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 mobile-xl:text-sm text-[10px] font-semibold text-gray-900">
              Как получить эти средства?
            </h4>
            <p className="mb-2 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              Чтобы деньги перешли на прибыльный кошелёк, необходимо:
            </p>
            <ol className="space-y-1 mobile-xl:text-sm text-[10px] font-normal text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">1.</span>
                <span>Завершить все активные заказы;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">2.</span>
                <span>В выполненных заказах отправить счёт-фактуру и акт;</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0">3.</span>
                <span>Дождаться подтверждения документов.</span>
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
            Перейти в мои заказы
          </MyButton>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
