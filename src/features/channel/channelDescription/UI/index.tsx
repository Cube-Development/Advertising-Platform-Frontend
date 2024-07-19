import { BoyIcon, CancelIcon2, GirlIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
  MyModal,
} from "@shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Languages } from "@shared/config";
import { platformToIcon } from "@entities/project";
import { useGetChannelByIdQuery } from "@entities/channel";

interface ChannelDescriptionProps {
  channel_id: string;
}

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  channel_id,
}) => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const { data: card } = useGetChannelByIdQuery(
    { channel_id: channel_id, language: language?.id || Languages[0].id },
    { skip: !channel_id },
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={`${styles.button} button button__white`}>
            <p>{t(`platform_btn.description`)}</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.content}>
            <div className={styles.content__left}>
              <div className={styles.top}>
                <div className={styles.top__title}>
                  <p>{t("platform_description.platform_description")}</p>
                </div>
                <div className={styles.top__description}>
                  <div className={styles.top__description__top}>
                    <div className={styles.logo}>
                      <img src={card?.avatar} alt="" />
                    </div>
                    <div className={styles.channel}>
                      <p>{card?.name}</p>
                      <span>{card?.category.name}</span>
                    </div>
                  </div>
                  <div className={styles.description__text}>
                    <p>{card?.description}</p>
                  </div>
                  <div className={styles.platform}>
                    <div className={styles.platform__type}>
                      <div>
                        {card?.platform && card?.platform in platformToIcon
                          ? platformToIcon[card.platform!]()
                          : "..."}
                      </div>
                      <p>Telegram</p>
                    </div>
                    <a href={card?.url}>{card?.url}</a>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottom__formats}>
                  {card?.format.map((format) => (
                    <div key={format.format} className={styles.format}>
                      <div className={styles.format__name}>
                        <p>{format.format_name.small}</p>
                      </div>
                      <p className={styles.format__price}>
                        {format.price.toLocaleString()}
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
                <div className={styles.parameter}>
                  <p>{t("platform_description.language")}:</p>
                  <span>
                    {card?.language
                      .map((lang) => lang.name.split(" ")[1])
                      .join(", ")}
                  </span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.age")}:</p>
                  <span>{card?.age.map((age) => age.name).join("; ")}</span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.sex")}:</p>
                  <div className={styles.parameter__sex}>
                    <BoyIcon />
                    <span>
                      {card?.male}% | {card?.female}%
                    </span>
                    <GirlIcon />
                  </div>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.region")}:</p>
                  <span>
                    {card?.region.map((region) => region.name).join("; ")}
                  </span>
                </div>
              </div>
              <div className={styles.buttons}>
                <AlertDialogCancel>
                  <Link to={`${paths.addChannel}?channel_id=${channel_id}`}>
                    <div className="button button__white">
                      <p>{t("platform_description.edit_btn")}</p>
                    </div>
                  </Link>
                </AlertDialogCancel>
                <AlertDialogAction>
                  <div className="button button__white">
                    {t("platform_description.okey_btn")}
                  </div>
                </AlertDialogAction>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <MyButton
        buttons_type="button__white"
        className={styles.button}
        onClick={(e) => handleOpenModal(e)}
      >
        <p>{t(`platform_btn.description`)}</p>
      </MyButton>

      {isModalOpen && (
        <MyModal>
          <div className={styles.content} ref={menuRef}>
            <div className={styles.content__left}>
              <div className={styles.top}>
                <div className={styles.top__title}>
                  <p>{t("platform_description.platform_description")}</p>
                </div>
                <div className={styles.top__description}>
                  <div className={styles.top__description__top}>
                    <div className={styles.logo}>
                      <img src={card?.avatar} alt="" />
                    </div>
                    <div className={styles.channel}>
                      <p>{card?.name}</p>
                      <span>{card?.category.name}</span>
                    </div>
                  </div>
                  <div className={styles.description__text}>
                    <p>{card?.description}</p>
                  </div>
                  <div className={styles.platform}>
                    <div className={styles.platform__type}>
                      <div>
                        {card?.platform && card?.platform in platformToIcon
                          ? platformToIcon[card.platform!]()
                          : "..."}
                      </div>
                      <p>Telegram</p>
                    </div>
                    <a href={card?.url}>{card?.url}</a>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottom__formats}>
                  {card?.format.map((format) => (
                    <div key={format.format} className={styles.format}>
                      <div className={styles.format__name}>
                        <p>{format.format_name.small}</p>
                      </div>
                      <p className={styles.format__price}>
                        {format.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.content__right}>
              <div className={styles.content__right__top}>
                <button onClick={handleCloseModal}>
                  <CancelIcon2 />
                </button>
              </div>
              <div className={styles.channel__parameters}>
                <div className={styles.parameter}>
                  <p>{t("platform_description.language")}:</p>
                  <span>
                    {card?.language
                      .map((lang) => lang.name.split(" ")[1])
                      .join(", ")}
                  </span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.age")}:</p>
                  <span>{card?.age.map((age) => age.name).join("; ")}</span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.sex")}:</p>
                  <div className={styles.parameter__sex}>
                    <BoyIcon />
                    <span>
                      {card?.male}% | {card?.female}%
                    </span>
                    <GirlIcon />
                  </div>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.region")}:</p>
                  <span>
                    {card?.region.map((region) => region.name).join("; ")}
                  </span>
                </div>
              </div>
              <div className={styles.buttons}>
                <Link to={`${paths.addChannel}?channel_id=${channel_id}`}>
                  <MyButton buttons_type="button__white">
                    <p>{t("platform_description.edit_btn")}</p>
                  </MyButton>
                </Link>
                <MyButton
                  buttons_type="button__white"
                  onClick={handleCloseModal}
                >
                  <p>{t("platform_description.okey_btn")}</p>
                </MyButton>
              </div>
            </div>
          </div>
        </MyModal>
      )}
    </>
  );
};
