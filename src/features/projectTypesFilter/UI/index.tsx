import { roles } from '@shared/config/roles';
import { useAppDispatch, useAppSelector } from '@shared/store';
import { filterSlice } from '@shared/store/reducers';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { advertiserProjectTypes, bloggerProjectTypes } from './config';
import styles from './styles.module.scss';


export const ProjectTypesFilter: FC = () => {
    const { t } = useTranslation();
    const { typeFilter } = useAppSelector((state) => state.filterReducer);
    const { role } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const toggleType = (type: string) => {
        dispatch(filterSlice.actions.setTypeFilter(type));
      };
    const projectTypes = role === roles.advertiser ? advertiserProjectTypes : bloggerProjectTypes
    // const currentType = typeFilter === '' ? projectTypes[0].type : typeFilter
    return (
        <div className={styles.project__types}>
            <ul>
                {projectTypes.map((type, index) => (
                    <li key={index} 
                        className={typeFilter === type.type ? styles.active : ''} 
                        onClick={() => toggleType(type.type)}>
                        {t(type.name)}
                    </li>
                ))}
            </ul>
        </div>
    );
};