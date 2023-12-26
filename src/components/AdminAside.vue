<template>
        <aside id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li>
                    <a href="#"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path
                                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path
                                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span class="ms-3">Dashboard</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>








<script setup>
import { onMounted } from 'vue'
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