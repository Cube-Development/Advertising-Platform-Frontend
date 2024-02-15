import { NewProject } from '@features/newProject';
import { ProfileTop } from '@features/profileTop';
import { ProjectTypesFilter } from '@features/projectTypesFilter';
import { ProjectStatusFilter } from '@features/projectStatusFilter';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@shared/store';
import { projectTypes } from '@shared/config/filter';

interface ProfileFilterProps {
    page: string;
}


export const ProfileFilter: FC<ProfileFilterProps> = ({page}) => {
    const [isZeroProject, setZeroProject] = useState(true);
    const { typeFilter } = useAppSelector((state) => state.filterReducer);

    return (
        <section className={styles.profile__filter}>
            <div className='container'>
                <ProfileTop isZeroProject={isZeroProject} NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject} />
                <hr />
                <ProjectTypesFilter />
                {typeFilter === projectTypes.savedProject || <ProjectStatusFilter />}
            </div>
           
        </section>
    );
};