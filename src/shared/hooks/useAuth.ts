import { AuthContext } from "@shared/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);