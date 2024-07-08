import { IAdvProjectCard } from "@shared/types/advProject";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { ZeroProject } from "src/features old/zeroProject";
import { TurnkeyProject } from "src/features old/turnkeyProject";
import { NewProject } from "src/features old/newProject";
import { SkeletonAdvProjectCard } from "src/features old/advProjectCard/skeletonAdvProjectCard";
import { AdvProjectCard } from "src/features old/advProjectCard";
import { Feedback } from "src/features old/feedback";
import { AcceptPost } from "src/features old/acceptPost";
import { RejectPost } from "src/features old/rejectPost";
import { CheckPost } from "src/features old/checkPost";
import { SeePost } from "src/features old/seePost";
import { AcceptProject } from "src/features old/acceptProject";
import { ChangeChannel } from "src/features old/changeChannel";
import { OrderChat } from "src/features old/channelChat";
import { ShowMoreBtn } from "src/features old/showMore";

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
      {!isLoading && projects?.length === 0 ? (
        <ZeroProject
          listLength={!!projects?.length}
          NewProjectBtn={NewProject}
          TurnkeyProjectBtn={TurnkeyProject}
        />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.orders }).map(
                (_, index) => <SkeletonAdvProjectCard key={index} />,
              )}
            {!isLoading &&
              projects?.map((card, index) => (
                <AdvProjectCard
                  key={index}
                  card={card}
                  FeedbackBtn={Feedback}
                  AcceptBtn={AcceptPost}
                  RejectBtn={RejectPost}
                  CheckBtn={CheckPost}
                  SeeBtn={SeePost}
                  ChannelChatBtn={OrderChat}
                  AcceptProjectBtn={AcceptProject}
                  ChangeChannelBtn={ChangeChannel}
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
