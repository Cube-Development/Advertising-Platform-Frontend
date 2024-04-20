import { BoyIcon, CancelIcon2, GirlIcon } from "@shared/assets";
import { platformToIcon } from "@shared/config/platformData";
import { paths } from "@shared/routing";
import { IReadChannelData } from "@shared/types/platform";
import { MyButton, MyModal } from "@shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface ChannelDescriptionProps {
  channelId: string;
}

const card: IReadChannelData = {
  id: "sldksl;dkal;sdk;",
  name: "Канал",
  description:
    "описаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописаниеописание",
  category: { id: 2, name: "Авто и мото" },
  url: "Https//t.me/@samplesample",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  male: 70,
  female: 30,
  platform: 1,
  language: [
    { id: 2, name: "🇬🇧 Английский" },
    { id: 3, name: "🇷🇺 Русский" },
  ],
  age: [
    { id: 2, name: "18-34 лет" },
    { id: 3, name: "35-44 лет" },
    { id: 4, name: "45-54 лет" },
  ],
  region: [
    { id: 5, name: "Навои" },
    { id: 6, name: "Наманган" },
    { id: 7, name: "Самарканд" },
  ],
  text_limit: 2000,
  format: [
    {
      format: 2,
      format_name: {
        small: "1/24",
        big: "1/24",
      },
      price: 13000000,
    },
    {
      format: 3,
      format_name: {
        small: "1/48",
        big: "1/48",
      },
      price: 2000000,
    },
  ],
};

export const ChannelDescription: FC<ChannelDescriptionProps> = ({
  channelId,
}) => {
  const { t } = useTranslation();
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
                      <img src={card.avatar} alt="" />
                    </div>
                    <div className={styles.channel}>
                      <p>{card.name}</p>
                      <span>{card.category.name}</span>
                    </div>
                  </div>
                  <div className={styles.description__text}>
                    <p>{card.description}</p>
                  </div>
                  <div className={styles.platform}>
                    <div className={styles.platform__type}>
                      <div>
                        {card.platform && card.platform in platformToIcon
                          ? platformToIcon[card.platform!]()
                          : "..."}
                      </div>
                      <p>Telegram</p>
                    </div>
                    <a href={card.url}>{card.url}</a>
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottom__formats}>
                  {card.format.map((format) => (
                    <div className={styles.format}>
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
                    {card.language
                      .map((lang) => lang.name.split(" ")[1])
                      .join(", ")}
                  </span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.age")}:</p>
                  <span>{card.age.map((age) => age.name).join("; ")}</span>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.sex")}:</p>
                  <div className={styles.parameter__sex}>
                    <BoyIcon />
                    <span>
                      {card.male}% | {card.female}%
                    </span>
                    <GirlIcon />
                  </div>
                </div>
                <div className={styles.parameter}>
                  <p>{t("platform_description.region")}:</p>
                  <span>
                    {card.region.map((region) => region.name).join("; ")}
                  </span>
                </div>
              </div>
              <div className={styles.buttons}>
                <Link to={paths.addPlatform}>
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
