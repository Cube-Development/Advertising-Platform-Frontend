import { IChatProps } from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { ChatIcon, ChatIcon2, ChatMainIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  CustomCloseButton,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui";
import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { useChat } from "../model/hooks/useChat";
import { ChatEmpty } from "./chat-empty";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import styles from "./styles.module.scss";

export const Chat: FC<IChatProps> = (props) => {
  const { isMain, isProject, isFull, toRole } = props;

  const {
    screen,
    role,
    t,
    setIsOpen,
    currentChat,
    chatFilter,
    setChatFilter,
    chats,
    haveNewMessage,
    badge,
    tab_list,
    handleChangeChat,
    resetValues,
    handleCloseChat,
    handleTouchStart,
    isDraggable,
    chatRef,
  } = useChat(props);

  const Trigger = (
    <>
      {isMain ? (
        <ChatMainIcon haveNewMessage={haveNewMessage} />
      ) : isProject ? (
        <ChatIcon2 className="active__icon" />
      ) : (
        <ChatIcon className="icon__white" />
      )}
      {isFull && toRole === ENUM_ROLES.BLOGGER && (
        <p>{t("chat.role.blogger")}</p>
      )}
      {isFull && toRole === ENUM_ROLES.MANAGER && (
        <p>{t("chat.role.manager")}</p>
      )}
      {isFull && toRole === ENUM_ROLES.ADVERTISER && (
        <p>{t("chat.role.advertiser")}</p>
      )}
    </>
  );

  const DialogHeader = (
    <>
      <AlertDialogTitle className={styles.title}>
        <p className="gradient_color">{t("chat.my_messages")}</p>
      </AlertDialogTitle>
      <AlertDialogDescription className="sr-only"></AlertDialogDescription>
    </>
  );

  const DrawerHeader = (
    <DrawerTitle className={styles.title}>
      <DrawerDescription className={`gradient_color ${styles.description}`}>
        {t("chat.my_messages")}
      </DrawerDescription>
      <DrawerClose onClick={handleCloseChat} asChild>
        <CustomCloseButton />
      </DrawerClose>
    </DrawerTitle>
  );

  return (
    <div className={`${styles.wrapper} ${styles.overlay}`}>
      {screen >= BREAKPOINT.MD ? (
        <AlertDialog>
          <AlertDialogTrigger
            className={styles.trigger}
            onClick={() => setIsOpen(true)}
          >
            {Trigger}
          </AlertDialogTrigger>
          <AlertDialogContent
            showOverlay={false}
            className={`blur_content ${styles.content} ${styles.dialog}`}
          >
            <ChatList
              role={role}
              chatFilter={chatFilter}
              setChatFilter={setChatFilter}
              tab_list={tab_list}
              resetValues={resetValues}
              badge={badge}
              chats={chats}
              currentChat={currentChat}
              handleChangeChat={handleChangeChat}
              header={DialogHeader}
            />

            <div className={styles.content__right}>
              {currentChat ? (
                <ChatWindow
                  currentChat={currentChat}
                  handleCloseChat={handleCloseChat}
                  isMobile={false}
                />
              ) : (
                <ChatEmpty />
              )}
            </div>

            <AlertDialogCancel onClick={handleCloseChat} asChild>
              <CustomCloseButton className="translate-y-0 top-1" />
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer>
          <DrawerTrigger
            className={styles.trigger}
            onClick={() => setIsOpen(true)}
          >
            {Trigger}
          </DrawerTrigger>
          <DrawerContent showOverlay={false} className="blur_content">
            <div className={`${styles.content} ${styles.drawer}`}>
              <ChatList
                role={role}
                chatFilter={chatFilter}
                setChatFilter={setChatFilter}
                tab_list={tab_list}
                resetValues={resetValues}
                badge={badge}
                chats={chats}
                currentChat={currentChat}
                handleChangeChat={handleChangeChat}
                header={DrawerHeader}
              />

              <AnimatePresence>
                {currentChat && (
                  <ChatWindow
                    currentChat={currentChat}
                    handleCloseChat={handleCloseChat}
                    isDraggable={isDraggable}
                    chatRef={chatRef}
                    handleTouchStart={handleTouchStart}
                    isMobile={true}
                  />
                )}
              </AnimatePresence>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
