import { PlusIcon2 } from '@shared/assets/icons/plus2';
import { paths } from '@shared/routing';
import { IStartProjectProps } from '@shared/types/common';
import { MyButton } from '@shared/ui';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const NewProject: FC<IStartProjectProps> = ({isZeroProject}) => {
    const { t } = useTranslation();
    const a = isZeroProject 
    ? t(`profile_advertiser.start_new_project`)
    : t(`profile_advertiser.new_project`) ;
    console.log(a, isZeroProject, t(`profile_advertiser.start_new_project`), t(`profile_advertiser.new_project`));
    return (
        <Link to={paths.catalog} >
            <MyButton className={styles.button}>
                {
                isZeroProject 
                ? 
                t(`profile_advertiser.start_new_project`)
                : 
                t(`profile_advertiser.new_project`)
                }
                <PlusIcon2 />
            </MyButton>
        </Link>
    );
};