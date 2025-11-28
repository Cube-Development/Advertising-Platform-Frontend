import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";

interface LogoProps {
  currentRole: ENUM_ROLES;
}

export const Logo: FC<LogoProps> = ({ currentRole }) => {
  const handleLogoClick = () => {
    if (
      window.location.pathname === ENUM_PATHS.MAIN_BLOGGER ||
      window.location.pathname === ENUM_PATHS.MAIN
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div onClick={handleLogoClick}>
      <Link
        to={
          currentRole === ENUM_ROLES.BLOGGER
            ? ENUM_PATHS.MAIN_BLOGGER
            : ENUM_PATHS.MAIN
        }
      >
        <img
          src={logo}
          alt="Blogix logo"
          className="h-[24px] sm:h-[28px] md:h-[36px] cursor-pointer"
        />
      </Link>
    </div>
  );
};
