import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { appRoutes, type AppRoute } from "../lib/constants/appRoutes";

function flattenRoutes(routes: AppRoute[]) {
  const result: { path: string; element: React.ReactNode }[] = [];
  for (const r of routes) {
    if (r.type === "page" && r.path && r.element) {
      result.push({ path: r.path, element: r.element });
    } else if (r.type === "group" && r.children) {
      result.push(...flattenRoutes(r.children));
    }
  }
  return result;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: flattenRoutes(appRoutes),
  },
]);
