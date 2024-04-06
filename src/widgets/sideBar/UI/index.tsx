import { FC } from "react";
import styles from "./styles.module.scss";
import { roles } from "@shared/config/roles";
import { userSlice } from "@shared/store/reducers";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { advertiserMenu, bloggerMenu, commonMenu } from "./config";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";

export const SideBar: FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const toggleRole = (role: roles) => {
    dispatch(userSlice.actions.toggleRole(role));
  };

  const combinedMenu =
    role === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : [...bloggerMenu, ...commonMenu];

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
                  : t("roles.blogger")[0]}
              </p>
            </Link>
          </div>
        </div>
        {combinedMenu.map((item, index) => (
          <Link to={item.item.path} key={index}>
            <li className={styles.row}>
              <item.item.img />
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
};
