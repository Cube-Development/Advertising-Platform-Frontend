import { IOption } from '@shared/types/common';
import { MySelect } from '@shared/ui/MySelect';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface SelectOptionProps {
    title: string;
    text: string;
    defaultValue: string;
    options: IOption[];
}

export const SelectOption: FC<SelectOptionProps> = ({title, text, defaultValue, options}) => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <p>{t(title)}</p>
            <MySelect options={options} defaultValue={defaultValue}/>
        </div>
    );
};