import { withProviders } from "./providers";
import { RouterProvider } from "react-router-dom";
import { router } from "@pages/router";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default withProviders(App);
