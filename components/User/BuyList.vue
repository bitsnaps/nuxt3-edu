<template>
    <UiCard>
        <UiCardHeader class="flex justify-between">
            <span>Order time:{{ item.created_time }}</span>
            <span>Order No.:{{ item.no }}</span>
        </UiCardHeader>
        <UiCardBody>{{ item.goods }}</UiCardBody>
        <UiCardFooter class="flex justify-start">
            <span v-if="item.type != 'default'">[{{ t[item.type] }}]</span>
            <Price :value="item.price"/>
            <span class="ml-auto" :class="{ 'text-green-600':(item.status === 'success') }">
                {{ s[item.status] }}
            </span>
            <n-button type="primary" size="small" class="ml-3" v-if="item.status === 'pendding'" @click="pay">
                Pay now
            </n-button>
        </UiCardFooter>
    </UiCard>
</template>
<script setup>
import {
    NButton
} from "naive-ui"
const props = defineProps({
    item:Object
})

const s = {
    closed:"closed",
    success:"Successful payment",
    pendding:"Waiting for payment",
    grouping:"In group"
}

const t = {
    group:"Group Buying",
    flashsale:"Flash Sale"
}

const pay = ()=>{
    navigateTo(`/pay?no=${props.item.no}`)
}

</script>