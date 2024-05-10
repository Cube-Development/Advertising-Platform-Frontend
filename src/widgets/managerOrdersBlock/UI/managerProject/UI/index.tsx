import { AcceptPost } from "@features/acceptPost";
import { ChangeChannel } from "@features/changeChannel";
import { ChannelChat } from "@features/channelChat";
import { CheckPost } from "@features/checkPost";
import { DownloadReport } from "@features/downloadReport";
import { Feedback } from "@features/feedback";
import { ManagerProjectCard } from "@features/managerProjectCard";
import { ManagerProjectRun } from "@features/managerProjectRun";
import { RejectPost } from "@features/rejectPost";
import { SeePost } from "@features/seePost";
import { Accordion } from "@radix-ui/react-accordion";
import { IManagerProjects } from "@shared/types/managerProjects";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerProjectProps {
  projects: IManagerProjects;
}

export const ManagerProject: FC<ManagerProjectProps> = ({ projects }) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects?.projects?.map((card, index) => (
            <ManagerProjectCard
              key={index}
              card={card}
              FeedbackBtn={Feedback}
              AcceptBtn={AcceptPost}
              RejectBtn={RejectPost}
              CheckBtn={CheckPost}
              SeeBtn={SeePost}
              ChannelChatBtn={ChannelChat}
              ManagerProjectRunBtn={ManagerProjectRun}
              ChangeChannelBtn={ChangeChannel}
              DownloadReportBtn={DownloadReport}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};
