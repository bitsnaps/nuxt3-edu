<template>
    <LoadingGroup :pending="pending" :error="error">
        <n-card class="createorder">
            <h4>Product Information</h4>
            <div class="flex mb-5">
                <n-image :src="data.cover"
                    class="rounded flex-shrink-0 " 
                    :class="type == 'book' ? 'w-[100px] h-[140px]' : 'w-[180px] h-[100px]'"/>
                <div class="flex flex-1 ml-4 flex-col">
                    <h5 class="flex text-gray-600 text-xl">
                        {{ data.title }}
                        <Price :value="data.price" class="ml-auto" />
                    </h5>
                    <div class="mt-auto" v-if="type == 'course'">
                        <n-tag :bordered="false" size="small">
                            {{ t[data.type] }}
                        </n-tag>
                    </div>
                </div>
            </div>
            <h4>Coupons</h4>
            <n-grid :x-gap="20" :cols="4" class="mb-3">
                <n-grid-item v-for="(item,index) in couponData.rows" :key="index">
                    <n-button strong secondary 
                    :type="user_coupon_id == item.id ? 'warning' : 'tertiary'"
                    @click="chooseCoupon(item)">
                    ￥{{ item.price }} Coupon
                    </n-button>
                </n-grid-item>
            </n-grid>
            <div v-if="couponData.count == 0" class="text-gray-400 text-sm mb-5">
                No coupons available
            </div>
            <h4>Payment Method</h4>
            <div class="flex mb-5">
                <span class="wxpay">
                    <n-icon>
                        <LogoWechat />
                    </n-icon>
                    <b>WeChat Pay</b>
                </span>
            </div>

            <div class="flex items-center mb-5">
                <small class="text-red-500 mr-auto">Please complete the payment within 30 minutes</small>
                <span v-if="user_coupon_id">Coupon deduction <b class="text-red-500">{{ coupon_price }}</b> yuan，</span>
                Amount to pay <Price :value="price" />
            </div>

            <div class="flex justify-end">
                <n-button type="primary" @click="submit" :loading="loading">Confirm Payment</n-button>
            </div>

        </n-card>
    </LoadingGroup>
</template>
<script setup>
import {
    NCard,
    NTag,
    NImage,
    NIcon,
    NButton,
    NGrid,
    NGridItem
} from "naive-ui"
import {
    LogoWechat
} from "@vicons/ionicons5"

const t = {
    media:"Text and Image",
    audio:"Audio",
    video:"Video",
    column:"Column",
    book:"E-book",
    course:"Course"
}

const route = useRoute()
const { id, type } = route.query

// Get product information
const {
    data,
    pending,
    error
} = await useGetGoodsInfoApi(id, type)

// Get available coupons
const {
    data: couponData
} = await useGetUseableUserCouponApi(id, type)

// Select coupon
const user_coupon_id = ref(0)
const chooseCoupon = (item)=>{
    user_coupon_id.value = user_coupon_id.value == item.id ? 0 : item.id
}

// Coupon price
const coupon_price = computed(()=>{
    if(user_coupon_id.value == 0) return 0
    let c = couponData.value.rows.find(o=>o.id == user_coupon_id.value)
    return c ? c.price : 0
})

// Final price
const price = computed(()=>{
    let p = ((data.value.price * 1000 - coupon_price.value * 1000) / 1000).toFixed(2)
    return p <= 0 ? 0 : p
})


// Create order and initiate payment
const loading = ref(false)
async function submit(){
    loading.value = true

    let d = {}

    if(type == "course" || type == "column" || type == "book"){
        d = {
            goods_id:data.value.id,
            type
        }
        if(user_coupon_id.value){
            d.user_coupon_id = user_coupon_id.value
        }
    } else if(type == "flashsale"){
        d = {
            flashsale_id:id
        }
    }

    let {
        data:createOrderResult,
        error:createOrderError
    } = await useCreateOrderApi(d,type)

    loading.value = false

    if(createOrderError.value) return

    navigateTo(`/pay?no=${createOrderResult.value.no}`,{ replace:true })

}

definePageMeta({
    middleware:["auth","createorder"]
})

</script>
<style>
.createorder {
    @apply mb-5;
}

.createorder h4 {
    @apply font-semibold mb-3 text-gray-600;
}

.createorder .wxpay {
    @apply flex items-center justify-center border border-green-500 rounded py-3 text-sm text-green-600 w-[120px];
}
</style>