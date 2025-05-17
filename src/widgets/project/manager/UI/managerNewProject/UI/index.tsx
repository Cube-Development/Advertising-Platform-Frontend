import { IManagerNewProjectCard } from "@entities/project";
import { ZeroManagerProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC } from "react";
import { ManagerNewProjectCard, SkeletonManagerNewProjectCard } from "../card";
import styles from "./styles.module.scss";

interface ManagerNewProjectsListProps {
  projects: IManagerNewProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  currentPage: number;
}

export const ManagerNewProjectsList: FC<ManagerNewProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
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
              >
                <ManagerNewProjectCard card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.MANAGER_ORDERS }).map(
                (_, index) => <SkeletonManagerNewProjectCard key={index} />,
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
