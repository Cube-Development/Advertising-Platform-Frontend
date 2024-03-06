import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'
import { BarProfileFilter } from '@features/barProfileFilter/UI';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAddProfileData } from '@shared/types/common';
import { SelfEmployedData, EntityData, IndividualData, SelfEmployedCardData } from '@shared/config/profileData';
import { ProfileData } from '@features/profileData/UI';
import { CreateProfile } from '@features/createProfile/UI';
import { useAppSelector } from '@shared/store';
import { profileTypes } from '@shared/config/profileFilter';
import { profileFilter, subprofileFilter } from "@shared/config/profileFilter";
import { BarSubrofileFilter } from '@features/barSubprofileFilter';

export const ProfileCard: FC = () => {
    const { t } = useTranslation();

    const {
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<IAddProfileData>();


    const { profileFilter: profile } = useAppSelector((state) => state.filterReducer);
    const { subprofileFilter: subprofile } = useAppSelector((state) => state.filterReducer);

    const typeLegal = profile === profileFilter.entity ? EntityData :
        (profile === profileFilter.individual ? IndividualData :
            (( profile === profileFilter.selfEmployed && subprofile === subprofileFilter.account) ?  SelfEmployedData :  SelfEmployedCardData))

    const onSubmit: SubmitHandler<IAddProfileData> = (data) => {
        console.log(data);
    };
    
    return (
        <div className='container sidebar'>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
                <BarProfileFilter />

                <div className={styles.block}>
                    {
                       profile === profileFilter.selfEmployed && <BarSubrofileFilter />
                    }
                    {
                        typeLegal.map((block, index) => (
                            <ProfileData data={block} onChange={setValue} key={index}/>
                            ))
                    }
                </div>
                <div className={styles.accept}>
                    <input type="checkbox" />
                    <p>
                        {`${t("add_profile.accept.text1")} `}
                        <span>
                            {`${t("add_profile.accept.span1")} `}
                        </span>
                            {`${t("add_profile.accept.and")} `}
                        <span>
                            {`${t("add_profile.accept.span2")} `}
                        </span>
                        {t("add_profile.accept.text2")}
                    </p>
                </div>

                <CreateProfile/>
            </form>

        </div>
    );
};