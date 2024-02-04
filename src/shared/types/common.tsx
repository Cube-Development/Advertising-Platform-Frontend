export interface ILogin {
    (vision: boolean, data?: { name: string; email: string }): void;
  }
  


export interface IMenuItems {
  item: IMenuItem;
  subItems?: IMenuSubItem[];
}

interface IMenuItem{
  title: string;
  img?: React.FC;
  path?: string;
}

interface IMenuSubItem{
  title: string;
  path: string;
}

