import { Provider } from "react-redux";
import { store } from "../../shared/store";

export const withStore = (Component: React.FC) => {
  return () => (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};