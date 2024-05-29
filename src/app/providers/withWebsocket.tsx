import { CentrifugeProvider } from "@widgets/header/UI/chat/CentrifugeContext";

export const withWebsocket = (Component: React.FC) => {
  return () => (
    <CentrifugeProvider>
      <Component />
    </CentrifugeProvider>
  );
};
