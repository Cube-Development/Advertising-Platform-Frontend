import { ManagerNewProjectCard } from "@features/managerNewProjectCard";
import { SkeletonManagerNewProjectCard } from "@features/managerNewProjectCard/skeletonManagerNewProjectCard";
import { ManagerNewProjectStart } from "@features/managerNewProjectStart";
import { SendToBot } from "@features/sendToBot";
import { ShowMoreBtn } from "@features/showMore";
import { ZeroManagerProject } from "@features/zeroManagerProject";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { IManagerNewProjectCard } from "@shared/types/managerProject";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerNewProjectProps {
  projects: IManagerNewProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const ManagerNewProject: FC<ManagerNewProjectProps> = ({
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
                <ManagerNewProjectCard
                  key={index}
                  card={card}
                  ManagerNewProjectStartBtn={ManagerNewProjectStart}
                  SendToBotBtn={SendToBot}
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
