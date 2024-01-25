import { PriceCard } from '../../../../entities/mainPage';
import {FC} from 'react';
import { IPrice } from '../../../../shared/types/language';
import styles from "./styles.module.scss";

interface PriceListProps {
    tarifs: IPrice[];
}

export const PriceList: FC<PriceListProps> = ({tarifs}) => {

    return (
        <div className={styles.tarifs}>
            {tarifs.map((tarif, index) =>
                <PriceCard key={index} price={tarif} index={index}/>
            )}
        </div>
    );
};
