import { AccommList } from "@features/accommList";
import { AddPlatform } from "@features/addPlatform";
import { StartAdv } from "@features/startAdv";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { paths } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface WhyChooseUsProps {
  page: string;
}

export const WhyChooseUs: FC<WhyChooseUsProps> = ({ page }) => {
  const { t } = useTranslation();
  return (
    <section className={`${styles.wrapper} container`}>
      <h1 className={styles.title}>{t(`${page}.why_title`)}</h1>
      <AccommList
        accomms={t(`${page}.accomms_list`, { returnObjects: true })}
        toDoBtn={
          page === "main_page_advertiser" ? (
            <StartAdv props={{ className: styles.button }} />
          ) : (
            <AddPlatform
              path={`${paths.addPlatform}?add_channel=${addChannelQueries.main}`}
              props={{ className: styles.button }}
            />
          )
        }
      />
    </section>
  );
};
