import {
  ADMIN_CHANNEL_STATUS_LIST,
  useGetAdminUserInfoQuery,
} from "@entities/admin-panel";
import { ORGANIZATION_TYPE_LABEL } from "@entities/admin/config/organizationType";
import { useClearCookiesOnPage, useCopyLink } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from "@shared/ui/shadcn-ui";
import { Search } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

const LANGUAGE_LABEL: Record<number, string> = {
  1: "UZ",
  2: "EN",
  3: "RU",
};

interface InfoFieldProps {
  label: string;
  value?: string | number | null;
  copyable?: boolean;
  onCopy?: (value: string) => void;
}

const InfoField: FC<InfoFieldProps> = ({ label, value, copyable, onCopy }) => {
  const display = value != null && value !== "" ? String(value) : "—";

  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      {copyable && display !== "—" ? (
        <p
          className="text-sm font-semibold text-blue-500 truncate cursor-pointer"
          onClick={() => onCopy?.(display)}
        >
          {display}
        </p>
      ) : (
        <p className="text-sm font-semibold truncate">{display}</p>
      )}
    </div>
  );
};

export const UserInfo: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();
  const { id: user_id } = useParams<{ id: string }>();
  const [channelSearch, setChannelSearch] = useState("");

  const { data: card } = useGetAdminUserInfoQuery({
    id: user_id || "",
  });

  const orgTypeLabel =
    card?.organization?.type != null
      ? ORGANIZATION_TYPE_LABEL[card.organization.type]
      : null;

  const channelQuery = channelSearch.trim().toLowerCase();
  const filteredChannels = (card?.channels ?? []).filter(
    (ch) =>
      !channelQuery ||
      ch.name.toLowerCase().includes(channelQuery) ||
      ch.id.toLowerCase().includes(channelQuery) ||
      ch.url.toLowerCase().includes(channelQuery),
  );

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <Link to={ENUM_PATHS.ADMIN_USERS}>
            <h1 className={`${styles.title} hover:opacity-80`}>
              {t("admin_panel.pages.users")}
            </h1>
          </Link>
          <p className={styles.breadcrumb}>
            {t("admin_panel.pages.home")}
            <span>
              {" "}
              / {t("admin_panel.pages.users")} / #{user_id}
            </span>
          </p>
        </div>

        <Card className="w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <p className="text-lg font-semibold sm:text-xl">
              {t("admin_panel.userInfo.card.title")}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <InfoField
                label={t("admin_panel.userInfo.card.first_name")}
                value={card?.first_name}
              />
              <InfoField
                label={t("admin_panel.userInfo.card.surname")}
                value={card?.surname}
              />
              <InfoField
                label={t("admin_panel.userInfo.card.email")}
                value={card?.email}
                copyable
                onCopy={copyLink}
              />
              <InfoField
                label={t("admin_panel.userInfo.card.phone")}
                value={card?.phone}
                copyable
                onCopy={copyLink}
              />
              <InfoField
                label={t("admin_panel.userInfo.card.language")}
                value={LANGUAGE_LABEL[card?.language ?? 0]}
              />
              <InfoField
                label={t("admin_panel.userInfo.card.created")}
                value={card?.created}
              />
            </div>
            {user_id && (
              <>
                <Separator />
                <InfoField
                  label="UUID"
                  value={user_id}
                  copyable
                  onCopy={copyLink}
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="w-full overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <p className="text-lg font-semibold sm:text-xl">
              {t("admin_panel.userInfo.org.title")}
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            {card?.organization ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <InfoField
                  label={t("admin_panel.userInfo.org.tin")}
                  value={card.organization.tin}
                  copyable
                  onCopy={copyLink}
                />
                <InfoField
                  label={t("admin_panel.userInfo.org.pinfl")}
                  value={card.organization.pinfl}
                  copyable
                  onCopy={copyLink}
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {t("admin_panel.userInfo.org.type")}
                  </p>
                  {orgTypeLabel ? (
                    <Badge variant="outline" className="mt-1 w-fit">
                      {t(orgTypeLabel)}
                    </Badge>
                  ) : (
                    <p className="text-sm font-semibold">—</p>
                  )}
                </div>
                <InfoField
                  label={t("admin_panel.userInfo.org.status")}
                  value={card.organization.status}
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("admin_panel.userInfo.org.empty")}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full overflow-hidden">
          <CardHeader className="flex flex-col gap-3 p-4 sm:p-6">
            <p className="text-lg font-semibold sm:text-xl">
              {t("admin_panel.userInfo.channels.title")}
            </p>
            {(card?.channels?.length ?? 0) > 0 && (
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={channelSearch}
                  onChange={(e) => setChannelSearch(e.target.value)}
                  placeholder={t("admin_panel.userInfo.channels.search")}
                  className="pl-9"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="grid gap-2.5 p-4 pt-0 sm:p-6 sm:pt-0">
            {!card?.channels?.length ? (
              <p className="text-sm text-muted-foreground">
                {t("admin_panel.userInfo.channels.empty")}
              </p>
            ) : filteredChannels.length ? (
              filteredChannels.map((ch) => (
                <div
                  key={ch.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{ch.name}</p>
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[var(--URL)] break-all hover:underline"
                    >
                      {ch.url}
                    </a>
                    <p
                      className="text-xs text-muted-foreground truncate cursor-pointer"
                      onClick={() => copyLink(ch.id)}
                    >
                      # {ch.id}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      {t(
                        ADMIN_CHANNEL_STATUS_LIST.find(
                          (item) => item.id === ch.status,
                        )?.name || "???",
                      )}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {t("admin_panel.userInfo.channels.completed")}:{" "}
                      <span className="font-semibold text-foreground">
                        {ch.completed_count}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("admin_panel.userInfo.channels.search_empty")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
