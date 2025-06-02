import { ENUM_ROLES, USER_ROLES } from "@entities/user";
import { viewsTypes } from "@entities/views";
import { BarSubFilter } from "@features/other";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { setDropDownMenu } from "@shared/slice";
import {
  Accordion,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@shared/ui";
import { Menu } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  DROPDOWN_SWITCHER,
  getMenu,
  useChangeRole,
  useGetViews,
} from "../../../model";
import { MenuItem } from "./menuItem";
import styles from "./styles.module.scss";

interface DropdownMenuProps {}

export const DropdownMenu: FC<DropdownMenuProps> = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const { dropdownMenu } = useAppSelector((state) => state.dropdownMenu);
  const screen = useWindowWidth();
  const dispatch = useAppDispatch();

  const toggleMenu = (path?: string) => {
    const newMenu = { isOpen: !dropdownMenu.isOpen, title: "" };
    console.log(newMenu);
    dispatch(setDropDownMenu(newMenu));
    changeRole(path);
  };

  const { balance, deposit_wallet, profit_wallet } = useAppSelector(
    (state) => state.wallet,
  );

  const { changeRole, updateRole } = useChangeRole({
    isAuth,
    role,
  });

  const {
    viewsAdvProjects,
    viewsBloggerOffers,
    viewsBloggerChannels,
    viewsManProjects,
    viewsWalletTransactions,
  } = useGetViews({
    isAuth,
    role,
  });

  const { SERVICE_MENU, MENU_COMBINED } = getMenu({
    isAuth,
    role,
  });

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const setRoleFilter = (role: ENUM_ROLES) => {
    updateRole(role);
  };

  return (
    <Sheet open={dropdownMenu.isOpen} onOpenChange={() => toggleMenu()}>
      <SheetTrigger>
        <Menu
          color="var(--Personal-colors-main)"
          className="w-5 h-5 md:w-8 md:h-8"
        />
      </SheetTrigger>

      <SheetContent side={"left"} className={styles.menu}>
        <div className={`${styles.menu__content} ${isSafari && styles.safari}`}>
          <SheetTitle className={`${styles.menu__top}`}>
            <p className={styles.logo}>Blogix</p>
          </SheetTitle>
          <SheetDescription className="sr-only" />
          <ScrollArea className="h-[calc(100dvh_-_80px)]">
            <div className={styles.menu__bottom}>
              {[ENUM_ROLES.ADVERTISER, ENUM_ROLES.BLOGGER].includes(role) && (
                <div className={styles.switcher}>
                  <BarSubFilter
                    tab={role}
                    changeTab={setRoleFilter}
                    tab_list={DROPDOWN_SWITCHER}
                    isFixedColumns={true}
                  />
                </div>
              )}
              {isAuth && USER_ROLES.includes(role) && (
                <div className={styles.accordion__block}>
                  <p className={styles.accordion__title}>
                    {t("burger_menu.balance")}
                  </p>
                  <div className={styles.balance__wrapper}>
                    <p className={styles.total_balance}>
                      {Math.floor(balance).toLocaleString()}{" "}
                      <span>{t("symbol")}</span>
                    </p>
                    <div className={styles.sub_balance__wrapper}>
                      <div className={styles.sub_balance__item}>
                        <p className={styles.accordion__title}>Депозит: </p>
                        <p className={styles.sub_balance__item__value}>
                          {Math.floor(deposit_wallet).toLocaleString()}{" "}
                          <span>{t("symbol")}</span>
                        </p>
                      </div>
                      <div className={styles.sub_balance__item}>
                        <p className={styles.accordion__title}>Прибыль: </p>
                        <p className={styles.sub_balance__item__value}>
                          {Math.floor(profit_wallet).toLocaleString()}{" "}
                          <span>{t("symbol")}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {USER_ROLES.includes(role) &&
                screen < BREAKPOINT.HEADER_NAVBAR_VISIBLE && (
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
                      {SERVICE_MENU.map((item) => (
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
                    {MENU_COMBINED.map((item) => (
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
                                : item.item.type === viewsTypes.bloggerChannels
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
      </SheetContent>
    </Sheet>
  );
};
