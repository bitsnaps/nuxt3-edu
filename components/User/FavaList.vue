<template>
    <div class="border flex p-3 mb-5 items-center">
        <n-tag :bordered="false" type="info" size="small" class="mr-2">
            {{ t[item.type] }}
        </n-tag>
        <n-image :src="item.goods.cover" class="w-[40px] rounded mr-2"/>
        <span class="text-gray-500 text-sm">{{ item.goods.title }}</span>
        <n-button class="ml-auto mr-3" type="primary" size="tiny" @click="open">View</n-button>
        <n-button type="error" size="tiny" @click="deleteItem" :loading="loading">Remove</n-button>
    </div>
</template>
<script setup>
import {
    NTag,
    NImage,
    NButton,
    createDiscreteApi
} from "naive-ui"
const props = defineProps({
    item:Object
})

const open = ()=>{
    navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`)
}

const t = {
    course:"Course",
    book:"E-book",
    column:"Column",
    live:"Live streaming"
}

const emit = defineEmits(["delete"])
const loading = ref(false)
const deleteItem = ()=>{
    const { dialog,message } = createDiscreteApi(["dialog","message"])
    dialog.warning({
        content: "Do you want to delete this collection?",
        positiveText: "OK",
        negativeText: "Cancel",
        onPositiveClick: async () => {
            const { item } = props
            loading.value = true
            emit("delete",{
                goods_id:item.goods.id,
                type:item.type,
                success(){
                    message.success('Successfully deleted')
                    loading.value = false
                },
                fail(){
                    loading.value = false
                }
            })
        },
    });
}
</script>
