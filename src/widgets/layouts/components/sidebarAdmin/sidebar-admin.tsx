import { CubeDevelopmentIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import {
  cn,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@shared/ui";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_MENU, ADMIN_MENU_ORGANIZATION } from "./model";
import { IMenuItem } from "@shared/types";

export function SidebarAdmin({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const { t } = useTranslation();

  let MENU: IMenuItem[] = [...ADMIN_MENU, ...ADMIN_MENU_ORGANIZATION];

  // switch (isAuthEcp) {
  //   case true:
  //     MENU = [...ADMIN_MENU, ...ADMIN_MENU_ORGANIZATION];
  //     break;
  //   case false:
  //     MENU = ADMIN_MENU;
  //     break;
  // }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          //   className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground aspect-square size-8">
            <CubeDevelopmentIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-sm leading-tight text-left">
            <span className="font-medium truncate">CubeDevelopment</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
          {MENU.map((item, index) => (
            <SidebarMenuButton
              tooltip={t(item?.item?.title || "")}
              key={index}
              asChild
            >
              <Link
                to={item.item.path!}
                className={cn(
                  location?.pathname === item?.item?.path &&
                    "bg-sidebar-primary text-white hover:bg-sidebar-primary hover:text-white",
                )}
              >
                {item?.item?.icon && <item.item.icon />}
                <span className="text-md">{t(item?.item?.title || "")}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
