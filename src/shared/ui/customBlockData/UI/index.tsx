import { CustomInput, IBlockData, IParameterData } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { getInputLegalLength, getInputLegalType } from "@entities/wallet";

interface LegalFormProps {
  data: IBlockData;
  register?: any;
  inputError?: any;
  isRow?: boolean;
  disabled?: boolean;
}

export const CustomBlockData: FC<LegalFormProps> = ({
  data,
  register,
  inputError,
  isRow,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      {data?.title && <p className={styles.title}>{t(data?.title)}</p>}
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
              disabled={disabled}
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
