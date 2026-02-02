# MES Frontend (Work In Progress)

This repository contains the **frontend application** for a Manufacturing Execution System (MES).  
The project is currently **in development**, but the **module structure and routing flow** are already defined to support backend API design and system integration.

---

## Tech Stack

- React + TypeScript + Vite  
- Ant Design (UI)  
- React Router v7  
- i18next (multi-language)  
- AntV Charts  

---

## System Scope

This frontend represents the main workflow of a manufacturing system:

**Sales Order → Production Planning → Production Execution → Quality Control → Warehouse → Traceability**

---

## Project Structure (Business Modules)

| Module | Description |
|--------|-------------|
| `sales/` | Sales Orders |
| `planning/` | Production Orders, Plans, Scheduling |
| `production/` | Mixing, Filling, Packaging tasks |
| `quality/` | IQC, IPQC, FQC, QC Results |
| `warehouse/` | Material Receipts, Batches, Inventory Ledger, IQC Records |
| `traceability/` | Batch Trace, Rework Orders, Scrap Orders |
| `system/` | Roles & Permissions |
| `router/` | Application routing |
| `context/` | Shared state |

Each module corresponds to backend entities and API endpoints.

---

## Backend Integration Note

- The frontend is designed as a **modular MES interface**
- Each page requires corresponding REST APIs
- Priority integration: **Warehouse module** to remove double data entry processes
- Routing structure is defined in `lib/constants/appRoutes.ts`

---

## Environment Setup

Create a `.env` file (optional):

VITE_API_BASE_URL=http://localhost:8080/api/v1 


---

## Run Locally

```bash
npm install
npm run dev
