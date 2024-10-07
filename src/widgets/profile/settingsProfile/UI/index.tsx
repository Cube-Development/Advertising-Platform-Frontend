import { EditPencilIcon, EmailIcon, TelegramJetlIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { MyButton } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IUser, roles, useGetUserMutation } from "@entities/user";
import { useForm } from "react-hook-form";
import { languages, languagesNum } from "@shared/config";

export const SettingsProfile: FC = () => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const card = {
    date: "24.09.2024",
    email: "Sample@sample.com",
    telegram: "@telegram",
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const [getUser] = useGetUserMutation();

  useEffect(() => {
    getUser()
      .unwrap()
      .then((data) => {
        setValue("id", data.id);
        setValue("email", data.email);
        setValue("is_active", data.is_active);
        setValue("is_superuser", data.is_superuser);
        setValue("is_verified", data.is_verified);
        setValue("role", data.role);
        setValue("language", data.language);
        setValue("location", data.location);
        setValue("name", data.name);
        setValue("lastname", data.lastname);
        setValue("phone", data.phone);
      });
  }, []);

  const { setValue, watch } = useForm<IUser>({
    defaultValues: {
      id: "",
      email: "",
      is_active: true,
      is_superuser: false,
      is_verified: true,
      role: roles.advertiser,
      language: languagesNum.ru,
      location: "",
      name: "",
      lastname: "",
      phone: "",
      password: "",
      new_password: "",
    },
  });
  const formState = watch();

  return (
    <div className="container sidebar">
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
                {t("profile.account_block.date")}: {card.date}
              </span>
            </div>
            <div className={styles.parameters_wrapper}>
              <div className={styles.name}>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.name.title")}</span>
                  <input
                    placeholder={t("profile.account_block.name.default_value")}
                    value={formState.name}
                    onChange={(e) => setValue("name", e.target.value)}
                  />
                </div>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.surname.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.surname.default_value",
                    )}
                    value={formState.lastname}
                    onChange={(e) => setValue("lastname", e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.email.title")}</span>
                <input
                  placeholder={t("profile.account_block.email.default_value")}
                  value={formState.email}
                  onChange={(e) => setValue("email", e.target.value)}
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.phone.title")}</span>
                <input
                  placeholder={t("profile.account_block.phone.default_value")}
                  value={formState.phone}
                  onChange={(e) => setValue("phone", e.target.value)}
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
                      formState.language === languagesNum.en
                        ? languages.en
                        : formState.language === languagesNum.ru
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
                    value={formState.location}
                    onChange={(e) => setValue("location", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.button__wrapper}>
              <MyButton>
                <p>{t("profile.account_block.save_btn")}</p>
              </MyButton>
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
                  placeholder={t(
                    "profile.password_block.current_password.default_value",
                  )}
                  value={formState.password}
                  onChange={(e) => setValue("password", e.target.value)}
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.password_block.new_password.title")}</span>
                <input
                  placeholder={t(
                    "profile.password_block.new_password.default_value",
                  )}
                  value={formState.new_password}
                  onChange={(e) => setValue("new_password", e.target.value)}
                />
              </div>
              <div className={styles.parameters_row}>
                <span>{t("profile.password_block.accept_password.title")}</span>
                <input
                  placeholder={t(
                    "profile.password_block.accept_password.default_value",
                  )}
                  value={formState.accept_password}
                  onChange={(e) => setValue("accept_password", e.target.value)}
                />
              </div>
            </div>
            <div className={styles.button__wrapper}>
              <MyButton>
                <p>{t("profile.password_block.change_btn")}</p>
              </MyButton>
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
                  <p className={styles.miniblock__title}>{card.email}</p>
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.email.system")}</span>
                    <input type="checkbox" />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>{t("profile.notification_block.email.project")}</span>
                    <input type="checkbox" />
                  </div>
                  <div className={styles.checkbox__wrapper}>
                    <span>
                      {t("profile.notification_block.email.individual")}
                    </span>
                    <input type="checkbox" />
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
                  {card?.telegram ? (
                    <div className={styles.bot}>
                      <p className={styles.miniblock__title}>{card.telegram}</p>
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
