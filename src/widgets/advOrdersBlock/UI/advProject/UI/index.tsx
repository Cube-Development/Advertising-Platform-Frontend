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
import { IAdvProjectCard } from "@shared/types/advProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";
import { SkeletonAdvProjectCard } from "@features/advProjectCard/skeletonAdvProjectCard";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";

interface AdvProjectProps {
  projects: IAdvProjectCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const AdvProject: FC<AdvProjectProps> = ({
  projects,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <div className="container sidebar">
      {projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {projects?.map((card, index) => (
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
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.orders }).map(
                (_, index) => <SkeletonAdvProjectCard key={index} />,
              )}
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
