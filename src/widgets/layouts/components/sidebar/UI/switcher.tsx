import {
  ENUM_ROLES,
  ROLES_TYPES_LIST,
  toggleRole,
  USER_ROLES,
  useUpdateRoleMutation,
} from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ISwitcherProps {
  toRole: ENUM_ROLES;
  toPage: ENUM_PATHS;
}

export const Switcher: FC<ISwitcherProps> = ({ toRole, toPage }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [updateRole] = useUpdateRoleMutation();

  const changeRole = () => {
    if (USER_ROLES.includes(role)) {
      dispatch(toggleRole(toRole));
      if (isAuth) {
        updateRole({ role: toRole });
      }
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <Link
        to={toPage}
        onClick={changeRole}
        className="rounded-full cursor-pointer"
      >
        <div
          className="flex items-center justify-center p-1 m-0.5 w-11 h-11 rounded-full  
          border [border-color:var(--Personal-colors-main)]
            [background:var(--primary-gradient)]
            [box-shadow:inset_0px_0px_1px_1px_rgba(255,255,255,1)] "
        >
          <p className="font-semibold text-white">
            {t(ROLES_TYPES_LIST.find((el) => el.type === role)?.name || "")[0]}
          </p>
        </div>
      </Link>
    </div>
  );
};
