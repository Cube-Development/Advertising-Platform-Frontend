import { roles } from "@shared/config/roles";
import * as React from "react";
import { FC, ReactNode, useEffect, useState } from "react";

export interface RoleContextType {
  currentRole: string;
  toggleRole: (role: roles) => void;
}

const initialRoleContext: RoleContextType = {
  currentRole: roles.advertiser,
  toggleRole: () => {},
};

export const RoleContext = React.createContext(initialRoleContext);

export const RoleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<string>(roles.advertiser);

  const initializeRole = async () => {
    console.log("useEffect toggleRole 222");
    const roleValue = localStorage.getItem("role") ?? roles.advertiser;
    setCurrentRole(roleValue);
  };

  // useEffect(() => {
  //   initializeRole();
  // }, []);

  const toggleRole = (role: roles) => {
    if (role !== currentRole) {
      const newRole =
        currentRole === roles.blogger ? roles.advertiser : roles.blogger;
      setCurrentRole(newRole);
      localStorage.setItem("role", newRole);
    }
  };

  return (
    <RoleContext.Provider value={{ currentRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};
