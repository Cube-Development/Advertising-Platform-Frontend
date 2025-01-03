import { desireStatus, IManagerProjectSubcard } from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import Cookies from "js-cookie";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

export interface ChangeChannelProps {
  order: IManagerProjectSubcard;
  project_id: string;
}

export const ChangeChannel: FC<ChangeChannelProps> = ({
  order,
  project_id,
}) => {
  const { t } = useTranslation();

  const haveDesire = !!order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_channel_request,
  );

  const text = order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_channel_request,
  )?.comment;

  const handleOnClick = () => {
    Cookies.set("project_id", project_id);
    Cookies.set("rereview", "true");
  };

  return (
    // <Link to={paths.cart} onClick={handleOnClick}>
    //   <MyButton buttons_type="button__white" className={styles.button}>
    //     {t(`order_btn.changeChannel`)}
    //   </MyButton>
    // </Link>

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.trigger}>
          {t(`order_btn.changeChannel`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
        <div className={styles.title}>
          <p className="gradient_color">
            {t("orders_manager.subcard.change.channel.desire")}
          </p>
          <AlertDialogCancel asChild>
            <div className={styles.close}>
              <CancelIcon2 />
            </div>
          </AlertDialogCancel>
        </div>
        <span className={styles.text}>{text}</span>

        <AlertDialogCancel asChild>
          <Link to={paths.cart} onClick={handleOnClick}>
            <MyButton className={styles.button}>
              {t("order_btn.changeChannel")}
            </MyButton>
          </Link>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
