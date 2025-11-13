import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { FOOTER_NAV_ITEMS } from "./config";
import { Link, useLocation } from "react-router-dom";
import {
  LineInstagramIcon,
  LineTelegramIcon,
  LocationIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";

export const Footer: FC = () => {
  const { t } = useTranslation();
  const pathname = useLocation();
  const isCreateOrderPage =
    pathname.pathname === ENUM_PATHS.CREATE_ORDER || false;

  const isProjectPage = pathname.pathname.startsWith("/project/") || false;

  return (
    <footer
      className={`${styles.wrapper} ${isCreateOrderPage && styles.create_order_bg}`}
    >
      <section className="container">
        {isProjectPage ? (
          <div className="text-center md:text-base text-sm font-semibold tracking-wider text-white">
            Created by Blogix
          </div>
        ) : (
          <>
            <div className={styles.results__wrapper}>
              <div className={styles.logo}>Blogix</div>
              <div className={styles.results}>
                {/* <div className={styles.results__item}>
                  <h4>101.043</h4>
                  <p>{t("footer.results.users")}</p>
                </div>
                <div className={styles.results__item}>
                  <h4>5.343</h4>
                  <p>{t("footer.results.channels")}</p>
                </div>
                <div className={styles.results__item}>
                  <h4>1208</h4>
                  <p>{t("footer.results.online")}</p>
                </div> */}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.nav}>
                {FOOTER_NAV_ITEMS.map((block, index) => (
                  <div key={index} className={styles.nav__block}>
                    <h4>{t(`${block.name}`)}</h4>
                    <ul>
                      {block.items.map((item, index) => (
                        <Link to={item.path} key={index}>
                          {t(`${item.name}`)}
                        </Link>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className={styles.contacts}>
                <div className={styles.contacts__item}>
                  <h4>
                    {/* {t("footer.contacts.tech_contact")} */}
                    ...
                  </h4>
                  <p>{t("footer.contacts.tech_title")}</p>
                </div>
                <div className={styles.contacts__item}>
                  <h4>
                    {/* {t("footer.contacts.cooperation_contact")} */}
                    ...
                  </h4>
                  <p>{t("footer.contacts.cooperation_title")}</p>
                </div>
                <div className={styles.contacts__item}>
                  <h4>
                    {/* {t("footer.contacts.email")} */}
                    ...
                  </h4>
                  <p>{t("footer.contacts.email_title")}</p>
                </div>
                <div className={styles.contacts__address}>
                  <div>
                    <LocationIcon />
                  </div>
                  <p>{t("footer.contacts.address")}</p>
                  <div>
                    <LineInstagramIcon />
                  </div>
                  <div>
                    <LineTelegramIcon />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.all_rights}>{t("footer.all_rights")}</div>
      </section>
    </footer>
  );
};
