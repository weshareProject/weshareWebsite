<template>
    <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏 -->
    <div class="grid grid-cols-2 h-screen">
        <!-- 默认占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端） -->
        <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
            <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
            <div class="flex justify-center items-center h-full flex-col">
                <h2 class="font-bold text-4xl mb-7 text-white">weshare 注册</h2>
                <p class="text-white">记录点滴</p>
                <!-- 指定图片宽度为父级元素的 1/2 -->
                <!-- <img src="@/assets/logo.png" > -->
            </div>
        </div>
        <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
            <!-- flex-col 用于指定子元素垂直排列 -->
            <div class="flex justify-center items-center h-full flex-col ">
                <!-- 大标题，设置字体粗细、大小、下边距 -->
                <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
                <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
                <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
                    <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>新用户注册</span>
                    <!-- 右边横线 -->
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>
                <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
                <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
                    <el-form-item prop="username">
                        <!-- 输入框组件 -->
                        <el-input size="large" v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" clearable />
                    </el-form-item>

                    <el-form-item prop="password">
                        <!-- 密码框组件 -->
                        <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码"
                            :prefix-icon="Lock" clearable show-password />
                    </el-form-item>

                    <el-form-item prop="rePassword">
                        <!-- 密码框组件 -->
                        <el-input size="large" type="password" v-model="form.rePassword" placeholder="请确认密码"
                            :prefix-icon="Lock" clearable show-password />
                    </el-form-item>

                    <el-form-item prop="email">
                        <!-- 输入框组件 -->
                        <el-input size="large" class="em" type="email" v-model="form.email" placeholder="请输入邮箱"
                            :prefix-icon="MessageBox" clearable />
                    </el-form-item>
                    <el-button type="primary" size="large" class="mt-2 mb-2" :disabled="isDisable" @click="onGetCode">
                        {{ isDisable ? `重新发送（${countdown}s）` : '获取验证码' }}
                    </el-button>

                    <el-form-item prop="validCode">
                        <!-- 验证码组件 -->
                        <el-input size="large" v-model="form.validCode" placeholder="请输入验证码" :prefix-icon="Postcard"
                            clearable />
                        <!-- <el-text class="mx-1" type="warning">{{ statusMsg }}</el-text> -->
                    </el-form-item>


                    <el-form-item>
                        <el-button size="large" class="mt-2" type="primary" @click="onRegister">立即注册</el-button>
                        <el-button size="large" class="mt-2" @click="onCancle">取消注册</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
// 引入 Element Plus 中的用户、锁图标
import { User, Lock, MessageBox, Postcard } from '@element-plus/icons-vue'
import { register, getCode } from '@/api/user'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { showMessage } from '@/utils/message'
import { useUserStore } from '@/stores/user'

// 用户信息的仓库
const userStore = useUserStore()
// 定义响应式的表单对象
const form = reactive({
    username: '',
    email: '',
    password: '',
    rePassword:'',
    validCode: ''
})

// const statusMsg = ref("statusTEST")
const router = useRouter()
// 登录按钮加载
const loading = ref(false)

// 表单引用
const formRef = ref(null)
// 表单验证规则
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
    ],
    rePassword: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
    ],
    validCode: [
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
        },
    ],

}

const countdown = ref(60); // 初始化倒计时秒数为60
const isDisable = ref(false);
let timer; // 计时器变量

const onGetCode = () => {
    formRef.value.validateField('email', (valid) => {
        if (valid) {
            // 邮箱验证通过，调用接口获取验证码
            const encodedEmail = encodeURIComponent(form.email);
            getCode(form.email)
                .then((res) => {
                    if (res.code === 200 || res.code === 201) {
                        showMessage('发送成功,验证码有效期5分钟', 'success');
                        startCountdown(); // 开始倒计时
                    }
                    else{
                        showMessage('获取验证码失败，请重试！', 'error');
                    }
                })
        } else {
            showMessage('请输入有效的邮箱地址！', 'warning');
        }
    });
};

const startCountdown = () => {
    countdown.value = 60; // 重置倒计时秒数
    isDisable.value = true; // 禁用按钮
    timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(timer); // 清除计时器
            isDisable.value = false; // 启用按钮
        }
    }, 1000);
};
const onRegister = () => {
    console.log('注册')
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            showMessage('未填写完整', 'error')
            return false
        }
        if (form.password != form.rePassword) {
            showMessage('两次新密码输入不一致，请检查！', 'warning')
            return
        }
        // 开始加载
        loading.value = true
        const registerData = {
            username: form.username,
            email: form.email,
            password: form.password,
            validCode: form.validCode
        };
        console.log(registerData)
        // 调用登录接口
        register(registerData).then((res) => {
            console.log(res)
            // 判断是否成功
            if (res.code === 200 || res.code === 201) {
                // 提示登录成功
                showMessage('注册成功 ' + res.message)

                // 获取用户信息(名字)，并存储到全局状态中
                userStore.setUsername(form.username)
                userStore.setEmail(form.email)

                // 跳转到登录页
                router.push({ path: '/login' })
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示消息
                showMessage(message, 'error')
            }
        })
            .finally(() => {
                // 结束加载
                loading.value = false
            })
    })
}

const onCancle = () => {
    // 跳转到登录页
    router.push({ path: '/login' })
}

// 按回车键后，执行登录事件
function onKeyUp(e) {
    console.log(e)
    if (e.key == 'Enter') {
        onRegister()
    }
}

// 添加键盘监听
onMounted(() => {
    console.log('添加键盘监听')
    document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})

</script>