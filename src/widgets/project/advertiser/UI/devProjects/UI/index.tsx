import {
  AdvDevProjectCard,
  IAdvManagerProjectsDevCard,
  projectTypesFilter,
  SkeletonAdvDevProjectCard,
} from "@entities/project";
import { TurnkeyProject } from "@features/other";
import { NewProject, ZeroProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { Chat } from "@widgets/communication";
import { motion } from "framer-motion";
import { FC } from "react";
import styles from "./styles.module.scss";

interface DevProjectsListProps {
  projects: IAdvManagerProjectsDevCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  typeFilter: projectTypesFilter;
}

export const DevProjectsList: FC<DevProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  typeFilter,
}) => {
  return (
    <div className={styles.wrapper}>
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={true}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          typeFilter={typeFilter}
        />
      ) : (
        <div>
          <div className={styles.cards}>
            {projects?.map((card, index) => (
              <motion.div
                key={card.id + index}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.advOrders}
                variants={PAGE_ANIMATION.animationUp}
              >
                <AdvDevProjectCard key={index} card={card} ChatBtn={Chat} />
              </motion.div>
            ))}
            {!isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.advOrders }).map(
                (_, index) => <SkeletonAdvDevProjectCard key={index} />,
              )}
            {!isLast && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
