// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import { appRoutes } from "./lib/constants/appRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Semua halaman dibungkus AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          {appRoutes.map((route) =>
            route.type === "page" ? (
              <Route key={route.key} path={route.path} element={route.element} />
            ) : (
              route.children?.map((child) => (
                <Route key={child.key} path={child.path} element={child.element} />
              ))
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
