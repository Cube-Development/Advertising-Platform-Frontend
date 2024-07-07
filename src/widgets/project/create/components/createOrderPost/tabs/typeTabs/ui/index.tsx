import clsx from "clsx";
import styles from "./styles.module.scss";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { ICreatePostForm } from "@shared/types/createPost";
import { useTranslation } from "react-i18next";

interface TypeTabsProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const TypeTabs: FC<TypeTabsProps> = ({ formState, setValue }) => {
  const { t } = useTranslation();
  return (
    <ul className={styles.post_type_filter}>
      <li
        className={clsx("", {
          [styles.active__type]: !formState.isMultiPost,
        })}
        onClick={() => {
          setValue("isMultiPost", false);
          setValue("selectedMultiPostId", null);
        }}
      >
        {t("create_order.create.universal_post")}
      </li>
      <li
        className={clsx("", {
          [styles.active__type]: formState.isMultiPost,
        })}
        onClick={() => setValue("isMultiPost", true)}
      >
        {t("create_order.create.multi_post")}
      </li>
    </ul>
  );
};
