import { ArrowIcon2 } from '@shared/assets';
import { MyButton } from '@shared/ui';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'


export const AcceptProject: FC = () => {
    const { t } = useTranslation();
    return (
        <MyButton className={styles.button}>
            <div>
                {t(`order_btn.accept`)}
                <ArrowIcon2 />
            </div>
        </MyButton>
    );
};