import {FC} from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../../../shared/routing';
import { MyButton } from '../../../../shared/ui';
import * as data from './../../../../../public/locales/ru/translation.json';

const text = data

export const LoginBtn: FC = () => {

    return (
            <Link to={paths.login} className={styles.wrapper}>
                <MyButton>{text.registration}</MyButton>
                
                <div className={styles.loginBtn}>
                    <button>{text.login}</button>
                    <img src="./../../../../public/images/common/login.svg" alt="" />
                </div>

            </Link>
        );
};
