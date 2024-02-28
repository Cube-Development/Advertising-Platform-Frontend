import {FC, useState} from 'react';
import styles from './styles.module.scss'
import { MyButton, MyInput } from '@shared/ui';
import { IAccomm } from '@shared/types/common';
import { useTranslation } from 'react-i18next';


export const AccommPrice: FC<IAccomm> = ({accomm}) => {
    const { t } = useTranslation();
    const [price, setPrice] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^0-9.]/g, '');
      if (newValue.length > 12) {
        return;
      }
      setPrice(newValue);
    };
    const formattedPrice = price === '' ? '' : Number(price).toLocaleString();

    return (
        <div className={styles.wrapper}>
            <MyButton
                type="button"
                className={price === '' ? styles.no__active : styles.active}>
                {accomm}
            </MyButton>
            <div className={styles.input}>
                <input
                    value={formattedPrice}
                    onChange={handleInput}
                    placeholder={t('add_platform.price.default')}>
                </input>
                <p>
                    {t('symbol')}
                </p>
            </div>

        </div>
    );
};