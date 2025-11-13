import {
  ENUM_OFFER_STATUS,
  invalidateBloggerOfferByUserAction,
  useCancelOfferMutation,
} from "@entities/offer";
import { IOrderFeature, useCancelOrderMutation } from "@entities/project";
import { useAppDispatch, useWindowWidth } from "@shared/hooks";
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
  useToast,
} from "@shared/ui";
import { Ban, Loader } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BREAKPOINT } from "@shared/config";
import { CancelIcon2 } from "@shared/assets";

export const RejectOffer: FC<IOrderFeature> = ({
  order_id,
  code,
  project_id,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const screen = useWindowWidth();
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [cancelOffer, { isLoading }] = useCancelOfferMutation();
  // agency publisher flow
  const [cancelOrder, { isLoading: isCancelOrderLoading }] =
    useCancelOrderMutation();

  const handleOnClick = async () => {
    if (!order_id || isLoading || isCancelOrderLoading) return;

    try {
      await (
        code && project_id && order_id
          ? cancelOrder({ project_id, order_id, code, cancel_reason: comment })
          : cancelOffer({ order_id, cancel_reason: comment })
      ).unwrap();
      toast({
        variant: "success",
        title: t("toasts.offers_blogger.reject_offer.success"),
      });
      invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.WAIT,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.offers_blogger.reject_offer.error"),
      });
      console.error("error: ", error);
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.button}>
              <p className="flex items-center gap-1">
                <Ban className="mobile-xl:size-5 size-4 stroke-[1.5px] mobile-xl:min-w-[20px] min-w-[16px]" />
                {t(`offer_btn.reject`)}
              </p>
            </MyButton>
          </DialogTrigger>
          <DialogContent className="grid [grid-template-rows:max-content_1fr_max-content] gap-5 md:h-[50vh] h-full md:w-[50vw] w-[unset] md:max-w-[800px] md:max-h-[400px] md:p-5 p-4 max-h-[unset] max-w-[unset]">
            <DialogDescription className="sr-only"></DialogDescription>
            <DialogTitle className="grid grid-flow-column">
              <p className="max-w-[80%] mx-auto text-center md:text-lg text-base font-medium text-[var(--Personal-colors-black)]">
                {t(`offer_btn.reject_title`)}
              </p>
              <DialogClose asChild>
                <div className="absolute top-0 right-0 p-[15px] rounded-[50%] cursor-pointer hover:bg-[rgba(0,0,0,0.1)]">
                  <CancelIcon2 />
                </div>
              </DialogClose>
            </DialogTitle>
            <textarea
              className="text-base font-medium text-[var(--Personal-colors-black)] resize-none outline-none rounded-[15px] p-[10px] transition-border-color duration-300 focus:border-[var(--Personal-colors-main)] border-[1px] border-[var(--Card-separator)]"
              maxLength={300}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder={t(`offer_btn.reject_placeholder`)}
              autoFocus
            />
            <MyButton onClick={handleOnClick} buttons_type="button__blue">
              {isLoading || isCancelOrderLoading ? (
                <Loader
                  className="animate-spin"
                  stroke="#fff"
                  width={20}
                  height={20}
                />
              ) : (
                <p className="flex items-center gap-1">
                  <Ban className="mobile-xl:size-5 size-4 stroke-[1.5px]" />
                  {t(`offer_btn.reject`)}
                </p>
              )}
            </MyButton>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.button}>
              <p className="flex items-center gap-1">
                <Ban className="mobile-xl:size-5 size-4 stroke-[1.5px]" />
                {t(`offer_btn.reject`)}
              </p>
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className="h-full min-h-full grid [grid-template-rows:max-content_1fr_max-content] content-between gap-5 w-[unset] p-7 pt-10 max-h-[unset] max-w-[unset]">
            <DrawerDescription className="sr-only"></DrawerDescription>
            <DrawerTitle className="grid grid-flow-column">
              <p className="mx-auto text-center text-sm font-medium text-[var(--Personal-colors-black)]">
                {t(`offer_btn.reject_title`)}
              </p>
              <DrawerClose asChild>
                <div className="absolute top-0 right-0 p-[15px] rounded-[50%] cursor-pointer hover:bg-[rgba(0,0,0,0.1)] [&>svg]:size-5">
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </DrawerTitle>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="text-base font-medium text-[var(--Personal-colors-black)] resize-none outline-none rounded-[15px] p-[10px] transition-border-color duration-300 focus:border-[var(--Personal-colors-main)] border-[1px] border-[var(--Card-separator)]"
              maxLength={300}
              placeholder={t(`offer_btn.reject_placeholder`)}
            />
            <MyButton onClick={handleOnClick} buttons_type="button__blue">
              {isLoading || isCancelOrderLoading ? (
                <Loader
                  className="animate-spin"
                  stroke="#fff"
                  width={20}
                  height={20}
                />
              ) : (
                <p className="flex items-center gap-1">
                  <Ban className="mobile-xl:size-5 size-4 stroke-[1.5px]" />
                  {t(`offer_btn.reject`)}
                </p>
              )}
            </MyButton>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
