<template>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="phone">
            <n-input v-model:value="form.phone" placeholder="Phone number"/>
        </n-form-item>
        <n-form-item :show-label="false" path="code">
            <n-input-group>
                <n-input :style="{ width: '75%' }" v-model:value="form.code" placeholder="Verification code"/>
                <SendCode :phone="form.phone"/>
            </n-input-group>
        </n-form-item>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                Bind
            </n-button>
        </div>
    </n-form>
</template>
<script setup>
import {
    NForm,
    NFormItem,
    NInput,
    NInputGroup,
    NButton,
    createDiscreteApi
} from "naive-ui"

useHead({ title:"Bind Phone Number" })
const route = useRoute()
const formRef = ref(null)
const form = reactive({
    phone:"",
    code:""
})

const rules = {
    phone:[{
        required: true,
        message: 'Phone number is required'
    }],
    code:[{
        required: true,
        message:"Verification code is required"
    }]
}

const loading = ref(false)
const onSubmit = ()=>{
    formRef.value.validate(async (errors)=>{
        if(errors) return
        
        loading.value = true

        let {
            data,
            error
        } = await useBindPhoneApi(form)

        loading.value = false

        if(error.value) return

        const { message } = createDiscreteApi(["message"])
        message.success("Binding successful")

        navigateTo(route.query.from || '/',{ replace:true })

    })
}

useEnterEvent(()=>onSubmit())

definePageMeta({
    title:"Bind Phone Number",
    layout:"login"
})

</script>