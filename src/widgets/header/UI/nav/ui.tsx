import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { items } from "./config";
import styles from "./styles.module.scss";

export const Nav = () => {
  //   const { pathname } = useRouter();
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };

  const [currentRole, setCurrentRole] = useState("blogger");

  const switchRole = (role: "blogger" | "advertiser") => {
    console.log(role);
    setCurrentRole(role);
  };

  const toggleRole = () => {
    const newRole = currentRole === "blogger" ? "advertiser" : "blogger";
    switchRole(newRole);
  };
  return (
    <nav className={styles.nav}>
      <div
        id="blogger"
        className={`role-switcher ${currentRole === "blogger" ? "active" : ""}`}
        onClick={() => switchRole("blogger")}
      >
        Blogger
      </div>
      <div id="switcher" className="role-switcher" onClick={toggleRole}>
        Switcher
      </div>
      <div
        id="advertiser"
        className={`role-switcher ${
          currentRole === "advertiser" ? "active" : ""
        }`}
        onClick={() => switchRole("advertiser")}
      >
        Advertiser
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavigation(item.href)}
          className={location.pathname === item.href ? styles.active : ""}
        >
          {item.text}
        </div>
      ))}
    </nav>
  );
};
