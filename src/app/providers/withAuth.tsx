import { AuthProvider } from "@shared/context/AuthContext";

export const withAuth = (Component: React.FC) => {
  return () => (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
};
