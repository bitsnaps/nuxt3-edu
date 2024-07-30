<template>
    <n-card class="coupon" :class="{ 'coupon-disabled': (btn != 'Use now')}">
        <h4>${{ item.price }}</h4>
        <p>Applicable {{ o[item.type] }}：{{ item.title }}</p>
        <p class="!text-xs mt-3">有效期：{{ item.start_time }} ~ {{ item.end_time }}</p>
        <template #footer>
            <div class="flex justify-end">
                <n-button :type="btn != 'Use now' ? '' : 'warning'"
                :disabled="btn != 'Use now'"
                @click="open">
                    {{ btn }}
                </n-button>
            </div>
        </template>
    </n-card>
</template>
<script setup>
import {
    NCard,
    NButton
} from "naive-ui"

const o = {
    course:"Course",
    column:"Column"
}

const props = defineProps({
    item:Object
})

const btn = computed(()=>{
    const v = props.item
    v.expired = (new Date(v.end_time)).getTime() < (new Date()).getTime()
    return v.used ? 'Used' : (v.expired ? 'Expired' : 'Use now')
})

const open = ()=>{
    const { item } = props
    navigateTo(`/createorder?id=${item.goods_id}&type=${item.type}`)
}

</script>
<style>
.coupon {
    @apply mb-5 bg-orange-500 !border-0;
}
.coupon h4 {
    @apply text-2xl mb-2 font-bold text-white;
}
.coupon p{
    @apply text-sm text-light-300;
}
.coupon-disabled {
    @apply !bg-gray-300;
}
</style>