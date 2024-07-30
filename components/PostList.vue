<template>
    <div class="border-b p-5">
       <div class="cursor-pointer text-gray-600" @click="open">
          <n-tag v-if="item.is_top" :bordered="false" type="success" size="small">Sticky</n-tag>
          {{ item.desc.text }}
       </div>
       <div class="mt-3 cursor-pointer" style="max-width:500px;" @click="open">
          <n-image v-for="(img,imgI) in item.desc.images" :key="imgI" 
          :src="img" 
          :width="item.desc.images.length == 1 ? 300 : 150"
          :height="item.desc.images.length == 1 ? 200 : 100"
          class="mr-3 mb-2 rounded"
          preview-disabled/>
       </div>
       <div class="flex mt-5">
            <n-button secondary strong size="tiny" class="mr-3"
            :type="item.issupport ? 'primary' : 'tertiary'"
            @click.stop="handleSupport(item)" :loading="supportLoading">
                <template #icon>
                    <n-icon><ThumbsUpSharp /></n-icon>
                </template>
                Like {{ item.support_count || '' }}
            </n-button>

            <n-button secondary strong size="tiny" class="mr-3">
                <template #icon>
                    <n-icon><ChatboxEllipsesOutline /></n-icon>
                </template>
                Comment(s) {{ item.comment_count || '' }}
            </n-button>
            <n-button text size="tiny" class="mr-3">author:{{ item.user.name }}</n-button>
            <n-button v-if="showDel" type="error" size="tiny" class="mr-3" @click="deleteItem" :loading="loading">
                Delete
            </n-button>
       </div>
    </div>
</template>
<script setup>
import {
    NTag,
    NImage,
    NButton,
    NIcon,
    createDiscreteApi
} from "naive-ui"
import {
    ThumbsUpSharp,
    ChatboxEllipsesOutline
} from "@vicons/ionicons5"

const props = defineProps({
    item:Object,
    showDel:{
        type:Boolean,
        default:true
    }
})

const {
    supportLoading,
    handleSupport
} = useHandleSupportPost()

const emit = defineEmits(["delete"])
const loading = ref(false)
const deleteItem = ()=>{
    const { dialog,message } = createDiscreteApi(["dialog","message"])
    dialog.warning({
        content: "Do you want to delete this post?",
        positiveText: "OK",
        negativeText: "Cancel",
        onPositiveClick: async () => {
            loading.value = true
            emit("delete",{
                id:props.item.id,
                success(){
                    message.success('Successfully deleted')
                    loading.value = false
                },
                fail(){
                    loading.value = false
                }
            })
        },
    });
}

const open = ()=>{
    navigateTo("/post_detail/"+props.item.id)
}
</script>