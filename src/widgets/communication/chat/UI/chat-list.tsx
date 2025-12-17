import { CHAT_FILTER, CHAT_TYPE, IChatData } from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { ChatCard } from "@features/communication";
import { BarSubFilter } from "@features/other";
import { ScrollArea } from "@shared/ui";
import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface IChatListProps {
  role: ENUM_ROLES;
  chatFilter: CHAT_FILTER;
  setChatFilter: (val: CHAT_FILTER) => void;
  tab_list: any[];
  resetValues: () => void;
  badge: any[];
  chats: IChatData[] | undefined;
  currentChat: IChatData | null;
  handleChangeChat: (card: IChatData) => void;
  header: ReactNode;
}

export const ChatList: FC<IChatListProps> = ({
  role,
  chatFilter,
  setChatFilter,
  tab_list,
  resetValues,
  badge,
  chats,
  currentChat,
  handleChangeChat,
  header,
}) => {
  return (
    <div
      className={`${styles.content__left} ${role !== ENUM_ROLES.BLOGGER ? styles.gridA : styles.gridB}`}
    >
      {header}
      {role !== ENUM_ROLES.BLOGGER && (
        <div className={styles.filter}>
          <BarSubFilter
            tab={chatFilter}
            changeTab={setChatFilter}
            tab_list={tab_list}
            resetValues={resetValues}
            badge={badge}
            isFixedColumns={true}
          />
        </div>
      )}
      {chats && chats?.length > 0 ? (
        <ScrollArea>
          <div className={styles.all_chats}>
            {chats?.map((card: IChatData, index: number) => (
              <div
                key={card?.order_id || card?.project_id || index}
                onClick={() => handleChangeChat(card)}
              >
                <ChatCard
                  card={card}
                  isActive={
                    !!(
                      currentChat &&
                      (currentChat.type === CHAT_TYPE.ORDER
                        ? currentChat.order_id === card?.order_id
                        : currentChat.project_id === card?.project_id)
                    )
                  }
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <></>
      )}
    </div>
  );
};
