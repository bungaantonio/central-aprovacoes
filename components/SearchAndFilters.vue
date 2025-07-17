<template>
    <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- Campo de busca -->
        <div class="flex-1">
            <UInput v-model="searchQuery" placeholder="Buscar por nome ou tipo..." :loading="isLoading">
                <template #leading>
                    <Icon name="i-heroicons-magnifying-glass" />
                </template>
                <template #trailing>
                    <UButton v-if="searchQuery" variant="link" icon="i-heroicons-x-mark" size="xs"
                        @click="clearSearch" />
                </template>
            </UInput>
        </div>

        <!-- Filtro por status -->
        <USelectMenu v-model="statusFilter" :options="statusOptions" option-attribute="label" value-attribute="value"
            :loading="isLoading" class="w-full md:w-48">
            <template #leading>
                <Icon name="i-heroicons-funnel" />
            </template>
        </USelectMenu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApprovalStore } from '~/stores/approvals'

const approvalsStore = useApprovalStore()

const searchQuery = computed({
    get: () => approvalsStore.searchQuery,
    set: (value: string) => approvalsStore.setSearchQuery(value),
})

const statusFilter = computed({
    get: () => approvalsStore.statusFilter,
    set: (value: "ALL" | "PENDING" | "APPROVED") => approvalsStore.setStatusFilter(value),
})

const isLoading = computed(() => approvalsStore.isLoading)

const statusOptions = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Pendentes', value: 'PENDING' },
    { label: 'Aprovados', value: 'APPROVED' },
]

function clearSearch() {
    searchQuery.value = ''
}
</script>