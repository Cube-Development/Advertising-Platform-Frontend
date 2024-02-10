import { HandleAuth } from "@widgets/handleAuth";
import { MainLayout } from "@widgets/layouts";

export const withLayout = (Component: React.FC) => {
  return () => (
    <MainLayout>
      <HandleAuth />
      <Component />
    </MainLayout>
  );
};
