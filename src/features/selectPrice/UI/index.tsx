import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { InfoIcon } from "@shared/assets";
import { IChannelFormat } from "@shared/types/platform";

interface SelectPriceProps {
  title: string;
  text: string;
  info: string;
  formats?: IChannelFormat[];
  AccommPrice: FC<IChannelFormat>;
}

export const SelectPrice: FC<SelectPriceProps> = ({
  title,
  text,
  formats,
  AccommPrice,
  info,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        <InfoIcon />
      </div>
      <hr />
      <div className={styles.info}>
        <p>{t(info)}</p>
      </div>
      <div className={styles.accomms}>
        {formats &&
          formats.map((format, index) => (
            <AccommPrice
              small={format.small}
              id={format.id}
              big={format.big}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};
