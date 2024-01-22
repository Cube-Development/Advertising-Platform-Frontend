import {FC} from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../../../shared/routing';

export const LoginBtn: FC = () => {

    return (
        <div>
            <Link to={paths.login} className={styles.wrapper}>
                <button className={styles.button}>Registration</button>
                <button className={styles.button}>Login</button>
            </Link>
        </div>);
};
