<template>
    <UiCard>
        <UiCardHeader>
            <span class="mb-2 text-xs text-gray-400">Learning progress</span>
            <n-progress type="line" :percentage="item.progress" :show-indicator="false" />
        </UiCardHeader>
        <UiCardBody class="flex">
            <n-tag size="small" v-if="route.query.tab != 'column'">{{ t[item.type] }}</n-tag>
            <span class="ml-3">{{ item.title }}</span> 
            <n-button type="primary" size="tiny" class="ml-auto" @click="open">Continue watching</n-button>
        </UiCardBody>
    </UiCard>
</template>
<script setup>
import {
    NProgress,
    NButton,
    NTag 
} from "naive-ui"
const route = useRoute()

const props = defineProps({
    item:Object
})

const t = {
    audio:"Audio",
    video:"Video",
    media:"Graphics",
    column:"Column",
    book:"E-book",
    course:"Course"
}

const open = ()=>{
    navigateTo(`/detail/${route.query.tab}/${props.item.id}`)
}
</script>