<template>
    <UiTab>
        <UiTabItem v-for="(item,index) in tabs" :key="index" :active="item.id == bbs_id" @click="handleClick(item.id)">{{ item.title }}</UiTabItem>
    </UiTab>
</template>
<script setup>
    const {
        data
    } = await useBbsListApi()

    const route = useRoute()

    // Current community category ID
    const bbs_id = ref(parseInt(route.params.bbs_id))

    const tabs = computed(()=>{
        return [
            {
                id:0,
                title:"all"
            },
            ...(data.value ? data.value.rows : [])
        ]
    })

    // Switch community category
    function handleClick(id){
        navigateTo({
            params:{
                ...route.params,
                bbs_id:id,
                page:1
            },
            query:{
                ...route.query
            }
        })
    }
</script>