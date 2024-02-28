import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'
import { InfoIcon } from '@shared/assets';
import { IAccomm } from '@shared/types/common';

interface SelectPriceProps {
    title: string;
    text: string;
    info: string;
    accomms: IAccomm[];
    AccommPrice: FC<IAccomm>;
}

export const SelectPrice: FC<SelectPriceProps> = ({ title, text, accomms, AccommPrice , info}) => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <p>{t(title)}</p>
                <InfoIcon />
            </div>
            <hr />
            <div className={styles.info}>
                <p>{t(info)}</p>
            </div>
            <div className={styles.accomms}> 

                {accomms.map((accomm, index) => (
                    <AccommPrice accomm={accomm.accomm} key={index}/>
                    ))}
                    
            </div>
        </div>
    );
};