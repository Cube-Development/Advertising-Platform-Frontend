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
import { IAdvProjects } from "@shared/types/advProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";

interface AdvProjectProps {
  projects: IAdvProjects;
}

export const AdvProject: FC<AdvProjectProps> = ({ projects }) => {
  return (
    <div className="container sidebar">
      {projects?.projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {projects?.projects?.map((card, index) => (
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
        </Accordion>
      )}
    </div>
  );
};
