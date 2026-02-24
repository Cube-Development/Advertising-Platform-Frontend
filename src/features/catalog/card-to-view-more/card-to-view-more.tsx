import { ENUM_PATHS } from "@shared/routing";
import { Card, CardContent, CardDescription, MyButton } from "@shared/ui";
import { type FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CardToViewMore: FC = () => {
  const { t } = useTranslation();
  return (
    <Card
      className="rounded-xl"
      style={{
        backgroundColor: "rgba(12, 162, 184, 0.10)",
      }}
    >
      <CardContent className="pt-6 gap-4 grid">
        <CardDescription className="text-center text-none text-xs">
          <Trans
            i18nKey="catalog.card_to_view_more.description"
            components={[
              <span key="0" className="font-semibold" />,
              <span key="1" className="font-semibold" />,
            ]}
          />
        </CardDescription>
        <Link to={ENUM_PATHS.LOGIN}>
          <MyButton
            className="w-full rounded-xl text-[var(--Personal-colors-main)]"
            buttons_type="button__white"
          >
            {t("catalog.card_to_view_more.buttons.register")}
          </MyButton>
        </Link>
      </CardContent>
    </Card>
  );
};
