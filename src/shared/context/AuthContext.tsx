import { paths } from "@shared/routing";
import { IToken } from "@shared/types/tokens";
import Cookies from "js-cookie";
import * as React from "react";
import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isAuth, setAuth] = useState<boolean>(
    JSON.parse(localStorage.getItem("isAuth") ?? "false")
  );

  const router = useNavigate();

  const initializeAuth = async () => {
    const authValue = await JSON.parse(
      localStorage.getItem("isAuth") ?? "false"
    );
    setAuth(authValue);
  };

  // useEffect(() => {
  //   console.log("useEffect toggleAuth");
  //   initializeAuth();
  // }, []);

  const toggleLogin = (tokens: IToken) => {
    router(paths.profile);
    setAuth(true);
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    // localStorage.setItem("role", roles.advertiser);
    Cookies.set("accessToken", tokens.access_token, {
      secure: true,
      httpOnly: false,
      sameSite: "None",
      // expires: 7,
    });
    Cookies.set("refreshToken", tokens.refresh_token, {
      secure: true,
      httpOnly: false,
      sameSite: "None",
      // expires: 7,
    });
  };

  const toggleLogout = () => {
    setAuth(false);
    localStorage.setItem("isAuth", "false");
    // localStorage.removeItem("role");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ isAuth, toggleLogin, toggleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
