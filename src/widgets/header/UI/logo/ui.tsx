import {FC} from 'react';
import logo from './logo.svg';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { paths } from '../../../../shared/routing';
import { roles } from '../../../../shared/config/roles';

interface LogoProps {
    currentRole: string;
}

export const Logo:  FC<LogoProps> = ({currentRole}) => {

    return (
        <div>
            <Link to={currentRole === roles.blogger  ? paths.mainBlogger : paths.main}>
                <img src={logo} className={styles.logo} alt="/" />
            </Link>
        </div>);
};
