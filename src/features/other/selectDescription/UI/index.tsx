import { InfoIcon } from "@shared/assets";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { channelData } from "@entities/channel";

interface SelectDescriptionProps {
  title: string;
  text?: string;
  placeholder: string;
  onChange: UseFormSetValue<any>;
  defaultValues?: string;
  type: channelData;
}

export const SelectDescription: FC<SelectDescriptionProps> = ({
  title,
  text,
  placeholder,
  onChange,
  defaultValues,
  type,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState(defaultValues || "");
  const [remainingCharacters, setRemainingCharacters] = useState(
    defaultValues ? defaultValues.length : 0,
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setRemainingCharacters(newDescription.length);
    onChange(type, newDescription);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {text && <InfoIcon />}
      </div>
      <div className={styles.field}>
        <textarea
          id="input"
          value={description}
          rows={10}
          onChange={handleChange}
          maxLength={1000}
          placeholder={t(placeholder)}
        />
        <p>
          {remainingCharacters}/{1000}
        </p>
      </div>
    </div>
  );
};
