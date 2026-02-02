// src/pages/planning/ProductionPlansPage.tsx
import {
  Table,
  Button,
  Tag,
  Modal,
  Form,
  DatePicker,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";
import dayjs from "dayjs";

interface ProductionPlan {
  id: string;
  moId: string;
  date: string;
  shift: "Morning" | "Evening";
  status: "Planned" | "In Progress" | "Completed";
}

export default function ProductionPlansPage() {
  const { moList } = useOrders();
  const [plans, setPlans] = useState<ProductionPlan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMO, setSelectedMO] = useState<any>(null);
  const [form] = Form.useForm();

  const handlePlan = (mo: any) => {
    setSelectedMO(mo);
    setModalOpen(true);
  };

  const updateStatus = (planId: string, newStatus: ProductionPlan["status"]) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, status: newStatus } : p));
  };

  const columns = [
    { title: "Plan ID", dataIndex: "id", key: "id" },
    { title: "MO ID", dataIndex: "moId", key: "moId" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: ProductionPlan["status"]) => {
        const color =
          status === "Planned" ? "blue" :
          status === "In Progress" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ProductionPlan) => (
        <Space>
          {record.status === "Planned" && (
            <Button onClick={() => updateStatus(record.id, "In Progress")}>
              Start
            </Button>
          )}
          {record.status === "In Progress" && (
            <Button type="primary" onClick={() => updateStatus(record.id, "Completed")}>
              Complete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Production Plans</h2>

      <Space wrap style={{ marginBottom: 16 }}>
        {moList
          .filter((mo) => mo.status === "Released" && !plans.find(p => p.moId === mo.id))
          .map((mo) => (
            <Button key={mo.id} onClick={() => handlePlan(mo)}>
              Plan {mo.id}
            </Button>
          ))}
      </Space>

      <Table columns={columns} dataSource={plans} rowKey="id" />

      <Modal
        open={modalOpen}
        title={`Create Plan for ${selectedMO?.id}`}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            const newPlan: ProductionPlan = {
              id: `PLAN-${Date.now()}`,
              moId: selectedMO!.id,
              date: values.date.format("YYYY-MM-DD"),
              shift: values.shift,
              status: "Planned",
            };
            setPlans([...plans, newPlan]);
            form.resetFields();
            setModalOpen(false);
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Production Date" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Shift" name="shift" rules={[{ required: true }]}>
            <Select
              options={[
                { value: "Morning", label: "Morning" },
                { value: "Evening", label: "Evening" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
