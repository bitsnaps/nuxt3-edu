<template>
    <div class="p-5">
        <n-form ref="formRef" :model="form" :rules="rules" label-width="80" label-placement="left">
        <n-form-item label="Current Password" path="opassword">
            <n-input v-model:value="form.opassword" placeholder="Current Password" type="password"/>
        </n-form-item>
        <n-form-item label="New Password" path="password">
            <n-input v-model:value="form.password" placeholder="New Password" type="password"/>
        </n-form-item>
        <n-form-item label="Confirm Password" path="repassword">
            <n-input v-model:value="form.repassword" placeholder="Confirm Password" type="password" :disabled="!form.password"/>
        </n-form-item>
        <div class="flex justify-end">
            <n-button type="primary" @click="onSubmit" :loading="loading">
                Change Now
            </n-button>
        </div>
    </n-form>
    </div>
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
useHead({ title:"Change Password" })

const formRef = ref(null)
const form = reactive({
    opassword:"",
    password:"",
    repassword:""
})

const rules = {
    phone:[{
        required: true,
        message:'Phone number is required'
    }],
    code:[{
        required: true,
        message:'Verification code is required'
    }],
    password:[{
        required: true,
        message:"Password is required"
    }],
    repassword:[{
        required: true,
        message:"Confirm password is required"
    },{
        validator(rule, value) {
            return value === form.password
        },
        message:"The two passwords do not match",
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
        } = await useupdatePasswordApi(form)

        loading.value = false

        if(error.value) return

        const { message } = createDiscreteApi(["message"])

        message.success("Password changed successfully")

        // Log out
        await useLogout()
    })
}

useEnterEvent(()=>onSubmit())

definePageMeta({
    title:"Change Password"
})
</script>