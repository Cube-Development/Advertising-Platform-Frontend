import {
  IAdvProjectCard,
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  projectStatus,
  ENUM_PROJECT_TYPES,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { Feedback } from "@features/order";
import {
  AcceptProject,
  ProjectReportActions,
  ProjectCardMenu,
} from "@features/project";
import {
  ArrowSmallVerticalIcon,
  CancelIcon,
  CompleteIcon,
  RocketIcon,
  WaitIcon,
} from "@shared/assets";
import { Chat } from "@widgets/communication";
import { FileChartColumn, Snowflake } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  getProjectPagePath,
  getProjectReportPath,
} from "../../../../lib/projectPaths";
import styles from "./styles.module.scss";

interface AdvProjectCardProps {
  card: IAdvProjectCard;
  typeFilter: ENUM_PROJECT_TYPES;
  statusFilter: ENUM_ADV_MANAGER_PROJECT_STATUS | ENUM_ADV_MY_PROJECT_STATUS;
}

/** Содержимое карточки проекта — используется в списке и в шапке страницы проекта */
export const AdvProjectCardInfo: FC<AdvProjectCardProps> = ({
  card,
  statusFilter,
  typeFilter,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.card} ${
        typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT
          ? //  && statusFilter !== advManagerProjectStatusFilter.completed
            styles.manager_chat
          : ""
      } ${
        typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
        statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED
          ? styles.card__manager_completed
          : ""
      }`}
    >
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span className="gradient_color">{card?.tariff_name}</span>
            <span>{card?.created}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <p>
            {statusFilter === ENUM_ADV_MY_PROJECT_STATUS.COMPLETED
              ? t("orders_advertiser.card.status.completed")
              : statusFilter === ENUM_ADV_MY_PROJECT_STATUS.FROZEN
                ? t("orders_advertiser.card.status.frozen")
                : t("orders_advertiser.card.status.active")}
          </p>
        </div>
      </div>
      {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && (
        // statusFilter !== advManagerProjectStatusFilter.completed &&
        <div className={`${styles.chat__btn} display__hide__min__md`}>
          <Chat projectId={card?.id} toRole={ENUM_ROLES.MANAGER} />
        </div>
      )}
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div>
            <p>{t("orders_advertiser.card.channels")}:</p>
            <span>{card?.count_channels?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_advertiser.card.views")}:</p>
            <span>~ {card?.views?.toLocaleString()}</span>
          </div>
          <div>
            <p>{t("orders_advertiser.card.cost")}:</p>
            <span>
              <span>{card?.budget?.toLocaleString()}</span>
              <small>{t("symbol")}</small>
            </span>
          </div>

          {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED && (
              <div>
                <p>{t("orders_advertiser.card.remainder")}:</p>
                <span>
                  <span>{card?.remainder?.toLocaleString()}</span>
                  <small>{t("symbol")}</small>
                </span>
              </div>
            )}
        </div>
        <>
          {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
          statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.REQUEST_APPROVE ? (
            <div className={styles.card__info__icons_manager_request_approve}>
              {card?.is_request_approve === projectStatus.approved ? (
                <div>
                  <span>{t("orders_advertiser.card.request_approve")}</span>
                </div>
              ) : card?.is_request_approve === projectStatus.request_approve ||
                card?.is_request_approve === projectStatus.changed ? (
                <>
                  <div>
                    <span>
                      {t("orders_advertiser.card.not_request_approve")}
                    </span>
                  </div>
                  <AcceptProject
                    project_id={card?.id}
                    status={card?.is_request_approve!}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED ? (
            <div className={styles.card__info__icons_manager_completed}>
              <div className={styles.top}>
                <div>
                  <CompleteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div>
                  <CancelIcon />
                  <p>{card?.canceled?.toLocaleString()}</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <Feedback />
                <ProjectReportActions
                  project_id={card?.id}
                  report={card?.report}
                />
              </div>
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE ? (
            <div className={styles.card__info__icons_manager_active}>
              <div>
                <RocketIcon />
                <p>{card?.in_progress?.toLocaleString()}</p>
              </div>
              <div>
                <CompleteIcon />
                <p>{card?.completed?.toLocaleString()}</p>
              </div>
              <div>
                <CancelIcon />
                <p>{card?.canceled?.toLocaleString()}</p>
              </div>
              <div>
                <WaitIcon />
                <p>{card?.wait?.toLocaleString()}</p>
              </div>
            </div>
          ) : typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT &&
            statusFilter === ENUM_ADV_MY_PROJECT_STATUS.COMPLETED ? (
            <div className={styles.card__info__icons_completed}>
              <div className={styles.icons}>
                <div className={styles.icon}>
                  <CompleteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div className={styles.icon}>
                  <CancelIcon />
                  <p>{card?.canceled_rejected?.toLocaleString()}</p>
                </div>
              </div>
              <ProjectReportActions
                project_id={card?.id}
                report={card?.report}
              />
            </div>
          ) : (
            <div className={styles.card__info__icons_completed}>
              <div className={styles.card__info__icons}>
                <div className={styles.item__left}>
                  <RocketIcon />
                  <p>{card?.in_progress?.toLocaleString()}</p>
                </div>
                <div className={styles.item__right}>
                  <CompleteIcon />
                  <p>{card?.completed?.toLocaleString()}</p>
                </div>
                <div className={styles.item__left}>
                  <CancelIcon />
                  <p>{card?.canceled_rejected?.toLocaleString()}</p>
                </div>
                <div className={styles.item__right}>
                  <WaitIcon />
                  <p>{card?.wait?.toLocaleString()}</p>
                </div>
                {/* Заказы, замороженные админом: приходит и в активных, и в замороженных проектах */}
                <div className={styles.item__full}>
                  <Snowflake className={styles.frozen__icon} />
                  <p>{(card?.frozen ?? 0).toLocaleString()}</p>
                </div>
                {/* <div className={styles.item__right}>
                  <SearchIcon />
                  <p>{card?.moderation?.toLocaleString()}</p>
                </div> */}
              </div>
              <ProjectReportActions
                project_id={card?.id}
                report={card?.report}
              />
            </div>
          )}
        </>
      </div>
      <div className={styles.card__more}>
        <div className={styles.more__btn}>
          <ProjectCardMenu project_id={card?.id} />
        </div>
        {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && (
          // statusFilter !== advManagerProjectStatusFilter.completed &&
          <div className={`${styles.chat__btn} display__hide__max__md`}>
            <Chat projectId={card?.id} toRole={ENUM_ROLES.MANAGER} />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Карточка проекта в списке: без аккордеона. «Подробнее» — страница проекта,
 * у «Моих проектов» рядом «Отчёт» — страница отчёта
 */
export const AdvProjectCard: FC<AdvProjectCardProps> = ({
  card,
  statusFilter,
  typeFilter,
}) => {
  const { t } = useTranslation();
  const pathParams = {
    projectId: card?.id,
    projectType: typeFilter,
    projectStatus: statusFilter,
  };
  const hasReport = typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT;

  return (
    <div
      style={
        {
          "--zIndexTop": "-3",
          "--zIndexBottom": "-4",
        } as React.CSSProperties
      }
      className={`${styles.wrapper} ${
        typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
        statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED
          ? styles.completed
          : ""
      } border__gradient`}
    >
      <AdvProjectCardInfo
        card={card}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
      />
      <div className={`${styles.card__btns} ${hasReport ? styles.double : ""}`}>
        <Link to={getProjectPagePath(pathParams)} className={styles.card__btn}>
          {t("adv_project_page.open")}
          <ArrowSmallVerticalIcon className="icon__white rotate__down side" />
        </Link>
        {hasReport && (
          <Link
            to={getProjectReportPath(pathParams)}
            className={styles.card__btn}
          >
            <FileChartColumn className="size-4 stroke-[2px]" />
            {t("adv_project_page.report.short")}
          </Link>
        )}
      </div>
    </div>
  );
};
