import { IMenuItem } from "@entities/admin";
import { DEBOUNCE } from "@entities/project";
import {
  roles,
  rolesTypes,
  toggleRole as toggleroleAction,
  useUpdateRoleMutation,
} from "@entities/user";
import { setDropDownMenu } from "@pages/layouts";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useAppDispatch, useAppSelector, useDebounce } from "@shared/hooks";
import { paths } from "@shared/routing";
import { Accordion } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { advertiserMenu, bloggerMenu, commonMenu, managerMenu } from "./config";
import { HoverItem } from "./hoverItem";
import styles from "./styles.module.scss";

export const Sidebar: FC = () => {
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [updateRole] = useUpdateRoleMutation();

  const toggleRole = (currentRole: roles) => {
    if (currentRole !== role) {
      dispatch(toggleroleAction(currentRole));
      if (isAuth) {
        updateRole({ role: currentRole });
      }
    }
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

  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true); // Скроллим вверх
      } else {
        setIsScrollingUp(false); // Скроллим вниз
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [hoverItem, setHoverItem] = useState<IMenuItem | null>(null);
  const [isLeave, setIsLeave] = useState<boolean>(false);
  const debouncedPosition = useDebounce(isLeave, DEBOUNCE.sidebarHover);

  const handleOnEnter = (item: IMenuItem) => {
    setIsLeave(false);
    setHoverItem(item);
  };

  useEffect(() => {
    if (isLeave) {
      setHoverItem(null);
      setIsLeave(false);
    }
  }, [debouncedPosition]);

  return (
    <div className={`${styles.wrapper}`}>
      <div
        className={`${styles.menu} ${isScrollingUp || lastScrollY === 0 ? styles.visible : styles.hidden}`}
      >
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
                {/* {role === roles.advertiser
                  ? t("roles.advertiser")[0]
                  : role === roles.blogger
                    ? t("roles.blogger")[0]
                    : role === roles.manager
                      ? t("roles.manager")[0]
                      : t("roles.administrator")[0]} */}
                {t(rolesTypes.find((el) => el.type === role)?.name || "")[0]}
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
              <AccordionItem
                key={index}
                className={styles.item}
                value={`item-${item.item.title}`}
                onMouseEnter={() => handleOnEnter(item)}
                onMouseLeave={() => setIsLeave(true)}
              >
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

                {hoverItem === item && (
                  <div
                    className={styles.mini}
                    onMouseEnter={() => handleOnEnter(item)}
                    onMouseLeave={() => setIsLeave(true)}
                  >
                    <HoverItem item={item}></HoverItem>
                  </div>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
