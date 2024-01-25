import { OptionCard } from '../../../../entities/mainPage';
import {FC} from 'react';
import { IOption } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface OptionListProps {
    options: IOption[];
}

export const OptionList: FC<OptionListProps> = ({options}) => {

    return (
        <div className={styles.options}>
            {options.map((option, index) =>
                <OptionCard key={index} option={option}/>)}
        </div>
    );
};
