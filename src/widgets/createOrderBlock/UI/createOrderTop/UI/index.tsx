import {
  ArrowLongHorizontalIcon,
  CreateIcon,
  PencilIcon,
} from "@shared/assets";
import { CreatePostData } from "@shared/config/createPostData";
import { ICreateOrderBlur } from "@shared/types/platform";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreateOrderTopProps {
  // onChange: UseFormSetValue<IOrder>;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  register: any;
}

export const CreateOrderTop: FC<CreateOrderTopProps> = ({
  onChangeBlur,
  register,
}) => {
  const { t } = useTranslation();

  const handleOnChangeBlur = () => {
    onChangeBlur("post");
  };

  return (
    <div className="layout">
      <div className="container">
        <div className={styles.wrapper}>
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
                    placeholder={t("create_order.name.default_value")}
                    onKeyDown={(event) => {
                      event.key === "Enter" && handleOnChangeBlur();
                    }}
                    {...register(CreatePostData.name)}
                  />
                </div>
                <button onClick={handleOnChangeBlur}>
                  <ArrowLongHorizontalIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
