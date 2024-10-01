import { IManagerNewProjectCard } from "@entities/project";
import { ZeroManagerProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { ManagerNewProjectCard, SkeletonManagerNewProjectCard } from "../card";
import styles from "./styles.module.scss";

interface ManagerNewProjectsListProps {
  projects: IManagerNewProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
}

export const ManagerNewProjectsList: FC<ManagerNewProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
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
              >
                <ManagerNewProjectCard card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.managerOrders }).map(
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
