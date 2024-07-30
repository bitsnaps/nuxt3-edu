<template>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="phone">
            <n-input v-model:value="form.phone" placeholder="Phone number"/>
        </n-form-item>
        <n-form-item :show-label="false" path="code">
            <n-input-group>
                <n-input :style="{ width: '75%' }" v-model:value="form.code" placeholder="Verification Code"/>
                <SendCode :phone="form.phone"/>
            </n-input-group>
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input v-model:value="form.password" placeholder="Password" type="password"/>
        </n-form-item>
        <n-form-item :show-label="false" path="repassword">
            <n-input v-model:value="form.repassword" placeholder="Confirm Password" type="password" :disabled="!form.password"/>
        </n-form-item>
        <div class="flex justify-between w-full mb-2">
            <n-button quaternary type="primary" size="tiny" @click="$router.go(-1)">
                Login
            </n-button>
        </div>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                Reset Password
            </n-button>
        </div>
    </n-form>
</template>
<script setup>
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NInputGroup,
    createDiscreteApi
} from "naive-ui"
const router = useRouter()
useHead({ title:"Forget the password" })

const formRef = ref(null)
const form = reactive({
    phone:"",
    code:"",
    password:"",
    repassword:""
})

const rules = {
    phone:[{
        required: true,
        message:'Mobile phone number is required'
    }],
    code:[{
        required: true,
        message:'Verification code required'
    }],
    password:[{
        required: true,
        message:"Password required"
    }],
    repassword:[{
        required: true,
        message:"Confirm Password Required"
    },{
        validator(rule, value) {
            return value === form.password
        },
        message:"The two passwords you entered do not match.",
        trigger: ["input", "blur"]
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
        } = await useForgetApi(form)

        loading.value = false

        if(error.value) return

        const { message } = createDiscreteApi(["message"])

        message.success("Password reset successful")

        router.go(-1)
    })
}

useEnterEvent(()=>onSubmit())

definePageMeta({
    title:"Forget the password",
    layout:"login",
    middleware:["only-visitor"]
})

</script>