import { AcceptPost } from "@features/acceptPost";
import { AcceptProject } from "@features/acceptProject";
import { AdvProjectCard } from "@features/advProjectCard";
import { ChangeChannel } from "@features/changeChannel";
import { ChannelChat } from "@features/channelChat";
import { CheckPost } from "@features/checkPost";
import { Feedback } from "@features/feedback";
import { NewProject } from "@features/newProject";
import { RejectPost } from "@features/rejectPost";
import { SeePost } from "@features/seePost";
import { TurnkeyProject } from "@features/turnkeyProject";
import { ZeroProject } from "@features/zeroProject";
import { IAdvProjectCard } from "@shared/types/common";
import { FC } from "react";
import styles from "./styles.module.scss";

interface AdvProjectProps {
  cards: IAdvProjectCard[];
}

export const AdvProject: FC<AdvProjectProps> = ({ cards }) => {
  return (
    <div className="container sidebar">
      {cards.length === 0 ? (
        <ZeroProject
          listLength={false}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <div className={styles.wrapper}>
          {cards.map((card, index) => (
            <AdvProjectCard
              key={index}
              card={card}
              FeedbackBtn={Feedback}
              AcceptBtn={AcceptPost}
              RejectBtn={RejectPost}
              CheckBtn={CheckPost}
              SeeBtn={SeePost}
              ChannelChatBtn={ChannelChat}
              AcceptProjectBtn={AcceptProject}
              ChangeChannelBtn={ChangeChannel}
            />
          ))}
        </div>
      )}
    </div>
  );
};
