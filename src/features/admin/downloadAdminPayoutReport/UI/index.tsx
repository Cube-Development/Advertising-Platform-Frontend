import { useLazyGetAdminOrdersPayoutQuery } from "@entities/admin";
import { MyButton, useToast } from "@shared/ui";
import { Input } from "@shared/ui/shadcn-ui/ui/input";
import { Label } from "@shared/ui/shadcn-ui/ui/label";
import { downloadBlobOnDevice } from "@shared/utils";
import { Download, Loader } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getCurrentMonthDateRange } from "../model/helpers";

interface IAdminPayoutReportForm {
  date_from: string;
  date_to: string;
}

export const DownloadAdminPayoutReport: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const defaultRange = getCurrentMonthDateRange();

  const { watch, setValue } = useForm<IAdminPayoutReportForm>({
    defaultValues: defaultRange,
  });

  const formFields = watch();
  const [downloadReport, { isFetching }] = useLazyGetAdminOrdersPayoutQuery();

  const canDownload =
    Boolean(formFields.date_from && formFields.date_to) && !isFetching;

  const handleDownload = () => {
    if (!formFields.date_from || !formFields.date_to) {
      return;
    }

    downloadReport({
      date_from: formFields.date_from,
      date_to: formFields.date_to,
    })
      .unwrap()
      .then((blob) => {
        downloadBlobOnDevice(
          blob,
          `admin-payout_${formFields.date_from}_${formFields.date_to}.xlsx`,
        );
      })
      .catch((error) => {
        console.error("Admin payout report download error:", error);
        toast({
          variant: "error",
          title: t("track_orders.download_error"),
        });
      });
  };

  return (
    <div className="flex items-end gap-4">
      <div className="flex min-w-[180px] flex-col gap-2">
        <Label htmlFor="admin_payout_date_from">
          {t("track_orders.date_from")}
        </Label>
        <Input
          id="admin_payout_date_from"
          type="date"
          value={formFields.date_from}
          onChange={(event) => setValue("date_from", event.target.value)}
        />
      </div>
      <div className="flex min-w-[180px] flex-col gap-2">
        <Label htmlFor="admin_payout_date_to">
          {t("track_orders.date_to")}
        </Label>
        <Input
          id="admin_payout_date_to"
          type="date"
          value={formFields.date_to}
          onChange={(event) => setValue("date_to", event.target.value)}
        />
      </div>

      <MyButton
        buttons_type="button__blue"
        className="md:!text-sm !text-xs inline-flex items-center justify-center gap-2 p-3 !h-auto !font-medium"
        onClick={handleDownload}
        disabled={!canDownload}
      >
        {isFetching ? (
          <Loader
            className="animate-spin"
            stroke="#fff"
            width={22}
            height={22}
          />
        ) : (
          <>
            <Download className="min-w-[20px] size-5 stroke-[2px]" />
            {t("track_orders.download_payout_report")}
          </>
        )}
      </MyButton>
    </div>
  );
};
