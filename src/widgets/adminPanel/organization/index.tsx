import { FC } from "react";
import { OrganizationDataForm } from "./UI";

interface IOrganizationProps {
  // add your props here
}

export const Organization: FC<IOrganizationProps> = ({}) => {
  return (
    <div className="container">
      <OrganizationDataForm />
    </div>
  );
};
