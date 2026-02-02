import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./i18n";
import "./index.css";

import App from "./App";
import AntdProvider from "./app/AntdProvider";
import { OrdersProvider } from "./context/OrdersContext";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading translations...</div>}>
        <AntdProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </AntdProvider>
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
