import {
  eventForm,
  IEventsData,
  IPasswordData,
  IProfileData,
  IUserData,
  profileForm,
  useEditProfileMutation,
  useGetProfileQuery,
  userForm,
} from "@entities/user";
import { EditPassword, EditUser } from "@features/profile";
import { EditPencilIcon, EmailIcon, TelegramJetlIcon } from "@shared/assets";
import { languages, languagesNum } from "@shared/config";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SettingsProfile: FC = () => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const { data: profile, isLoading } = useGetProfileQuery();

  const { setValue, watch, reset } = useForm<IProfileData>({
    defaultValues: {
      user_additional: {
        email: "",
        language: languagesNum.ru,
        location: "",
        first_name: "",
        surname: "",
        phone: "",
      },
      user_events: {
        system_events: false,
        project_events: false,
        promo_events: false,
      },
    },
  });

  const formState = watch();

  const user: IUserData = {
    user_additional: {
      language: formState?.user_additional?.language,
      location: formState?.user_additional?.location,
      first_name: formState?.user_additional?.first_name,
      surname: formState?.user_additional?.surname,
      phone: formState?.user_additional?.phone,
    },
  };

  const password: IPasswordData = {
    current_password: formState?.current_password || "",
    new_password: formState?.new_password,
    accept_password: formState?.accept_password,
  };

  const events: IEventsData = {
    user_events: {
      project_events: formState?.user_events?.project_events,
      promo_events: formState?.user_events?.promo_events,
    },
  };

  useEffect(() => {
    if (!isLoading && profile) {
      reset({
        user_additional: {
          email: profile?.user_additional?.email || "",
          language: profile?.user_additional?.language || languagesNum.ru,
          location: profile?.user_additional?.location || "Ташкент",
          first_name: profile?.user_additional?.first_name || "",
          surname: profile?.user_additional?.surname || "",
          phone: profile?.user_additional?.phone || "",
        },
        user_events: {
          system_events: profile?.user_events?.system_events || true,
          project_events: profile?.user_events?.project_events || false,
          promo_events: profile?.user_events?.promo_events || false,
        },
        current_password: "",
        new_password: "",
        accept_password: "",
        created: profile?.created,
        id: profile?.id,
        telegram: profile?.telegram,
      });
    }
  }, [profile, isLoading]);

  const { toast } = useToast();
  const [edit] = useEditProfileMutation();

  const handleOnClick = (event: eventForm) => {
    const newValue = !formState?.user_events?.[event];
    setValue(`${profileForm.user_events}.${event}`, newValue);
    const updatedEvents: IEventsData = {
      user_events: {
        ...events?.user_events,
        [event]: newValue,
      },
    };
    edit(updatedEvents)
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.profile.edit.event.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.profile.edit.event.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={PAGE_ANIMATION.viewport}
          variants={PAGE_ANIMATION.animationVision}
          className={styles.title}
        >
          {t("profile.title")}
        </motion.h1>
        <div className={styles.form__wrapper}>
          <div className={styles.block}>
            <div className={styles.title__wrapper}>
              <p className={styles.block__title}>
                {t("profile.account_block.title")}
              </p>
              <span>
                {t("profile.account_block.date")}: {formState.created}
              </span>
            </div>
            <div className={styles.parameters_wrapper}>
              <div className={styles.name}>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.name.title")}</span>
                  <input
                    placeholder={t("profile.account_block.name.default_value")}
                    value={formState?.user_additional?.first_name}
                    onChange={(e) =>
                      setValue(
                        `${profileForm.user_additional}.${userForm.first_name}`,
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.surname.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.surname.default_value",
                    )}
                    value={formState?.user_additional?.surname}
                    onChange={(e) =>
                      setValue(
                        `${profileForm.user_additional}.${userForm.surname}`,
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.email.title")}</span>
                <input
                  placeholder={t("profile.account_block.email.default_value")}
                  value={formState?.user_additional?.email}
                  disabled={true}
                  onChange={(e) =>
                    setValue(
                      `${profileForm.user_additional}.${userForm.email}`,
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.phone.title")}</span>
                <input
                  placeholder={t("profile.account_block.phone.default_value")}
                  value={formState?.user_additional?.phone}
                  onChange={(e) =>
                    setValue(
                      `${profileForm.user_additional}.${userForm.phone}`,
                      e.target.value,
                    )
                  }
                  type="tel"
                />
              </div>
              <div className={styles.name}>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.language.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.language.default_value",
                    )}
                    value={
                      formState?.user_additional?.language === languagesNum.en
                        ? languages.en
                        : formState?.user_additional?.language ===
                            languagesNum.ru
                          ? languages.ru
                          : languages.uz
                    }
                    readOnly
                  />
                </div>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.location.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.location.default_value",
                    )}
                    value={formState?.user_additional?.location}
                    onChange={(e) =>
                      setValue(
                        `${profileForm.user_additional}.${userForm.location}`,
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className={styles.button__wrapper}>
              <EditUser user={user} />
            </div>
          </div>
          <div className={styles.block}>
            <p className={styles.block__title}>
              {t("profile.password_block.title")}
            </p>
            <div className={styles.parameters_wrapper}>
              <div className={styles.parameters_row}>
                <span>
                  {t("profile.password_block.current_password.title")}
                </span>
                <input
                  type="password"
                  placeholder={t(
                    "profile.password_block.current_password.default_value",
                  )}
                  value={formState.current_password}
                  onChange={(e) =>
                    setValue(profileForm.current_password, e.target.value)
                  }
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.password_block.new_password.title")}</span>
                <input
                  type="password"
                  placeholder={t(
                    "profile.password_block.new_password.default_value",
                  )}
                  value={formState.new_password}
                  onChange={(e) =>
                    setValue(profileForm.new_password, e.target.value)
                  }
                />
              </div>
              <div className={styles.parameters_row}>
                <span>{t("profile.password_block.accept_password.title")}</span>
                <input
                  type="password"
                  placeholder={t(
                    "profile.password_block.accept_password.default_value",
                  )}
                  value={formState.accept_password}
                  onChange={(e) =>
                    setValue(profileForm.accept_password, e.target.value)
                  }
                />
              </div>
            </div>
            <div className={styles.button__wrapper}>
              <EditPassword password={password} />
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.block__title}>
              {t("profile.notification_block.title")}
            </p>
            <div className={styles.notification__wrapper}>
              <div className={styles.miniblock}>
                <div className={styles.miniblock__wrapper}>
                  <p className={styles.miniblock__title}>
                    {t("profile.notification_block.email.title")}
                  </p>
                  <EmailIcon />
                </div>
                <div className={styles.info_block}>
                  <p className={styles.miniblock__title}>
                    {formState?.user_additional?.email}
                  </p>
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.email.system")}</span>
                    <input
                      type="checkbox"
                      disabled={true}
                      checked={formState?.user_events?.system_events}
                    />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.email.project")}</span>
                    <input
                      type="checkbox"
                      checked={formState?.user_events?.project_events}
                      onChange={() => handleOnClick(eventForm.project_events)}
                    />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>
                      {t("profile.notification_block.email.individual")}
                    </span>
                    <input
                      type="checkbox"
                      checked={formState?.user_events?.promo_events}
                      onChange={() => handleOnClick(eventForm.promo_events)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.miniblock}>
                <div className={styles.miniblock__wrapper}>
                  <p className={styles.miniblock__title}>
                    {t("profile.notification_block.bot.title")}
                  </p>
                  <TelegramJetlIcon />
                </div>
                <div className={styles.info_block}>
                  {formState?.telegram ? (
                    <div className={styles.bot}>
                      <p className={styles.miniblock__title}>
                        {formState?.telegram}
                      </p>
                      <button onClick={handleEdit}>
                        <EditPencilIcon />
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {isEdit && (
                    <div className={styles.edit}>
                      <span>
                        {t("profile.notification_block.bot.telegramm.title")}
                      </span>
                      <div className={styles.row}>
                        <input
                          placeholder={t(
                            "profile.notification_block.bot.telegramm.default_value",
                          )}
                        />
                        <MyButton>
                          <p>
                            {t("profile.notification_block.bot.change_btn")}
                          </p>
                        </MyButton>
                        <MyButton
                          buttons_type="button__white"
                          onClick={handleEdit}
                        >
                          <p>
                            {t("profile.notification_block.bot.cancel_btn")}
                          </p>
                        </MyButton>
                      </div>
                    </div>
                  )}
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.bot.system")}</span>
                    <input type="checkbox" />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.bot.project")}</span>
                    <input type="checkbox" />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>
                      {t("profile.notification_block.bot.individual")}
                    </span>
                    <input type="checkbox" />
                  </div>
                </div>
                <p className={styles.instruction}>
                  {t("profile.notification_block.bot.instruction")}
                  {" >>>"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
