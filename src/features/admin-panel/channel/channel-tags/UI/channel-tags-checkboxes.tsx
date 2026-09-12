import { useAdminChannelTagsMutation } from "@entities/admin-panel";
import {
  CHANNEL_TAG_I18N,
  ENUM_CHANNEL_TAG,
  IChannelTag,
} from "@entities/project";
import { useToast } from "@shared/ui";
import { Button, Checkbox, Label } from "@shared/ui/shadcn-ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IChannelTagsCheckboxesProps {
  channelId: string;
  tags?: IChannelTag[];
}

const CHANNEL_TAGS = [
  ENUM_CHANNEL_TAG.CREDIT,
  ENUM_CHANNEL_TAG.BNPL,
  ENUM_CHANNEL_TAG.REPOST,
] as const;

const isTagEnabled = (
  tags: IChannelTag[] | undefined,
  tag: ENUM_CHANNEL_TAG,
): boolean => tags?.find((item) => item.tag === tag)?.state ?? false;

const getEnabledTagIds = (
  tags: IChannelTag[] | undefined,
): ENUM_CHANNEL_TAG[] => CHANNEL_TAGS.filter((tag) => isTagEnabled(tags, tag));

export const ChannelTagsCheckboxes: FC<IChannelTagsCheckboxesProps> = ({
  channelId,
  tags,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [updateTags, { isLoading }] = useAdminChannelTagsMutation();
  const savedTags = getEnabledTagIds(tags);
  const [selectedTags, setSelectedTags] =
    useState<ENUM_CHANNEL_TAG[]>(savedTags);

  useEffect(() => {
    setSelectedTags(getEnabledTagIds(tags));
  }, [channelId, tags]);

  const isDirty = selectedTags.join() !== savedTags.join();

  const handleToggle = (tag: ENUM_CHANNEL_TAG, checked: boolean) => {
    if (isLoading) return;

    setSelectedTags((prev) => {
      const next = new Set(prev);

      if (checked) {
        next.add(tag);
      } else {
        next.delete(tag);
      }

      return CHANNEL_TAGS.filter((item) => next.has(item));
    });
  };

  const handleSave = async () => {
    if (isLoading || !channelId || !isDirty) return;

    try {
      await updateTags({
        channel_id: channelId,
        tags: selectedTags,
      }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.admin.channel.tags.success"),
      });
    } catch {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.tags.error"),
      });
    }
  };

  return (
    <div className="rounded-lg border p-3 sm:p-4">
      <p className="text-xs text-muted-foreground">
        {t("admin_panel.channels.card.tags.title")}
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {CHANNEL_TAGS.map((tag) => {
            const inputId = `admin-channel-tag-${channelId}-${tag}`;

            return (
              <div key={tag} className="flex items-center gap-2">
                <Checkbox
                  id={inputId}
                  checked={selectedTags.includes(tag)}
                  disabled={isLoading}
                  onCheckedChange={(checked) => {
                    handleToggle(tag, checked === true);
                  }}
                  className="border-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white [&_svg]:h-3 [&_svg]:w-3"
                />
                <Label htmlFor={inputId} className="cursor-pointer">
                  {t(CHANNEL_TAG_I18N[tag])}
                </Label>
              </div>
            );
          })}
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={!isDirty || isLoading}
          onClick={handleSave}
        >
          {t("admin_panel.channels.card.tags.save")}
        </Button>
      </div>
    </div>
  );
};
