import { CartMinusIcon, CartPlusIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IAddToBasketProps } from "@entities/project";

export const AddToBasket: FC<IAddToBasketProps> = ({
  FormatList,
  changeFormat,
  changeCard,
  card,
  page,
  selectedFormat,
  isSmall,
  isSmallCatalogCard,
}) => {
  const { t } = useTranslation();

  if (isSmallCatalogCard) {
    return (
      <MyButton
        buttons_type={
          !card.selected_format && !page
            ? "button__blue"
            : page
              ? "button__yellow"
              : "button__green"
        }
        className="mobile-xl:px-3 mobile-xl:py-2 p-1 mobile-xl:rounded-[7px] rounded-[5px] mobile-xl:w-[150px] mobile:w-[120px] w-[100px] !justify-items-end !justify-end"
        onClick={changeCard}
      >
        <div className="grid grid-flow-row items-center justify-end justify-items-end gap-1">
          <div className="mobile-xl:font-medium font-semibold mobile-xl:text-xs mobile:text-[10px] text-[9px] grid grid-cols-[1fr,auto] justify-items-center items-center mobile-xl:gap-2 gap-1 w-fit">
            <span className="text-start">
              {selectedFormat?.price?.toLocaleString()}
            </span>
            <span className="mobile-xl:size-5 size-3.5">
              {page || card.selected_format ? (
                <CartMinusIcon />
              ) : (
                <CartPlusIcon />
              )}
            </span>
          </div>
          <FormatList
            isSmall={isSmall}
            selectedFormat={selectedFormat}
            changeFormat={changeFormat}
            card={card}
            isSmallCatalogCard={isSmallCatalogCard}
          />
        </div>
      </MyButton>
    );
  }

  return (
    <MyButton
      buttons_type={
        !card.selected_format && !page
          ? "button__blue"
          : page
            ? "button__yellow"
            : "button__green"
      }
      className={styles.button}
      onClick={changeCard}
    >
      <FormatList
        isSmall={isSmall}
        selectedFormat={selectedFormat}
        changeFormat={changeFormat}
        card={card}
      />
      <div className={styles.price}>
        {selectedFormat?.price?.toLocaleString()} {t("symbol")}
        {page || card.selected_format ? <CartMinusIcon /> : <CartPlusIcon />}
      </div>
    </MyButton>
  );
};
