import { defineStore } from "pinia";
import {
  loadApprovals,
  saveApprovals,
  clearApprovals,
} from "./approvalService";
import { mockApprovals } from "./mockApprovals";

export interface ApprovalItem {
  id: number;
  name: string;
  type: string;
  status: "PENDING" | "APPROVED";
}

export const useApprovalStore = defineStore("approvals", {
  state: () => ({
    items: [] as ApprovalItem[],
    searchQuery: "",
    statusFilter: "ALL" as "ALL" | "PENDING" | "APPROVED",
    isLoading: false,
  }),

  getters: {
    filteredItems: (state) => {
      let filtered = state.items;

      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
        );
      }

      if (state.statusFilter !== "ALL") {
        filtered = filtered.filter(
          (item) => item.status === state.statusFilter
        );
      }

      return filtered;
    },

    pendingCount: (state) =>
      state.items.filter((item) => item.status === "PENDING").length,

    approvedCount: (state) =>
      state.items.filter((item) => item.status === "APPROVED").length,
  },

  actions: {
    async fetchApprovals() {
      this.isLoading = true;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const saved = loadApprovals();
      this.items = saved.length ? saved : mockApprovals;

      saveApprovals(this.items);
      this.isLoading = false;
    },

    approveItem(id: number) {
      const item = this.items.find((i) => i.id === id);
      if (item) {
        item.status = "APPROVED";
        saveApprovals(this.items);
      }
    },

    bulkApprove(ids: number[]) {
      ids.forEach((id) => this.approveItem(id));
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setStatusFilter(status: "ALL" | "PENDING" | "APPROVED") {
      this.statusFilter = status;
    },

    clearStorage() {
      clearApprovals();
    },
  },
});
