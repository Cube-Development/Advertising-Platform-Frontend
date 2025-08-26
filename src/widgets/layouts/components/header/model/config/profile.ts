import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "@shared/types";
import { UserRoundCog } from "lucide-react";

export const PROFILE_USER_MENU: IMenuItem[] = [
  {
    item: {
      title: "my_profile.data",
      path: ENUM_PATHS.PROFILE,
      icon: UserRoundCog,
    },
  },
];
