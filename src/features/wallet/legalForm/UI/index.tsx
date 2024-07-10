import { InfoIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { getInputLegalType } from "@shared/functions";
import { IBlockData, IParameterData } from "@entities/wallet";

interface LegalFormProps {
  data: IBlockData;
  register?: any;
  inputError?: any;
  isCreateProfile?: boolean;
}

export const LegalForm: FC<LegalFormProps> = ({
  data,
  register,
  inputError,
  isCreateProfile,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div>
        <p>{t(data.title)}</p>
      </div>
      <div className={styles.parameters}>
        {data.parameters.map((row, index) => {
          const newValidate = {
            ...row.validate,
            required: t(row.validate.required),
          };
          const row_dict: IParameterData = t(row.label, {
            returnObjects: true,
          });
          return (
            <div
              className={`${styles.row} ${isCreateProfile ? styles.createProfile : ""}`}
              key={index}
            >
              <div className={styles.left}>
                <span>{row_dict.title}</span>
                <InfoIcon />
              </div>
              <div className={styles.right}>
                <input
                  placeholder={
                    inputError[row.type]
                      ? newValidate.required
                      : row_dict.default_value
                  }
                  className={`${styles.input} ${inputError[row.type] && styles.error}`}
                  {...register(row.type, newValidate)}
                  type={getInputLegalType(row.type)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
