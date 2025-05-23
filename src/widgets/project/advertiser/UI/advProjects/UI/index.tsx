import {
  advManagerProjectStatusFilter,
  IAdvProjectCard,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { TurnkeyProject } from "@features/other";
import { NewProject, ZeroProject } from "@features/project";
import { PAGE_ANIMATION } from "@shared/config";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC } from "react";
import { AdvProjectCard, ProjectCardSkeleton } from "../card";
import styles from "./styles.module.scss";

interface AdvProjectsListProps {
  projects: IAdvProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  typeFilter: projectTypesFilter;
  statusFilter: advManagerProjectStatusFilter | myProjectStatusFilter;
  currentPage: number;
}

export const AdvProjectsList: FC<AdvProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  typeFilter,
  statusFilter,
  currentPage,
}) => {
  return (
    <Accordion type="single" collapsible className={styles.wrapper}>
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          typeFilter={typeFilter}
        />
      ) : (
        <div>
          <div className={styles.cards}>
            {projects?.map((card, index) => (
              <motion.div
                key={card.id}
                initial="hidden"
                animate="visible"
                custom={getAnimationDelay({
                  index,
                  currentPage,
                  total: projects.length,
                  elements: INTERSECTION_ELEMENTS.ADV_ORDERS,
                })}
                variants={PAGE_ANIMATION.animationUp}
                className={styles.motion}
              >
                <AdvProjectCard
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  card={card}
                />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.ADV_ORDERS }).map(
                (_, index) => (
                  <ProjectCardSkeleton
                    typeFilter={typeFilter}
                    statusFilter={statusFilter}
                    key={index}
                  />
                ),
              )}
            {!isLast && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </div>
      )}
    </Accordion>
  );
};
