document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.getElementById("register-button");
    registerButton.addEventListener("click", function(event) {
        event.preventDefault();

        // 获取用户名、电子邮件和密码等输入的值
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // 创建一个包含用户信息的JavaScript对象
        // 这个上周好像说了，但是忘记了，等后端完成后，再次修改
        const userData = {
            username: username,
            email: email,
            password: password
        };

        // 使用fetch将数据传输给后端（需要替换成实际的后端API）
        fetch('your-backend-api-url', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // 在这里可以处理后端返回的响应
            console.log(data);
        })
        .catch(error => {
            // 处理错误
            console.error('Error:', error);
        });
    });
});
