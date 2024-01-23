import {FC} from 'react';
import { useRole } from './../../../shared/hooks/useRole';
import { useAuth } from './../../../shared/hooks/useAuth';
import { LoginBtn } from './loginBtn';
import { Logo } from './logo';
import { Nav } from './nav';
import { Profile } from './profile';
import styles from './styles.module.scss';

export const Header: FC = () => {
    const { isAuth, toggleLogin, toggleLogout } = useAuth();
    const { currentRole, toggleRole } = useRole();

    return (
        <header className={styles.wrapper}>
                <Logo currentRole={currentRole}/>
                <Nav 
                    isAuth={isAuth} toggleLogin={toggleLogin} toggleLogout={toggleLogout} 
                    currentRole={currentRole} toggleRole={toggleRole}
                />
                {
                    isAuth
                    ?
                    <Profile/>
                    :
                    <LoginBtn/>
                    
                }
                
        </header>);
};
