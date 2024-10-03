import { EditPencilIcon, EmailIcon, TelegramJetlIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { MyButton } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

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
                  />
                </div>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.surname.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.surname.default_value",
                    )}
                  />
                </div>
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.email.title")}</span>
                <input
                  placeholder={t("profile.account_block.email.default_value")}
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.account_block.phone.title")}</span>
                <input
                  placeholder={t("profile.account_block.phone.default_value")}
                />
              </div>
              <div className={styles.name}>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.language.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.language.default_value",
                    )}
                  />
                </div>
                <div className={styles.parameters_row}>
                  <span> {t("profile.account_block.location.title")}</span>
                  <input
                    placeholder={t(
                      "profile.account_block.location.default_value",
                    )}
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
                  {" "}
                  {t("profile.password_block.current_password.title")}
                </span>
                <input
                  placeholder={t(
                    "profile.password_block.current_password.default_value",
                  )}
                />
              </div>
              <div className={styles.parameters_row}>
                <span> {t("profile.password_block.new_password.title")}</span>
                <input
                  placeholder={t(
                    "profile.password_block.new_password.default_value",
                  )}
                />
              </div>
              <div className={styles.parameters_row}>
                <span>
                  {" "}
                  {t("profile.password_block.accept_password.title")}
                </span>
                <input
                  placeholder={t(
                    "profile.password_block.accept_password.default_value",
                  )}
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
