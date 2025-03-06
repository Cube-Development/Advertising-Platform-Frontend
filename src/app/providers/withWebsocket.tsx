import { CentrifugeProvider } from "@shared/api";

export const withWebsocket = (Component: React.FC) => {
  return () => (
    <CentrifugeProvider>
      <Component />
    </CentrifugeProvider>
  );
};
