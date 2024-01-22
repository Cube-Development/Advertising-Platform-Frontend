import * as React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
// import { useGetPostsQuery } from "shared/store/reducers/cards";
import { useGetPostsQuery } from "./../../shared/store/reducers/cards";

const token = 'YOUR_JWT_TOKEN 128888';

export interface AuthContextType {
  isAuth: boolean;
  toggleAuth: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuth: false,
  toggleAuth: () => {},
};

export const AuthContext = React.createContext(initialAuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setAuth] = useState<boolean>(JSON.parse(localStorage.getItem('isAuth') ?? 'false'));

  const { data: fetchDataResult, refetch } = useGetPostsQuery(); // Используйте useFetchDataQuery


  const initializeAuth = async () => {
    console.log('useEffect toggleAuth222');
    const authValue = await JSON.parse(localStorage.getItem("isAuth") ?? 'false');
    setAuth(authValue);
  };

  useEffect(() => {
    console.log('useEffect toggleAuth');
    initializeAuth();
  }, []);

  const toggleAuth = async () => {
    console.log('toggleAuth')

    Cookies.set('token', token, {   secure: true, // Только по HTTPS
    httpOnly: true, // Доступ только через HTTP
    sameSite: 'None', 
    expires: 7}) // Время жизни куки в днях});
    // console.log(Cookies.get('token'))

    await refetch();

    // Cookies.remove('token')
    setAuth((prevIsAuth) => {
      const newIsAuth = !prevIsAuth;
      localStorage.setItem('isAuth', JSON.stringify(newIsAuth));
      localStorage.removeItem('role');
      return newIsAuth;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
