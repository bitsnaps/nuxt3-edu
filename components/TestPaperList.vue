<template>
    <section class="bg-white shadow p-5 rounded mb-5">
        <div class="flex justify-between">
            <h4>{{ item.title }}</h4>
            <small class="text-rose-500">duration:{{ item.expire }}minute</small>
        </div>
        <p class="py-5 text-gray-500 text-sm">
            Total number of questions:{{ item.question_count }} Total score:{{ item.total_score }} Passing score:{{ item.pass_score }}
        </p>
        <div class="flex justify-end">
            <n-button type="primary" @click="test" :disabled="item.is_test">{{ item.is_test ? 'Passed the exam' : 'Take the test now' }}</n-button>
        </div>
    </section>
</template>
<script setup>
    import {
        NButton,
        createDiscreteApi
    } from "naive-ui"

    const props = defineProps({
        item:Object
    })

    const test = ()=>{
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.create({
            content:"Do you want to take this exam?",
            positiveText:"Take the test now",
            negativeText:"Cancel",
            onPositiveClick(){
                navigateTo("/paper_test/"+props.item.id)
            }
        })
    }
</script>