import { setupStore } from "@shared/store/store";
import { Provider } from "react-redux";

const store = setupStore();

export const withStore = (Component: React.FC) => {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
