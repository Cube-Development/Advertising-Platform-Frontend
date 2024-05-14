import { FC } from "react";
import styles from "./styles.module.scss";
import { roles } from "@shared/config/roles";
import { filterSlice, userSlice } from "@shared/store/reducers";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { advertiserMenu, bloggerMenu, commonMenu, managerMenu } from "./config";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";
import { IMenuItem } from "@shared/types/common";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";

export const SideBar: FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toggleRole = (role: roles) => {
    dispatch(userSlice.actions.toggleRole(role));
  };

  const handleOpenDropdownMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newTitle: string,
  ) => {
    event.stopPropagation();
    document.body.classList.add("sidebar-open");
    const newMenu = { isOpen: true, title: newTitle };
    dispatch(filterSlice.actions.setDropDownMenu(newMenu));
  };

  const combinedMenu: IMenuItem[] =
    role === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : role === roles.blogger
        ? [...bloggerMenu, ...commonMenu]
        : role === roles.manager
          ? managerMenu
          : [];

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.row__top}>
          {isAuth && <DropdownMenu currentRole={role} toggleRole={toggleRole} />}
        </div> */}
      <div className={styles.menu}>
        <div className={styles.switcher}>
          <div className={styles.switcher__row}>
            <Link
              to={role === roles.advertiser ? paths.mainBlogger : paths.main}
            >
              <p
                className={styles.role}
                onClick={() => {
                  toggleRole(
                    role === roles.advertiser
                      ? roles.blogger
                      : roles.advertiser,
                  );
                }}
              >
                {role === roles.advertiser
                  ? t("roles.advertiser")[0]
                  : role === roles.blogger
                    ? t("roles.blogger")[0]
                    : role === roles.manager
                      ? t("roles.manager")[0]
                      : t("roles.administrator")[0]}
              </p>
            </Link>
          </div>
        </div>
        <Accordion type="single">
          {combinedMenu.map((item, index) => (
            <AccordionItem value={`item-${item.item.title}`} key={index}>
              {item.item.openMenu ? (
                <li
                  key={index}
                  className={styles.row}
                  onClick={(e) => handleOpenDropdownMenu(e, item.item.title!)}
                >
                  {item.item.img && <item.item.img />}
                </li>
              ) : (
                <Link to={item.item.path!} key={index}>
                  <li className={styles.row}>
                    {item.item.img && <item.item.img />}
                  </li>
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
