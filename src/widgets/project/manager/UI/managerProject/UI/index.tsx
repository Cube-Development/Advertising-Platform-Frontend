import { Accordion } from "@radix-ui/react-accordion";
import { FC } from "react";
import styles from "./styles.module.scss";
import { ManagerProjectCard } from "../card";
import { IManagerProjectCard } from "@entities/project";

interface ManagerProjectsListProps {
  projects: IManagerProjectCard[];
}

export const ManagerProjectsList: FC<ManagerProjectsListProps> = ({
  projects,
}) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects?.map((card, index) => (
            <ManagerProjectCard key={index} card={card} />
          ))}
        </div>
      </Accordion>
    </div>
  );
};
