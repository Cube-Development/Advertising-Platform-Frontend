import {
  getApiErrorMessage,
  IAdminUserData,
  useAddUserGroupMembersMutation,
  useGetAdminUsersQuery,
  useGetUserGroupQuery,
  useRemoveUserGroupMembersMutation,
  useRenameUserGroupMutation,
} from "@entities/admin-panel";
import { useClearCookiesOnPage } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  SpinnerLoader,
  useToast,
} from "@shared/ui";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useFormatNames } from "../model/useFormatNames";
import { ConfirmDialog } from "./confirm-dialog";

const NAME_MAX = 255;

export const UserGroupInfo: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { id: groupId = "" } = useParams<{ id: string }>();
  const formatNames = useFormatNames();

  const { data, isLoading, isError } = useGetUserGroupQuery(
    { group_id: groupId },
    { skip: !groupId },
  );
  const [renameGroup, { isLoading: isRenaming }] = useRenameUserGroupMutation();
  const [addMembers, { isLoading: isAdding }] = useAddUserGroupMembersMutation();
  const [removeMembers, { isLoading: isRemoving }] =
    useRemoveUserGroupMembersMutation();

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected] = useState<IAdminUserData[]>([]);
  const [attachOpen, setAttachOpen] = useState(false);
  const [detachId, setDetachId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const { data: users, isFetching: isUsersLoading } = useGetAdminUsersQuery(
    { elements_on_page: 20, search: debouncedSearch },
    { skip: debouncedSearch.length < 2 },
  );

  const memberIds = useMemo(
    () => new Set(data?.members?.map((member) => member.user_id) ?? []),
    [data?.members],
  );

  const searchResults = (users?.users ?? []).filter(
    (user) => !memberIds.has(user.user_id),
  );

  const notifyError = (error: unknown) => {
    toast({
      variant: "error",
      title: getApiErrorMessage(error, t("admin_panel.user_groups.error")),
    });
  };

  const onRename = async () => {
    const nextName = renameValue.trim();
    if (!groupId || !nextName || nextName.length > NAME_MAX) return;

    try {
      await renameGroup({ group_id: groupId, name: nextName }).unwrap();
      setRenameOpen(false);
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.renamed_success"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onAttach = async () => {
    if (!groupId || selected.length === 0) return;

    try {
      await addMembers({
        group_id: groupId,
        user_ids: selected.map((user) => user.user_id),
      }).unwrap();
      setSelected([]);
      setSearch("");
      setAttachOpen(false);
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.members_added"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onDetach = async () => {
    if (!groupId || !detachId) return;

    try {
      await removeMembers({
        group_id: groupId,
        user_ids: [detachId],
      }).unwrap();
      setDetachId(null);
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.members_removed"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const toggleUser = (user: IAdminUserData) => {
    setSelected((current) =>
      current.some((item) => item.user_id === user.user_id)
        ? current.filter((item) => item.user_id !== user.user_id)
        : [...current, user],
    );
  };

  if (!groupId) return null;

  return (
    <div className="flex w-full flex-col gap-4 p-4 sm:p-6">
      <Link
        to={ENUM_PATHS.ADMIN_USER_GROUPS}
        className="text-sm text-[var(--URL)]"
      >
        {t("admin_panel.user_groups.back")}
      </Link>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <SpinnerLoader />
        </div>
      ) : isError || !data ? (
        <p className="text-sm text-destructive">
          {t("admin_panel.user_groups.error")}
        </p>
      ) : (
        <>
          <Card>
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{data.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {t("admin_panel.user_groups.created")}: {data.created}
                  {" · "}
                  {t("admin_panel.user_groups.updated")}: {data.updated}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRenameValue(data.name);
                  setRenameOpen(true);
                }}
              >
                {t("admin_panel.user_groups.rename")}
              </Button>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("admin_panel.user_groups.members")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={search}
                  placeholder={t("admin_panel.user_groups.search_users")}
                  onChange={(event) => setSearch(event.target.value)}
                />
                {debouncedSearch.length < 2 ? (
                  <p className="text-xs text-muted-foreground">
                    {t("admin_panel.user_groups.search_hint")}
                  </p>
                ) : isUsersLoading ? (
                  <SpinnerLoader />
                ) : searchResults.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("admin_panel.user_groups.no_users")}
                  </p>
                ) : (
                  <div className="max-h-56 overflow-auto rounded-md border">
                    {searchResults.map((user) => {
                      const checked = selected.some(
                        (item) => item.user_id === user.user_id,
                      );
                      return (
                        <button
                          key={user.user_id}
                          type="button"
                          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted/50"
                          onClick={() => toggleUser(user)}
                        >
                          <span className="min-w-0">
                            <span className="block truncate font-medium">
                              {user.name || user.email}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {user.email}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {checked ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <Button
                  type="button"
                  disabled={selected.length === 0 || isAdding}
                  onClick={() => setAttachOpen(true)}
                >
                  {t("admin_panel.user_groups.attach")}
                  {selected.length > 0 ? ` (${selected.length})` : ""}
                </Button>
              </div>

              {data.members.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("admin_panel.user_groups.no_members")}
                </p>
              ) : (
                <div className="grid gap-2">
                  {data.members.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {member.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.created}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDetachId(member.user_id)}
                      >
                        {t("admin_panel.user_groups.detach")}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("admin_panel.user_groups.prices")}</CardTitle>
            </CardHeader>
            <CardContent>
              {data.prices.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {t("admin_panel.user_groups.no_prices")}
                </p>
              ) : (
                <div className="grid gap-2">
                  {data.prices.map((item) => {
                    const below = item.price < item.blogger_price;
                    return (
                      <div
                        key={`${item.channel_id}-${item.format}`}
                        className={`grid gap-2 rounded-md border p-3 sm:grid-cols-4 ${
                          below ? "border-amber-400 bg-amber-50" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            {t("admin_panel.user_groups.channel")}
                          </p>
                          <a
                            href={item.channel_url}
                            target="_blank"
                            rel="noreferrer"
                            className="block truncate text-sm font-medium text-[var(--URL)]"
                          >
                            {item.channel_name}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("admin_panel.user_groups.format")}
                          </p>
                          <p className="text-sm font-medium">
                            {formatNames.get(item.format) ?? item.format}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("admin_panel.user_groups.blogger_price")}
                          </p>
                          <p className="text-sm font-medium">
                            {item.blogger_price.toLocaleString()} {t("symbol")}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t("admin_panel.user_groups.group_price")}
                          </p>
                          <p className="text-sm font-medium">
                            {item.price.toLocaleString()} {t("symbol")}
                          </p>
                          {below && (
                            <p className="text-xs text-amber-800">
                              {t("admin_panel.user_groups.below_blogger")}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <ConfirmDialog
        open={renameOpen}
        title={t("admin_panel.user_groups.rename")}
        description={t("admin_panel.user_groups.name")}
        confirmLabel={t("admin_panel.user_groups.save")}
        cancelLabel={t("admin_panel.user_groups.cancel")}
        pending={isRenaming}
        onOpenChange={setRenameOpen}
        onConfirm={onRename}
      >
        <Input
          value={renameValue}
          maxLength={NAME_MAX}
          onChange={(event) => setRenameValue(event.target.value)}
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={attachOpen}
        title={t("admin_panel.user_groups.attach")}
        description={t("admin_panel.user_groups.attach_confirm")}
        confirmLabel={t("admin_panel.user_groups.attach")}
        cancelLabel={t("admin_panel.user_groups.cancel")}
        pending={isAdding}
        onOpenChange={setAttachOpen}
        onConfirm={onAttach}
      />

      <ConfirmDialog
        open={!!detachId}
        title={t("admin_panel.user_groups.detach")}
        description={t("admin_panel.user_groups.detach_confirm")}
        confirmLabel={t("admin_panel.user_groups.detach")}
        cancelLabel={t("admin_panel.user_groups.cancel")}
        destructive
        pending={isRemoving}
        onOpenChange={(open) => {
          if (!open) setDetachId(null);
        }}
        onConfirm={onDetach}
      />
    </div>
  );
};
