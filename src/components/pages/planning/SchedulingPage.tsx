// src/pages/planning/SchedulingPage.tsx
import { Table, Tag, Button, Modal, Form, DatePicker, Select } from "antd";
import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";
import dayjs from "dayjs";

interface ScheduleSlot {
  id: string;
  date: string;
  shift: "Morning" | "Evening";
  moId?: string;
}

export default function SchedulingPage() {
  const { moList } = useOrders();

  const capacityPerShift = 2;
  const slots: ScheduleSlot[] = [];
  let currentDate = dayjs();
  let shift: "Morning" | "Evening" = "Morning";
  let counter = 0;

  // generate jadwal otomatis
  moList.filter(mo => mo.status === "Released").forEach((mo) => {
    if (counter >= capacityPerShift) {
      if (shift === "Morning") {
        shift = "Evening";
        counter = 0;
      } else {
        shift = "Morning";
        currentDate = currentDate.add(1, "day");
        counter = 0;
      }
    }
    slots.push({
      id: `SLOT-${slots.length + 1}`,
      date: currentDate.format("YYYY-MM-DD"),
      shift,
      moId: mo.id,
    });
    counter++;
  });

  const [schedule, setSchedule] = useState<ScheduleSlot[]>(slots);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);
  const [form] = Form.useForm();

  const handleReschedule = (slot: ScheduleSlot) => {
    setSelectedSlot(slot);
    setRescheduleModalOpen(true);
    form.setFieldsValue({
      date: dayjs(slot.date),
      shift: slot.shift,
    });
  };

  const columns = [
    { title: "Slot ID", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Shift", dataIndex: "shift", key: "shift" },
    {
      title: "MO Assigned",
      dataIndex: "moId",
      key: "moId",
      render: (moId?: string) => moId ? <Tag color="blue">{moId}</Tag> : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ScheduleSlot) =>
        record.moId ? (
          <Button onClick={() => handleReschedule(record)}>Reschedule</Button>
        ) : null,
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
      <h2>Scheduling</h2>
      <Table columns={columns} dataSource={schedule} rowKey="id" />

      {/* Reschedule Modal */}
      <Modal
        open={rescheduleModalOpen}
        title={`Reschedule ${selectedSlot?.moId}`}
        onCancel={() => setRescheduleModalOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            const updated = schedule.map((slot) =>
              slot.id === selectedSlot?.id
                ? {
                    ...slot,
                    date: values.date.format("YYYY-MM-DD"),
                    shift: values.shift,
                  }
                : slot
            );
            setSchedule(updated);
            setRescheduleModalOpen(false);
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="New Date" name="date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="New Shift" name="shift" rules={[{ required: true }]}>
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
