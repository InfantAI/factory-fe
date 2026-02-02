import {
  HomeOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  DatabaseOutlined,
  BuildOutlined,
  SafetyCertificateOutlined,
  ClusterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";

// Import pages sesuai struktur kamu
import HomePage from "../../components/pages/home/HomePage";
import SalesOrdersPage from "../../components/pages/sales/SalesOrdersPage";
import ProductionOrdersPage from "../../components/pages/planning/ProductionOrdersPage";
import ProductionPlansPage from "../../components/pages/planning/ProductionPlansPage";
import SchedulingPage from "../../components/pages/planning/SchedulingPage";

import MaterialBatchesPage from "../../components/pages/warehouse/MaterialBatchesPage";
import IqcRecordsPage from "../../components/pages/warehouse/IqcRecordsPage";
import InventoryLedgerPage from "../../components/pages/warehouse/InventoryLedgesPage";
import ReceiptsPage from "../../components/pages/warehouse/ReceiptsPage";

import MixingsPage from "../../components/pages/production/task/MixingsPage";
import FillingsPage from "../../components/pages/production/task/FillingsPage";
import PackagingsPage from "../../components/pages/production/task/PackagingsPage";

import IqcPage from "../../components/pages/quality/IqcPage";
import IpqcPage from "../../components/pages/quality/IpqcPage";
import FqcPage from "../../components/pages/quality/FqcPage";
import QcResultsPage from "../../components/pages/quality/QcResultsPage";

import BatchTracesPage from "../../components/pages/traceability/BatchTracesPage";
import ScrapOrdersPage from "../../components/pages/traceability/ScrapOrdersPage";
import ReworkOrdersPage from "../../components/pages/traceability/ReworkOrdersPage";

import RolePermissionPage from "../../components/pages/system/RolePermissionPage";
import RolesPage from "../../components/pages/system/RolesPage";

export type AppRoute = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type: "group" | "page";
  path?: string;
  element?: React.ReactNode;
  children?: AppRoute[];
};

export const appRoutes: AppRoute[] = [
  {
    key: "/home",
    path: "/home",
    label: "Home",
    icon: <HomeOutlined />,
    type: "page",
    element: <HomePage />,
  },
  {
    key: "sales",
    label: "Sales",
    icon: <ShoppingCartOutlined />,
    type: "group",
    children: [
      {
        key: "/sales/orders",
        path: "/sales/orders",
        label: "Sales Orders",
        type: "page",
        element: <SalesOrdersPage />,
      },
    ],
  },
  {
    key: "planning",
    label: "Planning",
    icon: <ProfileOutlined />,
    type: "group",
    children: [
      {
        key: "/planning/orders",
        path: "/planning/orders",
        label: "Production Orders",
        type: "page",
        element: <ProductionOrdersPage />,
      },
      {
        key: "/planning/plans",
        path: "/planning/plans",
        label: "Production Plans",
        type: "page",
        element: <ProductionPlansPage />,
      },
      {
        key: "/planning/scheduling",
        path: "/planning/scheduling",
        label: "Scheduling",
        type: "page",
        element: <SchedulingPage />,
      },
    ],
  },
  {
    key: "warehouse",
    label: "Warehouse",
    icon: <DatabaseOutlined />,
    type: "group",
    children: [
      {
        key: "/warehouse/batches",
        path: "/warehouse/batches",
        label: "Material Batches",
        type: "page",
        element: <MaterialBatchesPage />,
      },
      {
        key: "/warehouse/iqc",
        path: "/warehouse/iqc",
        label: "IQC Records",
        type: "page",
        element: <IqcRecordsPage />,
      },
      {
        key: "/warehouse/inventory",
        path: "/warehouse/inventory",
        label: "Inventory Ledger",
        type: "page",
        element: <InventoryLedgerPage />,
      },
      {
        key: "/warehouse/receipts",
        path: "/warehouse/receipts",
        label: "Material Receipts",
        type: "page",
        element: <ReceiptsPage />,
      },
    ],
  },
  {
    key: "production",
    label: "Production",
    icon: <BuildOutlined />,
    type: "group",
    children: [
      {
        key: "/production/mixings",
        path: "/production/mixings",
        label: "Mixings",
        type: "page",
        element: <MixingsPage />,
      },
      {
        key: "/production/fillings",
        path: "/production/fillings",
        label: "Fillings",
        type: "page",
        element: <FillingsPage />,
      },
      {
        key: "/production/packagings",
        path: "/production/packagings",
        label: "Packagings",
        type: "page",
        element: <PackagingsPage />,
      },
    ],
  },
  {
    key: "quality",
    label: "Quality",
    icon: <SafetyCertificateOutlined />,
    type: "group",
    children: [
      {
        key: "/quality/iqc",
        path: "/quality/iqc",
        label: "IQC",
        type: "page",
        element: <IqcPage />,
      },
      {
        key: "/quality/ipqc",
        path: "/quality/ipqc",
        label: "IPQC",
        type: "page",
        element: <IpqcPage />,
      },
      {
        key: "/quality/fqc",
        path: "/quality/fqc",
        label: "FQC",
        type: "page",
        element: <FqcPage />,
      },
      {
        key: "/quality/results",
        path: "/quality/results",
        label: "QC Results",
        type: "page",
        element: <QcResultsPage />,
      },
    ],
  },
  {
    key: "traceability",
    label: "Traceability",
    icon: <ClusterOutlined />,
    type: "group",
    children: [
      {
        key: "/traceability/batch",
        path: "/traceability/batch",
        label: "Batch Trace",
        type: "page",
        element: <BatchTracesPage />,
      },
      {
        key: "/traceability/scrap",
        path: "/traceability/scrap",
        label: "Scrap Orders",
        type: "page",
        element: <ScrapOrdersPage />,
      },
      {
        key: "/traceability/rework",
        path: "/traceability/rework",
        label: "Rework Orders",
        type: "page",
        element: <ReworkOrdersPage />,
      },
    ],
  },
  {
    key: "system",
    label: "System",
    icon: <SettingOutlined />,
    type: "group",
    children: [
      {
        key: "/system/roles",
        path: "/system/roles",
        label: "Roles",
        type: "page",
        element: <RolesPage />,
      },
      {
        key: "/system/role-permission",
        path: "/system/role-permission",
        label: "Roles & Permissions",
        type: "page",
        element: <RolePermissionPage />,
      },
    ],
  },
];
