import { FC, useMemo } from "react";
import { Copy, Split } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ICreatePostForm } from "@entities/project";
import { SegmentSwitcher } from "@shared/ui";

interface TypeTabsProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const TypeTabs: FC<TypeTabsProps> = ({ formState, setValue }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        value: "universal" as const,
        label: t("create_order.create.universal_post"),
        icon: <Copy strokeWidth={2} />,
      },
      {
        value: "multi" as const,
        label: t("create_order.create.multi_post"),
        icon: <Split strokeWidth={2} />,
      },
    ],
    [t],
  );

  const value = formState.isMultiPost ? "multi" : "universal";

  return (
    <SegmentSwitcher
      value={value}
      options={options}
      onChange={(next) => {
        if (next === "multi") {
          setValue("isMultiPost", true);
          return;
        }
        setValue("isMultiPost", false);
        setValue("selectedMultiPostId", null);
      }}
    />
  );
};
