import { ENUM_ROLES } from "@entities/user";
import * as React from "react";
import { ENUM_PATHS } from "./path.enum";
import { ENUM_AUTH_TYPES, ENUM_LAYOUT_TYPES } from "./routes.enum";

export interface IRouting {
  path: ENUM_PATHS;
  component: React.ComponentType;
  auth: ENUM_AUTH_TYPES;
  roles?: ENUM_ROLES[];
  authSidebar?: boolean;
  nonAuthSidebar?: boolean;
  adminSidebar?: boolean;
  layout: ENUM_LAYOUT_TYPES;
}
