import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IGuideCard } from "@entities/faq";
import { ENUM_PATHS } from "@shared/routing";

export const GuideCard: FC<IGuideCard> = ({
  title,
  description,
  guide_id,
  icon,
}) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`${ENUM_PATHS.GUIDE.replace(":guide_id", guide_id)}`}
      className="w-full bg-white grid grid-rows-[auto,auto,auto,1fr] content-start gap-4 shadow-md hover:shadow-lg rounded-[20px] border border-gray-200 p-4 hover:border-blue-600 transition-all duration-500 ease-in-out"
    >
      {icon}
      <h2 className="mobile-xl:text-base text-sm font-semibold">{t(title)}</h2>
      <h4 className="mobile-xl:text-xs text-[10px] text-gray-500 leading-3">
        {t(description)}
      </h4>
      <div className="grid grid-flow-col gap-0.5 items-center justify-start text-[var(--URL)] underline">
        <p className="text-xs leading-3 font-medium">{t("guides.more")}</p>
        <ArrowRight className="size-4" />
      </div>
    </Link>
  );
};
