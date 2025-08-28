import { useTranslation } from "react-i18next";
import { ADMIN_CARDS_LIST } from "./model";
import { Card } from "./UI";

export const AdminHome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="min-h-screen py-8 text-center ">
        <h1 className="mb-4 text-4xl font-bold text-[var(--Personal-colors-black)]">
          {t("admin_panel.home.title")}
        </h1>

        <p className="max-w-2xl mx-auto mb-8 text-xl text-[var(--Personal-colors-light-black)]">
          {t("admin_panel.home.text")}
        </p>

        <div className="grid max-w-6xl grid-cols-1 gap-6 p-6 mx-auto md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {ADMIN_CARDS_LIST.map((card) => (
            <Card card={card} key={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
};
