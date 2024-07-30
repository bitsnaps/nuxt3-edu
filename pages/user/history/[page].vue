<template>
    <div>
        <UiTab>
            <UiTabItem :active="type === item.value" v-for="(item,index) in tabs" :key="index" @click="handleClick(item.value)">{{ item.label }}</UiTabItem>
        </UiTab>

        <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length === 0">
            <div class="px-3">
                <UserHistoryList v-for="(item,index) in rows" :key="index" :item="item"/>
            </div>
            <div class="flex justify-center items-center mt-5 pb-10">
                <n-pagination size="large" :page="page" :item-count="total" :page-size="limit" :on-update:page="handlePageChange"/>
            </div>
        </LoadingGroup>

    </div>
</template>
<script setup>
import {
    NPagination
} from "naive-ui"
const route = useRoute()
const type = ref(route.query.tab || 'course') 
useHead({ title:"Learning Record" })

const tabs = [{
    label:"Course",
    value:"course"
},{
    label:"Column",
    value:"column"
}]

const handleClick = (t)=>{
    navigateTo({
        params:{
            ...route.params,
            page:1
        },
        query:{
            ...route.query,
            tab:t
        }
    })
}

const {
    page,
    limit,
    total,
    handlePageChange,
    rows,
    pending,
    error,
    refresh
} = await usePage(({ page,limit })=>useUserHistoryApi(()=>{
    return {
        page,
        type:type.value
    }
}))
</script>