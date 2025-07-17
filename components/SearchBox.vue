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


const isLoading = computed(() => approvalsStore.isLoading)


function clearSearch() {
    searchQuery.value = ''
}
</script>