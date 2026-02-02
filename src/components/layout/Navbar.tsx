// src/components/layout/Navbar.tsx
import { Layout, Avatar, Dropdown, Space, Badge } from "antd";
import {
  BellOutlined,
  GlobalOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function Navbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#9F8383", // sama dengan sidebar
        padding: "0 16px",
      }}
    >
      <Space>
        <MenuOutlined
          style={{ fontSize: 20, color: "#fff", cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />
        <img src="assets/nose.png" alt="nose" style={{ height: 32 }} />
      </Space>

      <Space size="large">
        <Badge count={2} size="small" offset={[0, 0]}>
          <BellOutlined style={{ fontSize: 20, color: "#fff" }} />
        </Badge>

        <Dropdown
          menu={{
            items: [
              { key: "id", label: "Bahasa Indonesia" },
              { key: "en", label: "English" },
            ],
          }}
          placement="bottomRight"
        >
          <GlobalOutlined style={{ fontSize: 20, color: "#fff", cursor: "pointer" }} />
        </Dropdown>

        <Dropdown
          menu={{
            items: [
              { key: "profile", label: "Profile" },
              { key: "logout", label: "Logout" },
            ],
          }}
          placement="bottomRight"
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Header>
  );
}
