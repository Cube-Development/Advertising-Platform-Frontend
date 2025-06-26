import {
  eventForm,
  IEventsData,
  IProfileData,
  profileForm,
  useGetProfileQuery,
} from "@entities/user";
import { EmailIcon, TelegramJetIcon } from "@shared/assets";
import { cn, CustomCheckbox } from "@shared/ui";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useChangeNotifications } from "../../model";
import styles from "./styles.module.scss";

interface IChangeNotificationsFormProps {
  // add your props here
}

export const ChangeNotificationsForm: FC<
  IChangeNotificationsFormProps
> = ({}) => {
  const { t } = useTranslation();
  const { data: profile, isLoading } = useGetProfileQuery();
  const { setValue, watch, reset } = useForm<IProfileData>({
    defaultValues: {
      user_additional: {
        email: "",
      },
      user_events: {
        system_events: false,
        project_events: false,
        promo_events: false,
      },
    },
  });
  const formState = watch();
  const events: IEventsData = {
    user_events: {
      ...formState?.user_events,
    },
  };

  const { handleChangeNotifications } = useChangeNotifications({
    events: events,
  });

  const handleOnClick = (event: eventForm) => {
    handleChangeNotifications(event);
    const newValue = !formState?.user_events?.[event];
    setValue(`${profileForm.user_events}.${event}`, newValue);
  };

  useEffect(() => {
    if (!isLoading && profile) {
      reset({
        telegram: profile?.telegram || "@telegram",
        user_additional: {
          email: profile?.user_additional?.email || "",
        },
        user_events: {
          system_events: profile?.user_events?.system_events || true,
          project_events: profile?.user_events?.project_events || false,
          promo_events: profile?.user_events?.promo_events || false,
        },
      });
    }
  }, [profile, isLoading]);

  const EMAIL_NOTIFICATION_DISABLED = [
    {
      label: "profile.notification_block.email.system",
      disabled: true,
      isSelected: formState?.user_events?.system_events,
    },
    {
      label: "profile.notification_block.email.project",
      disabled: false,
      isSelected: formState?.user_events?.project_events,
      event: eventForm.project_events,
    },
    {
      label: "profile.notification_block.email.individual",
      disabled: false,
      isSelected: formState?.user_events?.promo_events,
      event: eventForm.promo_events,
    },
  ];

  const TELEGRAM_NOTIFICATION = [
    {
      label: "profile.notification_block.bot.system",
    },
    {
      label: "profile.notification_block.bot.project",
    },
    {
      label: "profile.notification_block.bot.individual",
    },
  ];

  return (
    <div className={cn(styles.wrapper, "frame")}>
      <div className={styles.block}>
        <div className={styles.top}>
          <div className={styles.header}>
            <p className={styles.title}>
              {t("profile.notification_block.email.title")}
            </p>
            <EmailIcon />
          </div>
          <p className={styles.title}>{formState?.user_additional?.email}</p>
        </div>
        <div className={styles.checkboxes}>
          {EMAIL_NOTIFICATION_DISABLED.map((item, index) => (
            <div className={styles.checkbox__wrapper} key={index}>
              <span>{t(item.label)}</span>
              <CustomCheckbox
                disabled={item.disabled}
                isSelected={item.isSelected}
                handleChange={() => item.event && handleOnClick(item.event)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.top}>
          <div className={styles.header}>
            <p className={styles.title}>
              {t("profile.notification_block.bot.title")}
            </p>
            <TelegramJetIcon />
          </div>
          <p className={styles.title}>{formState?.user_additional?.email}</p>
        </div>
        <div className={styles.checkboxes}>
          {TELEGRAM_NOTIFICATION.map((item, index) => (
            <div className={styles.checkbox__wrapper} key={index}>
              <span>{t(item.label)}</span>
              <CustomCheckbox />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
