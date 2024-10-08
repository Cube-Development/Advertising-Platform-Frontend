import { SVGProps } from "react";

export interface IMenuItems {
  item: IMenuItem;
  onChange: (path?: string) => void;
  openTitle: string;
  isAuth?: boolean;
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
}
