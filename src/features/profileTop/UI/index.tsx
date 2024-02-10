import { IStartProjectProps } from '@shared/types/common';
import { FC, ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ProfileTopProps {
    isZeroProject: boolean;
    NewProjectBtn: FC<IStartProjectProps>;
    TurnkeyProjectBtn: FC<IStartProjectProps>,
}

export const ProfileTop: FC<ProfileTopProps> = ({isZeroProject, NewProjectBtn, TurnkeyProjectBtn}) => {
    const { t } = useTranslation();
    return (
        <div className={styles.top}>
                <p>{t(`profile_advertiser.my_campaign`)}</p>

                {!isZeroProject &&
                (<div>
                    {<NewProjectBtn isZeroProject={isZeroProject} />}
                    {<TurnkeyProjectBtn isZeroProject={isZeroProject} />}
                </div>)
                }
                
        </div>
    );
};