import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import createCache from "@emotion/cache";
import { ToastContainer } from "react-toastify";
import {
  EuiPageTemplate,
  EuiPageSection,
  EuiImage,
  EuiAvatar,
  EuiSpacer,
  EuiTitle,
  EuiIcon,
  EuiProgress,
  EuiProvider,
  euiStylisPrefixer,
  EuiThemeColorMode,
} from "@elastic/eui";

//css
import "react-toastify/dist/ReactToastify.css";
import "@elastic/eui/dist/eui_theme_light.min.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/tiptap/styles.css';
import router from "./_setup/router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.querySelector('meta[name="emotion-styles"]');
const cache = createCache({
  key: "eui",
  container: container || undefined,
  stylisPlugins: [euiStylisPrefixer],
});
cache.compat = true;

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <EuiProvider colorMode="light" cache={cache}></EuiProvider>
    </QueryClientProvider>
  );
}

export default App;
