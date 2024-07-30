<template>
    <div class="test-item">
        <div class="title">
            No.{{ index + 1 }}题 {{ typeOptions[item.type] }}
        </div>
        <div class="p-4">
            <!-- Title content -->
            <p class="mb-5" v-html="item.title"></p>

            <!-- Title Options -->
            <div v-if="item.type == 'radio' || item.type == 'trueOrfalse' || item.type == 'checkbox'">
                <p class="tip">Answers: </p>
                <ul>
                    <li class="option" v-for="(q,qI) in item.options" :key="qI"
                    @click="handleChooseOption(qI)"
                    :class="{ active:isActive(qI) }">
                        <span class="mr-2">{{ en[qI] }}</span>
                        <div v-html="q"></div>
                    </li>
                </ul>
            </div>

            <!-- fill a job vacancy -->
            <div v-else-if="item.type == 'completion'">
                <div class="mb-3 border rounded p-3"
                v-for="(uv,uvI) in modelValue" :key="uvI">
                    <div class="flex items-center justify-between mb-3">
                        <h5 class="text-sm">Fill in a blank {{ uvI + 1 }}</h5>
                        <n-icon v-if="uvI > 0" @click="remove(uvI)">
                            <Close/>
                        </n-icon>
                    </div>
                    <n-input
                        v-model:value="modelValue[uvI]"
                        type="textarea"
                        :placeholder="'Fill in the blank ' + (uvI + 1)"
                    />
                </div>

                <n-button type="primary" dashed class="w-full my-3" @click="add">
                    Add fill-in
                </n-button>

            </div>

            <!-- Questions and Answers -->
            <div v-else>
                <div class="mb-3 border rounded p-3">
                    <n-input
                        v-model:value="modelValue[0]"
                        type="textarea"
                        placeholder="Please fill in the content"
                    />
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
    import {
        NIcon,
        NInput,
        NButton,
        createDiscreteApi
    } from "naive-ui"

    import {
        Close
    } from "@vicons/ionicons5"

    
    const props = defineProps({
        item:Object,
        index:Number
    })

    const modelValue = ref(props.item.user_value)

    // Remove fill
    function remove(i){
        const { dialog } = createDiscreteApi(["dialog"])
        dialog.warning({
            content:"Do you want to delete this fill-in?",
            positiveText:"OK",
            negativeText:"Cancel",
            onPositiveClick(){
                modelValue.value.splice(i,1)
            }
        })
    }

    // Add fill-in
    function add(){
        modelValue.value.push("")
    }

    // Single choice/multiple choice selected
    function isActive(v){
        const { item } = props
        if(item.type == "radio" || item.type == "trueOrfalse"){
            return modelValue.value == v
        }
        return modelValue.value.includes(v)
    }

    function handleChooseOption(val){
        const { item } = props
        if(item.type == "radio" || item.type == "trueOrfalse"){
            modelValue.value = modelValue.value == val ? -1 : val
        } else {
            let i = modelValue.value.findIndex(v=>v == val)
            if(i == -1){
                modelValue.value.push(val)
            } else {
                modelValue.value.splice(i,1)
            }
        }
    }

    // Question Type
    const typeOptions = {
        answer:"Questions and Answers",
        completion:"Fill in the Blanks",
        trueOrfalse:"True or False",
        checkbox:"Multiple Choice",
        radio:"Multiple choice questions"
    }

    // Option conversion
    const en = {
        0:"A",
        1:"B",
        2:"C",
        3:"D",
        4:"E",
        5:"F",
        6:"G",
    }

    // Listening for value changes
    const emit = defineEmits(["change"])
    watch(modelValue,(newVal)=>{
        emit("change",unref(newVal))
    },{
        deep:true
    })

</script>
<style>
    .test-item{
        @apply shadow rounded mb-5;
    }

    .test-item .title{
        @apply bg-gray-100 p-4 border-b text-sm;
    }

    .test-item .tip {
        @apply text-xs mb-3 text-gray-500;
    }

    .test-item .option {
        transition: all 0.2s;
        @apply flex border p-2 rounded text-sm mb-2 cursor-pointer hover:(!border-light-blue-500 !bg-light-blue-50 text-light-blue-600) active:(!bg-light-blue-200);
    }
    
    .test-item .active {
        @apply !border-light-blue-500 !bg-light-blue-50 text-light-blue-600;
    }
</style>