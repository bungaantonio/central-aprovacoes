import type { ApprovalItem } from "@/stores/approvals";

export const mockApprovals: ApprovalItem[] = [
  { id: 1, name: "Empresa A", type: "Startup", status: "PENDING" },
  { id: 2, name: "Empresa B", type: "ONG", status: "PENDING" },
  { id: 3, name: "Empresa C", type: "Privada", status: "APPROVED" },
];
