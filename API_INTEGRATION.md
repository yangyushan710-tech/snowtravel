# 登录注册接口集成说明

## 概述
已成功将 API 接口集成到登录和注册页面中。

## 集成的 API 接口

### 1. 获取验证码图片
- **端点**: `GET /api/captcha`
- **描述**: 获取图形验证码
- **集成位置**: 
  - `src/App.vue` - 登录页面顶部显示验证码图片
  - `src/views/RegisterView.vue` - 注册页面底部显示验证码图片
- **功能**: 
  - 页面加载时自动获取验证码
  - 点击验证码图片可以刷新

### 2. 用户注册
- **端点**: `POST /api/auth/register`
- **请求参数**:
  - `phone`: 手机号
  - `password`: 密码
  - `code`: 验证码
- **集成位置**: `src/views/RegisterView.vue`
- **功能**:
  - 表单验证（手机号、密码、验证码）
  - 提交注册请求
  - 错误提示

### 3. 密码登录
- **端点**: `POST /api/auth/login/password`
- **请求参数**:
  - `phone`: 手机号
  - `password`: 密码
  - `captcha`: 验证码
- **集成位置**: `src/App.vue`
- **功能**:
  - 表单验证
  - 登录请求
  - token 保存到 localStorage
  - 错误提示

## 文件结构

```
src/
├── App.vue                 # 登录页面，集成密码登录接口
├── api/
│   └── auth.js            # 身份验证 API 模块
└── views/
    └── RegisterView.vue   # 注册页面，集成注册接口
```

## API 模块 (src/api/auth.js)

包含以下方法：
- `getCaptcha(token)` - 获取验证码
- `register(phone, password, code, token)` - 注册
- `loginWithPassword(phone, password, captcha, token)` - 密码登录
- `getUserProfile(userId, token)` - 获取用户信息

## 功能特点

### 登录页面 (App.vue)
- ✅ 支持密码登录和短信登录两种方式切换
- ✅ 自动加载并显示图形验证码
- ✅ 点击验证码图片可以刷新
- ✅ 表单验证和错误提示
- ✅ 登录成功后保存 token 和用户信息

### 注册页面 (RegisterView.vue)
- ✅ 手机号和验证码输入
- ✅ 密码确认验证
- ✅ 图形验证码显示和刷新
- ✅ 获取短信验证码（模拟）
- ✅ 表单验证和错误提示
- ✅ 注册成功跳转回登录

## 数据存储

登录成功后，用户信息保存在 localStorage：
- `userToken` - 用户 token
- `userId` - 用户 ID
- `userName` - 用户名

## 使用说明

1. **获取验证码**: 
   - 登录和注册页面自动加载验证码图片
   - 点击图片可以刷新

2. **获取短信验证码**:
   - 注册页面中输入手机号后点击"获取验证码"
   - 系统会模拟发送验证码（实际需要后端实现）
   - 60 秒倒计时后可以再次获取

3. **注册**:
   - 填写手机号、验证码、密码
   - 点击注册按钮
   - 注册成功后返回登录页面

4. **登录**:
   - 输入手机号、密码、验证码
   - 点击登录按钮
   - 成功后信息保存到 localStorage

## 注意事项

- 所有 API 调用都是基于 `/api` 路径
- 验证码图片格式为 Base64 编码的数据 URL
- 登录时的 "captcha" 字段为图形验证码输入
- 所有错误都会在界面上提示用户
