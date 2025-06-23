import React, { FC, Suspense } from "react";
import { useClearCookiesOnPage } from "@shared/hooks";
import { SuspenseLoader } from "@shared/ui";

const AddOrganization = React.lazy(() =>
  import("@widgets/organization").then((module) => ({
    default: module.AddOrganization,
  })),
);

export const AddOrganizationPage: FC = ({}) => {
  useClearCookiesOnPage();
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <AddOrganization />
    </Suspense>
  );
};
