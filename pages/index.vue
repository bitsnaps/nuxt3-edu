<template>
  <LoadingGroup :pending="pending" :error="error">
    <div v-for="(item, index) in data" :key="index">
      <Banner :data="item.data" v-if="item.type == 'swiper'" />
      <ImageNav :data="item.data" v-else-if="item.type == 'icons'" />
      <ImageAd :data="item.data" v-else-if="item.type == 'imageAd'" />
      <ListCard
        :title="item.title"
        :data="item.data"
        v-else-if="item.type == 'list'"
      />
      <ListCard
        :title="item.title"
        :type="item.listType"
        :data="item.data"
        v-else-if="item.type == 'promotion'"
      />
    </div>
  </LoadingGroup>
</template>
<script setup>
useHead({
  title: "Disha Programming Home",
  meta: [
    { name: "description", content: "Home page description" },
    { name: "keywords", content: "Home Keywords" },
  ],
})

const { pending, data, refresh, error } = await useIndexDataApi()

// Direct error reporting on the server
if (process.server && error.value) {
  // throwError(error.value?.data?.data)
  // >=3.0.0 use throw createError alternative throwError
  throw createError(error.value)
}
</script>
