import {
  IAddChannelData,
  IAddFormat,
  IChannelFormat,
  IFormatPriceProps,
  channelParameterData,
} from "@entities/channel";
import { InfoIcon } from "@shared/assets";
import { FC } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectPriceProps {
  title: string;
  text: string;
  info: string;
  type: channelParameterData;
  formats?: IChannelFormat[];
  AccommPrice: FC<IFormatPriceProps>;
  onChange: UseFormSetValue<any>;
  defaultValues?: IAddFormat[];
  getValues: UseFormGetValues<any>;
}

export const SelectPrice: FC<SelectPriceProps> = ({
  title,
  text,
  formats,
  AccommPrice,
  info,
  onChange,
  getValues,
  type,
  defaultValues,
}) => {
  const { t } = useTranslation();

  const handleChangeFormatPrice = (format: IAddFormat) => {
    const form: IAddChannelData = { ...getValues() };
    const currentFormats = [...(form.format || [])];
    const newFormats = currentFormats.filter(
      (item) => item.name !== format.name,
    );
    format.price !== 0 && newFormats.push(format);
    onChange(type, newFormats);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        <InfoIcon />
      </div>
      <div
        className={`${styles.accomms} ${formats?.length === 4 ? styles.max : styles.min} `}
      >
        {formats &&
          formats?.map((format, index) => (
            <AccommPrice
              small={format?.small}
              id={format?.id}
              big={format?.big}
              key={index}
              onChange={handleChangeFormatPrice}
              defaultValue={
                defaultValues?.find((value) => value.name === format?.id)?.price
              }
            />
          ))}
      </div>
    </div>
  );
};
