import { pageFilter } from '@shared/config/filter';
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
    page: pageFilter,
}

export const BarTop: FC<BarTopProps> = ({isZeroProject, isZeroPlatform, NewProjectBtn, TurnkeyProjectBtn, AddPlatformBtn, page}) => {
    const { t } = useTranslation();
    // const { role } = useAppSelector((state) => state.userReducer);
    return (
        <div className={styles.top}>
            {
                // role === roles.advertiser
                page === pageFilter.order
                ?
                <>
                    <p>{t(`orders_advertiser.my_campaign`)}</p>

                    {!isZeroProject &&
                    (<div>
                        {<NewProjectBtn isZeroProject={isZeroProject} />}
                        {<TurnkeyProjectBtn isZeroProject={isZeroProject} />}
                    </div>)}
                </>
                : page === pageFilter.platform
                ?
                <>
                    <p>{t(`platforms_blogger.my_platform`)}</p>

                    {isZeroPlatform &&
                    (<div>
                        {<AddPlatformBtn />}
                    </div>)}

                </>

                : page === pageFilter.offer && 

                <>
                    <p>{t(`offers_blogger.my_offers`)}</p>

                    {isZeroPlatform &&
                    (<div>
                        {<AddPlatformBtn />}
                    </div>)}

                </>
                
            }
                
        </div>
    );
};