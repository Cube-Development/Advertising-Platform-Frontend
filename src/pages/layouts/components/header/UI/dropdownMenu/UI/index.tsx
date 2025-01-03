import { IMenuItem } from "@entities/admin";
import { roles } from "@entities/user";
import {
  useGetViewAdvertiserProjectQuery,
  useGetViewBloggerChannelQuery,
  useGetViewBloggerOrderQuery,
  useGetViewManagerProjectQuery,
  useGetViewTransactionsQuery,
  viewsTypes,
} from "@entities/views";
import { setDropDownMenu } from "@pages/layouts";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { paths } from "@shared/routing";
import { Accordion, ScrollArea } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  advertiserMenu,
  advertiserMenuNotAuth,
  advertiserServiсeMenu,
  bloggerMenu,
  bloggerMenuNotAuth,
  bloggerServiсeMenu,
  commonMenu,
  faqServiceMenu,
  managerMenu,
} from "./config";
import { MenuItem } from "./menuItem";
import styles from "./styles.module.scss";

interface DropdownMenuProps {
  isAuth: boolean;
  currentRole: roles;
  toggleRole: (role: roles) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isAuth,
  currentRole,
  toggleRole,
}) => {
  const { t } = useTranslation();
  const { dropdownMenu } = useAppSelector((state) => state.dropdownMenu);
  const screen = useWindowWidth();
  const dispatch = useAppDispatch();
  const toggleMenu = (path?: string) => {
    const newMenu = { isOpen: !dropdownMenu.isOpen, title: "" };
    console.log(newMenu);
    dispatch(setDropDownMenu(newMenu));
    if (path === paths.main) {
      toggleRole(roles.advertiser);
    } else if (path === paths.mainBlogger) {
      toggleRole(roles.blogger);
    }
  };

  const { balance } = useAppSelector((state) => state.wallet);

  const { data: viewsAdvProjects } = useGetViewAdvertiserProjectQuery(
    undefined,
    {
      skip: !isAuth || currentRole !== roles.advertiser,
    },
  );

  const { data: viewsBloggerOffers } = useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || currentRole !== roles.blogger,
  });

  const { data: viewsBloggerChannels } = useGetViewBloggerChannelQuery(
    undefined,
    {
      skip: !isAuth || currentRole !== roles.blogger,
    },
  );

  const { data: viewsManProjects } = useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || currentRole !== roles.manager,
  });

  const { data: viewsWalletTransactions } = useGetViewTransactionsQuery(
    undefined,
    {
      skip: !isAuth || currentRole === roles.manager,
    },
  );

  useEffect(() => {
    if (dropdownMenu.isOpen) {
      document.body.classList.add("sidebar-open-2");
    } else {
      document.body.classList.remove("sidebar-open", "sidebar-open-2");
    }
    return () => {
      document.body.classList.remove("sidebar-open-2");
    };
  }, [dropdownMenu.isOpen, currentRole]);

  let serviceMenu: IMenuItem[] =
    currentRole === roles.advertiser
      ? advertiserServiсeMenu
      : bloggerServiсeMenu;

  serviceMenu = isAuth ? serviceMenu : [...serviceMenu, ...faqServiceMenu];

  const combinedMenu: IMenuItem[] = isAuth
    ? currentRole === roles.advertiser
      ? [...advertiserMenu, ...commonMenu, ...faqServiceMenu]
      : currentRole === roles.blogger
        ? [...bloggerMenu, ...commonMenu, ...faqServiceMenu]
        : currentRole === roles.manager
          ? [...managerMenu, ...faqServiceMenu]
          : []
    : currentRole === roles.advertiser
      ? advertiserMenuNotAuth
      : bloggerMenuNotAuth;

  const divVariants = {
    close: { opacity: 0, y: "-100%", x: "0%" },
    open: { opacity: 1, y: "0%", x: "0%" },
    transition: { transition: { duration: 0.2 } },
  };

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div className={styles.dropdown}>
      <button onClick={() => toggleMenu()} className={styles.burger__icon_btn}>
        <div className={styles.burger__icon} />
      </button>

      <AnimatePresence>
        {dropdownMenu.isOpen && (
          <motion.div
            initial="close"
            animate="open"
            exit="close"
            transition={divVariants.transition.transition}
            className={`${styles.menu}`}
            variants={divVariants}
          >
            <div
              className={`${styles.menu__content} ${isSafari && styles.safari}`}
            >
              <div className={`${styles.menu__top}`}>
                <p className={styles.logo}>Blogix</p>
                <button onClick={() => toggleMenu()}>
                  <div className={styles.close__icon} />
                </button>
              </div>
              <ScrollArea className="h-[calc(100dvh_-_80px)]">
                <div className={styles.menu__switcher}>
                  {[roles.advertiser, roles.blogger].includes(currentRole) && (
                    <div
                      style={
                        {
                          "--translateRole": `${currentRole === roles.advertiser ? `0%` : `100%`}`,
                          "--widthRole": `50%`,
                        } as React.CSSProperties
                      }
                      className={styles.menu__switcher__row}
                    >
                      <Link to={paths.main}>
                        <p
                          className={`${
                            currentRole === roles.advertiser
                              ? styles.active
                              : ""
                          }`}
                          onClick={() => {
                            toggleRole(roles.advertiser);
                          }}
                        >
                          {t("roles.advertiser")}
                        </p>
                      </Link>
                      <Link to={paths.mainBlogger}>
                        <p
                          className={`${
                            currentRole === roles.blogger ? styles.active : ""
                          }`}
                          onClick={() => {
                            toggleRole(roles.blogger);
                          }}
                        >
                          {t("roles.blogger")}
                        </p>
                      </Link>
                    </div>
                  )}
                  {isAuth && screen < BREAKPOINT.MD && (
                    <div className={styles.accordion__block}>
                      <p className={styles.accordion__title}>
                        {t("burger_menu.balance")}
                      </p>
                      <div className={styles.balance}>
                        <p>
                          {balance ? Math.floor(balance).toLocaleString() : "0"}{" "}
                          <span>{t("symbol")}</span>
                        </p>
                      </div>
                    </div>
                  )}
                  {screen < BREAKPOINT.HEADER_NAVBAR_VISIBLE && (
                    <div className={styles.accordion__block}>
                      <p className={styles.accordion__title}>
                        {t("burger_menu.services")}
                      </p>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={`item-${dropdownMenu.title}`}
                        className={styles.menu__accordion}
                      >
                        {serviceMenu.map((item) => (
                          <MenuItem
                            key={item.item.title}
                            item={item}
                            onChange={toggleMenu}
                            openTitle={dropdownMenu.title}
                            isAuth={item.item.isDialog && isAuth}
                          />
                        ))}
                      </Accordion>
                    </div>
                  )}
                  {isAuth && (
                    <div className={styles.accordion__block}>
                      <p className={styles.accordion__title}>
                        {t("burger_menu.navigation")}
                      </p>
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue={`item-${dropdownMenu.title}`}
                        className={styles.menu__accordion}
                      >
                        {combinedMenu.map((item) => (
                          <MenuItem
                            key={item.item.title}
                            item={item}
                            onChange={toggleMenu}
                            openTitle={dropdownMenu.title}
                            viewsInfo={
                              item.item.type === viewsTypes.advertiserProjects
                                ? viewsAdvProjects
                                : item.item.type === viewsTypes.wallet
                                  ? viewsWalletTransactions
                                  : item.item.type === viewsTypes.bloggerOffers
                                    ? viewsBloggerOffers
                                    : item.item.type ===
                                        viewsTypes.bloggerChannels
                                      ? viewsBloggerChannels
                                      : item.item.type ===
                                          viewsTypes.managerProjects
                                        ? viewsManProjects
                                        : undefined
                            }
                          />
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
