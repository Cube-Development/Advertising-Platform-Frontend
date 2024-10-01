import {
  IManagerProjectCard,
  managerProjectStatusFilter,
} from "@entities/project";
import { ZeroManagerProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
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
}

export const ManagerProjectsList: FC<ManagerProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  statusFilter,
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
                key={card.id + index}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.managerOrders}
                variants={PAGE_ANIMATION.animationUp}
                className={styles.motion}
              >
                <ManagerProjectCard statusFilter={statusFilter} card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.managerOrders }).map(
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
