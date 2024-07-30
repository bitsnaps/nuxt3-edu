<template>
    <div class="flex justify-center">
        <n-card class="w-[450px] mb-10">
            <ClientOnly>
                <n-alert v-if="ispay" title="payment successful" type="success" class="mb-2">
                    Redirecting...
                </n-alert>
                <n-alert v-else-if="isTimeOut" title="Payment timed out" type="error" class="mb-2">
                    Please refresh the page and pay again
                </n-alert>
                <h4 class="text-xl mb-2">WeChat Pay</h4>
                <p class="text-sm text-gray-500 flex">
                    The QR code will expire in <TimeBox 
                    class="text-rose-500" 
                    :expire="30" 
                    @end="handleTimeOut"/> Please refresh the page to get it again after expiration.
                </p>
                <h5 class="flex justify-center py-5">
                    Total payment:
                    <Price :value="data.price"/>
                </h5>
                <!-- QR code component -->
                <QrCode :data="data.code_url" v-if="data.code_url"/>
                <div class="flex justify-center items-center py-4 text-green-500">
                    <n-icon :size="35">
                        <ScanCircleOutline/>
                    </n-icon>
                    <div class="ml-3 text-gray-500 text-sm">
                        <p>Please scan using WeChat</p>
                        <p>Scan QR code to pay</p>
                    </div>
                </div>
            </ClientOnly>
        </n-card>
    </div>
</template>
<script setup>
    import {
        NCard,
        NAlert,
        NIcon
    } from "naive-ui"

    import {
        ScanCircleOutline
    } from "@vicons/ionicons5"

    // // Simulation response results
    // const data = {
    //     "price": "10.00", 
    //     "code_url": "weixin://wxpay/bizpayurl?pr=QdPmZtyzz" 
    // }

    const route = useRoute()
    const { no } = route.query

    // Initiate WeChat PC payment
    const {
        data,
        error
    } = await useWxpayApi(no)

    // Payment timeout
    const isTimeOut = ref(false)
    function handleTimeOut(){
        isTimeOut.value = true
    }

    // Start polling order status
    const ispay = ref(false)
    const timer = ref(null)
    function checkIspay(){
        if(timer.value) clearInterval(timer.value)
        timer.value = setInterval(() => {
            useGetWxpayStatusApi(no).then(res=>{
                if(!res.error.value && res.data.value.trade_state == "SUCCESS"){
                    handleSuccess()
                }
            })
        }, 2000);
    }

    if(!error.value){
        checkIspay()
    }

// Payment successfully processed
function handleSuccess(){
    ispay.value = true
    if(timer.value) clearInterval(timer.value)
    setTimeout(() => {
        navigateTo("/user/buy/1",{ replace:true })
    }, 2000);
}
</script>