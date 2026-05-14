import { useMemo } from "react";
import { Button } from "@shared/ui";
import { ShieldCheck, TuningSquare2, Wallpaper } from "@solar-icons/react";
import { Trans, useTranslation } from "react-i18next";
import { ConfiguratorForm } from "./ConfiguratorForm";
import { CtaHero } from "./CtaHero";
import type { FeatureItem } from "./CtaHero";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";

const FEATURES: FeatureItem[] = [
  {
    Icon: TuningSquare2,
    text: "main_advertiser.cta.features.0",
  },
  {
    Icon: Wallpaper,
    text: "main_advertiser.cta.features.1",
  },
  { Icon: ShieldCheck, text: "main_advertiser.cta.features.2" },
];

export default function Cta() {
  const { t } = useTranslation();
  const translatedFeatures = useMemo(
    () => FEATURES.map((f) => ({ ...f, text: t(f.text) })),
    [t],
  );
  return (
    <section className="container relative w-full py-12 mt-14 lg:!mt-16">
      <div className="grid items-start grid-cols-1 gap-8 mx-auto lg:grid-cols-2 lg:gap-8">
        <CtaHero
          title={
            <Trans
              i18nKey="main_advertiser.cta.title"
              components={[
                <span key="0" className="text-[var(--Personal-colors-main)]" />,
              ]}
            />
          }
          subtitle={t("main_advertiser.cta.subtitle")}
          features={translatedFeatures}
          action={
            <Link to={ENUM_PATHS.CATALOG}>
              <Button variant="primary" size="xl">
                {t("main_advertiser.cta.action")}
              </Button>
            </Link>
          }
        />

        {/* ===== RIGHT — CONFIGURATOR CARD ===== */}
        <div className="w-full max-w-xl mx-auto lg:mx-0 lg:max-w-none">
          <ConfiguratorForm />
        </div>
      </div>
    </section>
  );
}
