<template>
    <section class="p-6 max-w-3xl mx-auto space-y-4">
        <h1 class="text-2xl font-semibold">Central de Aprovações</h1>

        <UButton label="Aprovar Selecionados" color="primary" variant="solid" :disabled="store.selectedIds.length === 0"
            @click="store.approveSelected" />

        <div class="space-y-3">
            <ApprovalItem v-for="item in store.items" :key="item.id" :item="item" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useApprovalsStore } from '~/stores/approvals'
import ApprovalItem from '~/components/ApprovalItem.vue'

const store = useApprovalsStore()


</script>
