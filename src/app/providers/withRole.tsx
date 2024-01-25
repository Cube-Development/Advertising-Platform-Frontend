import { RoleProvider } from "@shared/context/RoleContext";

export const withRole = (Component: React.FC) => {
  return () => (
    <RoleProvider>
      <Component />
    </RoleProvider>
  );
};
