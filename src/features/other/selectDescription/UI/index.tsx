import { channelParameterData } from "@entities/channel";
import { InfoTooltip } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectDescriptionProps {
  title: string;
  text?: string;
  placeholder: string;
  onChange: UseFormSetValue<any>;
  defaultValues?: string;
  type: channelParameterData;
  isCatalog?: boolean;
}

export const SelectDescription: FC<SelectDescriptionProps> = ({
  title,
  text,
  placeholder,
  onChange,
  defaultValues,
  type,
  isCatalog,
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

  useEffect(() => {
    if (defaultValues) {
      setDescription(defaultValues);
      setRemainingCharacters(defaultValues.length);
    }
  }, [defaultValues]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.title} ${isCatalog && styles.is_catalog}`}>
        <p>{t(title)}</p>
        {text && <InfoTooltip text={t(text)} />}
      </div>
      <div className={styles.field}>
        <textarea
          id="input"
          value={description}
          rows={9}
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
