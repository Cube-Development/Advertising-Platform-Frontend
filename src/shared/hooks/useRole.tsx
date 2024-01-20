import { useContext } from "react";
import { RoleContext } from "./../context/RoleContext";

export const useRole = () => useContext(RoleContext);