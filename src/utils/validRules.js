// 一个校验规则库

// 校验邮箱
// 解释:
// 验证电子邮件地址是否符合一般的邮箱格式。
// 要求：
// 开始于字母或数字。
// 包含字母、数字、下划线或连字符（减号）。
// 包含 "@" 符号，后跟域名部分，例如 "@domain.com"。
// 域名部分包含字母和数字，以及最后的顶级域名，如 ".com"、".org" 等。
export function isValidEmail(value){
    let regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return regEmail.test(value);
}

// 校验密码
// 解释:
// 验证密码是否符合特定的复杂性和长度要求。
// 要求：
// 长度在3到15个字符之间。
// 包含至少一个数字或一个字母。
// 请输入长度 3~15 的密码，可以包含字母、数字
export function isValidPassword(value){
    let regPassword = /^(?=.*[a-zA-Z0-9])\S{3,15}$/;
    return regPassword.test(value);
}

// 校验验证码
// 解释:
// 由6个字符组成。
// 仅包含数字，无特殊字符。
// 验证码要求是6位纯数字
export function isValidCode(value){
    let regCode = /^[0-9]{6}$/;
    return regCode.test(value);
}


// 校验昵称
// 这里假设昵称长度在3到20个字符之间，并且可以包含字母、数字、下划线和连字符
// 请输入长度 3~20 的昵称，可以包含字母、数字、下划线和连字符
export function isValidNickname(value){
    let regNickname = /^[a-zA-Z0-9_-]{3,20}$/;
    return regNickname.test(value);
}

// 校验用户名
// 这里假设用户名长度在3到20个字符之间，并且可以包含字母、数字、下划线和连字符
// 请输入长度 3~20 的用户名，可以包含字母、数字、下划线和连字符
export function isValidUsername(value){
    let regNickname = /^[a-zA-Z0-9_-]{3,20}$/;
    return regNickname.test(value);
}