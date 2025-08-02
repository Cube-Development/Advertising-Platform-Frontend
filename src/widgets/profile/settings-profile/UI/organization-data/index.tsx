import { LogoutEcp } from "@features/organization";
import { useAppSelector } from "@shared/hooks";
import {
  NotLogin,
  OrganizationDataForm as OrganizationForm,
} from "@widgets/organization";
import { FC } from "react";

export const OrganizationDataForm: FC = ({}) => {
  const { isAuthEcp } = useAppSelector((state) => state.user);

  return (
    <div className="relative frame">
      {isAuthEcp ? (
        <>
          <div className="absolute top-4 right-4 ">
            <LogoutEcp />
          </div>
          <OrganizationForm />
        </>
      ) : (
        <NotLogin />
      )}
    </div>
  );
};
