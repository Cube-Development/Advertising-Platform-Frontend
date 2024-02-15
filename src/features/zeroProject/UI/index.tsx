import { StarIcon3 } from '@shared/assets';
import { SmileIcon } from '@shared/assets/icons/smile';
import { projectTypes } from '@shared/config/filter';
import { useAppSelector } from '@shared/store';
import { IStartProjectProps } from '@shared/types/common';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface ZeroProjectProps {
    NewProjectBtn: FC<IStartProjectProps>;
    TurnkeyProjectBtn: FC<IStartProjectProps>,
}

export const ZeroProject: FC<ZeroProjectProps> = ({NewProjectBtn, TurnkeyProjectBtn}) => {
    const { t } = useTranslation();
    const { typeFilter } = useAppSelector((state) => state.filterReducer);

    return (
            <div className={styles.no__project}>
                <div className={styles.smile}>
                    {typeFilter === projectTypes.savedProject
                    ?
                    <>
                    <div>
                        <StarIcon3 />
                    </div>
                    <p>{t(`profile_advertiser.no_template`)}</p>
                    </>
                    :
                    <>
                    <div>
                        <SmileIcon />
                    </div>
                    <p>{t(`profile_advertiser.no_project`)}</p>
                    </>
                    }
                </div>
                <div className={styles.buttons}>
                    <NewProjectBtn isZeroProject={true}/>
                    <p>{t(`profile_advertiser.or`)}</p>
                    <TurnkeyProjectBtn isZeroProject={true}/>
                </div>
            </div>
    );
};