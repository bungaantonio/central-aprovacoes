<template>
    <UCard class="flex justify-between items-center">
        <div>
            <h3 class="font-bold">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">{{ item.type }}</p>
            <UBadge :color="item.status === 'APPROVED' ? 'green' : 'gray'" variant="subtle">
                {{ item.status }}
            </UBadge>
        </div>

        <div class="flex items-center gap-3">
            <UCheckbox :model-value="selected" :disabled="item.status === 'APPROVED'"
                @update:model-value="() => store.toggleSelection(item.id)" />
            <UButton label="Aprovar" size="sm" :disabled="item.status === 'APPROVED'" @click="store.approve(item.id)" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
import { useApprovalsStore } from '~/stores/approvals'

const props = defineProps<{
    item: { id: number, name: string, type: string, status: string }
}>()

const store = useApprovalsStore()
const selected = computed(() => store.isSelected(props.item.id))
</script>
