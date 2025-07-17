import type { ApprovalItem } from "@/stores/approvals";

const STORAGE_KEY = "approvals-data";

export function loadApprovals(): ApprovalItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveApprovals(items: ApprovalItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function clearApprovals(): void {
  localStorage.removeItem(STORAGE_KEY);
}
