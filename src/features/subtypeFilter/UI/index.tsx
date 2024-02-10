import { ITypeFilter } from '@shared/types/common';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface SubtypeFilterProps {
    page: string;
    currentSubtype: string;
    handleChangeSubtype: (subtype: string) => void
}

export const SubtypeFilter: FC<SubtypeFilterProps> = ({page, currentSubtype, handleChangeSubtype}) => {
    const { t } = useTranslation();
    const subtypeFilter: ITypeFilter[] = t(`${page}.subtype_filter`, { returnObjects: true }) 
    currentSubtype = currentSubtype === '' ? subtypeFilter[0].type : currentSubtype
    return (
        <div className={styles.subtypes}>
            <ul>
                {subtypeFilter.map((type, index) => (
                    <li key={index} 
                        className={currentSubtype===type.type ? styles.active : ''} 
                        onClick={() => handleChangeSubtype(type.type)}>
                        {type.name}
                    </li>
                ))}
            </ul>
        </div>

    );
};