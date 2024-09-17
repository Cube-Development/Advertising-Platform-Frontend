import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { IAdvProjectCard } from "@entities/project";
import { TurnkeyProject } from "@features/other";
import { NewProject, ZeroProject } from "@features/project";
import { PAGE_ANIMATION } from "@shared/config";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { AdvProjectCard, ProjectCardSkeleton } from "../card";
import styles from "./styles.module.scss";

interface AdvProjectsListProps {
  projects: IAdvProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const AdvProjectsList: FC<AdvProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isLast,
  typeFilter,
  statusFilter,
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
        <div className={styles.cards}>
          {projects?.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.advOrders}
              variants={PAGE_ANIMATION.animationUp}
              className={styles.motion}
            >
              <AdvProjectCard
                statusFilter={statusFilter}
                typeFilter={typeFilter}
                key={index}
                card={card}
              />
            </motion.div>
          ))}
          {!isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.advOrders }).map(
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
      )}
    </Accordion>
  );
};
