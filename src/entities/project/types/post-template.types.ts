import { IPostData } from "./managerProject";

export interface IPostTemplate {
  id?: string;
  name: string;
  files: IPostData[];
}
