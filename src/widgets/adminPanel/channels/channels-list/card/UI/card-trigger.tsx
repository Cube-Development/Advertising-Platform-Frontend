import {
  ADMIN_CHANNEL_STATUS,
  ADMIN_CHANNEL_STATUS_LIST,
} from "@entities/admin-panel/channels/config/channels.config";
import type { IAdminChannelData } from "@entities/admin-panel/channels/types/channels.types";
import { platformToIcon } from "@entities/project/config/catalog";
import { ChannelCardMenu } from "@features/admin-panel";
import { useCopyLink } from "@shared/hooks";
import { AccordionTrigger, AccountsLoader } from "@shared/ui";
import { Badge, Card, CardContent, CardHeader } from "@shared/ui/shadcn-ui";
import { ChevronDown } from "lucide-react";
import { ButtonHTMLAttributes, FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface ICardTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  card: IAdminChannelData;
  isLoading?: boolean;
  isOpen?: boolean;
}

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

export const CardTrigger: FC<ICardTriggerProps> = ({
  card,
  isLoading,
  isOpen,
  ...props
}) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();

  const statusLabel =
    ADMIN_CHANNEL_STATUS_LIST.find((item) => item.id === card?.status)?.name ||
    "";

  const statusVariant =
    card?.status === ADMIN_CHANNEL_STATUS.ACTIVE
      ? "default"
      : card?.status === ADMIN_CHANNEL_STATUS.BANNED ||
          card?.status === ADMIN_CHANNEL_STATUS.MODERATION_REJECT
        ? "destructive"
        : "secondary";

  return (
    <Card className="w-full overflow-hidden border-0 shadow-none rounded-none">
      <CardHeader className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3 min-w-0 flex-1">
          <img
            src={card?.channel?.avatar || noUserAvatar}
            alt={card?.channel?.name}
            className="h-12 w-12 shrink-0 rounded-full object-cover border border-black/20"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{card?.channel?.name}</p>
            <p
              className="text-xs text-muted-foreground truncate cursor-pointer"
              onClick={(e) => {
                stopPropagation(e);
                copyLink(card?.channel?.id);
              }}
            >
              # {card?.channel?.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={statusVariant} className="w-fit">
            {t(statusLabel)}
          </Badge>
          <div onClick={stopPropagation}>
            <ChannelCardMenu id={card?.channel?.id} />
          </div>
          <AccordionTrigger
            className="rounded-lg bg-black/[0.03] p-2 hover:no-underline"
            {...props}
          >
            {isLoading ? (
              <AccountsLoader />
            ) : (
              <ChevronDown
                size={20}
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </AccordionTrigger>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3 p-4 pt-0 sm:grid-cols-4 sm:p-6 sm:pt-0">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {t("admin_panel.channels.bar.owner")}
          </p>
          <p
            className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
            onClick={(e) => {
              stopPropagation(e);
              copyLink(card?.owner_id);
            }}
          >
            №{card?.owner_id}
          </p>
          {card?.email && (
            <p
              className="text-xs text-blue-500 truncate cursor-pointer"
              onClick={(e) => {
                stopPropagation(e);
                copyLink(card.email!);
              }}
            >
              {card.email}
            </p>
          )}
          {card?.user_id && (
            <p
              className="text-xs text-muted-foreground truncate cursor-pointer"
              onClick={(e) => {
                stopPropagation(e);
                copyLink(card.user_id!);
              }}
            >
              {card.user_id}
            </p>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {t("admin_panel.channels.bar.platform")}
          </p>
          {card?.channel?.platform &&
          card.channel.platform in platformToIcon ? (
            <div className="mt-1 flex h-6 w-6 items-center justify-center [&_svg]:h-6 [&_svg]:w-6">
              {platformToIcon[card.channel.platform]()}
            </div>
          ) : (
            <p className="text-sm font-semibold">—</p>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {t("admin_panel.channels.bar.date")}
          </p>
          <p className="text-sm font-semibold">{card?.created || "—"}</p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {t("admin_panel.channels.bar.status")}
          </p>
          <p className="text-sm font-semibold">{t(statusLabel)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
