import { desireStatus, IManagerProjectSubcard } from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import { paths } from "@shared/routing";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export interface ChangePostProps {
  order: IManagerProjectSubcard;
  project_id: string;
}

export const ChangePost: FC<ChangePostProps> = ({ order, project_id }) => {
  const { t } = useTranslation();

  const haveDesire = !!order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_post_request,
  );

  const text = order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_post_request,
  )?.comment;

  const handleOnClick = () => {
    Cookies.set("project_id", project_id);
    Cookies.set("rereview", "true");
  };

  return (
    // <Link to={paths.cart} onClick={handleOnClick}>
    //   <MyButton buttons_type="button__white" className={styles.button}>
    //     {t(`order_btn.changePost`)}
    //   </MyButton>
    // </Link>

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.trigger}>
          {t(`order_btn.changePost`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">
            {t("orders_manager.subcard.change.post.desire")}
          </p>
          <AlertDialogCancel asChild>
            <div className={styles.close}>
              <CancelIcon2 />
            </div>
          </AlertDialogCancel>
        </AlertDialogTitle>
        <span className={styles.text}>{text}</span>

        <AlertDialogCancel asChild>
          <Link to={paths.cart} onClick={handleOnClick}>
            <MyButton className={styles.button}>
              {t(`order_btn.changePost`)}
            </MyButton>
          </Link>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
