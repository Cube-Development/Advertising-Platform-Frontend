import { IChatData } from "@entities/communication";
import { ChatMessages } from "@features/communication";
import { ArrowLongHorizontalIcon, CubeDevelopmentIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config";
import { motion } from "framer-motion";
import { FC, RefObject } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IChatWindowProps {
  currentChat: IChatData;
  handleCloseChat: () => void;
  isDraggable?: boolean;
  chatRef?: RefObject<HTMLDivElement>;
  handleTouchStart?: (event: React.TouchEvent) => void;
  isMobile?: boolean; // To conditional render motion.div or regular div
}

export const ChatWindow: FC<IChatWindowProps> = ({
  currentChat,
  handleCloseChat,
  isDraggable,
  chatRef,
  handleTouchStart,
  isMobile,
}) => {
  const { t } = useTranslation();

  const Content = (
    <>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.logo}>
            {currentChat?.order_id ? (
              <img src={currentChat?.avatar} alt="" />
            ) : (
              <div className={styles.icon}>
                <CubeDevelopmentIcon />
              </div>
            )}
          </div>
          <div className={styles.description}>
            <p className="truncate">
              {currentChat.project_name
                ? `${t("chat.campaign")} ${currentChat.project_name} ${!!currentChat?.channel_name ? `(${t("chat.channel")} ${currentChat?.channel_name})` : ""}`
                : t("chat.types.administration")}
            </p>
          </div>
        </div>
        {isMobile && (
          <div className={styles.arrow} onClick={handleCloseChat}>
            <ArrowLongHorizontalIcon className="active__gradient__icon" />
          </div>
        )}
      </div>
      <ChatMessages card={currentChat} />
    </>
  );

  if (isMobile) {
    return (
      <motion.div
        ref={chatRef}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={PAGE_ANIMATION.sideTransition.transition}
        variants={PAGE_ANIMATION.sideTransition}
        className={styles.content__right}
        drag={isDraggable ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onTouchStart={handleTouchStart}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) handleCloseChat();
        }}
      >
        {Content}
      </motion.div>
    );
  }

  return <div className={styles.content__right}>{Content}</div>;
};
