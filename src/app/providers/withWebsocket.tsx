import { CentrifugeProvider } from "@widgets/chat";

export const withWebsocket = (Component: React.FC) => {
  return () => (
    <CentrifugeProvider>
      <Component />
    </CentrifugeProvider>
  );
};
