// stores/approvals.ts
import { defineStore } from "pinia";

export const useApprovalsStore = defineStore("approvals", {
  state: () => ({
    items: [
      { id: 1, name: "Empresa A", type: "Startup", status: "PENDING" },
      { id: 2, name: "Empresa B", type: "ONG", status: "PENDING" },
      { id: 3, name: "Empresa C", type: "Privada", status: "APPROVED" },
    ],
    selectedIds: [] as number[],
  }),
  actions: {
    approve(id: number) {
      const item = this.items.find((i) => i.id === id);
      if (item && item.status === "PENDING") {
        item.status = "APPROVED";
        this.selectedIds = this.selectedIds.filter((i) => i !== id);
      }
    },
    toggleSelection(id: number) {
      if (this.selectedIds.includes(id)) {
        this.selectedIds = this.selectedIds.filter((i) => i !== id);
      } else {
        this.selectedIds.push(id);
      }
    },
    approveSelected() {
      this.items = this.items.map((item) =>
        this.selectedIds.includes(item.id) && item.status === "PENDING"
          ? { ...item, status: "APPROVED" }
          : item
      );
      this.selectedIds = [];
    },
  },
  getters: {
    pendingItems: (state) =>
      state.items.filter((item) => item.status === "PENDING"),
    isSelected: (state) => (id: number) => state.selectedIds.includes(id),
  },
});
