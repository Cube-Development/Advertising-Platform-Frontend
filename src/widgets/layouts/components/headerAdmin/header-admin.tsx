import { Separator, SidebarTrigger } from "@shared/ui";
import { Chat, Notifications } from "@widgets/communication";
import { FC } from "react";
import { LanguageToggle, Profile } from "./UI";

export const HeaderAdmin: FC = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between border-b border-gray-200">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
      </div>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4 ml-4"
        />
        <div className="grid items-center justify-center grid-cols-3 gap-2 px-5">
          <Notifications />
          <Chat isMain={true} />
          <Profile />
        </div>
      </div>
    </header>
  );
};
