import { AdvDevProjectCard } from "@entities/advDevProjectCard";
import { ContinueTemplate } from "@features/continueTemplate";
import { NewProject } from "@features/newProject";
import { TurnkeyProject } from "@features/turnkeyProject";
import { ZeroProject } from "@features/zeroProject";
import { IAdvManagerProjectsDev } from "@shared/types/advProject";
import { FC } from "react";
import styles from "./styles.module.scss";

interface AdvDevProjectProps {
  projects: IAdvManagerProjectsDev;
}

export const AdvDevProject: FC<AdvDevProjectProps> = ({ projects }) => {
  return (
    <div className="container">
      {projects.projects.length === 0 ? (
        <ZeroProject
          listLength={true}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <div className={styles.wrapper}>
          {projects.projects.map((card, index) => (
            <AdvDevProjectCard
              key={index}
              card={card}
              ContinueBtn={ContinueTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
