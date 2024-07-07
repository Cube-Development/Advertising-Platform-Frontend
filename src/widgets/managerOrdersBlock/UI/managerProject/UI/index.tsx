import { AcceptPost } from "@features/acceptPost";
import { ChangeChannel } from "@features/changeChannel";
import { ChannelChat } from "@features/channelChat";
import { CheckPost } from "@features/checkPost";
import { DownloadReport } from "@features/downloadReport";
import { Feedback } from "@features/feedback";
import { ManagerProjectCard } from "@features/managerProjectCard";
import { SkeletonManagerProjectCard } from "@features/managerProjectCard/skeletonManagerProjectCard";
import { ManagerProjectRun } from "@features/managerProjectRun";
import { RejectPost } from "@features/rejectPost";
import { SeePost } from "@features/seePost";
import { ShowMoreBtn } from "@features/showMore";
import { ZeroManagerProject } from "@features/zeroManagerProject";
import { Accordion } from "@radix-ui/react-accordion";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { IManagerProjectCard } from "@shared/types/managerProject";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ManagerProjectProps {
  projects: IManagerProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const ManagerProject: FC<ManagerProjectProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && projects?.length === 0 ? (
        <ZeroManagerProject />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.managerOrders }).map(
                (_, index) => <SkeletonManagerProjectCard key={index} />,
              )}
            {!isLoading &&
              projects?.map((card, index) => (
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
            {isNotEmpty && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </div>
  );
};
