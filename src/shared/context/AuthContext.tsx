import * as React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
// import { useGetPostsQuery } from "shared/store/reducers/cards";
import { useGetPostsQuery } from "./../../shared/store/reducers/cards";
import { getAuthTokens } from "./../../shared/store/reducers/auth";

export interface AuthContextType {
  isAuth: boolean;
  toggleLogin: () => void;
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

  const { refetch } = useGetPostsQuery();

  const initializeAuth = async () => {
    const authValue = await JSON.parse(localStorage.getItem("isAuth") ?? 'false');
    setAuth(authValue);
  };

  useEffect(() => {
    console.log('useEffect toggleAuth');
    initializeAuth();
  }, []);


  const getAndSetAuthTokens = async () => {
    const tokens = await getAuthTokens();
    console.log('tokens', tokens)

    if (tokens) {
      Cookies.set('accessToken', tokens.accessToken, { secure: true, httpOnly: false, sameSite: 'None', expires: 7 });

    } else {
      console.error('Не удалось получить токены.');
    }
  };

  const toggleLogin = async () => {

    await getAndSetAuthTokens();
    await refetch();

    setAuth((prevIsAuth) => {
      const newIsAuth = !prevIsAuth;
      localStorage.setItem('isAuth', JSON.stringify(newIsAuth));
      localStorage.removeItem('role');
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
