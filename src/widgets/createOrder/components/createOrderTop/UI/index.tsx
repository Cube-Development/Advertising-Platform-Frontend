import { CreatePostData, ICreatePostForm } from "@entities/project";
import {
  ArrowLongHorizontalIcon,
  CreateIcon,
  PencilIcon,
} from "@shared/assets";
import { useToast } from "@shared/ui";
import { ICreateOrderBlur } from "@widgets/createOrder/model";
import { FC } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CreateOrderTopProps {
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  register: UseFormRegister<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const CreateOrderTop: FC<CreateOrderTopProps> = ({
  onChangeBlur,
  register,
  getValues,
  formState,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleOnChangeBlur = () => {
    if (getValues("name")) {
      onChangeBlur("post");
    } else {
      toast({
        variant: "error",
        title: t("toasts.create_order.top.title_empty_error"),
      });
    }
  };

  return (
    <div className="layout -mt-[100px] pt-[100px]">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.icon}>
              <CreateIcon />
            </div>
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
                    autoFocus
                    type="text"
                    placeholder={t("create_order.name.default_value")}
                    value={formState?.name}
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
