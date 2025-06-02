import { ENUM_ROLES, toggleRole, useUpdateRoleMutation } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";

interface IChangeRole {
  isAuth?: boolean;
  role?: ENUM_ROLES;
}

export const useChangeRole = ({ isAuth, role }: IChangeRole) => {
  const dispatch = useAppDispatch();
  const [update] = useUpdateRoleMutation();

  const updateRole = (currentRole: ENUM_ROLES) => {
    if (currentRole !== role) {
      dispatch(toggleRole(currentRole));
      if (isAuth) {
        update({ role: currentRole });
      }
    }
  };

  const changeRole = (path?: string) => {
    if (path === ENUM_PATHS.MAIN) {
      updateRole(ENUM_ROLES.ADVERTISER);
    } else if (path === ENUM_PATHS.MAIN_BLOGGER) {
      updateRole(ENUM_ROLES.BLOGGER);
    }
  };

  return { updateRole, changeRole };
};
