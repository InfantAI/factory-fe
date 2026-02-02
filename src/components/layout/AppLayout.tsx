// src/components/layout/AppLayout.tsx
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideNav from "./SideNav";
import Navbar from "./Navbar";

const { Sider, Content } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const sidebar = document.getElementById("sidebar");
    if (!collapsed && sidebar && !sidebar.contains(e.target as Node)) {
      setCollapsed(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} onClick={handleClickOutside}>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout>
          <Sider
            id="sidebar"
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={280}
            style={{
              background: "#9F8383",
              transition: "all 0.3s ease-in-out",
              overflow: "hidden",
            }}
          >
            <SideNav collapsed={collapsed} />
          </Sider>

          <Content style={{ padding: 24 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
