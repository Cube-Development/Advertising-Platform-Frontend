import { MainLayout } from "../../widgets/layouts";

export const withLayout = (Component: React.FC) => {
  return () => (
    <MainLayout>
        <Component />
    </MainLayout>
  );
};