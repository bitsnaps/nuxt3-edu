<template>
    <LoadingGroup :pending="pending" :error="error">
        <div v-if="data" v-html="data.content"></div>
    </LoadingGroup>
</template>
<script setup>
    const route = useRoute()
    const { id,book_id } = route.params

    const {
        data,
        error,
        pending
    } = await useBookDetailApi(book_id,id)

    // Modify the page title
    const title = computed(()=>data.value ? data.value.title : "E-book details page")
    useHead({ title })

    definePageMeta({
        middleware(to,from){
            const { id } = to.params
            if(isNaN(+id)){
                return abortNavigation("Page does not exist")
            }
            return true
        }
    })

</script>