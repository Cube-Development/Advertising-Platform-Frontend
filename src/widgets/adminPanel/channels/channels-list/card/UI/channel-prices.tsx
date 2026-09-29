import {
  getApiErrorMessage,
  IChannelPrices,
  useGetChannelPricesQuery,
  useGetUserGroupsQuery,
  useSetChannelPricesMutation,
} from "@entities/admin-panel";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Checkbox,
  Input,
  Label,
  SpinnerLoader,
  useToast,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ChannelPricesProps {
  channelId: string;
  enabled: boolean;
  formatNames: Map<number, string>;
}

interface DefaultDraft {
  auto: boolean;
  price: string;
}

const parsePrice = (raw: string): number | null => {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const value = Number(trimmed);
  return Number.isSafeInteger(value) && value > 0 ? value : null;
};

export const ChannelPrices: FC<ChannelPricesProps> = ({
  channelId,
  enabled,
  formatNames,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data, isLoading, isError } = useGetChannelPricesQuery(
    { channel_id: channelId },
    { skip: !enabled || !channelId },
  );
  const { data: groupsData } = useGetUserGroupsQuery(undefined, {
    skip: !enabled,
  });
  const [setPrices, { isLoading: isSaving }] = useSetChannelPricesMutation();

  const [drafts, setDrafts] = useState<Record<number, DefaultDraft>>({});
  const [groupId, setGroupId] = useState("");
  const [groupDrafts, setGroupDrafts] = useState<Record<number, string>>({});
  const [confirmDefaultsReset, setConfirmDefaultsReset] = useState(false);
  const [confirmGroupReset, setConfirmGroupReset] = useState(false);

  useEffect(() => {
    if (!data) return;
    const next: Record<number, DefaultDraft> = {};
    data.formats.forEach((format) => {
      next[format.format] = {
        auto: format.default_price_auto,
        price: format.default_price_auto ? "" : String(format.default_price),
      };
    });
    setDrafts(next);
  }, [data]);

  useEffect(() => {
    if (!data || !groupId) {
      setGroupDrafts({});
      return;
    }
    const next: Record<number, string> = {};
    data.formats.forEach((format) => {
      const group = format.groups.find((item) => item.group_id === groupId);
      next[format.format] = group ? String(group.price) : "";
    });
    setGroupDrafts(next);
  }, [data, groupId]);

  const notifyError = (error: unknown) => {
    toast({
      variant: "error",
      title: getApiErrorMessage(error, t("admin_panel.channel_prices.error")),
    });
  };

  const saveDefaults = async (prices: { format: number; price: number }[]) => {
    try {
      await setPrices({
        channel_id: channelId,
        group_id: null,
        prices,
      }).unwrap();
      setConfirmDefaultsReset(false);
      toast({
        variant: "success",
        title: t("admin_panel.channel_prices.saved"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onSaveDefaults = () => {
    if (!data) return;
    const prices: { format: number; price: number }[] = [];

    for (const format of data.formats) {
      const draft = drafts[format.format];
      if (!draft || draft.auto) continue;
      const price = parsePrice(draft.price);
      if (price == null) {
        toast({
          variant: "error",
          title: t("admin_panel.channel_prices.invalid_price"),
        });
        return;
      }
      prices.push({ format: format.format, price });
    }

    if (prices.length === 0) {
      setConfirmDefaultsReset(true);
      return;
    }

    void saveDefaults(prices);
  };

  const onSaveGroup = async () => {
    if (!data || !groupId) return;
    const prices: { format: number; price: number }[] = [];

    for (const format of data.formats) {
      const raw = groupDrafts[format.format] ?? "";
      if (!raw.trim()) continue;
      const price = parsePrice(raw);
      if (price == null) {
        toast({
          variant: "error",
          title: t("admin_panel.channel_prices.invalid_price"),
        });
        return;
      }
      prices.push({ format: format.format, price });
    }

    if (prices.length === 0) {
      toast({
        variant: "warning",
        title: t("admin_panel.channel_prices.empty_group_save"),
      });
      return;
    }

    try {
      await setPrices({
        channel_id: channelId,
        group_id: groupId,
        prices,
      }).unwrap();
      toast({
        variant: "success",
        title: t("admin_panel.channel_prices.saved"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onResetGroup = async () => {
    if (!groupId) return;
    try {
      await setPrices({
        channel_id: channelId,
        group_id: groupId,
        prices: [],
      }).unwrap();
      setConfirmGroupReset(false);
      toast({
        variant: "success",
        title: t("admin_panel.channel_prices.reset_done"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const labelOf = (format: number) => formatNames.get(format) ?? String(format);

  return (
    <section className="grid gap-4 rounded-lg border p-4">
      <div>
        <h3 className="text-base font-semibold">
          {t("admin_panel.channel_prices.title")}
        </h3>
        <p className="text-xs text-muted-foreground">
          {t("admin_panel.channel_prices.hint")}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-6">
          <SpinnerLoader />
        </div>
      ) : isError ? (
        <p className="text-sm text-destructive">
          {t("admin_panel.channel_prices.error")}
        </p>
      ) : !data?.formats.length ? (
        <p className="text-sm text-muted-foreground">
          {t("admin_panel.channel_prices.empty")}
        </p>
      ) : (
        <>
          <div className="grid gap-3">
            {data.formats.map((format) => (
              <FormatDefaultRow
                key={format.format}
                format={format}
                name={labelOf(format.format)}
                draft={drafts[format.format]}
                onChange={(next) =>
                  setDrafts((current) => ({
                    ...current,
                    [format.format]: next,
                  }))
                }
              />
            ))}
          </div>
          <Button type="button" disabled={isSaving} onClick={onSaveDefaults}>
            {t("admin_panel.channel_prices.save_default")}
          </Button>

          <div className="grid gap-3 border-t pt-4">
            <p className="text-sm font-semibold">
              {t("admin_panel.channel_prices.group_editor")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("admin_panel.channel_prices.group_hint")}
            </p>
            <Label htmlFor={`group-price-${channelId}`}>
              {t("admin_panel.channel_prices.group")}
            </Label>
            <select
              id={`group-price-${channelId}`}
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={groupId}
              onChange={(event) => setGroupId(event.target.value)}
            >
              <option value="">
                {t("admin_panel.channel_prices.select_group")}
              </option>
              {(groupsData?.groups ?? []).map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

            {groupId &&
              data.formats.map((format) => {
                const value = groupDrafts[format.format] ?? "";
                const parsed = parsePrice(value);
                const below =
                  parsed != null && parsed < format.blogger_price;
                return (
                  <div
                    key={format.format}
                    className={`grid gap-2 rounded-md border p-3 sm:grid-cols-[1fr_180px] ${
                      below ? "border-amber-400 bg-amber-50" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {labelOf(format.format)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("admin_panel.channel_prices.blogger_price")}:{" "}
                        {format.blogger_price.toLocaleString()} {t("symbol")}
                      </p>
                      {below && (
                        <p className="text-xs text-amber-800">
                          {t("admin_panel.channel_prices.below_blogger")}
                        </p>
                      )}
                    </div>
                    <Input
                      inputMode="numeric"
                      value={value}
                      placeholder={t("admin_panel.channel_prices.group_price")}
                      onChange={(event) =>
                        setGroupDrafts((current) => ({
                          ...current,
                          [format.format]: event.target.value,
                        }))
                      }
                    />
                  </div>
                );
              })}

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                disabled={!groupId || isSaving}
                onClick={onSaveGroup}
              >
                {t("admin_panel.channel_prices.save_group")}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!groupId || isSaving}
                onClick={() => setConfirmGroupReset(true)}
              >
                {t("admin_panel.channel_prices.reset_group")}
              </Button>
            </div>
          </div>
        </>
      )}

      <AlertDialog
        open={confirmDefaultsReset}
        onOpenChange={setConfirmDefaultsReset}
      >
        <AlertDialogContent className="w-[90%] max-w-[400px] gap-5 rounded-[25px] bg-white p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("admin_panel.channel_prices.save_default")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin_panel.channel_prices.reset_defaults_confirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 sm:justify-end">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline" disabled={isSaving}>
                {t("admin_panel.user_groups.cancel")}
              </Button>
            </AlertDialogCancel>
            <Button
              type="button"
              disabled={isSaving}
              onClick={() => saveDefaults([])}
            >
              {t("admin_panel.channel_prices.save_default")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={confirmGroupReset} onOpenChange={setConfirmGroupReset}>
        <AlertDialogContent className="w-[90%] max-w-[400px] gap-5 rounded-[25px] bg-white p-6">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("admin_panel.channel_prices.reset_group")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin_panel.channel_prices.reset_confirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 sm:justify-end">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline" disabled={isSaving}>
                {t("admin_panel.user_groups.cancel")}
              </Button>
            </AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={isSaving}
              onClick={onResetGroup}
            >
              {t("admin_panel.channel_prices.reset_group")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

const FormatDefaultRow: FC<{
  format: IChannelPrices["formats"][number];
  name: string;
  draft?: DefaultDraft;
  onChange: (next: DefaultDraft) => void;
}> = ({ format, name, draft, onChange }) => {
  const { t } = useTranslation();
  const auto = draft?.auto ?? format.default_price_auto;
  const priceText = draft?.price ?? "";
  const parsed = parsePrice(priceText);
  const shown = auto ? format.default_price : parsed;
  const below = shown != null && shown < format.blogger_price;

  return (
    <div
      className={`grid gap-3 rounded-md border p-3 ${
        below ? "border-amber-400 bg-amber-50" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            {t("admin_panel.channel_prices.blogger_price")}:{" "}
            {format.blogger_price.toLocaleString()} {t("symbol")}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {auto
            ? t("admin_panel.channel_prices.auto")
            : t("admin_panel.channel_prices.manual")}
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={auto}
          onCheckedChange={(checked) =>
            onChange({
              auto: checked === true,
              price:
                checked === true
                  ? ""
                  : priceText || String(format.default_price),
            })
          }
        />
        {t("admin_panel.channel_prices.auto_toggle")}
      </label>

      {!auto && (
        <Input
          inputMode="numeric"
          value={priceText}
          onChange={(event) =>
            onChange({ auto: false, price: event.target.value })
          }
        />
      )}

      {auto && (
        <p className="text-sm">
          {format.default_price.toLocaleString()} {t("symbol")}
        </p>
      )}

      {below && (
        <p className="text-xs text-amber-800">
          {t("admin_panel.channel_prices.below_blogger")}
        </p>
      )}

      <div>
        <p className="text-xs text-muted-foreground">
          {t("admin_panel.channel_prices.groups")}
        </p>
        {format.groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t("admin_panel.channel_prices.no_groups")}
          </p>
        ) : (
          <ul className="mt-1 grid gap-1">
            {format.groups.map((group) => {
              const groupBelow = group.price < format.blogger_price;
              return (
                <li
                  key={group.group_id}
                  className={`text-sm ${groupBelow ? "text-amber-800" : ""}`}
                >
                  {group.group_name}: {group.price.toLocaleString()}{" "}
                  {t("symbol")}
                  {groupBelow
                    ? ` · ${t("admin_panel.channel_prices.below_blogger")}`
                    : ""}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
