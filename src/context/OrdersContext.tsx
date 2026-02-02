import React, { createContext, useContext, useState } from "react";

export interface SalesOrder {
  id: string;
  customer: string;
  date: string;
  status: "Pending" | "Confirmed" | "Shipped";
}

export interface ManufacturingOrder {
  id: string;
  soId: string;
  formulaVersion: string;
  status: "Draft" | "Released" | "Hold";
  qrCode?: string;
}

interface OrdersContextType {
  salesOrders: SalesOrder[];
  moList: ManufacturingOrder[];
  setMoList: React.Dispatch<React.SetStateAction<ManufacturingOrder[]>>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [salesOrders] = useState<SalesOrder[]>([
    { id: "SO-001", customer: "PT ABC", date: "2026-01-25", status: "Pending" },
    { id: "SO-002", customer: "PT XYZ", date: "2026-01-26", status: "Confirmed" },
    { id: "SO-003", customer: "PT DEF", date: "2026-01-27", status: "Pending" },
  ]);

  const [moList, setMoList] = useState<ManufacturingOrder[]>([
    {
      id: "MO-001",
      soId: "SO-001",
      formulaVersion: "F-2026.01",
      status: "Released",
      qrCode: "QR-MO-001",
    },
    {
      id: "MO-002",
      soId: "SO-002",
      formulaVersion: "F-2026.02",
      status: "Draft",
    },
  ]);

  return (
    <OrdersContext.Provider value={{ salesOrders, moList, setMoList }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
