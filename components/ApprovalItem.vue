<template>
    <UCard class="hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between p-4">
            <!-- Seleção e informações -->
            <div class="flex items-center gap-4">
                <UCheckbox :model-value="selected" :disabled="isLoading || item.status === 'APPROVED'"
                    @update:model-value="$emit('toggle-selection', item.id)" />

                <div class="space-y-1">
                    <div class="font-medium text-lg">{{ item.name }}</div>
                    <div class="text-sm text-gray-500">{{ item.type }}</div>
                    <div v-if="item.description" class="text-sm text-gray-400">{{ item.description }}</div>

                </div>
            </div>

            <div class="flex items-center gap-3">
                <!-- Status badge -->
                <UBadge :color="item.status === 'APPROVED' ? 'success' : 'neutral'"
                    :variant="item.status === 'APPROVED' ? 'solid' : 'soft'">
                    {{ item.status === 'APPROVED' ? 'Aprovado' : 'Pendente' }}
                </UBadge>

                <!-- Botão individual -->
                <UButton v-if="item.status === 'PENDING'" color="success" variant="outline" size="sm" :loading="isLoading"
                    :disabled="isLoading" @click="approveItem">
                    <template #leading>
                        <Icon name="i-heroicons-check" />
                    </template>
                    Aprovar
                </UButton>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApprovalStore } from '~/stores/approvals'

const props = defineProps<{
    item: {
        id: number
        name: string
        type: string
        status: 'PENDING' | 'APPROVED'
        createdAt?: string
        description?: string
    },
    selected: boolean
}>()

const emit = defineEmits<{
    (e: 'toggle-selection', id: number): void
}>()

const approvalsStore = useApprovalStore()
const isLoading = ref(false)

async function approveItem() {
    isLoading.value = true
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    await approvalsStore.approveItem(props.item.id)
    isLoading.value = false
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR')
}
</script>