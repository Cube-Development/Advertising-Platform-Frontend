import {FC} from 'react';
import { Logo } from './logo';
import { Nav } from './nav';
import styles from './styles.module.scss';

export const Header: FC = () => {

    return <header className={styles.wrapper}>
                <Logo/>
                <Nav/>
            </header>;
};
