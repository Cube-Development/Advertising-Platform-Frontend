import {
  desireStatus,
  IAdvProjectSubcard,
  IAgencyOrderCard,
  IChangeOrder,
  projectStatus,
  useAgencyProjectChangeMutation,
  useChangeOrderMutation,
} from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { CheckCheck, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface ReplacePostProps {
  order: IAdvProjectSubcard | IAgencyOrderCard;
  status: projectStatus;
  code?: number;
}

export const ReplacePost: FC<ReplacePostProps> = ({ order, status, code }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const { toast } = useToast();
  const [replace, { isLoading }] = useChangeOrderMutation();
  // customer flow
  const [agencyProjectChange, { isLoading: isAgencyProjectChangeLoading }] =
    useAgencyProjectChangeMutation();

  const [isOpen, setIsOpen] = useState(false);
  const haveDesire = !!order?.desire.find(
    (el) => el.desire_type === desireStatus.replace_post_request,
  );
  const { watch, register } = useForm<IChangeOrder>({
    defaultValues: {
      order_id: order?.id,
      desire: desireStatus.replace_post_request,
      comment: haveDesire
        ? order?.desire.find(
            (el) => el.desire_type === desireStatus.replace_post_request,
          )?.comment
        : "",
    },
  });

  const formState = watch();
  const handleOnClick = () => {
    (!isLoading || !isAgencyProjectChangeLoading) &&
      formState.comment &&
      order?.id &&
      (!isLoading || !isAgencyProjectChangeLoading) &&
      (code ? agencyProjectChange({ ...formState, code }) : replace(formState))
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.replace.post.success"),
          });
          setIsOpen(false);
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.replace.post.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <MyButton
              buttons_type={
                haveDesire ? "button__green__outline" : "button__white"
              }
              className="min-h-[33px] rounded-[8px] px-[10px] py-[5px] text-xs font-semibold leading-none text-center"
              disabled={!haveDesire && status === projectStatus.approved}
            >
              {haveDesire ? (
                <p className="flex items-center justify-center gap-0.5">
                  <CheckCheck className="mobile-xl:size-5 size-4 stroke-[2px]" />
                  {t(`order_btn.post.advertiser.process`)}
                </p>
              ) : (
                t(`order_btn.post.advertiser.edit`)
              )}
            </MyButton>
          </DialogTrigger>
          <DialogContent className="grid [grid-template-rows:max-content_1fr_max-content] gap-5 md:h-[50vh] h-full md:w-[50vw] w-[unset] md:max-w-[800px] md:max-h-[400px] md:p-5 p-4 max-h-[unset] max-w-[unset]">
            <DialogDescription className="sr-only"></DialogDescription>
            <DialogTitle className="grid grid-flow-column">
              <p className="max-w-[80%] mx-auto text-center md:text-lg text-base font-medium text-[var(--Personal-colors-black)]">
                {haveDesire
                  ? t("orders_advertiser.subcard.replace.post.desire")
                  : t("orders_advertiser.subcard.replace.post.title")}
              </p>
              <DialogClose asChild>
                <div className="absolute top-0 right-0 p-[15px] rounded-[50%] cursor-pointer hover:bg-[rgba(0,0,0,0.1)]">
                  <CancelIcon2 />
                </div>
              </DialogClose>
            </DialogTitle>
            <textarea
              {...register("comment")}
              className={`text-base font-medium text-[var(--Personal-colors-black)] resize-none outline-none rounded-[15px] p-[10px] transition-border-color duration-300 focus:border-[var(--Personal-colors-main)] ${haveDesire ? "opacity-75" : "border-[1px] border-[var(--Card-separator)]"}`}
              maxLength={300}
              placeholder={t(
                "orders_advertiser.subcard.replace.post.placeholder",
              )}
              disabled={haveDesire}
            />
            {haveDesire ? (
              <MyButton onClick={() => setIsOpen(false)}>
                <p>{t("orders_advertiser.subcard.replace.button.ok")}</p>
              </MyButton>
            ) : (
              <MyButton onClick={handleOnClick}>
                <p>{t("orders_advertiser.subcard.replace.button.send")}</p>
                {(isLoading || isAgencyProjectChangeLoading) && (
                  <Loader
                    className="animate-spin"
                    stroke="#fff"
                    width={20}
                    height={20}
                  />
                )}
              </MyButton>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <MyButton
              buttons_type={
                haveDesire ? "button__green__outline" : "button__white"
              }
              className="min-h-[33px] rounded-[8px] px-[10px] py-[5px] text-xs font-semibold leading-none text-center"
              disabled={!haveDesire && status === projectStatus.approved}
            >
              {haveDesire ? (
                <p className="flex items-center justify-center gap-0.5">
                  <CheckCheck className="mobile-xl:size-5 size-4 stroke-[2px]" />
                  {t(`order_btn.post.advertiser.process`)}
                </p>
              ) : (
                t(`order_btn.post.advertiser.edit`)
              )}
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className="h-full min-h-full grid [grid-template-rows:max-content_1fr_max-content] content-between gap-5 w-[unset] p-7 pt-10 max-h-[unset] max-w-[unset]">
            <DrawerDescription className="sr-only"></DrawerDescription>
            <DrawerTitle className="grid grid-flow-column">
              <p className="mx-auto text-center text-sm font-medium text-[var(--Personal-colors-black)]">
                {haveDesire
                  ? t("orders_advertiser.subcard.replace.post.desire")
                  : t("orders_advertiser.subcard.replace.post.title")}
              </p>
              <DrawerClose asChild>
                <div className="absolute top-0 right-0 p-[15px] rounded-[50%] cursor-pointer hover:bg-[rgba(0,0,0,0.1)] [&>svg]:size-5">
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </DrawerTitle>
            <textarea
              {...register("comment")}
              className={`text-base font-medium text-[var(--Personal-colors-black)] resize-none outline-none rounded-[15px] p-[10px] transition-border-color duration-300 focus:border-[var(--Personal-colors-main)] ${haveDesire ? "opacity-75" : "border-[1px] border-[var(--Card-separator)]"}`}
              maxLength={300}
              placeholder={t(
                "orders_advertiser.subcard.replace.post.placeholder",
              )}
              disabled={haveDesire}
            />
            {haveDesire ? (
              <MyButton onClick={() => setIsOpen(false)}>
                <p>{t("orders_advertiser.subcard.replace.button.ok")}</p>
              </MyButton>
            ) : (
              <MyButton onClick={handleOnClick}>
                <p>{t("orders_advertiser.subcard.replace.button.send")}</p>
                {(isLoading || isAgencyProjectChangeLoading) && (
                  <Loader
                    className="animate-spin"
                    stroke="#fff"
                    width={20}
                    height={20}
                  />
                )}
              </MyButton>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
