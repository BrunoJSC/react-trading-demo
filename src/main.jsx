import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { WatchListProvider } from "./context/watchListContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchListProvider>
      <App />
    </WatchListProvider>
  </React.StrictMode>
);
