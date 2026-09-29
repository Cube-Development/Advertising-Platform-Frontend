import {
  getApiErrorMessage,
  useCreateUserGroupMutation,
  useDeleteUserGroupMutation,
  useGetUserGroupsQuery,
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
  Label,
  SpinnerLoader,
  useToast,
} from "@shared/ui";
import { FC, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "./confirm-dialog";

const NAME_MAX = 255;

export const UserGroups: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { data, isLoading, isError } = useGetUserGroupsQuery();
  const [createGroup, { isLoading: isCreating }] = useCreateUserGroupMutation();
  const [renameGroup, { isLoading: isRenaming }] = useRenameUserGroupMutation();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteUserGroupMutation();

  const [name, setName] = useState("");
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const notifyError = (error: unknown) => {
    toast({
      variant: "error",
      title: getApiErrorMessage(error, t("admin_panel.user_groups.error")),
    });
  };

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName || nextName.length > NAME_MAX) return;

    try {
      await createGroup({ name: nextName }).unwrap();
      setName("");
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.created_success"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onRename = async () => {
    const nextName = renameValue.trim();
    if (!renameId || !nextName || nextName.length > NAME_MAX) return;

    try {
      await renameGroup({ group_id: renameId, name: nextName }).unwrap();
      setRenameId(null);
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.renamed_success"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  const onDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteGroup({ group_id: deleteId }).unwrap();
      setDeleteId(null);
      toast({
        variant: "success",
        title: t("admin_panel.user_groups.deleted_success"),
      });
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("admin_panel.user_groups.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onCreate} className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1 space-y-1.5">
              <Label htmlFor="group-name">
                {t("admin_panel.user_groups.name")}
              </Label>
              <Input
                id="group-name"
                value={name}
                maxLength={NAME_MAX}
                placeholder={t("admin_panel.user_groups.name_placeholder")}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="sm:self-end"
              disabled={isCreating || !name.trim()}
            >
              {t("admin_panel.user_groups.create")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <SpinnerLoader />
        </div>
      ) : isError ? (
        <p className="text-sm text-destructive">
          {t("admin_panel.user_groups.error")}
        </p>
      ) : data?.groups?.length ? (
        <div className="grid gap-3">
          {data.groups.map((group) => (
            <Card key={group.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to={ENUM_PATHS.ADMIN_USER_GROUP_INFO.replace(":id", group.id)}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate font-semibold">{group.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("admin_panel.user_groups.members_count")}:{" "}
                    {group.members_count}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("admin_panel.user_groups.created")}: {group.created}
                    {" · "}
                    {t("admin_panel.user_groups.updated")}: {group.updated}
                  </p>
                </Link>
                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setRenameId(group.id);
                      setRenameValue(group.name);
                    }}
                  >
                    {t("admin_panel.user_groups.rename")}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setDeleteId(group.id)}
                  >
                    {t("admin_panel.user_groups.delete")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {t("admin_panel.user_groups.empty")}
        </p>
      )}

      <ConfirmDialog
        open={!!renameId}
        title={t("admin_panel.user_groups.rename")}
        description={t("admin_panel.user_groups.name")}
        confirmLabel={t("admin_panel.user_groups.save")}
        cancelLabel={t("admin_panel.user_groups.cancel")}
        pending={isRenaming}
        onOpenChange={(open) => {
          if (!open) setRenameId(null);
        }}
        onConfirm={onRename}
      >
        <Input
          value={renameValue}
          maxLength={NAME_MAX}
          onChange={(event) => setRenameValue(event.target.value)}
        />
      </ConfirmDialog>

      <ConfirmDialog
        open={!!deleteId}
        title={t("admin_panel.user_groups.delete")}
        description={t("admin_panel.user_groups.delete_confirm")}
        confirmLabel={t("admin_panel.user_groups.delete")}
        cancelLabel={t("admin_panel.user_groups.cancel")}
        destructive
        pending={isDeleting}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        onConfirm={onDelete}
      />
    </div>
  );
};
