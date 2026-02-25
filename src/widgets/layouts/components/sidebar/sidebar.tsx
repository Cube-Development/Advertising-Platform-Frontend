import { useAppSelector } from "@shared/hooks";
import { FC, useEffect, useState } from "react";
import { getData } from "./helpers";
import styles from "./sidebar.module.scss";
import { Menu, Switcher } from "./UI";

export const Sidebar: FC = () => {
  const { role } = useAppSelector((state) => state.user);
  const { toRole, toPage, SIDEBAR_MENU } = getData(role);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`${styles.wrapper}`}>
      <div
        className={`${styles.menu} ${isScrollingUp || lastScrollY === 0 ? styles.visible : styles.hidden}`}
      >
        <Switcher toRole={toRole} toPage={toPage} />
        <Menu menu={SIDEBAR_MENU} />
      </div>
    </div>
  );
};
