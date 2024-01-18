import {FC} from 'react';
import logo from './logo.png';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../../../shared/routing';

export const Logo: FC = () => {

    return (
        <div>
            <Link to={paths.main}>
                <img src={logo} className={styles.logo} alt="/" />
            </Link>
        </div>);
};
