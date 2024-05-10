import { ManagerNewProjectCard } from "@features/managerNewProjectCard";
import { ManagerNewProjectStart } from "@features/managerNewProjectStart";
import { SendToBot } from "@features/sendToBot";
import { IManagerNewProjects } from "@shared/types/managerProjects";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerNewProjectProps {
  projects: IManagerNewProjects;
}

export const ManagerNewProject: FC<ManagerNewProjectProps> = ({ projects }) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects.projects.map((card, index) => (
            <ManagerNewProjectCard
              key={index}
              card={card}
              ManagerNewProjectStartBtn={ManagerNewProjectStart}
              SendToBotBtn={SendToBot}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};
