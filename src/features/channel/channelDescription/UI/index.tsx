import { useGetChannelByIdQuery } from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import { platformToIcon } from "@entities/project";
import { BoyIcon, CancelIcon2, GirlIcon } from "@shared/assets";
import { Languages } from "@shared/config";
import { paths } from "@shared/routing";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  ScrollArea,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useFindLanguage } from "@entities/user";

interface ChannelDescriptionProps {
  channel_id: string;
}

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  channel_id,
}) => {
  const { t } = useTranslation();
  const language = useFindLanguage();
  const { data: card } = useGetChannelByIdQuery(
    { channel_id: channel_id, language: language?.id || Languages[0].id },
    { skip: !channel_id },
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className={`${styles.button} truncate`}>
          <p>{t(`platform_btn.description`)}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ScrollArea className="relative">
          <div className={styles.content}>
            <div className={styles.content__left}>
              <div className={styles.top}>
                <AlertDialogTitle className={styles.top__title}>
                  <p className="gradient_color">
                    {t("platform_description.platform_description")}
                  </p>
                </AlertDialogTitle>
                <div className={styles.top__description}>
                  <div className={styles.top__description__top}>
                    <div className={styles.logo}>
                      <img src={card?.avatar} alt="" />
                    </div>
                    <div className={styles.channel}>
                      <p className="truncate">{card?.name}</p>
                      <span className="truncate">{card?.category?.name}</span>
                    </div>
                  </div>
                  <div className={styles.description__text}>
                    <p>{card?.description}</p>
                  </div>
                  <div className={styles.platform}>
                    <div className={styles.platform__type}>
                      <div className={styles.icon}>
                        {card?.platform && card?.platform in platformToIcon
                          ? platformToIcon[card.platform!]()
                          : "..."}
                      </div>
                      <p>
                        {card?.platform === platformTypesNum.telegram
                          ? "Telegram"
                          : card?.platform === platformTypesNum.instagram
                            ? "Instagram"
                            : "Youtube"}
                      </p>
                    </div>
                    <a href={card?.url}>{card?.url}</a>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottom__formats}>
                  {card?.format.map((format) => (
                    <div key={format?.format} className={styles.format}>
                      <div className={styles.format__name}>
                        <p className="gradient_color truncate">
                          {format?.format_name?.big}:
                        </p>
                      </div>
                      <p className={`${styles.format__price} truncate`}>
                        {format?.price?.toLocaleString()} {t("symbol")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.content__right}>
              <div className={styles.content__right__top}>
                <AlertDialogCancel>
                  <CancelIcon2 />
                </AlertDialogCancel>
              </div>
              <div className={styles.channel__parameters}>
                <div className={styles.parametr}>
                  <p>{t("platform_description.language")}:</p>
                  <span>
                    {card?.language
                      .map((lang) => lang?.name?.split(" ")[1])
                      .join(", ")}
                  </span>
                </div>
                <div className={styles.parametr}>
                  <p>{t("platform_description.age")}:</p>
                  <span>{card?.age.map((age) => age.name).join("; ")}</span>
                </div>
                <div className={styles.parametr}>
                  <p>{t("platform_description.sex")}:</p>
                  <div className={styles.parametr__sex}>
                    <BoyIcon />
                    <span>
                      {card?.male}% | {card?.female}%
                    </span>
                    <GirlIcon />
                  </div>
                </div>
                <div className={styles.parametr}>
                  <p>{t("platform_description.region")}:</p>
                  <span>
                    {card?.region?.map((region) => region?.name).join("; ")}
                  </span>
                </div>
              </div>
              <div className={styles.buttons}>
                <AlertDialogCancel>
                  <Link to={`${paths.addChannel}?channel_id=${channel_id}`}>
                    <p className={`gradient_color ${styles.edit_btn}`}>
                      {t("platform_description.edit_btn")}
                    </p>
                  </Link>
                </AlertDialogCancel>
              </div>
            </div>
          </div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};
