import { projectTypesFilter } from "@entities/project";
import {
  IViewAdvertiserProject,
  IViewBloggerChannel,
  IViewBloggerOrder,
  IViewManagerProject,
  IViewWallet,
  viewsTypes,
} from "@entities/views";
import { walletTypesFilter } from "@entities/wallet";
import { SVGProps } from "react";

export interface IMenuItems {
  item: IMenuItem;
  onChange: (path?: string) => void;
  openTitle: string;
  isAuth?: boolean;
  viewsInfo?:
    | IViewAdvertiserProject
    | IViewBloggerOrder
    | IViewBloggerChannel
    | IViewManagerProject
    | IViewWallet;
}

export interface IMenuItem {
  item: IMenuItemParams;
  subItems?: IMenuItemParams[];
}
interface IMenuItemParams {
  title?: string;
  img?: React.FC<SVGProps<SVGSVGElement>>;
  path?: string;
  openMenu?: boolean;
  isDialog?: boolean;
  type?: viewsTypes | projectTypesFilter | walletTypesFilter;
}
