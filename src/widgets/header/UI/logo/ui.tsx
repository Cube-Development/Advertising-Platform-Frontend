import {FC} from 'react';
import logo from './logo.png';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../../shared/config/routes';

export const Logo: FC = () => {

    return (
        <div>
            <Link to={RouteNames.Main}>
                <img src={logo} className={styles.logo} alt="/" />
            </Link>
        </div>);
};
