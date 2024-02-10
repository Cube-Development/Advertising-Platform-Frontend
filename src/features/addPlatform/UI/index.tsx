import { paths } from '@shared/routing';
import { MyButton } from '@shared/ui';
import { ButtonHTMLAttributes, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

interface AddPlatformProps {
    props?: ButtonHTMLAttributes<HTMLButtonElement>;
  }


export const AddPlatform: FC<AddPlatformProps>  = ({props}) => {
    const { t } = useTranslation();

    return (
        <Link to={paths.addPlatform} >
            <MyButton {...props}>
                {t(`btn_add_platform`)}
            </MyButton>
        </Link>
    );
};