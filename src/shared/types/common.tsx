export interface ILogin {
    (vision: boolean, data?: { name: string; email: string }): void;
  }
  

export interface IMenuItem{
  title: string;
  path?: string;
}

export interface IMenuSubItem{
  title: string;
  path: string;
}