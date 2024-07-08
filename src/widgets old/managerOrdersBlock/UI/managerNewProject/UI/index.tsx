import { ManagerNewProjectCard } from "src/features old/managerNewProjectCard";
import { ManagerNewProjectStart } from "src/features old/managerNewProjectStart";
import { SendToBot } from "src/features old/sendToBot";
import {
  IManagerNewProjectCard,
  IManagerNewProjects,
} from "@shared/types/managerProject";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerNewProjectProps {
  projects: IManagerNewProjectCard[];
}

export const ManagerNewProject: FC<ManagerNewProjectProps> = ({ projects }) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects?.map((card, index) => (
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
