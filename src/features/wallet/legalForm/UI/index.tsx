import {
  IBlockData,
  IParameterData,
  getInputLegalLength,
  getInputLegalType,
} from "@entities/wallet";
import { CustomInput } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface LegalFormProps {
  data: IBlockData;
  register?: any;
  inputError?: any;
  isRow?: boolean;
}

export const LegalForm: FC<LegalFormProps> = ({
  data,
  register,
  inputError,
  isRow,
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
            <CustomInput
              key={index + row.type}
              isRow={isRow}
              label={row_dict.title}
              information={row_dict.description}
              error={inputError[row.type]}
              error_message={t(inputError[row.type]?.message)}
              placeholder={row_dict.default_value}
              {...register(row.type, newValidate)}
              type={getInputLegalType(row.type)}
              // disabled
              onInput={(e) => {
                if (
                  e.currentTarget.value.length > getInputLegalLength(row.type)
                ) {
                  e.currentTarget.value = e.currentTarget.value.slice(
                    0,
                    getInputLegalLength(row.type),
                  );
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
