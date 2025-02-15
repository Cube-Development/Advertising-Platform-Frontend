import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";

export const NotFoundPage: FC = () => {
  useClearCookiesOnPage();
  return <div>NotFoundPage</div>;
};
