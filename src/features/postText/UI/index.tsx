import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { ArrowIcon, PencilIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";

interface PostTextProps {
  placeholder: string;
  rows: number;
  maxLength: number;
  //   onChange: any;
}

export const PostText: FC<PostTextProps> = ({
  placeholder,
  rows,
  maxLength,
}) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setRemainingCharacters(newDescription.length);
    // onChange("description", newDescription);
  };

  return (
    <div className={styles.wrapper}>
      <PencilIcon />
      <textarea
        id="input"
        value={description}
        rows={rows}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={t(placeholder)}
      />
    </div>
  );
};
