import { ArrowLeft } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getProjectsListPath } from "../../lib/projectPaths";

interface ProjectPageHeaderProps {
  title?: string;
  projectType: string;
  projectStatus?: string;
  /** Куда ведёт «назад»; по умолчанию — список проектов на ту же вкладку */
  backTo?: string;
  backLabel?: string;
  /** Кнопки справа от названия (например, переход на отчёт) */
  actions?: ReactNode;
}

/** «Назад», название проекта и кнопки перехода между страницами проекта */
export const ProjectPageHeader: FC<ProjectPageHeaderProps> = ({
  title,
  projectType,
  projectStatus,
  backTo,
  backLabel,
  actions,
}) => {
  const { t } = useTranslation();
  const backPath =
    backTo ?? getProjectsListPath({ projectType, projectStatus });
  const label = backLabel ?? t("adv_project_page.back");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        to={backPath}
        aria-label={label}
        title={label}
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0px_2px_5px_2px_rgba(10,165,190,0.4)] transition-opacity hover:opacity-80"
      >
        <ArrowLeft className="size-5 stroke-[2px] text-[var(--Personal-colors-main)]" />
      </Link>
      <h1 className="min-w-0 flex-1 truncate xl:text-2xl md:text-xl text-base font-bold text-[var(--Personal-colors-black)]">
        {title}
      </h1>
      {actions ? (
        <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
          {actions}
        </div>
      ) : null}
    </div>
  );
};

interface ProjectNavLinkProps {
  to: string;
  icon: ReactNode;
  children: ReactNode;
}

/** Кнопка-ссылка между страницами проекта и отчёта — в стиле кнопок кабинета */
export const ProjectNavLink: FC<ProjectNavLinkProps> = ({
  to,
  icon,
  children,
}) => (
  <Link
    to={to}
    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-white shadow-[0px_3px_6px_0px_rgba(43,90,212,0.42)] transition-opacity hover:opacity-90 sm:w-auto [&>svg]:size-4 [&>svg]:stroke-[2px]"
    style={{ background: "var(--primary-gradient)" }}
  >
    {icon}
    {children}
  </Link>
);
