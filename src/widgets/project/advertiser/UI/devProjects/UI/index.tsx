import { FC } from "react";
import styles from "./styles.module.scss";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { ContinueTemplate, NewProject, ZeroProject } from "@features/project";
import { TurnkeyProject } from "@features/other";
import {
  AdvDevProjectCard,
  IAdvManagerProjectsDevCard,
  SkeletonAdvDevProjectCard,
} from "@entities/project";
import { INTERSECTION_ELEMENTS } from "@shared/config";

interface DevProjectsListProps {
  projects: IAdvManagerProjectsDevCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const DevProjectsList: FC<DevProjectsListProps> = ({
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
