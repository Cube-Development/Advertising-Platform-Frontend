import { ArrowIcon } from '@shared/assets/icons/arrow';
import { IMenuItems } from '@shared/types/common';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';


export const MenuItem: React.FC<IMenuItems> = ({ item, subItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ul onClick={handleToggle}>
        <div className={styles.row}>
          {item.path 
          ? 
          <Link to={item.path}>
            <div className={styles.row__title}>
              {item.img && <item.img />}
              {t(item.title)}
            </div>
          </Link>
          : 
          <>
            <div className={styles.row__title}>
              {item.img && <item.img />}
              {t(item.title)}
            </div>
            <ArrowIcon />
          </>
          }
        </div>
      {subItems && isExpanded && (
        <>
            {subItems.map((item, index) => (
                <Link to={item.path}>
                    <li key={index}>
                        {t(item.title)}
                    </li>
                </Link>
            ))}
        </>
      )}
    </ul>
  );
};

