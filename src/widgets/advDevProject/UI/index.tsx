import { AdvDevProjectCard } from "@entities/advDevProjectCard";
import { ContinueTemplate } from "@features/continueTemplate";
import { NewProject } from "@features/newProject";
import { TurnkeyProject } from "@features/turnkeyProject";
import { ZeroProject } from "@features/zeroProject";
import { IAdvDevProjectCard } from "@shared/types/common";
import { FC } from "react";

interface AdvDevProjectProps {
  cards: IAdvDevProjectCard[];
}

export const AdvDevProject: FC<AdvDevProjectProps> = ({ cards }) => {
  return (
    <div className="container">
      {cards.length === 0 ? (
        <ZeroProject
          listLength={true}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        cards.map((card, index) => (
          <AdvDevProjectCard
            key={index}
            card={card}
            ContinueBtn={ContinueTemplate}
          />
        ))
      )}
    </div>
  );
};
