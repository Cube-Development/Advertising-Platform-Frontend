import { NewProject } from '@features/newProject';
import { ProfileTop } from '@features/profileTop';
import { ProjectTypes } from '@features/projectTypes';
import { SubtypeFilter } from '@features/subtypeFilter';
import { TurnkeyProject } from '@features/turnkeyProject';
import { ZeroProject } from '@features/zeroProject';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ProfileFilterProps {
    page: string;
}

// const subitemCard = itemCard.channels_list[0]

export const ProfileFilter: FC<ProfileFilterProps> = ({page}) => {
    const [isZeroProject, setZeroProject] = useState(true);
    const [type, setType] = useState('');
    const [subtype, setSubType] = useState('');
    const { t } = useTranslation();

    const handleChangeType = (type: string): void => {
        setType(type);
      };

    const handleChangeSubtype = (subtype: string): void => {
        setSubType(subtype);
    };

    return (
        <section className={styles.profile__filter}>
            <div className='container'>
                <ProfileTop isZeroProject={isZeroProject} NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject} />
                <hr />
                <ProjectTypes page={page} currentType={type} handleChangeType={handleChangeType}/>
                <SubtypeFilter page={page} currentSubtype={subtype} handleChangeSubtype={handleChangeSubtype}/>
                {isZeroProject
                ?
                <ZeroProject NewProjectBtn={NewProject} TurnkeyProjectBtn={TurnkeyProject}/>
                :
                <></>
                }

            </div>
           
        </section>
    );
};