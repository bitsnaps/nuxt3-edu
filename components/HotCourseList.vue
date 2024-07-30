<template>
    <section class="bg-white shadow rounded mb-5">
        <div class="p-3 border-b">
            <h4>Recommended</h4>
        </div>
        <div class="p-3">
            <CourseList v-for="(item,index) in data" :key="index" :item="item" />
        </div>
    </section>
</template>
<script setup>
    let {
        data
    } = await useHotCourseListApi()
</script>