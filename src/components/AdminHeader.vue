<template>
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                        type="button"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                            </path>
                        </svg>
                    </button>
                    <a href="/" class="flex ms-2 md:me-24">
                        <img src="@\assets\icon.png" class="h-8 me-3" alt="FlowBite Logo" />
                        <span
                            class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">weshare</span>
                    </a>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center ms-3">
                        <!-- 登录用户头像 -->
                        <el-dropdown class="flex items-center justify-center" @command="handleCommand">
                            <span class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs">
                                <!-- 头像 Icon -->
                                <el-Icon class="mr-2" :size="25"
                                    src="https://img.quanxiaoha.com/quanxiaoha/f97361c0429d4bb1bc276ab835843065.jpg" />
                                {{ userStore.userInfo.username }}
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="Nickname"><el-icon>
                                            <UserFilled />
                                        </el-icon> {{ userStore.userInfo.nickname }} </el-dropdown-item>
                                    <el-dropdown-item command="updateNickname"><el-icon>
                                            <UserFilled />
                                        </el-icon>修改昵称</el-dropdown-item>
                                    <el-dropdown-item command="updatePassword"><el-icon>
                                            <Unlock />
                                        </el-icon>修改密码</el-dropdown-item>
                                    <el-dropdown-item command="logout"><el-icon>
                                            <Back />
                                        </el-icon>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <!-- 修改密码 -->
        <el-dialog v-model="openPswd" title="修改密码" width="40%" :draggable="true" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form ref="formRefPswd" :rules="rulesPswd" :model="formPswd">
                <el-form-item label="用户名" prop="username" label-width="120px">
                    <!-- 输入框组件 -->
                    <el-input size="large" v-model="formPswd.username" placeholder="请输入用户名" clearable disabled />
                </el-form-item>

                <el-form-item label="原密码" prop="oldPassword" label-width="120px">
                    <el-input size="large" type="password" v-model="formPswd.oldPassword" placeholder="请输入原密码" clearable
                        show-password />
                </el-form-item>

                <el-form-item label="新密码" prop="newPassword" label-width="120px">
                    <el-input size="large" type="password" v-model="formPswd.newPassword" placeholder="请输入新密码" clearable
                        show-password />
                </el-form-item>

                <el-form-item label="确认新密码" prop="reNewPassword" label-width="120px">
                    <el-input size="large" type="password" v-model="formPswd.reNewPassword" placeholder="请确认新密码" clearable
                        show-password />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="openPswd = false">取消</el-button>
                    <el-button type="primary" @click="onUpdatePswd">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 修改昵称 -->
        <el-dialog v-model="openNick" title="修改昵称" width="40%" :draggable="true" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form ref="formRefNick" :rules="rulesNick" :model="formNick">
                <el-form-item label="用户名" prop="username" label-width="120px">
                    <!-- 输入框组件 -->
                    <el-input size="large" v-model="formNick.username" placeholder="请输入用户名" clearable disabled />
                </el-form-item>

                <el-form-item label="新昵称" prop="nickname" label-width="120px">
                    <el-input size="large" v-model="formNick.nickname" placeholder="请输入新昵称" clearable />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="openNick = false">取消</el-button>
                    <el-button type="primary" @click="onUpdateNick">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>

        
        <el-dialog v-model="openIcon" title="更改用户头像" width="40%" :draggable="true" :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form ref="formRefIcon" :rules="rulesIcon" :model="formIcon">
                <el-form-item label="当前头像" label-width="120px">
                    <!-- 在这里显示当前用户头像 -->
                    <img :src="currentUserIcon" alt="Current Icon" class="current-Icon" />
                </el-form-item>

                <el-form-item label="新头像" prop="Icon" label-width="120px">
                    <!-- 上传头像的组件 -->
                    <el-upload class="Icon-uploader" action="/upload-url" :show-file-list="false"
                        :before-upload="beforeIconUpload" :on-success="handleIconSuccess" :on-error="handleIconError">
                        <img v-if="formIcon.Icon" :src="formIcon.Icon" class="Icon">
                        <i v-else class="el-icon-plus Icon-uploader-icon"></i>
                    </el-upload>
                    <span class="Icon-upload-text">点击上传</span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="openIcon = false">取消</el-button>
                    <el-button type="primary" @click="onUpdateIcon">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { showModel, showMessage } from '@/utils/message'
import { onMounted, ref, reactive, watch } from 'vue'
import { updatePassword, updateNickname } from '@/api/user'
import { isValidPassword, isValidUsername, isValidNickname } from '@/utils/validRules'
import {
    initAccordions //用于初始化手风琴组件。
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


// 引入了用户 Store
const userStore = useUserStore()
const router = useRouter()

// 对话框是否显示
const openPswd = ref(false)
const openNick = ref(false)

// 下拉菜单事件处理
const handleCommand = (command) => {
    // 更新密码
    if (command == 'updatePassword') {
        // 显示修改密码对话框
        openPswd.value = true
    } else if (command == 'updateNickname') {
        openNick.value = true
    }
    else if (command == 'logout') { // 退出登录
        logout()
    }
}

// 退出登录
function logout() {
    showModel('是否确认要退出登录？').then(() => {
        userStore.logout()
        showMessage('退出登录成功！')
        // 跳转登录页
        router.push('/login')
    })
}

// 确认按钮加载 loading
const btnLoading = ref(false)
// 显示 loading
const showBtnLoading = () => btnLoading.value = true
// 隐藏 loading
const closeBtnLoading = () => btnLoading.value = false

// 表单引用
const formRefPswd = ref(null)
const formRefNick = ref(null)

// 修改用户密码表单对象
const formPswd = reactive({
    username: userStore.userInfo.username || '',
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
})
// 修改密码表单对象
const formNick = reactive({
    username: userStore.userInfo.username || '',
    nickname: '',
})

// 监听Pinia store中的某个值的变化
watch(() => userStore.userInfo.username, (newValue, oldValue) => {
    // 重新将新的值，设置会 form 对象中
    formPswd.username = newValue
});

// 校验用户名
const validate_username = (rule, value, callback) => {
    let isvalid = isValidUsername(value)
    if (value === '') {
        callback(new Error("请输入用户名"));
    }
    else if (!isvalid) {
        callback(new Error("请输入长度 3~20 的用户名，可以包含字母、数字、下划线和连字符"))
    }
    else callback()
}

// 校验昵称
const validate_nickname = (rule, value, callback) => {
    let isvalid = isValidNickname(value)
    if (value === '') {
        callback(new Error("请输入昵称"));
    }
    else if (!isvalid) {
        callback(new Error("请输入长度 3~20 的昵称，可以包含字母、数字、下划线和连字符"))
    }
    else callback()
}

// 校验密码
const validate_password = (rule, value, callback) => {
    let isvalid = isValidPassword(value)
    if (value === '') {
        callback(new Error("请输入密码"));
    }
    else if (!isvalid) {
        callback(new Error("请输入长度 3~15 的密码，可以包含字母、数字"))
    }
    else callback()
}


// 校验确认密码 
const validate_repassword = (rule, value, callback) => {
    const passwordValue = formPswd.newPassword
    let isvalid = isValidPassword(value)
    if (value === '') {
        callback(new Error("请再次输入密码"));
    }
    else if (!isvalid) {
        callback(new Error("请输入长度 3~15 的密码，可以包含字母、数字"))
    }
    else if (passwordValue && passwordValue !== value) {
        callback(new Error("两次密码不一致"))
    }
    else callback()
}


// 修改密码表单验证规则
const rulesPswd = {
    username: [{ validator: validate_username, trigger: 'change' }],
    oldPassword: [{ validator: validate_password, trigger: 'change' }],
    newPassword: [{ validator: validate_password, trigger: 'change' }],
    reNewPassword: [{ validator: validate_repassword, trigger: 'change' }]
}

// 修改昵称表单验证规则
const rulesNick = {
    username: [{ validator: validate_username, trigger: 'change' }],
    nickname: [{ validator: validate_nickname, trigger: 'change' }]
}

const onUpdatePswd = () => {
    // 先验证 form 表单字段
    formRefPswd.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        showBtnLoading()
        const dataPswd = {
            username: formPswd.username,
            oldPassword: formPswd.oldPassword,
            newPassword: formPswd.newPassword
        };
        // 调用修改用户密码接口
        updatePassword(dataPswd).then((res) => {
            // 判断是否成功
            if (res.code === 200 || res.code === 201) {
                showMessage('密码重置成功，请重新登录！')
                // 退出登录
                userStore.logout()
                // 隐藏对话框
                openPswd.value = false
                // 跳转登录页
                router.push('/login')
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示消息
                showMessage(message, 'error')
            }
        }).finally(() => closeBtnLoading())
    })
}


const onUpdateNick = () => {
    // 先验证 form 表单字段
    formRefNick.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }
        showBtnLoading()
        const dataNick = {
            username: formNick.username,
            nickName: formNick.nickname
        };
        // 调用修改用户昵称接口
        updateNickname(dataNick).then((res) => {
            // 判断是否成功
            if (res.code === 200 || res.code === 201) {
                showMessage('昵称重置成功')
                userStore.setNickname(formNick.nickname)
                // 隐藏对话框
                openNick.value = false
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示消息
                showMessage(message, 'error')
            }
        }).finally(() => closeBtnLoading())
    })
}

// 初始化 flowbit 相关组件
onMounted(() => {
    initAccordions()
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