import { FC, useMemo } from "react";
import { PenLine, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { SegmentSwitcher } from "@shared/ui";

export type PostSource = "manual" | "ai";

interface PostSourceTabsProps {
  value: PostSource;
  onChange: (value: PostSource) => void;
  disabled?: boolean;
}

export const PostSourceTabs: FC<PostSourceTabsProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        value: "manual" as const,
        label: t("create_order.create.post_source.manual"),
        icon: <PenLine strokeWidth={2} />,
      },
      {
        value: "ai" as const,
        label: t("create_order.create.post_source.ai"),
        icon: <Sparkles strokeWidth={2} />,
      },
    ],
    [t],
  );

  return (
    <SegmentSwitcher
      value={value}
      options={options}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
