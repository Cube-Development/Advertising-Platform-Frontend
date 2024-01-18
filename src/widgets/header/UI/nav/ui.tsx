import { useLocation, useNavigate } from 'react-router-dom';
import { items } from './config';
import styles from './styles.module.scss';

export const Nav = () => {
//   const { pathname } = useRouter();
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };


  return (
    <nav className={styles.nav}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavigation(item.href)}
          className={location.pathname === item.href ? styles.active : ''}
        >
          {item.text}
        </div>
      ))}
    </nav>
  );
};