import { Routing } from "@pages/index";
import { withProviders } from "./providers";
import { RouterProvider } from "react-router-dom";
import { router } from "@pages/router";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

// const App: React.FC = () => {
//   return <Routing />;
// };

export default withProviders(App);
