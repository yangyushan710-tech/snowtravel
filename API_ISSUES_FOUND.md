# API 调用问题分析报告

## 问题清单

### 1. ✅ **登录 API 请求体 - 正确**
```javascript
// POST /api/auth/login/password
{
  "phone": "手机号",
  "password": "密码", 
  "captcha": "验证码"  // ✅ 正确参数名
}
```

### 2. ⚠️ **注册流程逻辑问题**

#### 问题：
- RegisterView 中加载了图形验证码（`getCaptchaImage`），但注册 API 需要的是短信验证码
- `getVerificationCode` 方法只是模拟倒计时，没有实际调用后端接口获取短信验证码

#### API 要求：
```javascript
// POST /api/auth/register
{
  "phone": "手机号",
  "password": "密码",
  "code": "短信验证码"  // 应该是短信验证码，不是图形验证码
}
```

#### 当前错误做法：
```javascript
await register(
  this.form.phone,
  this.form.password,
  this.form.code,  // 这里的 code 应该来自短信，不是用户输入的任意值
  this.captchaToken  // captchaToken 在代码中未定义
)
```

---

### 3. ⚠️ **验证码混乱 - 需要明确区分**

#### 图形验证码（CAPTCHA）- 用于登录
- 接口：`GET /api/captcha`
- 用途：密码登录时需要
- 获取方式：页面加载时或点击刷新时

#### 短信验证码（SMS）- 用于注册和短信登录
- 接口：**OpenAPI 中没有定义** ⚠️
- 用途：注册和短信登录时需要
- 获取方式：应该有后端接口，但文档中未提供

---

### 4. ❌ **App.vue 中短信登录问题**

#### 当前实现：
```javascript
// 前端生成假验证码（不对！）
this.generatedCode = ''
for (let i = 0; i < 6; i++) {
  this.generatedCode += Math.floor(Math.random() * 10)
}
console.log('向', this.form.username, '发送短信验证码:', this.generatedCode)
```

#### 问题：
- 前端生成的验证码在后端是无法验证的
- 应该调用后端接口获取真实的短信验证码

---

### 5. 🔍 **缺失的 API 接口**

根据 OpenAPI 文档，以下接口在代码中使用但文档中不清楚：

1. **获取短信验证码** - 不存在于 OpenAPI
   - 应该需要一个接口如：`POST /api/auth/send-sms-code` 或 `GET /api/auth/sms-code`
   - 参数：`phone` 
   - 返回：验证码（用于测试）或仅确认发送

2. **修改用户信息** - 不存在于 OpenAPI
   - 后续可能需要

---

## 修复建议

### 步骤 1：联系后端确认
- ✋ 确认是否有获取短信验证码的接口
- ✋ 确认注册 API 的 `code` 参数具体是什么

### 步骤 2：完善 auth.js

需要添加短信验证码接口（假设后端接口为 `POST /api/auth/send-sms-code`）：

```javascript
// 发送短信验证码
export async function sendSmsCode(phone, token = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-sms-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token })
      },
      body: JSON.stringify({ phone })
    })
    return await response.json()
  } catch (error) {
    console.error('发送短信验证码失败:', error)
    throw error
  }
}
```

### 步骤 3：修复 RegisterView.vue

```javascript
import { getCaptcha, register, sendSmsCode } from '../api/auth.js'

// 在 getVerificationCode 方法中调用真实接口：
async getVerificationCode() {
  // ... 验证手机号 ...
  try {
    const result = await sendSmsCode(this.form.phone)
    if (result.code === 200 || result.code === 0) {
      // 开始倒计时
      // ... 倒计时逻辑 ...
    }
  } catch (err) {
    this.phoneError = '获取验证码失败，请稍后重试'
  }
}
```

### 步骤 4：修复 App.vue 短信登录

```javascript
// 类似地调用后端接口而不是前端生成
async getVerificationCode() {
  if (this.loginType === 'sms') {
    try {
      const result = await sendSmsCode(this.form.username)
      if (result.code === 200 || result.code === 0) {
        // 开始倒计时
        // ... 倒计时逻辑 ...
      }
    } catch (err) {
      this.errors.username = '获取验证码失败'
    }
  }
}
```

---

## 总结

| 问题 | 严重性 | 状态 |
|------|--------|------|
| 登录 API 参数正确 | ✅ | 正常 |
| 注册逻辑混乱（图形验证码 vs 短信验证码） | 🔴 高 | 需要修复 |
| 缺少短信验证码 API | 🔴 高 | 需要确认 |
| 前端生成假验证码 | 🔴 高 | 需要修复 |
| 图形验证码 token 处理 | 🟡 中 | 需要完善 |

