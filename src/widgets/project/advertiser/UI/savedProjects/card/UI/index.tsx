import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  DownloadApproveReport,
  EditProject,
  RunSavedProject,
} from "@features/project";
import {
  ENUM_PROJECT_TYPES,
  ISavedProjectCard,
  useDeleteSavedProjectMutation,
} from "@entities/project";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { getProjectPagePath } from "../../../../lib/projectPaths";
import styles from "./styles.module.scss";
import { Loader, Trash2 } from "lucide-react";
import { useToast } from "@shared/ui";

interface SavedProjectCardProps {
  card: ISavedProjectCard;
}

/** Содержимое карточки сохранённого проекта — в списке и в шапке страницы проекта */
export const SavedProjectCardInfo: FC<SavedProjectCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const [deleteSavedProject, { isLoading: isLoadingDelete }] =
    useDeleteSavedProjectMutation();
  const { toast } = useToast();
  const handleDeleteSavedProject = async (project_id: string) => {
    if (isLoadingDelete) return;
    deleteSavedProject({ project_id })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: "success...",
        });
      })
      .catch(() => {
        toast({
          variant: "error",
          title: "error...",
        });
      });
  };
  return (
    <div className={`${styles.card} ${styles.request_approve}`}>
      <div className={styles.card__description}>
        <div className={styles.card__description__data}>
          <div className={styles.card__description__data__title}>
            <p className="truncate">{card?.project_name}</p>
            <span>№{card?.identifier}</span>
          </div>
          <div className={styles.card__description__data__date}>
            <span>{card?.created}</span>
          </div>
        </div>
        <div className={styles.card__description__status}>
          <span>{t("orders_advertiser.card.status.saved")}</span>
          <div
            className="cursor-pointer absolute top-5 right-5"
            onClick={() => handleDeleteSavedProject(card?.id)}
          >
            {isLoadingDelete ? (
              <Loader className="animate-spin md:size-7 size-5 stroke-[2px] text-red-500" />
            ) : (
              <Trash2 className="md:size-7 size-5 stroke-[2px] text-red-500" />
            )}
          </div>
        </div>
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__info__data}>
          <div>
            <p>{t("orders_advertiser.card.channels")}:</p>
            <span>{card?.orders?.toLocaleString()}</span>
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
        </div>
        <div className="md:hidden block">
          <DownloadApproveReport project_id={card?.id} />
        </div>
        <div className={styles.card__info__btns}>
          <div className={styles.card__info__btns__actions}>
            <EditProject project_id={card?.id} />
            {/* TODO: add launch project */}
            <RunSavedProject project_id={card?.id} totalAmount={card?.budget} />
          </div>
        </div>
      </div>
    </div>
  );
};

/** Карточка сохранённого проекта: без аккордеона — «Подробнее» ведёт на страницу проекта */
export const SavedProjectCard: FC<SavedProjectCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const projectPath = getProjectPagePath({
    projectId: card?.id,
    projectType: ENUM_PROJECT_TYPES.SAVED_PROJECT,
  });

  return (
    <div
      style={
        {
          "--zIndexTop": "-3",
          "--zIndexBottom": "-4",
        } as React.CSSProperties
      }
      className={`${styles.wrapper} border__gradient`}
    >
      <SavedProjectCardInfo card={card} />
      <div className="md:block hidden w-[94%] mx-auto">
        <DownloadApproveReport project_id={card?.id} />
      </div>
      <Link to={projectPath} className={styles.card__btn}>
        {t("adv_project_page.open")}
        <ArrowSmallVerticalIcon className="icon__white rotate__down side" />
      </Link>
    </div>
  );
};
