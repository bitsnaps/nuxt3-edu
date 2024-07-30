<template>
    <n-card class="mb-5">
        <template #header>
            <div class=" text-gray-500 text-sm">
                {{ data.count }} People who are group buying can directly participate
            </div>
        </template>
        <n-scrollbar style="height: 60px;">
            <div class="flex items-center h-[60px] px-4"
            v-for="(item,index) in rows" :key="index">
                <n-avatar :size="45" 
                :src="item.users[0].avatar" round></n-avatar>
                <span class="ml-2">{{ item.users[0].nickname || item.users[0].username }}</span>
                <div class="ml-auto">
                    <p>Still bad <span class="text-rose-500">{{ item.total - item.num }} person(s)</span> spell</p>
                    <div class="text-xs text-gray-500 mt-1 flex items-center">
                        Remaining
                        <CountDown :time="item.end_time" @end="handleTimeUp(index)"/>
                    </div>
                </div>
                <n-button type="primary" size="small" class="ml-2" :loading="item.loading" @click="handleGroup(item)">Go to group</n-button>
            </div>
        </n-scrollbar>
    </n-card>
</template>
<script setup>
import {
    NCard,
    NScrollbar,
    NButton,
    NAvatar,
    createDiscreteApi
} from "naive-ui"

const props = defineProps({
    group_id:{
        type:Number,
        default:0
    }
})

let {
    data,
    error
} = await useGetGroupWorkListApi(props.group_id)

const rows = ref([])
if(!error.value){
    rows.value = data.value.rows.map(o=>{
        o.end_time = (new Date(o.created_time)).getTime() + 24 * 60 * 60 * 1000
        o.loading = false
        return o
    })
}

function handleTimeUp(index){
    rows.value.splice(index,1)
    data.value.count--
}

function handleGroup(item){
    useHasAuth(()=>{
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.success({
          title: "Tips",
          content: "Do you want to participate in this group order?",
          positiveText: "OK",
          negativeText: "Cancel",
          onPositiveClick(){
            item.loading = true
            useCreateOrderApi({
                group_id:props.group_id,
                group_work_id:item.id
            },"group")
            .then(res=>{
                if(!res.error.value){
                    navigateTo(`/pay?no=${res.data.value.no}`)
                }
            })
            .finally(()=>{
                item.loading = false
            })
          }
        })
    })
}

</script>
