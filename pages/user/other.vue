<template>
    <div class="p-5">
        <p class="text-sm text-gray-500">Other settings</p>
        <div class="flex py-5 border-b">
            Phone number: {{ user.phone }}
            <n-button quaternary type="primary" size="small" class="ml-auto" @click="goToBindPhone">
                Modify            </n-button>
        </div>
    </div>
</template>
<script setup>
    import {
        NButton
    } from "naive-ui"
    const user = useUser()
    const goToBindPhone = ()=>navigateTo("/bindphone")
</script>
