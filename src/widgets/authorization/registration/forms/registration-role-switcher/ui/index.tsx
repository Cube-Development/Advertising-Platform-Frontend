import { ENUM_ROLES, toggleRole, USER_ROLES } from "@entities/user";
import { BarSubFilter } from "@features/other";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { FC } from "react";
import { REGISTRATION_ROLE_SWITCHER } from "../../config";
import styles from "./styles.module.scss";

export const RegistrationRoleSwitcher: FC = () => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  const currentRole = USER_ROLES.includes(role) ? role : ENUM_ROLES.ADVERTISER;

  return (
    <div className={styles.roleSwitcher}>
      <BarSubFilter
        tab={currentRole}
        changeTab={(selectedRole) => dispatch(toggleRole(selectedRole))}
        tab_list={REGISTRATION_ROLE_SWITCHER}
        isFixedColumns={true}
      />
    </div>
  );
};
