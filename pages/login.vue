<template>
    <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
        <n-form-item :show-label="false" path="username">
            <n-input v-model:value="form.username" :placeholder="type === 'login' ? 'Username/Mobile/Email' : 'Username'" />
        </n-form-item>
        <n-form-item :show-label="false" path="password">
            <n-input v-model:value="form.password" placeholder="Username" type="password" />
        </n-form-item>
        <n-form-item v-if="type != 'login'" :show-label="false" path="repassword">
            <n-input v-model:value="form.repassword" placeholder="Confirm Password" type="password" />
        </n-form-item>
        <div class="flex justify-between w-full mb-2">
            <n-button quaternary type="primary" size="tiny" @click="changeType">
                {{ type === 'login' ? 'Register' : 'Login' }}
            </n-button>
            <nuxt-link to="/forget">
                <n-button quaternary type="primary" size="tiny">forget the password?</n-button>
            </nuxt-link>
        </div>
        <div>
            <n-button class="w-full" type="primary" @click="onSubmit" :loading="loading">
                {{ type === 'login' ? 'Login':'Register' }}
            </n-button>
        </div>
        <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
            Agree by registration
            <n-button quaternary type="primary" size="tiny">Service Agreement</n-button>
            and
            <n-button quaternary type="primary" size="tiny">Privacy Policy</n-button>
        </div>
    </n-form>
</template>
<script setup>
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    createDiscreteApi
} from "naive-ui"
const route = useRoute()
const type = ref("login")
const title = ref("Login")
useHead({ title })

const formRef = ref(null)
const form = reactive({
    username: "",
    password: "",
    repassword: ""
})

const rules = computed(() => {
    let r = {
        username: [{
            required: true,
            message: type.value === 'login' ? 'Username/Phone Number/Email Required' : 'Username Required'
        }],
        password: [{
            required: true,
            message: "Password required"
        }]
    }

    if (type.value != "login") {
        r.repassword = [{
            required: true,
            message: "Confirm Password Required"
        }, {
            validator(rule, value) {
                return value === form.password
            },
            message: "The two passwords you entered do not match.",
            trigger: ["input", "blur"]
        }]
    }

    return r
})

const changeType = () => {
    type.value = type.value === 'login' ? 'reg' : 'login'
    title.value = type.value == 'login' ? 'Login' : 'Register'
    route.meta.title = title.value
    form.username = ""
    form.password = ""
    form.repassword = ""
    formRef.value.restoreValidation()
}

const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate(async (errors) => {
        if (errors) return
        loading.value = true
        let {
            data,
            error
        } = type.value === 'login' ? await useLoginApi(form) : await useRegApi(form)

        loading.value = false

        if (error.value) return

        const { message } = createDiscreteApi(["message"])
        message.success(type.value === "login" ? "Login Successful" : "Registration Successful")

        if (type.value === "login") {
            // The token returned by the user's successful login is stored in the cookie, which indicates that the user has successfully logged in.
            const token = useCookie("token")
            token.value = data.value.token
            const user = useUser()
            user.value = data.value

            // Jump
            navigateTo(route.query.from || "/", { replace: true })
        } else {
            // Switch back to the login page
            changeType()
        }
    })
}

useEnterEvent(() => onSubmit())

definePageMeta({
    layout: "login",
    middleware: ["only-visitor"]
})
</script>