import { FC } from "react";
import { IAdminHomeCard } from "../model";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ICardProps {
  card: IAdminHomeCard;
}

export const Card: FC<ICardProps> = ({ card }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={card.path}
      className="block max-w-sm p-6 text-left transition-all duration-200 ease-in-out bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-lg hover:scale-105 hover:border-[var(--Personal-colors-main)] group"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-3 transition-colors duration-200 rounded-lg bg-teal-50 group-hover:bg-teal-100 border border-[var(--Personal-colors-main)]">
          <card.icon className="w-6 h-6 text-[var(--Personal-colors-main)]" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--Personal-colors-black)] transition-colors duration-200 group-hover:text-[var(--Personal-colors-main)]">
          {t(card.title)}
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-[var(--Personal-colors-light-black)] ">
        {t(card.text)}
      </p>
    </Link>
  );
};
