import { InfoIcon } from "@shared/assets";
import {
  IAddProfileData,
  IBlockData,
  IParameterData,
} from "@shared/types/common";
import { MyInput } from "@shared/ui";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ProfileDataProps {
  data: IBlockData;
  onChange: UseFormSetValue<IAddProfileData>;
}

export const ProfileData: FC<ProfileDataProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  const handleDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: keyof IAddProfileData,
  ) => {
    const selectedValue = event.target.value;
    onChange(type, selectedValue);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p>{t(data.title)}</p>
      </div>
      <div className={styles.parameters}>
        {data.parameters.map((row, index) => {
          const row_dict: IParameterData = t(row.data, { returnObjects: true });

          return (
            <div className={styles.row} key={index}>
              <div className={styles.left}>
                <span>{row_dict.title}</span>
                <InfoIcon />
              </div>

              <div className={styles.right}>
                <MyInput
                  onChange={(event) => handleDataChange(event, row.type)}
                  placeholder={row_dict.default_value}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
