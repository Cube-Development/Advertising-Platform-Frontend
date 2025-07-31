import { LucideIcon } from "lucide-react";

export interface IMenuItem {
  item: IMenuItemParams;
  subItems?: IMenuItemParams[];
}
interface IMenuItemParams {
  title?: string;
  icon?: LucideIcon;
  path?: string;
}
