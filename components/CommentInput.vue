<template>
    <div class="p-5">
        <ClientOnly>
            <n-form :model="form" ref="formRef" :rules="rules" :show-label="false">
                <n-form-item path="content">
                    <n-input
                        v-model:value="form.content"
                        type="textarea"
                        placeholder="Say a few words~"
                    />
                </n-form-item>
                <n-form-item>
                    <div class="flex justify-end w-full">
                        <n-button type="primary" size="small" @click="submit" :loading="loading">回复</n-button>

                        <n-button v-if="showCancel" size="small" class="ml-2" @click="emit('cancel')">Cancel</n-button>
                    </div>
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
        NButton,
        createDiscreteApi
    } from "naive-ui"

    const props = defineProps({
        post_id:[String,Number],
        showCancel:{
            type:Boolean,
            default:false
        },
        reply_id:{
            type:[String,Number],
            default:0
        },
        reply_user:Object
    })

    const form = reactive({
        content:""
    })
    const formRef = ref(null)

    const rules = {
        content:[{
            required:true,
            message:"Comment content is required"
        }]
    }

    const emit = defineEmits(["success","cancel"])
    const loading = ref(false)
    function submit(){
        formRef.value.validate(errors=>{
            if(errors) return
            useHasAuth(async ()=>{
                loading.value = true

                let d = {
                    "post_id": parseInt(props.post_id), //Post ID
                    "content": form.content, 
                    "reply_id": 0
                }

                if(props.reply_id != 0){
                    d.reply_id = props.reply_id
                    d.reply_user = props.reply_user
                }

                const {
                    data,
                    error
                } = await useReplyPostApi(d)

                loading.value = false

                if(error.value) return

                if(props.showCancel) emit("cancel")

                // Comment successfully, notify the parent component to refresh data
                emit("success",data.value)

                const { message } = createDiscreteApi(["message"])
                message.success("Comment Success")

                form.content = ""

            })
        })
    }

</script>