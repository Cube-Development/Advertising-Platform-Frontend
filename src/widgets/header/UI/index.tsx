import {FC} from 'react';
import { useAuth } from './../../../shared/context/AuthContext';
import { Login } from './login';
import { Logo } from './logo';
import { Nav } from './nav';
import { Profile } from './profile';
import styles from './styles.module.scss';

export const Header: FC = () => {
    const { isAuth } = useAuth();
    console.log(isAuth, 'Header')
    return (
        <header className={styles.wrapper}>
                <Logo/>
                <Nav/>
                {
                    isAuth
                    ?
                    <Profile/>
                    :
                    <Login/>
                    
                }
                
        </header>);
};
