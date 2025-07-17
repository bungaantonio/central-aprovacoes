<template>
    <div class="container mx-auto p-6 max-w-6xl">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Central de Aprovações</h1>
        </div>


        <!-- Busca e filtros -->
        <SearchAndFilters />

        <!-- Ações em massa -->
        <div class="flex justify-between items-center mb-6">
            <div class="flex gap-2">
                <UButton v-if="pendingSelectedItems.length > 0" color="success" :loading="isLoading"
                    @click="handleBulkApproveClick">
                    <template #leading>
                        <Icon name="i-heroicons-check" />
                    </template>
                    Aprovar Selecionados ({{ pendingSelectedItems.length }})
                </UButton>

                <UButton v-if="selectedItems.length > 0" variant="outline" color="neutral" @click="clearSelection">
                    <template #leading>
                        <Icon name="i-heroicons-x-mark" />
                    </template>
                    Limpar Seleção
                </UButton>
            </div>

            <UButton variant="outline" color="error" @click="clearLocalStorage" :disabled="isLoading">
                <template #leading>
                    <Icon name="i-heroicons-trash" />
                </template>
                Limpar Dados
            </UButton>
        </div>

        <!-- Estado de carregamento -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="text-center">
                <Icon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p class="text-gray-500">Carregando aprovações...</p>
            </div>
        </div>

        <!-- Lista de itens -->
        <div v-else-if="filteredItems.length > 0" class="space-y-4">
            <ApprovalItem v-for="item in filteredItems" :key="item.id" :item="item"
                :selected="selectedItems.includes(item.id)" @toggle-selection="handleSelection" />
        </div>

        <!-- Estado vazio -->
        <div v-else class="text-center py-12">
            <Icon name="i-heroicons-document-magnifying-glass" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p class="text-gray-500">
                {{ approvalsStore.searchQuery
  ? 'Tente ajustar sua busca.'
  : 'Não há itens para aprovação no momento.' }}

            </p>
        </div>

        <!-- Modal de confirmação com Nuxt UI -->
        <BulkApproveModal v-model="showModal" :selected-count="pendingSelectedItems.length" :loading="bulkLoading"
            @confirm="confirmBulk" @cancel="cancelBulk" />

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useApprovalStore } from '~/stores/approvals'

import ApprovalItem from '~/components/ApprovalItem.vue'
import BulkApproveModal from '~/components/BulkApproveModal.vue'
import SearchAndFilters from '~/components/SearchBox.vue'

const approvalsStore = useApprovalStore()
const selectedItems = ref<number[]>([])
const showModal = ref(false)
const bulkLoading = ref(false)

const isLoading = computed(() => approvalsStore.isLoading)
const filteredItems = computed(() => approvalsStore.filteredItems)

const pendingSelectedItems = computed(() => {
    return selectedItems.value.filter(id => {
        const item = approvalsStore.items.find(i => i.id === id)
        return item?.status === 'PENDING'
    })
})

// Buscar dados ao montar
onMounted(async () => {
    await approvalsStore.fetchApprovals()
})

// Limpar seleção quando a lista mudar
watch(() => approvalsStore.filteredItems, () => {
    selectedItems.value = []
})

function handleSelection(id: number) {
    const idx = selectedItems.value.indexOf(id)
    if (idx === -1) selectedItems.value.push(id)
    else selectedItems.value.splice(idx, 1)
}

function clearSelection() {
    selectedItems.value = []
}

function handleBulkApproveClick() {
    if (pendingSelectedItems.value.length > 0) {
        showModal.value = true
    }
}

function cancelBulk() {
    showModal.value = false
}

async function confirmBulk() {
    bulkLoading.value = true
    try {
        // simula delay de API
        await new Promise(resolve => setTimeout(resolve, 1000))
        await approvalsStore.bulkApprove(pendingSelectedItems.value)
        selectedItems.value = []
        showModal.value = false
    } catch (error) {
        console.error('Erro ao aprovar itens:', error)
    } finally {
        bulkLoading.value = false
    }
}

function clearLocalStorage() {
    approvalsStore.clearStorage()
    approvalsStore.fetchApprovals()
}
</script>