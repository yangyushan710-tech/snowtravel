# 雪程搭子 - 登录注册接口集成完成

## ✅ 完成项目

已成功将 OpenAPI 规范中的身份验证接口集成到登录和注册页面。

## 📋 集成的接口清单

### 验证码相关
| 接口 | 方法 | 端点 | 功能 |
|------|------|------|------|
| 获取验证码 | GET | `/api/captcha` | 获取图形验证码图片 |

### 身份认证相关
| 接口 | 方法 | 端点 | 功能 | 集成位置 |
|------|------|------|------|---------|
| 用户注册 | POST | `/api/auth/register` | 手机号 + 密码 + 验证码注册 | RegisterView.vue |
| 密码登录 | POST | `/api/auth/login/password` | 手机号 + 密码 + 验证码登录 | App.vue |

## 🎯 实现的功能

### 登录页面 (src/App.vue)
- ✅ 密码登录表单
- ✅ 短信登录切换选项
- ✅ 图形验证码自动加载
- ✅ 验证码点击刷新
- ✅ 获取短信验证码功能（模拟）
- ✅ 表单验证和错误提示
- ✅ 登录 API 调用
- ✅ Token 保存到 localStorage

### 注册页面 (src/views/RegisterView.vue)
- ✅ 手机号输入
- ✅ 短信验证码输入
- ✅ 获取短信验证码按钮（60秒倒计时）
- ✅ 密码设置和确认
- ✅ 图形验证码显示和刷新
- ✅ 表单验证（手机号、密码长度等）
- ✅ 注册 API 调用
- ✅ 错误提示和加载状态

## 📁 新增文件

```
src/
└── api/
    └── auth.js           # 身份验证 API 模块
                          # 包含: getCaptcha, register, loginWithPassword, getUserProfile

API_INTEGRATION.md        # 详细的集成说明文档
```

## 🔧 修改的文件

1. **src/App.vue**
   - 添加导入 auth API 模块
   - 添加 captchaImage 数据属性
   - 实现 loadCaptcha() 和 refreshCaptcha() 方法
   - 实现 performLogin() 异步登录方法
   - 添加验证码图片显示区域
   - 添加相关样式

2. **src/views/RegisterView.vue**
   - 添加导入 auth API 模块
   - 添加多个数据属性（captchaImage, loading, error, codeCountdown 等）
   - 添加 mounted 生命周期钩子获取验证码
   - 实现 getCaptchaImage() 方法
   - 实现 getVerificationCode() 方法（短信验证码）
   - 实现 submit() 异步注册方法
   - 添加错误提示和加载状态
   - 添加验证码显示和相关样式

## 💾 数据存储

登录成功后保存到 localStorage：
```javascript
localStorage.setItem('userToken', token)
localStorage.setItem('userId', userId)
localStorage.setItem('userName', userName)
```

## 🚀 使用流程

### 注册流程
1. 用户进入注册页面
2. 页面自动加载图形验证码
3. 用户输入手机号并获取短信验证码
4. 用户填写密码、确认密码
5. 点击注册按钮
6. 前端验证表单数据
7. 发送 POST 请求到 `/api/auth/register`
8. 注册成功后返回登录页面

### 登录流程
1. 用户进入登录页面
2. 页面自动加载图形验证码
3. 选择登录方式（密码/短信）
4. 填写相应信息
5. 点击登录按钮
6. 前端验证表单数据
7. 发送 POST 请求到 `/api/auth/login/password`
8. 登录成功，保存 token 信息

## ⚙️ API 配置

所有 API 调用基于 `/api` 前缀路径，可在 `src/api/auth.js` 中修改：
```javascript
const API_BASE_URL = '/api'
```

## 📝 注意事项

1. **验证码处理**
   - 图形验证码由后端返回 Base64 编码的数据 URL
   - 点击验证码图片可以刷新

2. **短信验证码**
   - 注册页面的短信验证码获取为模拟实现
   - 实际使用需后端服务支持

3. **错误处理**
   - 所有 API 错误都会显示在界面上
   - 支持后端返回的自定义错误消息

4. **令牌管理**
   - 登录成功后 token 保存在 localStorage
   - 后续请求可从 localStorage 中读取使用

## ✨ 特性总结

- 🔐 安全的身份验证流程
- 📱 支持手机号登录和短信验证
- 🎨 友好的用户界面和错误提示
- 🔄 验证码刷新功能
- ⏱️ 倒计时验证码重新获取
- 📊 完整的表单验证
- 💾 用户信息本地存储
