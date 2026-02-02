// src/app/AntdProvider.tsx
import { ConfigProvider } from "antd";
import idID from "antd/locale/id_ID";
import React from "react";

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider locale={idID}>{children}</ConfigProvider>;
}
