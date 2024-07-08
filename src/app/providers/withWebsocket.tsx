import { CentrifugeProvider } from "@widgets/communication";

export const withWebsocket = (Component: React.FC) => {
  return () => (
    <CentrifugeProvider>
      <Component />
    </CentrifugeProvider>
  );
};
