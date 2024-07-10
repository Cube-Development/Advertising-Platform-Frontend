import { IAddChannelQuery } from "@entities/channel";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const AddChannel: FC<IAddChannelQuery> = ({ props, path }) => {
  const { t } = useTranslation();

  return (
    <Link to={path}>
      <MyButton {...props}>{t(`btn_add_platform`)}</MyButton>
    </Link>
  );
};
