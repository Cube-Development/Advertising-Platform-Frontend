import { AdvDevProjectCard } from "src/entities old/advDevProjectCard";
import { ContinueTemplate } from "src/features old/continueTemplate";
import { NewProject } from "src/features old/newProject";
import { TurnkeyProject } from "src/features old/turnkeyProject";
import { ZeroProject } from "src/features old/zeroProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "src/features old/showMore";
import { IAdvManagerProjectsDevCard } from "@shared/types/advProject";
import { SkeletonAdvDevProjectCard } from "src/entities old/advDevProjectCard/skeletonAdvDevProjectCard";
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
