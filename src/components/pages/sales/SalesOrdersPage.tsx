// src/pages/SalesOrderPage.tsx
import { Table, Button, Space, Tag, Input, Modal, Tooltip } from "antd";
import { PlusOutlined, SearchOutlined, QrcodeOutlined, ApartmentOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";

export default function SalesOrderPage() {
  const { salesOrders, moList } = useOrders();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSO, setSelectedSO] = useState<any>(null);

  const getMOBySO = (soId: string) => moList.find((mo) => mo.soId === soId);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "SO Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Pending" ? "orange" : status === "Confirmed" ? "blue" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "MO Status",
      key: "moStatus",
      render: (_: any, record: any) => {
        const mo = getMOBySO(record.id);
        if (!mo) return <Tag color="default">Not Created</Tag>;
        const color = mo.status === "Draft" ? "gold" : mo.status === "Released" ? "green" : "red";
        return <Tag color={color}>{mo.status}</Tag>;
      },
    },
    {
      title: "Formula",
      key: "formulaVersion",
      render: (_: any, record: any) => {
        const mo = getMOBySO(record.id);
        return mo?.formulaVersion ? <Tag color="purple">{mo.formulaVersion}</Tag> : "-";
      },
    },
    {
      title: "QR",
      key: "qrCode",
      render: (_: any, record: any) => {
        const mo = getMOBySO(record.id);
        return mo?.qrCode ? (
          <Tooltip title={`QR: ${mo.qrCode}`}>
            <QrcodeOutlined style={{ fontSize: 20 }} />
          </Tooltip>
        ) : "-";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const mo = getMOBySO(record.id);
        return (
          <Space>
            <Button type="link" onClick={() => { setSelectedSO(record); setViewModalOpen(true); }}>
              View
            </Button>
            {!mo && (
              <Button type="primary" icon={<ApartmentOutlined />} size="small">
                Request MO
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Search Sales Order..." prefix={<SearchOutlined />} style={{ width: 250 }} />
        <Button type="primary" icon={<PlusOutlined />}>New Sales Order</Button>
      </Space>

      <Table columns={columns} dataSource={salesOrders} rowKey="id" pagination={{ pageSize: 5 }} />

      <Modal open={viewModalOpen} title="Sales Order Detail" onCancel={() => setViewModalOpen(false)} footer={null}>
        {selectedSO && (
          <div>
            <p><b>Order ID:</b> {selectedSO.id}</p>
            <p><b>Customer:</b> {selectedSO.customer}</p>
            <p><b>Date:</b> {selectedSO.date}</p>
            <p><b>Status:</b> {selectedSO.status}</p>
            <p><b>MO Status:</b> {getMOBySO(selectedSO.id)?.status || "Not Created"}</p>
            <p><b>Formula:</b> {getMOBySO(selectedSO.id)?.formulaVersion || "-"}</p>
            {getMOBySO(selectedSO.id)?.qrCode && <p><b>QR Code:</b> {getMOBySO(selectedSO.id)?.qrCode}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}
