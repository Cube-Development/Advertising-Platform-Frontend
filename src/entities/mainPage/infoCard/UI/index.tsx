import {FC} from 'react';
import { IBasicInfo } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface InfoCardProps {
    info: IBasicInfo;
}

export const InfoCard: FC<InfoCardProps> = ({info}) => {
    return (
        <div className={styles.info}>
            <img src={`./../../../../../public/images/basicInfo/${info.img}`} alt="" />
            <h4 className={styles.count}>{info.count}</h4>
            <p className={styles.text}>{info.info}</p>
        </div>
    );
};
