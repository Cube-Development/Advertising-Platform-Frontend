import { FC } from "react";
import styles from "./styles.module.scss";
import { ManagerNewProjectCard, SkeletonManagerNewProjectCard } from "../card";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { IManagerNewProjectCard } from "@entities/project";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ZeroManagerProject } from "@features/project";

interface ManagerNewProjectsListProps {
  projects: IManagerNewProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const ManagerNewProjectsList: FC<ManagerNewProjectsListProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
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
                (_, index) => <SkeletonManagerNewProjectCard key={index} />,
              )}
            {!isLoading &&
              projects?.map((card, index) => (
                <ManagerNewProjectCard key={index} card={card} />
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
