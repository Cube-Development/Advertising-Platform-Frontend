import {FC} from 'react';
import { IOption } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface OptionCardProps {
    option: IOption;
}

export const OptionCard: FC<OptionCardProps> = ({option}) => {
    return (
        <div className={styles.option}>
            <img src={`./../../../../../public/images/options/${option.img}`} alt="" />
            <h4>{option.option}</h4>
        </div>
    );
};
