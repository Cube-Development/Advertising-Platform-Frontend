import { AccommCard } from '../../../../entities/mainPage';
import {FC} from 'react';
import { IAccomm } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface AccommProps {
    accomms: IAccomm[];
}

export const AccommList: FC<AccommProps> = ({accomms}) => {

    return (
        <div className={styles.why__row}>
            {accomms.map((accomm, index) =>
                <AccommCard key={index} accomm={accomm}/>
            )}
        </div>
    );
};
