import {
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Select,
  Input,
  QRCode,
  Space,
} from "antd";
import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";
import type { ManufacturingOrder } from "../../../context/OrdersContext";

export default function ProductionOrdersPage() {
  const { moList, setMoList } = useOrders();

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [releaseModalOpen, setReleaseModalOpen] = useState(false);
  const [holdModalOpen, setHoldModalOpen] = useState(false);
  const [selectedMO, setSelectedMO] = useState<ManufacturingOrder | null>(null);
  const [newFormula, setNewFormula] = useState<string>("");

  const handleView = (mo: ManufacturingOrder) => {
    setSelectedMO(mo);
    setViewModalOpen(true);
  };

  const handleRelease = (mo: ManufacturingOrder) => {
    setSelectedMO(mo);
    setReleaseModalOpen(true);
  };

  const handleHold = (mo: ManufacturingOrder) => {
    setSelectedMO(mo);
    setHoldModalOpen(true);
  };

  const columns = [
    { title: "MO ID", dataIndex: "id", key: "id" },
    { title: "Sales Order", dataIndex: "soId", key: "soId" },
    {
      title: "Formula",
      dataIndex: "formulaVersion",
      key: "formulaVersion",
      render: (v: string) => <Tag color="purple">{v}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: ManufacturingOrder["status"]) => {
        const color =
          status === "Draft" ? "gold" :
          status === "Released" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "QR",
      dataIndex: "qrCode",
      key: "qrCode",
      render: (qr?: string) =>
        qr ? <QRCode value={qr} size={64} /> : <Tag>-</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ManufacturingOrder) => (
        <Space>
          <Button type="link" onClick={() => handleView(record)}>View</Button>
          {record.status === "Draft" && (
            <Button type="primary" onClick={() => handleRelease(record)}>
              Release MO
            </Button>
          )}
          {record.status === "Released" && (
            <Button danger onClick={() => handleHold(record)}>
              Hold & Create New
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Manufacturing Orders</h2>
      <Table columns={columns} dataSource={moList} rowKey="id" />

      {/* View Modal */}
      <Modal
        open={viewModalOpen}
        title={`MO Detail: ${selectedMO?.id}`}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
      >
        {selectedMO && (
          <Form layout="vertical" initialValues={selectedMO}>
            <Form.Item label="Sales Order" name="soId">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Formula Version" name="formulaVersion">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Input disabled />
            </Form.Item>
            {selectedMO.qrCode && (
              <Form.Item label="QR Code">
                <QRCode value={selectedMO.qrCode} />
              </Form.Item>
            )}
          </Form>
        )}
      </Modal>

      {/* Release Modal */}
      <Modal
        open={releaseModalOpen}
        title={`Release MO: ${selectedMO?.id}`}
        onCancel={() => setReleaseModalOpen(false)}
        onOk={() => {
          if (!selectedMO) return;
          const updated = moList.map((mo) =>
            mo.id === selectedMO.id
              ? {
                  ...mo,
                  status: "Released" as const,
                  qrCode: `QR-${mo.id}-${Date.now()}`,
                }
              : mo
          );
          setMoList(updated);
          setReleaseModalOpen(false);
        }}
      >
        <p>Are you sure you want to release this MO?</p>
      </Modal>

      {/* Hold & Create New Modal */}
      <Modal
        open={holdModalOpen}
        title={`Hold & Create New MO for ${selectedMO?.soId}`}
        onCancel={() => setHoldModalOpen(false)}
        onOk={() => {
          if (!selectedMO) return;
          const newMO: ManufacturingOrder = {
            id: `MO-${Date.now()}`,
            soId: selectedMO.soId,
            formulaVersion: newFormula || "F-NEW",
            status: "Draft",
          };
          const updated = moList.map((mo) =>
            mo.id === selectedMO.id ? { ...mo, status: "Hold" as const } : mo
          );
          setMoList([...updated, newMO]);
          setHoldModalOpen(false);
          setNewFormula("");
        }}
      >
        <Form layout="vertical">
          <Form.Item label="New Formula Version" name="formulaVersion" required>
            <Select
              options={[
                { value: "F-2026.01", label: "F-2026.01" },
                { value: "F-2026.02", label: "F-2026.02" },
                { value: "F-2026.03", label: "F-2026.03" },
              ]}
              placeholder="Select new formula"
              onChange={(val) => setNewFormula(val)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
