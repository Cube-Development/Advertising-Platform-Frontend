import { roles, toggleRole as toggleroleAction } from "@entities/user";
import { setDropDownMenu } from "@pages/layouts/model";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { IMenuItem } from "../../config";
import { advertiserMenu, bloggerMenu, commonMenu, managerMenu } from "./config";
import styles from "./styles.module.scss";

export const Sidebar: FC = () => {
  const { role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const toggleRole = (role: roles) => {
    dispatch(toggleroleAction(role));
  };

  const handleOpenDropdownMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    newTitle: string,
  ) => {
    event.stopPropagation();
    document.body.classList.add("sidebar-open");
    const newMenu = { isOpen: true, title: newTitle };
    dispatch(setDropDownMenu(newMenu));
  };

  // Функция для извлечения первого сегмента пути
  const getFirstPathSegment = (pathname: string) => {
    const cleanPathname = pathname.split("?")[0].split("#")[0];
    const segments = cleanPathname.split("/").filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : "/";
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
        <Accordion type="single" className={styles.menu__accordion}>
          {combinedMenu.map((item, index) => {
            const currentPathSegment = getFirstPathSegment(location.pathname);
            const menuPathSegment = getFirstPathSegment(item.item.path!);
            const isActive = currentPathSegment === menuPathSegment;

            return (
              <AccordionItem value={`item-${item.item.title}`} key={index}>
                {item.item.openMenu ? (
                  <li
                    key={index}
                    className={`${styles.row} ${isActive ? styles.active_route : ""}`}
                    onClick={(e) => handleOpenDropdownMenu(e, item.item.title!)}
                  >
                    {item.item.img && <item.item.img />}
                  </li>
                ) : (
                  <Link to={item.item.path!} key={index}>
                    <li
                      className={`${styles.row} ${isActive ? styles.active_route : ""}`}
                    >
                      {item.item.img && <item.item.img />}
                    </li>
                  </Link>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
