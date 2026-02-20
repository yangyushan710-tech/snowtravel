/**
 * 身份验证相关 API
 */

import { mockCaptcha, mockUserProfile } from './mockData'

const API_BASE_URL = '/api'

const USE_MOCK_DATA = true

// 获取图形验证码
export async function getCaptcha(token = '') {
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockCaptcha
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/captcha`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token })
      }
    })
    
    if (!response.ok) {
      throw new Error(`获取图形验证码失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
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
    
    if (!response.ok) {
      throw new Error(`注册失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
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
    
    if (!response.ok) {
      throw new Error(`登录失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    return await response.json()
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

// 获取用户信息
export async function getUserProfile(userId, token = '') {
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockUserProfile
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        ...(token && { 'token': token })
      }
    })
    
    if (!response.ok) {
      throw new Error(`获取用户信息失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    return await response.json()
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw error
  }
}
