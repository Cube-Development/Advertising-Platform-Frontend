import { RoleContext } from "@shared/context/RoleContext";
import { useContext } from "react";

export const useRole = () => useContext(RoleContext);
