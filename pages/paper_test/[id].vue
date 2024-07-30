<template>
    <n-grid :x-gap="20">
        <n-grid-item :span="18">
            <n-card>
                <template #header>
                    <h3 class="text-center font-bold">{{ data.title }}</h3>
                    <n-divider />
                    <p class=" space-x-5 text-sm text-center">
                        <span>Total number of questions:{{ data.testpaper_questions.length }}</span>
                        <span>Total score:{{ data.total_score }}</span>
                        <span>Time:{{ data.expire }}minute</span>
                    </p>
                </template>

                <!-- Title Components -->
                <PaperTestItem v-for="(item,index) in testpaper_questions" :key="index" :item="item" :index="index"
                @change="handleUserValueChange(item,$event)"
                :id="'question_'+index"/>

            </n-card>
        </n-grid-item>
        <n-grid-item :span="6">
            <n-card>
                <template #header>
                    <div class="flex flex-col items-center justify-center">
                        <small class="text-gray-500 mb-1">剩余时间</small>
                        <TimeBox :expire="data.expire" class="text-3xl text-light-blue-600" @end="autoSubmit"/>
                    </div>
                </template>
                <n-grid :x-gap="12" :cols="4">
                    <n-grid-item v-for="(item,index) in testpaper_questions" :key="index">
                        <n-tag class="mb-2 w-full cursor-pointer flex items-center justify-center" :type="item.isTest ? 'success' : ''"
                        @click="scrollToDom(index)">{{ index + 1 }}</n-tag>
                    </n-grid-item>
                </n-grid>
                <n-divider />
                <div>
                    <n-button type="primary" class="w-full" @click="submit" :loading="loading">交 卷</n-button>
                </div>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>
<script setup>
import { onBeforeRouteLeave } from "vue-router"
import {
    NGrid,
    NGridItem,
    NButton,
    NTag,
    NCard,
    NDivider,
    createDiscreteApi
} from "naive-ui"

const route = useRoute()

let {
    data
} = await useReadTestpaperApi(route.params.id)

// List of topics
const testpaper_questions = computed(()=>{
    return data.value ? data.value.testpaper_questions.map(o=>{
        o.isTest = false
        return o
    }) : []
})

// Monitor title value changes
function handleUserValueChange(item,val){
    item.user_value = val
    updateIsTest()
}

// Check if the title is filled in
function updateIsTest(){
    testpaper_questions.value.forEach(item=>{
        let t = false
        // Questions and answers and fill-in-the-blanks
        if(item.type == 'answer' || item.type == 'completion'){
            t = !!item.user_value[0]
        }
        // Single Choice
        else if(item.type == 'radio' || item.type == 'trueOrfalse'){
            t = item.user_value != -1
        }
        // Multiple Selection
        else {
            t = item.user_value.length > 0
        }

        item.isTest = t
    })
}

// Scroll to the specified position
function scrollToDom(index){
    const dom = document.getElementById("question_"+index)
    window.scrollTo(0,dom.offsetTop)
}

// Prevent switching to other pages
const disableBack = ref(true)
onBeforeRouteLeave((to,from,next)=>{
    if(!disableBack.value){
        next()
    } else {
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.warning({
            content:"Do you want to give up the exam?",
            positiveText:"OK",
            negativeText:"Cancel",
            onPositiveClick(){
                disableBack.value = false
                navigateTo(to.fullPath || '/' ,{ replace:true })
            }
        })

        next(false)
    }
})

// 交卷
const loading = ref(false)
async function submit(){
    const { message } = createDiscreteApi(["message"])
    let l = (testpaper_questions.value.filter(v=>!v.isTest)).length
    if(l > 0){
        return message.warning("There are still some questions that have not been completed, please check")
    }

    loading.value = true

    const {
        data:submitData,
        error:submitError
    } = await useSubmitTestApi({
        user_test_id:data.value.user_test_id,
        value:testpaper_questions.value.map(o=>o.user_value)
    })

    loading.value = false

    if(submitError.value) return

    // Set disableBack to false before jumping
    disableBack.value = false
    message.success("Successfully submitted")
    navigateTo("/paper/1",{ replace:true })

}

// 自动交卷
function autoSubmit(){
    const { dialog } = createDiscreteApi(["dialog"])
    dialog.success({
        content:"The exam time is up and the test paper has been submitted compulsorily",
        positiveText:"confirm",
        closable:false,
        onPositiveClick(){
            disableBack.value = false
            navigateTo("/paper/1",{ replace:true })
        }
    })
}

definePageMeta({
    middleware:["auth"]
})

</script>
