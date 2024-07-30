<template>
    <UiCard>
        <UiCardHeader class="flex justify-between">
            <span>{{ item.testpaper.title }}</span>
            <span :class="item.answer_status ? 'text-green-600' : 'text-rose-600'">{{ item.answer_status ? 'Exam completion' : 'During the exam' }}</span>
        </UiCardHeader> 
        <UiCardBody>
            <small class="mr-3">Total number of questions:{{ item.testpaper.question_count }}</small>
            <small class="mr-3">Total score:{{ item.testpaper.total_score }}</small>
            <small class="mr-3">Passing score:{{ item.testpaper.pass_score }}</small>
        </UiCardBody>
        <UiCardFooter class="flex justify-between">
            <span>{{ item.created_time }}</span>
            <span>
                Final score:
                <span :class="item.read_status ? 'text-green-600' : 'text-rose-600'">
                    {{ item.read_status ? item.score : 'Marking' }}
                </span>
            </span>
        </UiCardFooter>
    </UiCard>
</template>
<script setup>
const props = defineProps({
    item:Object
})
</script>