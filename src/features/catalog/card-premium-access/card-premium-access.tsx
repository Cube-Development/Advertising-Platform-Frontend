import { LockIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  MyButton,
} from "@shared/ui";
import { type FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

export const CardPremiumAccess: FC = () => {
  const { t } = useTranslation();
  return (
    <Card
      className="rounded-xl"
      style={{
        backgroundColor: "rgba(12, 162, 184, 0.10)",
      }}
    >
      <CardContent className="pt-6 gap-4 grid md:grid-cols-[1fr_max-content] items-center grid-rows-auto">
        <div className="grid sm:grid-cols-[max-content_1fr] sm:gap-5 gap-2 grid-rows-auto justify-center items-center justify-items-center">
          <LockIcon className="text-[var(--Personal-colors-main)] sm:w-6 sm:h-6 w-8 h-8" />
          <CardDescription className="text-center text-xs text-none">
            <Trans
              i18nKey="catalog.card_premium_access.description"
              components={[
                <span key="0" className="font-semibold" />,
                <span key="1" className="font-semibold" />,
              ]}
            />
          </CardDescription>
        </div>
        <Link to={ENUM_PATHS.WALLET_TOP_UP}>
          <MyButton
            className="w-full rounded-xl text-[var(--Personal-colors-main)] text-xs"
            buttons_type="button__white"
          >
            {t("catalog.card_premium_access.buttons.balance")}
          </MyButton>
        </Link>
      </CardContent>
    </Card>
  );
};
