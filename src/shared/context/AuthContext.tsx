import Cookies from 'js-cookie';
import * as React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles } from "./../../shared/config/roles";
import { paths } from "./../../shared/routing";

export interface AuthContextType {
  isAuth: boolean;
  toggleLogin: (tokens: any) => void;
  toggleLogout: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuth: false,
  toggleLogin: () => {},
  toggleLogout: () => {},
};

export const AuthContext = React.createContext(initialAuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setAuth] = useState<boolean>(JSON.parse(localStorage.getItem('isAuth') ?? 'false'));

  const router = useNavigate();

  const initializeAuth = async () => {
    const authValue = await JSON.parse(localStorage.getItem("isAuth") ?? 'false');
    setAuth(authValue);
  };

  useEffect(() => {
    console.log('useEffect toggleAuth');
    initializeAuth();
  }, []);


  const toggleLogin = (tokens: any) => {

    router(paths.profile);

    setAuth((prevIsAuth) => {
      const newIsAuth = !prevIsAuth;
      localStorage.setItem('isAuth', JSON.stringify(newIsAuth));
      localStorage.setItem('role', roles.advertiser);
      Cookies.set('accessToken', tokens.accessToken, { secure: true, httpOnly: false, sameSite: 'None', expires: 7 });
      return newIsAuth;
    });

  };

  const toggleLogout = () => {

    setAuth((prevIsAuth) => {
      const newIsAuth = !prevIsAuth;
      localStorage.setItem('isAuth', 'false');
      localStorage.removeItem('role');
      Cookies.remove('accessToken');
      return newIsAuth;
    });

  };

  return (
    <AuthContext.Provider value={{ isAuth, toggleLogin, toggleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
