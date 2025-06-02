import { DEBOUNCE } from "@entities/project";
import {
  ENUM_ROLES,
  ROLES_TYPES_LIST,
  toggleRole,
  USER_ROLES,
  useUpdateRoleMutation,
} from "@entities/user";
import { AccordionItem } from "@radix-ui/react-accordion";
import { useAppDispatch, useAppSelector, useDebounce } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { setDropDownMenu } from "@shared/slice";
import { Accordion } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  SIDEBAR_ADVERTISER_MENU,
  SIDEBAR_BLOGGER_MENU,
  SIDEBAR_COMMON_MENU,
  SIDEBAR_MANAGER_MENU,
} from "./config";
import { HoverItem } from "./hoverItem";
import styles from "./styles.module.scss";
import { IMenuItem } from "../../header/model";

export const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [updateRole] = useUpdateRoleMutation();

  let toRole: ENUM_ROLES;
  let toPage: ENUM_PATHS;
  let SIDEBAR_MENU: IMenuItem[];

  switch (role) {
    case ENUM_ROLES.ADVERTISER:
      toRole = ENUM_ROLES.BLOGGER;
      toPage = ENUM_PATHS.MAIN_BLOGGER;
      SIDEBAR_MENU = [...SIDEBAR_ADVERTISER_MENU, ...SIDEBAR_COMMON_MENU];
      break;
    case ENUM_ROLES.BLOGGER:
      toRole = ENUM_ROLES.ADVERTISER;
      toPage = ENUM_PATHS.MAIN;
      SIDEBAR_MENU = [...SIDEBAR_BLOGGER_MENU, ...SIDEBAR_COMMON_MENU];
      break;
    case ENUM_ROLES.MANAGER:
      toRole = role;
      toPage = ENUM_PATHS.ORDERS;
      SIDEBAR_MENU = SIDEBAR_MANAGER_MENU;
      break;
    default:
      toRole = role;
      toPage = ENUM_PATHS.MAIN;
      SIDEBAR_MENU = [];
  }

  const changeRole = () => {
    if (USER_ROLES.includes(role)) {
      dispatch(toggleRole(toRole));
      if (isAuth) {
        updateRole({ role: toRole });
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
          <Link to={toPage} onClick={changeRole} className={styles.link}>
            <div className={styles.switcher__row}>
              <p className={styles.role}>
                {
                  t(
                    ROLES_TYPES_LIST.find((el) => el.type === role)?.name || "",
                  )[0]
                }
              </p>
            </div>
          </Link>
        </div>
        <Accordion type="single" className={styles.menu__accordion}>
          {SIDEBAR_MENU.map((item, index) => {
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
