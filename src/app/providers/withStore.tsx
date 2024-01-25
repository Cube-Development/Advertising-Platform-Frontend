import { store } from "@shared/store";
import { Provider } from "react-redux";

export const withStore = (Component: React.FC) => {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
