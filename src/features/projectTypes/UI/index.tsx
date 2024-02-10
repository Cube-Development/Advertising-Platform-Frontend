import { ITypeFilter } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ProjectTypesProps {
    page: string;
    currentType: string;
    handleChangeType: (type: string) => void; 
}

export const ProjectTypes: FC<ProjectTypesProps> = ({page, currentType, handleChangeType}) => {
    const { t } = useTranslation();
    const projectTypes: ITypeFilter[] = t(`${page}.project_types`, {returnObjects: true}) 
    currentType = currentType === '' ? projectTypes[0].type : currentType
    return (
        <div className={styles.project__types}>
            <ul>
                {projectTypes.map((type, index) => (
                    <li key={index} 
                        className={currentType===type.type ? styles.active : ''} 
                        onClick={() => handleChangeType(type.type)}>
                        {type.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};