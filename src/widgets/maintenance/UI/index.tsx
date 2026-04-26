import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Maintenance: FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 font-sans sm:p-6"
      style={{ background: "var(--Gradients-Gradient-7)" }}
    >
      <div className="w-full max-w-[520px] rounded-[var(--borderRadius)] border border-[var(--black-10)] bg-[var(--Personal-colors-White)] px-5 pb-6 pt-8 text-center shadow-lg sm:px-10 sm:pb-9 sm:pt-12">
        {/* Тег */}
        <span className="mb-4 inline-block rounded-full bg-[var(--Personal-colors-Click)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--Personal-colors-light-black)] sm:mb-6 sm:text-[11px]">
          {t("maintenance.tag", { defaultValue: "Технические работы" })}
        </span>

        {/* Иллюстрация */}
        <img
          src="/images/assets/work_template.png"
          alt="Технические работы"
          className="mx-auto mb-6 block w-[220px] sm:mb-8 sm:w-[280px]"
        />

        {/* Заголовок */}
        <h1 className="mb-2 text-lg font-medium leading-tight text-[var(--Personal-colors-black)] sm:mb-2.5 sm:text-[22px]">
          {t("maintenance.title", {
            defaultValue: "Сайт временно недоступен",
          })}
        </h1>

        {/* Подзаголовок */}
        <p className="mb-6 text-sm leading-relaxed text-[var(--Sub-text)] sm:mb-8 sm:text-[15px]">
          {t("maintenance.subtitle", {
            defaultValue:
              "Мы проводим плановые технические работы. Скоро всё будет готово — обычно это занимает пару часов.",
          })}
        </p>

        {/* Статус-бар */}
        <div className="mb-5 flex items-center justify-center gap-2 rounded-[var(--borderRadius)] bg-[var(--Inside-container)] px-4 py-2.5 sm:mb-7 sm:gap-2.5 sm:px-5 sm:py-3">
          <div className="h-2 w-2 shrink-0 animate-glow-amber rounded-full bg-[var(--Orange)]" />
          <span className="text-xs font-medium text-[var(--Personal-colors-black)] sm:text-[13px]">
            {t("maintenance.status", {
              defaultValue: "Работы ведутся прямо сейчас",
            })}
          </span>
        </div>

        {/* Пульсирующие точки */}
        <div className="mb-6 flex items-center justify-center gap-[7px] sm:mb-8">
          <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[var(--secondary-text)]" />
          <span
            className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[var(--secondary-text)]"
            style={{ animationDelay: "0.46s" }}
          />
          <span
            className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[var(--secondary-text)]"
            style={{ animationDelay: "0.92s" }}
          />
        </div>

        {/* Футер */}
        <p className="border-t border-[var(--Card-separator)] pt-4 text-xs leading-relaxed text-[var(--Subtitle-text)] sm:pt-5 sm:text-[12.5px]">
          {t("maintenance.footer", {
            defaultValue: "Срочный вопрос? Пишите на",
          })}{" "}
          <strong className="font-medium text-[var(--Personal-colors-main)]">
            <a href="https://t.me/blogix_support_bloggers" target="_blank">
              @blogix_support_bloggers
            </a>
          </strong>
        </p>
      </div>
    </div>
  );
};
