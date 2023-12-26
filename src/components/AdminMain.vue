<template>
    <!-- <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

        </div>
    </div> -->
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { getAllNotes } from '@/api/user'
import { showMessage} from '@/utils/message'
const notes = reactive({ list: [] });
onMounted(() => {
    getAllNotes().then((res) => {
            console.log(res)
            // 判断是否成功
            if (res.code === 200 || res.code === 201) {
                notes.list = res.notes
                console.log(res.data)
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示消息
                // showMessage(message, 'error')
                console.log(message)
            }
        })
})
</script>