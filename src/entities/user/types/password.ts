export interface IPasswordData {
  current_password: string;
  new_password: string;
  accept_password?: string;
}

export enum ENUM_CHANGE_PASSWORD_FORM {
  CURRENT_PASSWORD = "current_password",
  NEW_PASSWORD = "new_password",
  ACCEPT_PASSWORD = "accept_password",
}
