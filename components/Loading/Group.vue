<template>
    <div>
        <template v-if="loading">
            <slot name="loading">
                <LoadingSkeleton/>
            </slot>
        </template>
        <template v-else-if="error">
            <n-result class="mt-10" status="500" title="Error message" 
            :description="error?.data?.data || 'The page is lost~'">
                <template #footer>
                    <n-button @click="$router.go(-1)">Go back to previous page</n-button>
                </template>
            </n-result>
        </template>
        <template v-else-if="isEmpty">
            <Empty/>
        </template>
        <template v-else>
            <slot />
        </template>
    </div>
</template>
<script setup>
import { onBeforeUnmount } from "vue";
import {
    NButton,
    NResult
} from "naive-ui"
const props = defineProps({
    pending: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Boolean, Symbol],
        default: false
    },
    isEmpty:{
        type:Boolean,
        default:false
    }
})

const loading = ref(false)
const stop = watchEffect(()=>{
    if(props.pending && !loading.value){
        loading.value = true
    } else {
        setTimeout(() => {
            loading.value = false
        }, 200);
    }
})
onBeforeUnmount(()=>stop())
</script>