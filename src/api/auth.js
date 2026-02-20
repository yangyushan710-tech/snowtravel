/**
 * 身份验证相关 API
 */

const API_BASE_URL = '/api'

// 获取图形验证码
export async function getCaptcha(token = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/captcha`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token })
      }
    })
    return await response.json()
  } catch (error) {
    console.error('获取图形验证码失败:', error)
    throw error
  }
}

// 用户注册
export async function register(phone, password, code, token = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token })
      },
      body: JSON.stringify({
        phone,
        password,
        code
      })
    })
    return await response.json()
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}

// 密码登录
export async function loginWithPassword(phone, password, captcha, token = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token })
      },
      body: JSON.stringify({
        phone,
        password,
        captcha
      })
    })
    return await response.json()
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

// 获取用户信息
export async function getUserProfile(userId, token = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        ...(token && { 'token': token })
      }
    })
    return await response.json()
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}
