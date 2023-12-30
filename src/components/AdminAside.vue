<template>
    <!-- 侧边栏容器 -->
    <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-80 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">

        <!-- 内容区域 -->
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <!-- 项目列表 -->
            <ul class="space-y-2 font-medium">
                <!-- 循环渲染项目 -->
                <li v-for="(item, index) in processedData" :key="index"   @click="handleClick(item)" :class="{ 'bg-gray-200': selectedItem === item }"
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" >

                    <!-- 项目按钮 -->
                    <button class="w-full text-left" >
                        <!-- 项目内容布局 -->
                        <div class="flex justify-between items-center">
                            <!-- 左侧信息 -->
                            <div>
                                <p class="text-sm font-semibold leading-6 text-gray-900">{{ item.title }}</p>
                                <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ item.latestUpdate }}</p>
                            </div>

                            <!-- 右侧计数和标识 -->
                            <div class="flex items-center gap-x-1.5">
                                <div class="rounded-full bg-emerald-500/20 p-1">
                                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                </div>
                                <p class="text-xs leading-5 text-gray-500">{{ item.count }}</p>
                            </div>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>
  


<script setup>
import {
    initAccordions //用于初始化手风琴组件。
    , initCarousels//用于初始化轮播组件。
    , initCollapses//用于初始化折叠（collapse）组件。
    , initDials//用于初始化拨号（dial）组件。
    , initDismisses//用于初始化 dismiss 组件。
    , initDrawers//用于初始化抽屉（drawer）组件。
    , initDropdowns//用于初始化下拉菜单（dropdown）组件。
    , initModals//用于初始化模态框（modal）组件。
    , initPopovers//用于初始化弹出框（popover）组件。
    , initTabs//用于初始化选项卡（tabs）组件。
    , initTooltips//用于初始化提示（tooltip）组件。
    , initFlowbite
} from 'flowbite'
import { onMounted,ref} from 'vue';

// 创建一个响应式变量用于存储选中的项目
const selectedItem = ref(null);
const emit = defineEmits(['noteSelected'])

// 定义 props 类型
const props = defineProps({
    processedData: Array
});


const handleClick = (item) => {
    // 更新选中的项目
    selectedItem.value = item;
    console.log(item)
    console.log("点击了" + item.url)
    emit('noteSelected', item); // 传递选中的笔记对象
};


// 初始化 flowbit 相关组件
onMounted(() => {
    initAccordions()
        ; initCarousels()
        ; initCollapses()
        ; initDials()
        ; initDismisses()
        ; initDrawers()
        ; initDropdowns()
        ; initModals()
        ; initPopovers()
        ; initTabs()
        ; initTooltips()
        ; initFlowbite()
})

</script>