document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止按钮的默认行为

        // 获取用户名/邮箱和密码输入框的值
        const usernameOrEmail = document.getElementById("usernameOrEmail").value;
        const password = document.getElementById("password").value;
        // 在这里添加发送登录请求的逻辑
        // 将用户名/邮箱和密码发送给后端验证
        // fetch('your-login-api-url', {
        //     method: 'POST',
        //     body: JSON.stringify({ usernameOrEmail, password }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     // 处理登录成功或失败的情况
        // }).catch(error => {
        //     console.error('Error:', error);
        // });
    });
});
