import { AdvDevProjectCard } from "@entities/advDevProjectCard";
import { ContinueTemplate } from "@features/continueTemplate";
import { NewProject } from "@features/newProject";
import { TurnkeyProject } from "@features/turnkeyProject";
import { ZeroProject } from "@features/zeroProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";
import { IAdvManagerProjectsDevCard } from "@shared/types/advProject";
import { SkeletonAdvDevProjectCard } from "@entities/advDevProjectCard/skeletonAdvDevProjectCard";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";

interface AdvDevProjectProps {
  projects: IAdvManagerProjectsDevCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const AdvDevProject: FC<AdvDevProjectProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <div className="container">
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={true}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.orders }).map(
              (_, index) => <SkeletonAdvDevProjectCard key={index} />,
            )}
          {!isLoading &&
            projects?.map((card, index) => (
              <AdvDevProjectCard
                key={index}
                card={card}
                ContinueBtn={ContinueTemplate}
              />
            ))}
          {isNotEmpty && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
