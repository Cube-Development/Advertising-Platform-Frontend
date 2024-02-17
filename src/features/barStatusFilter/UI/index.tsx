import { projectTypesFilter } from '@shared/config/filter';
import { roles } from '@shared/config/roles';
import { useAppDispatch, useAppSelector } from '@shared/store';
import { filterSlice } from '@shared/store/reducers';
import  {FC} from 'react';
import { useTranslation } from 'react-i18next';
import { advMyProjectStatus, advManagerProjectStatus, bloggerPlatformStatus, bloggerOfferStatus } from './config';
import styles from './styles.module.scss'


export const BarStatusFilter: FC = () => {
    const { t } = useTranslation();
    const { statusFilter, typeFilter } = useAppSelector((state) => state.filterReducer);
    const { role } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const toggleStatus = (type: string) => {
        dispatch(filterSlice.actions.setStatusFilter(type));
      };

    const projectStatus =
    (role === roles.advertiser && typeFilter === projectTypesFilter.myProject)
        ? advMyProjectStatus
        : (role === roles.advertiser && typeFilter === projectTypesFilter.managerProject)
        ? advManagerProjectStatus
        : bloggerOfferStatus;

    console.log(projectStatus, role, typeFilter)
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