import { FC } from "react";
import styles from "./styles.module.scss";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { NewProject, ZeroProject } from "@features/project";
import { TurnkeyProject } from "@features/other";
import { AdvProjectCard, ProjectCardSkeleton } from "../card";
import { IAdvProjectCard } from "@entities/project";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface AdvProjectsListProps {
  projects: IAdvProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const AdvProjectsList: FC<AdvProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
  typeFilter,
  statusFilter,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
          typeFilter={typeFilter}
        />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.orders }).map(
                (_, index) => (
                  <ProjectCardSkeleton
                    typeFilter={typeFilter}
                    statusFilter={statusFilter}
                    key={index}
                  />
                ),
              )}
            {!isLoading &&
              projects?.map((card, index) => (
                <AdvProjectCard
                  statusFilter={statusFilter}
                  typeFilter={typeFilter}
                  key={index}
                  card={card}
                />
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
