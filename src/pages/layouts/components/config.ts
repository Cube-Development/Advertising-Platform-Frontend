import { SVGProps } from "react";

export interface IMenuItems {
  item: IMenuItem;
  onChange: (path?: string) => void;
  openTitle: string;
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
}
