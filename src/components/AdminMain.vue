<template>
    <div class="p-4 sm:ml-80">
        <div v-if="selectedNote" class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <p class="text-lg font-bold mb-4">{{ selectedNote.title }}</p>
            <!-- URL截断显示 -->
            <p class="truncate mb-4">
                前往:
                <a :href="selectedNote.url" target="_blank" rel="noopener noreferrer"
                    class="text-blue-500 hover:text-green-600 transition duration-300">
                    {{ selectedNote.url }}
                </a>
            </p>
            <div v-if="selectedNote.contents.length > 0" class="py-4">
                <p class="mt-4 font-semibold text-lg ">笔记列表</p>
                <ul>
                    <li v-for="(content, index) in selectedNote.contents" :key="index"
                        class="py-2 border-b border-gray-400 relative">
                        <div class="pl-4">
                            <p class=" font-semibold text-gray-600">{{ content.content }}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-2">
                            <!-- 编辑按钮 -->
                            <button :disabled="content.isDeleted" v-if="!content.isDeleted" @click="editContent(content)"
                                class="bg-blue-200 text-white px-3 py-1 rounded hover:bg-blue-400 focus:outline-none">
                                <span class="hidden md:inline-block">编辑</span> <!-- 在大屏幕上显示编辑文本 -->
                                <span class="md:hidden">E</span> <!-- 在小屏幕上显示简略文本 -->
                            </button>
                            <!-- 删除按钮 -->
                            <button :disabled="content.isDeleted" v-if="!content.isDeleted" @click="deleteContent(content)"
                                class="bg-red-200 text-white px-3 py-1 rounded hover:bg-red-400 focus:outline-none">
                                <span class="hidden md:inline-block">删除</span> <!-- 在大屏幕上显示删除文本 -->
                                <span class="md:hidden">D</span> <!-- 在小屏幕上显示简略文本 -->
                            </button>
                            <!-- 跳转按钮 -->
                            <button :disabled="content.isDeleted" v-if="!content.isDeleted"
                                @click="openContentInWindow(content)"
                                class="bg-green-200 text-white px-3 py-1 rounded hover:bg-green-400 focus:outline-none">
                                <span class="hidden md:inline-block">跳转</span> <!-- 在大屏幕上显示跳转文本 -->
                                <span class="md:hidden">GO</span> <!-- 在小屏幕上显示简略文本 -->
                            </button>
                            <span v-else>已删除</span>
                        </div>
                    </li>
                </ul>
                <!-- ...rest of your content... -->
            </div>
            <div v-else class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                Nothing
            </div>
        </div>
    </div>

    <!-- 模态框 -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-12 rounded-lg">
            <label class="block mb-2 font-semibold">修改笔记:</label>
            <input v-model="editedContent" class="border border-gray-300 rounded-lg p-6 mb-4" />
            <div class="flex justify-end">
                <button @click="saveChanges"
                    class="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none">保存</button>
                <button @click="cancelEdit"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none">取消</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, ref, watch } from 'vue';
import { showModel, showMessage } from '@/utils/message'
import { deleteNote, editNote } from "@/api/notes"

const props = defineProps({
    selectedNote: Object,
});

const showModal = ref(false);

const editedContent = ref('');

let selectedContent = null

const selectedNote = ref(props.selectedNote);
// 监听 props 的变化，更新 ref
watch(
    () => props.selectedNote,
    (newValue) => {
        selectedNote.value = newValue;
    }
);

const editContent = (content) => {
    selectedContent = content;
    editedContent.value = content.content;
    showModal.value = true;
};

const saveChanges = () => {
    if (selectedContent && selectedContent.tempId) {
        const tempIdToUpdate = selectedContent.tempId;
        const updatedContent = editedContent.value;
        const editData = { content: updatedContent, tempId: tempIdToUpdate }

        editNote(editData)
            .then((res) => {
                if (res.code === 200 || res.code === 201 || res.code === 204) {
                    console.log('Note updated:', res);
                    // 更新 UI 或执行其他操作
                    selectedContent.content = updatedContent; // 更新内容
                    showModal.value = false;
                    showMessage("修改成功")
                }
                else {
                    console.error('Failed to update note:', error.message);
                    showMessage("修改失败", 'error')
                }
            })
    } else {
        console.error('Content or tempId is missing.');
        // 处理缺少内容或 tempId 的情况
    }
};

const cancelEdit = () => {
    showModal.value = false;
};


const deleteContent = (content) => {
    if (content && content.tempId) {
        showModel('确定删除这条笔记吗?')
            .then(() => {
                const tempIdToDelete = content.tempId;
                console.log('tempIdToDelete', tempIdToDelete);
                deleteNote(tempIdToDelete)
                    .then((response) => {
                        console.log('Note deleted:', response);
                        // 更新 UI 或执行其他操作
                        content.isDeleted = true; // 标记为已删除
                    })
                    .catch((error) => {
                        console.error('Failed to delete note:', error.message);
                        // 显示错误信息或执行其他操作
                    });
            })
            .catch(() => {
                // 用户点击取消按钮
                console.log('取消删除笔记');
            });
    } else {
        console.error('Content or tempId is missing.');
        // 处理缺少内容或 tempId 的情况
    }
}

const openContentInWindow = (content) => {
    const nowUrl = selectedNote.value.url;
    const targetTop = Number(content.top.replace('px', ''));
    const targetLeft = Number(content.left.replace('px', ''));

    if (!content.isDeleted && nowUrl && targetTop && targetLeft) {
        // 打开新窗口
        const newWindow = window.open(nowUrl, '_blank');

        // 当新窗口加载完成后滚动到指定位置
        newWindow.onload = () => {
            newWindow.scrollTo({ top: targetTop, left: targetLeft, behavior: 'instant' });
        };
    } else {
        console.log('未能跳转');
        console.log(nowUrl + ' ' + targetTop + ' ' + targetLeft);
    }
};



</script>
  
<style>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    /* 可能需要适当的宽度 */
}
</style>
