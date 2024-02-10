import { ChatIcon } from '@shared/assets/icons/chat';
import { FC } from 'react';
import styles from './styles.module.scss';

export const Chat: FC = () => {

    return (
        <div className={styles.chat}>
            <ChatIcon />
        </div>
        );
};