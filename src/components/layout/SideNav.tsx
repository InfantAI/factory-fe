// src/components/layout/SideNav.tsx
import { Menu } from "antd";
import type { ItemType } from "antd/es/menu/interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { appRoutes, type AppRoute } from "../../lib/constants/appRoutes";

function toMenuItems(routes: AppRoute[], collapsed: boolean): ItemType[] {
  return routes.map((r) => {
    if (r.type === "page") {
      return {
        key: r.path!,
        label: r.label,
        icon: r.icon,
        title: collapsed ? r.label : undefined, // tooltip saat collapsed
      };
    }
    return {
      key: r.key,
      label: r.label,
      icon: r.icon,
      title: collapsed ? r.label : undefined,
      children: toMenuItems(r.children!, collapsed),
    };
  });
}

export default function SideNav({ collapsed }: { collapsed: boolean }) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const items = useMemo(() => toMenuItems(appRoutes, collapsed), [collapsed]);

  return (
    <Menu
      mode="inline"
      theme="dark"
      items={items}
      selectedKeys={[pathname]}
      onClick={(e) => {
        const key = String(e.key);
        if (key.startsWith("/")) nav(key);
      }}
      style={{
        background: "#9F8383",
        color: "#fff",
        height: "100%",
        borderRight: "none",
        transition: "all 0.3s ease-in-out",
        paddingLeft: collapsed ? 0 : 16,
      }}
    />
  );
}
