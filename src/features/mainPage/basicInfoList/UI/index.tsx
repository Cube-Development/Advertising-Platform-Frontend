import { InfoCard } from '../../../../entities/mainPage';
import {FC} from 'react';
import { IBasicInfo } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface BasicInfoProps {
    infos: IBasicInfo[];
}

export const BasicInfoList: FC<BasicInfoProps> = ({infos}) => {

    return (
        <div className={styles.infos}>
            {infos.map((info, index) =>
                <InfoCard key={index} info={info}/>)}
        </div>
    );
};
