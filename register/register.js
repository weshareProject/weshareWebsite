document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register-button");

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();
        //获取详细的数据
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("密码不匹配");
            return; // 阻止继续执行
        }

        // 创建一个包含用户信息的JavaScript对象
        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            // 使用fetch将数据传输给后端（替换成实际的后端API）
            const response = await fetch('your-backend-api-url', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                // 在这里可以处理后端返回的响应
                console.log(data);
            } else {
                // 处理请求失败
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            // 处理其他错误
            console.error('Error:', error);
        }
    });
});
