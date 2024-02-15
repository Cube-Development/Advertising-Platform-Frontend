import { roles } from '@shared/config/roles';
import { useAppSelector } from '@shared/store';
import { IStartProjectProps } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface BarTopProps {
    isZeroProject: boolean;
    isZeroPlatform: boolean;
    NewProjectBtn: FC<IStartProjectProps>;
    TurnkeyProjectBtn: FC<IStartProjectProps>,
    AddPlatformBtn: FC,
}

export const BarTop: FC<BarTopProps> = ({isZeroProject, isZeroPlatform, NewProjectBtn, TurnkeyProjectBtn, AddPlatformBtn}) => {
    const { t } = useTranslation();
    const { role } = useAppSelector((state) => state.userReducer);
    return (
        <div className={styles.top}>
            {
                role === roles.advertiser
                ?
                <>
                    <p>{t(`orders_advertiser.my_campaign`)}</p>

                    {!isZeroProject &&
                    (<div>
                        {<NewProjectBtn isZeroProject={isZeroProject} />}
                        {<TurnkeyProjectBtn isZeroProject={isZeroProject} />}
                    </div>)}
                </>
                :
                <>
                    <p>{t(`platforms_blogger.my_platform`)}</p>

                    {!isZeroPlatform &&
                    (<div>
                        {<AddPlatformBtn />}
                    </div>)}

                </>
            }
                
        </div>
    );
};