import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { InfoIcon } from "@shared/assets";
import { UseFormSetValue } from "react-hook-form";
import { IAddPLatformData } from "@shared/types/common";

interface SelectDescriptionProps {
  title: string;
  text: string;
  onChange: UseFormSetValue<IAddPLatformData>;
}

export const SelectDescription: FC<SelectDescriptionProps> = ({
  title,
  text,
  onChange,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setRemainingCharacters(newDescription.length);
    onChange("description", newDescription);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        <InfoIcon />
      </div>
      <div className={styles.field}>
        <textarea
          id="input"
          value={description}
          rows={10}
          onChange={handleChange}
          maxLength={1000}
          placeholder={t("add_platform.default_input")}
        />
        <div>
          {remainingCharacters}/{1000}
        </div>
      </div>
    </div>
  );
};
