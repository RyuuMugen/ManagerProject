import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider>
      {/* <NavigationProgress /> */}
      <ModalsProvider>
        <Notifications position="top-center" autoClose={3000} />
        <App />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
reportWebVitals();
