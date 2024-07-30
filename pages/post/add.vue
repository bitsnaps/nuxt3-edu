<template>
    <div class="flex justify-center">
        <ClientOnly>
            <n-form :model="form" ref="formRef" :rules="rules" :show-label="false"
            style="width: 600px;">
                <n-form-item path="bbs_id">
                    <n-select class="w-full" v-model:value="form.bbs_id" placeholder="Please select a community" :options="options" clearable value-field="id" label-field="title"/>
                </n-form-item>
                <div class="bg-white rounded p-5 mb-5 shadow"
                v-for="(item,index) in form.content" :key="index">
                    <div v-if="index > 0" class="flex justify-end mb-2">
                        <n-button size="small" @click="removeBlock(index)">
                            <n-icon>
                                <Close/>
                            </n-icon>
                        </n-button>
                    </div>

                    <n-form-item>
                        <n-input
                            v-model:value="item.text"
                            type="textarea"
                            placeholder="Please fill in the post content"
                        />
                    </n-form-item>

                    <n-form-item>
                        <Uploader v-model="item.images" :max="9"/>
                    </n-form-item>
                </div>

                <n-form-item>
                    <n-button type="info" dashed class="w-full" @click="addBlock">
                        Add Block
                    </n-button>
                </n-form-item>

                <n-form-item>
                    <n-button type="primary" class="ml-auto" :loading="loading" @click="onSubmit">Publish</n-button>
                </n-form-item>
            </n-form>
        </ClientOnly>
    </div>
</template>
<script setup>
    import {
        NForm,
        NFormItem,
        NInput,
        NSelect,
        NIcon,
        NButton,
        createDiscreteApi
    } from "naive-ui"

    import {
        Close
    } from "@vicons/ionicons5"

    const {
        data:bbsData
    } = await useBbsListApi()

    const options = computed(()=>bbsData.value ? bbsData.value.rows : [])

    const formRef = ref(null)
    const form = reactive({
        bbs_id:null,
        content:[{
            text:"",
            images:[]
        }]
    })
    const rules = {
        bbs_id:[{
            required:true,
            message:"Please select a community"
        }]
    }


    // Add Block
    function addBlock(){
        form.content.push({
            text:"",
            images:[]
        })
    }

    // Remove Block
    function removeBlock(index){
        const { dialog,message } = createDiscreteApi(["dialog","message"])
        dialog.warning({
            content:"Do you want to delete this block?",
            positiveText:"Sure",
            negativeText:"Cancel",
            onPositiveClick(){
                form.content.splice(index,1)
                message.success("Successfully deleted")
            }
        })
    }

    const loading = ref(false)
    function onSubmit(){
        formRef.value.validate(async errors => {
            const { message } = createDiscreteApi(["message"])
            if(errors || (form.content.filter(o=>o.text.trim() == '')).length > 0){
                return message.warning("Please check if the post content is empty")
            }

            loading.value = true

            const {
                data,
                error
            } = await useAddPostApi(form)

            loading.value = false

            if(error.value) return 

            message.success("Post successfully")

            navigateTo("/bbs/0/1")

        })
    }


    definePageMeta({
        middleware:["auth"]
    })
</script>