import { roles } from '@shared/config/roles';
import { useAppDispatch, useAppSelector } from '@shared/store';
import { filterSlice } from '@shared/store/reducers';
import  {FC} from 'react';
import { useTranslation } from 'react-i18next';
import { advertiserProjectStatus, bloggerProjectStatus } from './config';
import styles from './styles.module.scss'


export const ProjectStatusFilter: FC = () => {
    const { t } = useTranslation();
    const { statusFilter } = useAppSelector((state) => state.filterReducer);
    const { role } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const toggleStatus = (type: string) => {
        dispatch(filterSlice.actions.setStatusFilter(type));
      };
    const projectStatus = role === roles.advertiser ? advertiserProjectStatus : bloggerProjectStatus
    // const currentSubtype = statusFilter === '' ? projectStatus[0].type : statusFilter
    
    return (
        <div className={styles.subtypes}>
            <ul>
                {projectStatus.map((type, index) => (
                    <li key={index} 
                        className={statusFilter === type.type ? styles.active : ''} 
                        onClick={() => toggleStatus(type.type)}>
                        {t(type.name)}
                    </li>
                ))}
            </ul>
        </div>

    );
};