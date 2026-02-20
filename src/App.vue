<template>
  <div class="app-container">
    <HomeView v-if="currentPage === 'home'" @go-login="currentPage = 'login'" />
    <div v-else-if="currentPage === 'login'" class="login-container">
    <!-- 左侧背景图片区域 -->
    <div class="left-section">
      <img src="/image/Mask group.png" alt="背景图片" class="left-background-image" />
      <div class="left-header">
        <p class='title'>欢迎来到雪程搭子</p>
        <img src="/image/自在游，安心享.png" alt="自在游，安心享" class="sub-title-image" />
      </div>
      <div class="left-content">
      </div>
    </div>
    
    <!-- 右侧登录表单区域 -->
    <div class="right-section">
      <div class="login-header">
        <div class="header-content">
          <img src="/image/welcome.png" alt="欢迎登录" class="welcome-image" />
          <p>做旅游攻略就找雪程搭子</p>
        </div>
      </div>
      <div class="login-form-container">
        <div class="card">
        <!-- 登录方式切换 -->
        <div class="login-tabs">
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'password' }"
            @click="loginType = 'password'"
          >
            密码登录
          </button>
          <button 
            class="tab-button" 
            :class="{ active: loginType === 'sms' }"
            @click="loginType = 'sms'"
          >
            短信登录
          </button>
        </div>
        

        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 账号/手机号输入框 -->
          <div class="form-item">
            <div class="input-with-icon">
              <img src="/image/Group 1410084138.png" alt="账号图标" class="input-icon" />
              <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
              <input 
                type="text" 
                v-model="form.phone" 
                placeholder="请输入手机号"
                :class="{ error: errors.phone }"
                @input="clearError('phone')"
              />
            </div>
            <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
          </div>
          
          <!-- 密码输入框（仅密码登录时显示） -->
          <div v-if="loginType === 'password'" class="form-item">
            <div class="password-input">
              <img src="/image/Group 1410084140.png" alt="密码图标" class="input-icon" />
              <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
              <input 
                type="password" 
                v-model="form.password" 
                placeholder="请输入登录密码" 
                :class="{ error: errors.password }"
                @input="clearError('password')"
              />
            </div>
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          </div>
          
          <!-- 图形验证码显示 -->
          <div v-if="loginType === 'password' && captchaImage" class="form-item">
            <label class="captcha-label">图形验证码</label>
            <img :src="captchaImage" alt="图形验证码" class="captcha-image" @click="refreshCaptcha" />
            <span class="captcha-hint">点击刷新</span>
          </div>
          
          <!-- 验证码输入区域 -->
          <div class="form-item">
            <div class="verification-code">
              <img src="/image/Group 1410084140 (1).png" alt="验证码图标" class="input-icon" />
              <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
              <input 
                type="text" 
                v-model="form.code" 
                placeholder="请输入验证码" 
                :class="{ error: errors.code }"
                @input="clearError('code')"
              />
              <button 
                type="button" 
                class="get-code-btn" 
                @click="getVerificationCode">
                {{ showCodeOnButton ? generatedCode : '获取验证码' }}
              </button>
           </div>
            <div v-if="errors.code" class="error-message">{{ errors.code }}</div>
          </div>
          
          <!-- 忘记密码链接（仅密码登录时显示） -->
          <div v-if="loginType === 'password'" class="forgot-password">
            <a href="#">忘记密码？</a>
          </div>
          
          <!-- 登录按钮 -->
          <button type="submit" class="login-button">登录</button>
          
          <!-- 注册链接 -->
            <div class="register-link">
              还没有注册账号？<a href="#" @click.prevent="goToRegister">立即注册</a>
            </div>
        </form>
        </div>
      </div>
    </div>
      </div>

      <div v-else-if="currentPage === 'register'" class="login-container">
        <RegisterView @back-to-login="currentPage = 'login'" />
      </div>
    </div>
</template>

<script>
import HomeView from './views/HomeView.vue'
import RegisterView from './views/RegisterView.vue'
import { getCaptcha, loginWithPassword, getUserProfile } from './api/auth.js'

export default {
  name: 'App',
  components: { HomeView, RegisterView },
  data() {
    return {
      loginType: 'password', // 登录方式：password 或 sms
      countdown: 0, // 验证码倒计时
      currentPage: 'home',
      form: {
        phone: '',
        password: '',
        code: ''
      },
      errors: {
        phone: '',
        password: '',
        code: ''
      },
      showCodeOnButton: false,
      generatedCode: '',
      captchaImage: ''
    }
  },
  mounted() {
    // 组件挂载时获取图形验证码
    if (this.loginType === 'password') {
      this.getCaptchaImage()
    }
  },
  methods: {
    // 切换到注册页面
    goToRegister() {
      this.currentPage = 'register'
    },
    
    // 清除错误信息
    clearError(field) {
      this.errors[field] = ''
    },
    
    // 密码登录时获取图形验证码
    async getCaptchaImage() {
      try {
        const data = await getCaptcha()
        if (data && data.data && data.data.image) {
          this.captchaImage = data.data.image
        }
      } catch (error) {
        console.error('获取图形验证码失败:', error)
      }
    },
    
    // 刷新图形验证码
    refreshCaptcha() {
      this.getCaptchaImage()
    },
    
    // 表单验证
    validateForm() {
      let isValid = true
      
      // 清除之前的错误
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = ''
      })
      
      // 验证手机号
      if (!this.form.phone) {
        this.errors.phone = '请输入手机号'
        isValid = false
      } else if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
        this.errors.phone = '请输入正确的手机号'
        isValid = false
      }
      
      // 密码登录时验证密码
      if (this.loginType === 'password' && !this.form.password) {
        this.errors.password = '请输入密码'
        isValid = false
      }
      
      // 验证验证码
      if (!this.form.code) {
        this.errors.code = '请输入验证码'
        isValid = false
      }
      
      return isValid
    },
    
    // 处理登录
    handleLogin() {
      if (this.validateForm()) {
        this.performLogin()
      }
    },

    // 执行登录请求
    async performLogin() {
      try {
        // 根据登录类型确定密码值
        // 密码登录：使用用户输入的密码
        // 短信登录：密码为空字符串
        const password = this.loginType === 'password' ? this.form.password : ''
        
        const data = await loginWithPassword(
          this.form.phone,
          password,
          this.form.code
        )

        if (data.code === 200 || data.code === 0) {
          // 登录成功，保存token和基本信息
          if (data.data && data.data.token) {
            localStorage.setItem('userToken', data.data.token)
            localStorage.setItem('userId', data.data.id)
            localStorage.setItem('userName', data.data.name || data.data.userName)
          }
          
          // 获取用户完整信息
          try {
            const userProfile = await getUserProfile(data.data.id, data.data.token)
            if (userProfile.code === 200 || userProfile.code === 0) {
              // 保存用户详细信息
              localStorage.setItem('userProfile', JSON.stringify(userProfile.data))
              console.log('用户详细信息:', userProfile.data)
            }
          } catch (profileErr) {
            console.error('获取用户详细信息失败:', profileErr)
          }
          
          alert('登录成功！')
          console.log('用户基本信息:', data.data)
          this.currentPage = 'home'
        } else {
          this.errors.password = data.msg || '登录失败'
        }
      } catch (err) {
        console.error('登录错误:', err)
        this.errors.password = '登录失败，请稍后重试'
      }
    },
    
    // 获取验证码
    getVerificationCode() {
      // 密码登录 - 验证码已由图形验证码提供，点击此按钮无效
      if (this.loginType === 'password') {
        this.errors.code = '请输入上方图形验证码'
        return
      }
      
      // 短信登录 - 生成短信验证码
      if (!this.form.phone) {
        this.errors.phone = '请输入手机号'
        return
      }
      
      // 模拟生成验证码
      const code = Math.floor(1000 + Math.random() * 9000).toString()
      this.generatedCode = code
      this.showCodeOnButton = true
      
      // 显示提示
      alert(`验证码已发送：${code}`)
      console.log('生成的验证码:', code)
      
      // 30秒后重置按钮
      setTimeout(() => {
        this.showCodeOnButton = false
      }, 30000)
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
}

.login-container {
  display: flex;
  width: 1200px;
  height: 675px;
  margin: auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.left-section {
  flex: 1;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 40px;
  overflow: hidden;
}

.left-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.left-header,
.left-content {
  position: relative;
  z-index: 2;
}

.left-header {
  text-align: left;
  margin-left: 8px;
  margin-top: 70px;
}

.title {
  font-size: 43.7px;
  font-weight: 700;
  font-family: "HYYakuHei";
  margin-bottom: 16px;
}

.sub-title-image {
  width: 200px;
  height: 30px;
}

.left-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-section {
  width: 700px;
  padding: 2rem;
  background: #fff;
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header-content {
  display: flex;
  flex-direction: row;
  margin-left: 120px;
  margin-top: 60px;
  align-items: center;
  gap: 8px;
}

.welcome-image {
  width: 111px;
  height: 25px;
}

.login-form-container {
  max-width: 400px;
  margin: 0 auto;
}

.card {
  max-width: 400px;
  margin: 15px auto;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.login-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.tab-button {
  flex: 1;
  padding: 10px 0;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 700;
  font-family: "HYYakuHei";
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.form-item {
  margin-bottom: 1rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  background: #F2F4F8;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
  background: #F2F4F8;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-with-icon:focus-within,
.password-input:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.input-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
}

.vector-icon {
  position: absolute;
  left: 36px;
  height: 17.5px;
}

.input-with-icon input,
.password-input input {
  width: 338px;
  height: 37px;
  padding: 8px 12px 8px 50px;
  border: none;
  font-size: 12.5px;
  transition: all 0.3s ease;
  background: transparent;
}

.input-with-icon input:focus,
.password-input input:focus {
  outline: none;
  background: transparent;
}

.input-with-icon input.error,
.password-input input.error {
  border: none;
}

.verification-code {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.verification-code input {
  flex: 1;
  height: 37px;
  padding: 8px 12px 8px 50px;
  border: none;
  font-size: 12.5px;
  transition: all 0.3s ease;
  background: #F2F4F8;
  border-radius: 4px;
  overflow: hidden;
}

.verification-code input:focus {
  outline: none;
  background: #F2F4F8;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.verification-code input.error {
  border: none;
}

.get-code-btn {
  width: 110px;
  height: 37px;
  border: none;
  border-radius: 4px;
  background: #F2F4F8;
  color: #478DF7;
  cursor: pointer;
  font-size: 12.5px;
  font-weight: bold;
}

.get-code-btn:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

.forgot-password {
  text-align: left;
  margin-bottom: 1rem;
}

.forgot-password a {
  color: #478DF7;
  text-decoration: none;
  font-weight: 400;
  font-size: 12.5px;
}

.login-button {
  width: 100%;
  height: 42px;
  background: #478DF7;
  color: white;
  border: none;
  border-radius: 23px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: #40a9ff;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 12.5px;
  color: #999;
}

.register-link a {
  color: #1890ff;
  text-decoration: none;
}

/* 图形验证码样式 */
.captcha-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.captcha-image {
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
}

.captcha-hint {
  margin-left: 12px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.back-home-wrap {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

.back-home-wrap a {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
}

.back-home-wrap a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
  
  .left-section {
    padding: 2rem;
  }
  
  .right-section {
    width: 100%;
  }
  
  .input-with-icon input,
  .password-input input,
  .verification-code input {
    width: 100%;
  }
}
</style>