<template>
    <n-button strong secondary :type="is_fava ? 'primary' : 'tertiary'" size="tiny" :loading="loading" @click="handleFava">
      Favorite
    </n-button>
</template>
<script setup>
    import {
        NButton,
        createDiscreteApi
    } from "naive-ui"

    const props = defineProps({
        isfava:{
            type:Boolean,
            default:false
        },
        goods_id:{
            type:Number,
            default:0
        },
        type:{
            type:String,
            default:"course"
        }
    })

    const is_fava = ref(props.isfava)

    const loading = ref(false)
    const handleFava = ()=>{
        // Login to save/Cancel
        useHasAuth(async ()=>{
            loading.value = true

            let data = {
                goods_id:props.goods_id,
                type:props.type
            }
            let {
                error
            } = is_fava.value ? (await useUncollectApi(data)) : (await useCollectApi(data))

            loading.value = false

            if(error.value) return

            const { message } = createDiscreteApi(["message"])

            message.success((is_fava.value ? "Remove from favorite" : "Favorite") + "success")

            is_fava.value = !is_fava.value

        })
    }
</script>