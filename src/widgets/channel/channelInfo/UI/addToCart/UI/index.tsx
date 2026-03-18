import { IReadChannelData } from "@entities/channel";
import { ICatalogChannel, IFormat } from "@entities/project";
import { FormatList } from "@features/catalog";
import { MyButton } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AddToCartProps {
  card: IReadChannelData;
  selectedFormat: IFormat;
  changeFormat: (selectedValue: IFormat) => void;
  onChange: () => void;
  isLoading: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({
  card,
  selectedFormat,
  changeFormat,
  onChange,
  isLoading,
}) => {
  const { t } = useTranslation();
  const inBasket = Boolean(card?.selected_format);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className="truncate">{t("channel.add_to_cart.title")}</p>
      </div>
      <div className={styles.format}>
        <p>{t("channel.add_to_cart.format")}</p>
        <div
        // className={`${styles.formatList__wrapper} !p-2 !border-[--Personal-colors-main] !rounded-[10px] !border-[1.5px]`}
        >
          <FormatList
            selectedFormat={selectedFormat}
            changeFormat={changeFormat}
            card={card as unknown as ICatalogChannel}
            isBig={true}
          />
        </div>
      </div>
      <div className={styles.price}>
        <p>{t("channel.add_to_cart.price")}</p>
        <span>
          {selectedFormat?.price.toLocaleString()} {t("symbol")}
        </span>
      </div>
      <MyButton
        className={styles.button}
        buttons_type={`${inBasket ? "button__green" : "button__blue"}`}
        onClick={onChange}
        disabled={isLoading}
      >
        {inBasket ? (
          <p>{t("channel.add_to_cart.remove")}</p>
        ) : (
          <p>{t("channel.add_to_cart.add")}</p>
        )}
        {isLoading && <Loader className="size-4 animate-spin text-white" />}
      </MyButton>
    </div>
  );
};
