import { IAdminChannelInfo } from "@entities/admin-panel";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ICardContentProps {
  channel: IAdminChannelInfo;
}

const Metric: FC<{ label: string; value?: number | null }> = ({
  label,
  value,
}) => (
  <div className="min-w-0 rounded-lg border p-3 sm:p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 text-lg font-semibold sm:text-2xl">{value ?? 0}</p>
  </div>
);

export const CardContent: FC<ICardContentProps> = ({ channel }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
      <Metric
        label={t("admin_panel.channels.card.rate")}
        value={channel?.grade}
      />
      <Metric
        label={t("admin_panel.channels.card.complete")}
        value={channel?.complete}
      />
      <Metric
        label={t("admin_panel.channels.card.complaints")}
        value={channel?.complaints}
      />
      <Metric
        label={t("admin_panel.channels.card.on_hold")}
        value={channel?.on_hold}
      />
      <Metric
        label={t("admin_panel.channels.card.cancel")}
        value={channel?.cancel}
      />
      <Metric
        label={t("admin_panel.channels.card.not_complete")}
        value={channel?.not_complete}
      />
      <Metric
        label={t("admin_panel.channels.card.in_progress")}
        value={channel?.in_progress}
      />
    </div>
  );
};
