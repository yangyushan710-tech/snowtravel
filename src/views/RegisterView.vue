<template>
  <div class="register-container">
    <div class="left-panel">
      <img src="/image/Rectangle .png" alt="background" class="left-image" />
      <div class="left-header">
        <p class="title">欢迎来到熊猫旅行</p>
        <img src="/image/自在游，安心享 (1).png" alt="自在游，安心享" class="sub-title-image" />
      </div>
    </div>
    <div class="right-panel">
      <div class="right-header">
        <img src="/image/welcome.png" alt="欢迎登录" class="welcome-header-image" />
        <p class="subtitle">做旅游攻略就找雪程搭子</p>
      </div>

      <div class="card">
        <h3 class="card-title">注册</h3>

        <div class="form-item">
          <div class="input-with-icon">
            <img src="/image/Group 1410084138.png" alt="手机号图标" class="input-icon" />
            <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
            <input type="text" placeholder="请输入手机号" v-model="form.phone" :class="{ error: phoneError }" />
          </div>
          <div v-if="phoneError" class="error-message">{{ phoneError }}</div>
        </div>

        <div class="form-item code-row">
          <div class="input-with-icon code-input-container">
            <img src="/image/Group 1410084140 (1).png" alt="验证码图标" class="input-icon" />
            <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
            <input type="text" placeholder="请输入验证码" v-model="form.code" :class="{ error: codeError }" />
          </div>
          <button 
            type="button"
            class="get-code" 
            @click="getVerificationCode"
            :disabled="showCodeOnButton"
          >
            {{ showCodeOnButton ? `${codeCountdown}s` : '获取验证码' }}
          </button>
        </div>
        <div v-if="codeError" class="error-message">{{ codeError }}</div>

        <div class="form-item">
          <div class="input-with-icon">
            <img src="/image/Group 1410084140.png" alt="密码图标" class="input-icon" />
            <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
            <input type="password" placeholder="设置登录密码" v-model="form.password" :class="{ error: passwordError }" />
          </div>
          <div v-if="passwordError" class="error-message">{{ passwordError }}</div>
        </div>

        <div class="form-item">
          <div class="input-with-icon">
            <img src="/image/Group 1410084140.png" alt="密码图标" class="input-icon" />
            <img src="/image/Vector 4.png" alt="分隔符" class="vector-icon" />
            <input type="password" placeholder="确认登录密码" v-model="form.confirmPassword" :class="{ error: confirmPasswordError }" />
          </div>
          <div v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</div>
        </div>

        <div class="forgot"><a href="#">忘记密码?</a></div>
        <button class="register-btn" @click="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
        <div class="have-account">已有账号？<a href="#" @click.prevent="$emit('back-to-login')">立即登录</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../api/auth.js'

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        phone: '',
        code: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      phoneError: '',
      codeError: '',
      passwordError: '',
      confirmPasswordError: '',
      codeCountdown: 0,
      showCodeOnButton: false
    }
  },
  methods: {
    // 获取短信验证码
    async getVerificationCode() {
      this.phoneError = ''
      this.codeError = ''
      
      if (!this.form.phone) {
        this.phoneError = '请先输入手机号'
        return
      }

      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(this.form.phone)) {
        this.phoneError = '请输入有效的手机号'
        return
      }

      // 向手机号发送短信验证码
      console.log('向', this.form.phone, '发送短信验证码')
      
      // 开始倒计时
      this.codeCountdown = 60
      this.showCodeOnButton = true
      const timer = setInterval(() => {
        this.codeCountdown--
        if (this.codeCountdown <= 0) {
          clearInterval(timer)
          this.showCodeOnButton = false
        }
      }, 1000)
    },

    // 注册
    async submit() {
      // 清空所有错误
      this.phoneError = ''
      this.codeError = ''
      this.passwordError = ''
      this.confirmPasswordError = ''
      
      // 验证手机号
      if (!this.form.phone) {
        this.phoneError = '请输入手机号'
        return
      }
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(this.form.phone)) {
        this.phoneError = '请输入有效的手机号'
        return
      }

      // 验证验证码
      if (!this.form.code) {
        this.codeError = '请输入验证码'
        return
      }

      // 验证密码
      if (!this.form.password) {
        this.passwordError = '请设置登录密码'
        return
      }
      if (this.form.password.length < 6) {
        this.passwordError = '密码长度至少为6位'
        return
      }

      // 验证确认密码
      if (!this.form.confirmPassword) {
        this.confirmPasswordError = '请确认登录密码'
        return
      }
      if (this.form.password !== this.form.confirmPassword) {
        this.confirmPasswordError = '两次密码不一致'
        return
      }

      this.loading = true

      try {
        const data = await register(
          this.form.phone,
          this.form.password,
          this.form.code
        )
        
        if (data.code === 200 || data.code === 0) {
          alert('注册成功，请登录')
          this.$emit('back-to-login')
        } else {
          // 显示通用错误（可能是后端返回的错误）
          this.phoneError = data.msg || '注册失败'
        }
      } catch (err) {
        console.error('注册错误:', err)
        this.phoneError = '注册失败，请稍后重试'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-container{
  display:flex;
  width:1200px;
  height:675px;
  margin:0 auto;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}
.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f9ff;
}
.left-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.left-panel {
  position: relative;
}

.left-header {
  position: absolute;
  left: 3rem;
  top: 7rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.left-header .title {
  font-weight: 700;
  font-size: 43px;
  color: #1f76e6;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.sub-title-image {
  width: 200px;
  height: 30px;
  display: block;
}

.right-panel {
  width: 700px;
  padding: 2rem;
  background: #fff;
}

.right-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 40px;
  margin-left: 80px;
}

.welcome-header-image {
  width: 111px;
  height: 25px;
  margin-bottom: -10px;;
  margin-left: 2.3rem;
  display: inline-block;
}

.right-header .subtitle {
  color: #999;
  margin-bottom: -16px;
}

.card {
  max-width: 400px;
  margin: 30px auto;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-title {
  margin: 0 0 12px 0;
}

.form-item {
  margin-bottom: 20px;
}

.input-with-icon {
  display: flex;
  align-items: center;
  background: #F2F4F8;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.input-with-icon:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.input-icon {
  width: 16px;
  height: 16px;
  margin-left: 12px;
  flex-shrink: 0;
}

.vector-icon {
  height: 17.5px;
  margin: 0 8px;
  flex-shrink: 0;
}

.input-with-icon input {
  flex: 1;
  height: 38px;
  padding: 8px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 12.5px;
}

.code-input-container {
  width: 258.7px;
}

.form-item input {
  width: 100%;
  height: 38px;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background: #F2F4F8;
  transition: all 0.3s ease;
}

.form-item input:focus {
  outline: none;
  background: #F2F4F8;
}

.code-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.get-code {
  width: 110px;
  height: 38px;
  border-radius: 4px;
  border: none;
  background: #F2F4F8;
  color: #478DF7;
  font-size: 10px;
  font-weight: bold;
}

.forgot {
  text-align: left;
  margin-bottom: 8px;
  font-size: 12.5px;
}

.forgot a {
  color: #478DF7;
  text-decoration: none;
}

.register-btn {
  width: 100%;
  height: 42px;
  border-radius: 23px;
  border: none;
  background: #478DF7;
  color: #fff;
  margin-top: 8px;
}

.have-account {
  text-align: center;
  margin-top: 15px;
  color: #999;
  font-size: 12.5px;
}

.have-account a {
  color: #478DF7;
  text-decoration: none;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 4px;
}

.captcha-item {
  margin-bottom: 12px;
}

.captcha-item label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.captcha-image {
  width: 100%;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #E5E8F1;
  object-fit: contain;
  background: #F2F4F8;
}

.captcha-hint {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.get-code:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
