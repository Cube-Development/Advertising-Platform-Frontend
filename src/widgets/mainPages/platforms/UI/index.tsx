import { platformTypesNum } from "@entities/platform";
import {
  InstagramMainIcon,
  TelegramMainIcon,
  YouTubeMainIcon,
} from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PlatformCard } from "../platform-card/UI";
import styles from "./styles.module.scss";
import { sortingTypes, useGetCatalogQuery } from "@entities/project";
import { GenerateGuestId } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";
import { USER_LANGUAGES_LIST } from "@shared/languages";

interface ServicesProps {
  page: string;
}

export const Platforms: FC<ServicesProps> = ({ page }) => {
  const guestId = Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) || GenerateGuestId();
  const { data: telegramCahnnels, isLoading: isTelegramLoading } =
    useGetCatalogQuery(
      {
        page: 1,
        elements_on_page: 1,
        filter: {
          platform: platformTypesNum.telegram,
        },
        language: USER_LANGUAGES_LIST[0].id,
        guest_id: guestId,
      },
      { skip: !guestId },
    );

  const { data: instagramCahnnels, isLoading: isInstagramLoading } =
    useGetCatalogQuery(
      {
        page: 1,
        elements_on_page: 1,
        filter: {
          platform: platformTypesNum.instagram,
        },
        language: USER_LANGUAGES_LIST[0].id,
        guest_id: guestId,
      },
      { skip: !guestId },
    );

  const { data: youtubeCahnnels, isLoading: isYoutubeLoading } =
    useGetCatalogQuery(
      {
        page: 1,
        elements_on_page: 1,
        filter: {
          platform: platformTypesNum.youtube,
        },
        language: USER_LANGUAGES_LIST[0].id,
        guest_id: guestId,
      },
      { skip: !guestId },
    );

  const { t } = useTranslation();
  let custom = 7;

  const platforms = useMemo(() => {
    return [
      {
        count: telegramCahnnels?.elements || 0,
        icon: TelegramMainIcon,
        platform: platformTypesNum.telegram,
      },
      {
        count: instagramCahnnels?.elements || 0,
        icon: InstagramMainIcon,
        platform: platformTypesNum.instagram,
      },

      {
        count: youtubeCahnnels?.elements || 0,
        icon: YouTubeMainIcon,
        platform: platformTypesNum.youtube,
      },
    ];
  }, [
    telegramCahnnels,
    instagramCahnnels,
    youtubeCahnnels,
    isTelegramLoading,
    isInstagramLoading,
    isYoutubeLoading,
  ]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={PAGE_ANIMATION.viewport}
      className={`${styles.wrapper} container`}
    >
      <div className="grid grid-flow-row gap-4 text-center">
        <motion.h2
          custom={custom++}
          variants={PAGE_ANIMATION.animationUp}
          className={styles.title}
        >
          {t(`${page}.platforms.title`)}
        </motion.h2>
        <motion.p
          custom={custom++}
          variants={PAGE_ANIMATION.animationUp}
          className={styles.subtitle}
        >
          {t(`${page}.platforms.subtitle`)}
        </motion.p>
      </div>
      <div className={styles.platforms}>
        {platforms.map(({ count, icon, platform }, index) => (
          <PlatformCard
            key={index}
            count={count}
            icon={icon}
            custom={custom++}
            platform={platform}
          />
        ))}
      </div>
    </motion.section>
  );
};
