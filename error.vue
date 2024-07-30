<template>
    <div class="pt-[80px]">
        <n-result
            status="500"
            title="Error message"
            :description="error.message"
        >
            <template #footer>
            <n-button @click="handleError">Back to the Home</n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup>
import {
    NResult,
    NButton
} from "naive-ui"

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>