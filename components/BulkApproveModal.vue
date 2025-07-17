<script setup lang="ts">
const props = defineProps<{
    selectedCount: number
    loading: boolean
    modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

function close() {
    isOpen.value = false
    emit('cancel')
}

function confirm() {
    emit('confirm')
}
</script>

<template>
    <UModal v-model:open="isOpen" title="Confirmar Aprovação em Massa">
        <template #body>
            <p class="text-gray-700">
                Tem certeza de que deseja aprovar os <strong>{{ props.selectedCount }}</strong> itens selecionados?
            </p>
        </template>

        <template #footer>
            <div class="flex justify-end gap-2">
                <UButton color="neutral" variant="outline" @click="close">
                    Cancelar
                </UButton>
                <UButton color="success" :loading="props.loading" @click="confirm">
                    Aprovar
                </UButton>
            </div>
        </template>
    </UModal>
</template>
