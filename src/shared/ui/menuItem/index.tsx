import { IMenuItem, IMenuSubItem } from '@shared/types/common';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface MenuItemProps {
  title: IMenuItem;
  subItems?: IMenuSubItem[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ title, subItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ul onClick={handleToggle}>
        {/* <img src="/images/common/star.svg" alt="" /> */}
        {title.path ? (
            <Link to={title.path}>
                    {title.title}
            </Link>
        ) : (
            <div className={styles.row}>
              {title.title}
                <img src="/images/common/arrow.svg" alt="" />
            </div>
        )}
      {subItems && isExpanded && (
        <>
            {subItems.map((item, index) => (
                <Link to={item.path}>
                    <li key={index}>
                        {item.title}
                    </li>
                </Link>
            ))}
        </>
      )}
    </ul>
  );
};

