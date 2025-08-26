import {
  AdvTemplateProjectCard,
  IAdvTemplateProjectsCard,
  ENUM_PROJECT_TYPES,
  SkeletonTemplateProjectCard,
} from "@entities/project";
import { TurnkeyProject } from "@features/other";
import { ContinueTemplate, NewProject, ZeroProject } from "@features/project";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import styles from "./styles.module.scss";

interface TemplateProjectsListProps {
  projects: IAdvTemplateProjectsCard[];
  isLoading: boolean;
  isLast: boolean;
  typeFilter: ENUM_PROJECT_TYPES;
  handleOnChangePage: () => void;
}

export const TemplateProjectsList: FC<TemplateProjectsListProps> = ({
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
                custom={index % INTERSECTION_ELEMENTS.ADV_PROJECTS}
                variants={PAGE_ANIMATION.animationUp}
              >
                <AdvTemplateProjectCard
                  key={index}
                  card={card}
                  ContinueBtn={ContinueTemplate}
                />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.ADV_PROJECTS }).map(
                (_, index) => <SkeletonTemplateProjectCard key={index} />,
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
