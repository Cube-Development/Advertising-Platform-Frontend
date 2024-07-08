import { IManagerNewProjectCard } from "@shared/types/managerProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { ManagerNewProjectCard } from "../card";
import { Accordion } from "@shared/ui";

interface ManagerNewProjectsListProps {
  projects: IManagerNewProjectCard[];
}

export const ManagerNewProjectsList: FC<ManagerNewProjectsListProps> = ({
  projects,
}) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects?.map((card, index) => (
            <ManagerNewProjectCard key={index} card={card} />
          ))}
        </div>
      </Accordion>
    </div>
  );
};
