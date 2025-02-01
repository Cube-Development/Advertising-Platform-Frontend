import {
  IBlockData,
  IParameterData,
  getInputLegalLength,
  getInputLegalType,
} from "@entities/wallet";
import { InfoTooltip } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

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
      <p className={styles.title}>{t(data.title)}</p>
      <div className={styles.parameters}>
        {data.parameters.map((row, index) => {
          const newValidate = {
            ...row.validate,
            required: t(row.validate.required),
          };
          const row_dict = t(row.label, {
            returnObjects: true,
          }) as IParameterData;
          return (
            <div
              className={`${styles.row} ${isCreateProfile ? styles.createProfile : ""}`}
              key={index}
            >
              <div className={styles.left}>
                <span>{row_dict.title}</span>
                <InfoTooltip text={row_dict?.description} />
              </div>
              <div className={styles.right}>
                <input
                  placeholder={row_dict.default_value}
                  className={`${styles.input} ${inputError[row.type] && styles.error}`}
                  {...register(row.type, newValidate)}
                  type={getInputLegalType(row.type)}
                  onInput={(e) => {
                    if (
                      e.currentTarget.value.length >
                      getInputLegalLength(row.type)
                    ) {
                      e.currentTarget.value = e.currentTarget.value.slice(
                        0,
                        getInputLegalLength(row.type),
                      );
                    }
                  }}
                />
                {inputError[row.type] && (
                  <p className={styles.error_text}>
                    {t(inputError[row.type].message)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
