import { FC } from "react";
import styles from "./styles.module.scss";
import { ManagerProjectCard, SkeletonManagerProjectCard } from "../card";
import { IManagerProjectCard } from "@entities/project";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ZeroManagerProject } from "@features/project";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface ManagerProjectsListProps {
  projects: IManagerProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ManagerProjectsList: FC<ManagerProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
  statusFilter,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && projects?.length === 0 ? (
        <ZeroManagerProject />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.managerOrders }).map(
                (_, index) => (
                  <SkeletonManagerProjectCard
                    statusFilter={statusFilter}
                    key={index}
                  />
                ),
              )}
            {!isLoading &&
              projects?.map((card, index) => (
                <ManagerProjectCard
                  statusFilter={statusFilter}
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
