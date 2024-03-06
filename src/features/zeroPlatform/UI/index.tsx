import { SadSmileIcon, HappySmileIcon } from '@shared/assets';
import { platformStatusFilter } from "@shared/config/platformFilter";
import { useAppSelector } from '@shared/store';
import {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface ZeroPlatformProps {
    AddPlatformBtn: FC;
}

export const ZeroPlatform: FC<ZeroPlatformProps> = ({AddPlatformBtn}) => {
    const { t } = useTranslation();
    const { statusFilter } = useAppSelector((state) => state.filterReducer);

    return (
        <div className={styles.no__project}>
            <div className={styles.smile}>
                {statusFilter === platformStatusFilter.active
                ?
                <>
                <div>
                    <SadSmileIcon />
                </div>
                <p>{t(`platforms_blogger.no_platform`)}</p>
                </>
                : statusFilter === platformStatusFilter.ban
                ?
                <>
                <div>
                    <HappySmileIcon />
                </div>
                <p>{t(`platforms_blogger.no_banned`)}</p>
                </>
                :
                <></>
                }
            </div>
            <div className={styles.buttons}>
                <AddPlatformBtn />
            </div>
        </div>
    );
};