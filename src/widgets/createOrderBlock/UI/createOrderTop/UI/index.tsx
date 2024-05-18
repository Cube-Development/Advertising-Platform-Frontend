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
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ICreatePostForm } from "@shared/types/createPost";

interface CreateOrderTopProps {
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  register: UseFormRegister<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
}

export const CreateOrderTop: FC<CreateOrderTopProps> = ({
  onChangeBlur,
  register,
  getValues,
}) => {
  const { t } = useTranslation();

  const handleOnChangeBlur = () => {
    if (getValues("name")) {
      onChangeBlur("post");
    }
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
                  <PencilIcon stroke="#fff" />
                  <input
                    type="text"
                    placeholder={t("create_order.name.default_value")}
                    onKeyDown={(event) => {
                      event.key === "Enter" && handleOnChangeBlur();
                    }}
                    {...register(CreatePostData.name, {
                      required: "Поля обязательное",
                    })}
                  />
                </div>
                <button type="button" onClick={handleOnChangeBlur}>
                  <ArrowLongHorizontalIcon className="active__icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
