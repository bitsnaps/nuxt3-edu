<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="5">
            <ul class="center-menu">
                <li :class="{
                    'active':(item.name == activeName)
                }" v-for="(item,index) in menus" :key="index"
                @click="navigate(item)">
                    {{ item.title }}
                </li>
            </ul>
        </n-grid-item>
        <n-grid-item :span="19">
            <div class="bg-white rounded mb-10 !min-h-[75vh]">
                <NuxtPage :page-key="pageKey" />
            </div>
        </n-grid-item>
    </n-grid>
</template>
<script setup>
import { 
    NGrid,
    NGridItem
} from "naive-ui"
const route = useRoute()
const pageKey = computed(()=>route.fullPath)
const activeName = computed(()=>route.name)

const menus = [{
    title:"Learning Record",
    name:"user-history-page"
},{
    title:"Purchase History",
    name:"user-buy-page"
},{
    title:"我的考试",
    name:"user-test-page"
},{
    title:"My posts",
    name:"user-post-page"
},{
    title:"Coupon Record",
    name:"user-coupon-page"
},{
    title:"我的收藏",
    name:"user-fava-page"
},{
    title:"Modify information",
    name:"user-edit"
},{
    title:"Change Password",
    name:"user-password"
},{
    title:"Other settings",
    name:"user-other"
}]

const navigate = (item) => {
    navigateTo({
        name:item.name,
        params:{
            page:1
        }
    })
}

definePageMeta({
    middleware:["auth"]
})

</script>
<style>
.center-menu {
    @apply list-none bg-white rounded;
}
.center-menu li {
    @apply px-5 py-3 text-sm cursor-pointer hover:( bg-blue-50);
}
.center-menu .active {
    @apply font-bold text-blue-500 bg-gray-200;
}
</style>