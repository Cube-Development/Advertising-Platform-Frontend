import { useGetOrganizationQuery } from "@entities/organization";
import { LogoutEcp } from "@features/organization";
import { useAppSelector } from "@shared/hooks";
import {
  NotLogin,
  OrganizationDataForm as OrganizationForm,
} from "@widgets/organization";
import { FC } from "react";
import { CommittentCard } from "./committent-card";

export const OrganizationDataForm: FC = ({}) => {
  const { isAuthEcp, isCommittent } = useAppSelector((state) => state.user);
  const { data: organization, isLoading } = useGetOrganizationQuery();

  if (isLoading) return null;

  if (isCommittent && organization) {
    return (
      <div className="frame">
        <CommittentCard organization={organization} />
      </div>
    );
  }

  if (!isAuthEcp || !organization) {
    return <NotLogin className="frame" />;
  }

  return (
    <div className="relative frame">
      <div className="absolute top-4 right-4">
        <LogoutEcp />
      </div>
      <OrganizationForm />
    </div>
  );
};
