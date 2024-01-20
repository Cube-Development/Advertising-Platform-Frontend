import {FC} from 'react';
import { useRole } from './../../../shared/hooks/useRole';
import { useAuth } from './../../../shared/hooks/useAuth';
import { Login } from './login';
import { Logo } from './logo';
import { Nav } from './nav';
import { Profile } from './profile';
import styles from './styles.module.scss';

export const Header: FC = () => {
    const { isAuth, toggleAuth } = useAuth();
    const { currentRole, toggleRole } = useRole();

    return (
        <header className={styles.wrapper}>
                <Logo currentRole={currentRole}/>
                <Nav isAuth={isAuth} toggleAuth={toggleAuth} currentRole={currentRole} toggleRole={toggleRole}/>
                {
                    isAuth
                    ?
                    <Profile/>
                    :
                    <Login/>
                    
                }
                
        </header>);
};
