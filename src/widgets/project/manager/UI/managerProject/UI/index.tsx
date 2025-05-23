import {
  IManagerProjectCard,
  managerProjectStatusFilter,
} from "@entities/project";
import { ZeroManagerProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC } from "react";
import { ManagerProjectCard, SkeletonManagerProjectCard } from "../card";
import styles from "./styles.module.scss";

interface ManagerProjectsListProps {
  projects: IManagerProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: managerProjectStatusFilter;
  currentPage: number;
}

export const ManagerProjectsList: FC<ManagerProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  statusFilter,
  currentPage,
}) => {
  return (
    <Accordion type="single" collapsible className={styles.wrapper}>
      {!isLoading && projects?.length === 0 ? (
        <ZeroManagerProject />
      ) : (
        <div>
          <div className={styles.cards}>
            {projects?.map((card, index) => (
              <motion.div
                key={card.project_id}
                initial="hidden"
                animate="visible"
                custom={getAnimationDelay({
                  index,
                  currentPage,
                  total: projects.length,
                  elements: INTERSECTION_ELEMENTS.MANAGER_ORDERS,
                })}
                variants={PAGE_ANIMATION.animationUp}
                className={styles.motion}
              >
                <ManagerProjectCard statusFilter={statusFilter} card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.MANAGER_ORDERS }).map(
                (_, index) => (
                  <SkeletonManagerProjectCard
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
