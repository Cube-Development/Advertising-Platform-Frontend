import { IBuyTariff, usePostBuyTarifMutation } from "@entities/project";
import { ToastAction, useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useBuyTariff = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [buyTarif, { isLoading }] = usePostBuyTarifMutation();

  const buyNewTariff = async (
    data: IBuyTariff,
  ): Promise<boolean | undefined> => {
    if (isLoading) return;

    try {
      await buyTarif({
        // only back data
        tariff_ident: data?.tariff_ident,
        comment: data?.comment,
        links: data?.links,
        attached_files: data?.attached_files,
        wallet_type: data?.wallet_type,
      }).unwrap();

      toast({
        variant: "success",
        title: t("toasts.turnkey.success"),
      });

      return true;
    } catch (error) {
      console.error("Ошибка при покупке тарифа", error);
      toast({
        variant: "error",
        title: t("toasts.turnkey.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  };

  return { buyNewTariff, isLoading };
};
