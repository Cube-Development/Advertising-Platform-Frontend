import { NewProject } from '@features/newProject';
import { BarTop } from '@features/barTop';
import { BarTypesFilter } from '@features/barTypesFilter';
import { BarStatusFilter } from '@features/barStatusFilter';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@shared/store';
import { projectTypes } from '@shared/config/filter';
import { AddPlatform } from '@features/addPlatform';
import { roles } from '@shared/config/roles';


export const ProfileFilter: FC = () => {
    const [isZeroProject, setZeroProject] = useState(true);
    const { typeFilter } = useAppSelector((state) => state.filterReducer);
    const { role } = useAppSelector((state) => state.userReducer);

    return (
        <section className={styles.profile__filter}>
            <div className='container'>
                <BarTop isZeroProject={isZeroProject} 
                            isZeroPlatform={isZeroProject} 
                            NewProjectBtn={NewProject} 
                            TurnkeyProjectBtn={TurnkeyProject} 
                            AddPlatformBtn={AddPlatform}/>
                <hr />
                {
                role === roles.advertiser 
                ?
                <>
                    <BarTypesFilter />
                    {typeFilter === projectTypes.savedProject || <BarStatusFilter />}
                </>
                :
                <BarStatusFilter />
                }
                
            </div>
           
        </section>
    );
};