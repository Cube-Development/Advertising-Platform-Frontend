import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'
import { BarProfileFilter } from '@features/barProfileFilter/UI';
import { useForm } from 'react-hook-form';
import { IAddProfileData } from '@shared/types/common';
import { SelfEmployedData, entityData } from '@shared/config/profileData';
import { ProfileData } from '@features/profileData/UI';

export const ProfileCard: FC = () => {
    const { t } = useTranslation();

    const {
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<IAddProfileData>();

    const typeLegal = SelfEmployedData
    
    return (
        <div className={styles.wrapper}>
            <BarProfileFilter />
            {/* {
                typeLegal.map((block) => (
                    <ProfileData data={block} onChange={setValue}/>
                ))
            } */}
            
        </div>
    );
};