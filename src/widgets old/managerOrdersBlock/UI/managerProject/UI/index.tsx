import { AcceptPost } from "src/features old/acceptPost";
import { ChangeChannel } from "src/features old/changeChannel";
import { OrderChat } from "src/features old/channelChat";
import { CheckPost } from "src/features old/checkPost";
import { DownloadReport } from "src/features old/downloadReport";
import { Feedback } from "src/features old/feedback";
import { ManagerProjectCard } from "src/features old/managerProjectCard";
import { ManagerProjectRun } from "src/features old/managerProjectRun";
import { RejectPost } from "src/features old/rejectPost";
import { SeePost } from "src/features old/seePost";
import { Accordion } from "@radix-ui/react-accordion";
import {
  IManagerProjectCard,
  IManagerProjects,
} from "@shared/types/managerProject";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerProjectProps {
  projects: IManagerProjectCard[];
}

export const ManagerProject: FC<ManagerProjectProps> = ({ projects }) => {
  return (
    <div className="container sidebar">
      <Accordion type="single" collapsible>
        <div className={styles.wrapper}>
          {projects?.map((card, index) => (
            <ManagerProjectCard
              key={index}
              card={card}
              FeedbackBtn={Feedback}
              AcceptBtn={AcceptPost}
              RejectBtn={RejectPost}
              CheckBtn={CheckPost}
              SeeBtn={SeePost}
              ChannelChatBtn={OrderChat}
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
