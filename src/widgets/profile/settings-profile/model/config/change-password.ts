import { ENUM_CHANGE_PASSWORD_FORM } from "@entities/user";
import { IBlockData } from "@shared/ui";

export const CHANGE_PASSWORD_DATA: IBlockData = {
  parameters: [
    {
      label: "profile.password_block.current_password",
      type: ENUM_CHANGE_PASSWORD_FORM.CURRENT_PASSWORD,
      validate: {
        required: "profile.password_block.current_password.error.required",
      },
    },
    {
      label: "profile.password_block.new_password",
      type: ENUM_CHANGE_PASSWORD_FORM.NEW_PASSWORD,
      validate: {
        required: "profile.password_block.new_password.error.required",
      },
    },
    {
      label: "profile.password_block.accept_password",
      type: ENUM_CHANGE_PASSWORD_FORM.ACCEPT_PASSWORD,
      validate: {
        required: "profile.password_block.accept_password.error.required",
      },
    },
  ],
};
