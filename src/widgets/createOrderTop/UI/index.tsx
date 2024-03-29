import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ArrowIcon2, CreateIcon, PencilIcon } from "@shared/assets";
import { UseFormSetValue } from "react-hook-form";
import { IOrder } from "@shared/types/createPost";
import { orderData } from "@shared/config/orderData";

interface CreateOrderTopProps {
  onChange: UseFormSetValue<IOrder>;
}

export const CreateOrderTop: FC<CreateOrderTopProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const [currentName, setName] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setName(selectedValue);
    console.log(selectedValue);
  };

  const handleDataChange = (type: keyof IOrder) => {
    if (currentName !== "") {
      onChange(type, currentName);
      console.log("clicked name");
    }
  };

  return (
    <div className="container">
      <div className={`${styles.wrapper}`}>
        <div className={styles.top}>
          <CreateIcon />
          <p>{t(`create_order.create_order`)}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>1</span>
            <p>{t("create_order.name.title")}</p>
          </div>
          <div>
            <div className={styles.wrapper__input}>
              <div className={styles.input}>
                <PencilIcon />
                <input
                  type="text"
                  onChange={(event) => handleOnChange(event)}
                  placeholder={t("create_order.name.default_value")}
                />
              </div>
              <button onClick={() => handleDataChange(orderData.name)}>
                <ArrowIcon2 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
