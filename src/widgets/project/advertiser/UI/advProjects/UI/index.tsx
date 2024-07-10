import { FC } from "react";
import styles from "./styles.module.scss";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { NewProject, ZeroProject } from "@features/project";
import { TurnkeyProject } from "@features/other";
import { AdvProjectCard, ProjectCardSkeleton } from "../card";
import { IAdvProjectCard } from "@entities/project";

interface AdvProjectsListProps {
  projects: IAdvProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const AdvProjectsList: FC<AdvProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.orders }).map(
                (_, index) => <ProjectCardSkeleton key={index} />,
              )}
            {!isLoading &&
              projects?.map((card, index) => (
                <AdvProjectCard key={index} card={card} />
              ))}
            {isNotEmpty && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </div>
  );
};
