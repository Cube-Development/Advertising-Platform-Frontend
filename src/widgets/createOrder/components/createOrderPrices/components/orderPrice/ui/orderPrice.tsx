import { CustomInput, useToast } from "@shared/ui";
import { formatWithSpaces } from "@shared/utils";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface OrderPriceProps {
  order_price: number;
  price: number;
  setPrice: (price: number) => void;
}

export const OrderPrice: FC<OrderPriceProps> = ({
  order_price,
  price,
  setPrice,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState(
    formatWithSpaces(price.toString()),
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(formatWithSpaces(price.toString()));
  }, [price]);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(formatWithSpaces(value));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const cleanedValue = value.replace(/\s/g, "");
      const numericValue = Number(cleanedValue);

      if (!isNaN(numericValue)) {
        if (numericValue < order_price) {
          toast({
            variant: "error",
            title: t("create_order.prices.error_description"),
          });
          setPrice(order_price);
          setInputValue(formatWithSpaces(order_price.toString()));
        } else {
          setPrice(numericValue);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <CustomInput
      label={t("create_order.prices.input_label")}
      type="text"
      placeholder={t("create_order.prices.input_placeholder")}
      value={inputValue}
      onChange={handleChangePrice}
      maxLength={12}
      information={t("create_order.prices.error_description")}
    />
  );
};
