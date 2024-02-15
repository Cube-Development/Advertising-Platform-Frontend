import React, {FC} from 'react';
import styles from './styles.module.scss'

interface PlatformBloggerProps {
    children: React.ReactNode;
}

export const PlatformBlogger: FC<PlatformBloggerProps> = ({children}) => {

    return (
        <div>
            {children}
        </div>
    );
};