import * as React from "react";
import { FC, ReactNode, useEffect, useState } from "react";
import { roles } from "./../config/roles";

export interface RoleContextType {
    currentRole: string;
    toggleRole: () => void;
}

const initialRoleContext: RoleContextType = {
    currentRole: roles.advertiser,
    toggleRole: () => {},
};

export const RoleContext = React.createContext(initialRoleContext);

export const RoleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(roles.advertiser);

  const initializeRole = async () => {
    console.log('useEffect toggleRole 222');
    const roleValue = await JSON.parse(localStorage.getItem("role") ?? roles.advertiser);
    setCurrentRole(roleValue);
  };

  useEffect(() => {
    initializeRole();
  }, []);

  const toggleRole = () => {
    const newRole = currentRole === roles.blogger ? roles.advertiser : roles.blogger;
    setCurrentRole(newRole);
    localStorage.setItem('role', newRole);
    console.log(newRole);
  };

  return (
    <RoleContext.Provider value={{ currentRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};