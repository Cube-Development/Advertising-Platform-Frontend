import { ENUM_PROJECT_TYPES, ISavedProjectCard } from "@entities/project";
import { NewProject, ZeroProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC } from "react";
import { SavedProjectCard, SkeletonSavedProjectCard } from "../card";
import styles from "./styles.module.scss";
import { TurnkeyProject } from "@features/other";

interface SavedProjectsListProps {
  projects: ISavedProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  currentPage: number;
}

export const SavedProjectsList: FC<SavedProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  currentPage,
}) => {
  return (
    <Accordion type="single" collapsible className={styles.wrapper}>
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          typeFilter={ENUM_PROJECT_TYPES.SAVED_PROJECT}
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
                  elements: INTERSECTION_ELEMENTS.ADV_PROJECTS,
                })}
                variants={PAGE_ANIMATION.animationUp}
                className={styles.motion}
              >
                <SavedProjectCard card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({
                length: INTERSECTION_ELEMENTS.ADV_PROJECTS,
              }).map((_, index) => <SkeletonSavedProjectCard key={index} />)}
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
