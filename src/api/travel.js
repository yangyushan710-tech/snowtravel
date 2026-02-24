/**
 * 旅行相关 API
 */

import { mockTravelPlans, mockCityInfo, mockRecommendedRoutes, mockHomePageData, mockUserProfile, mockRouteDetails, mockArticles } from './mockData.js'

const API_BASE_URL = 'http://test-cn.your-api-server.com/api'

const USE_MOCK_DATA = true

/**
 * 获取用户当前位置城市
 * @returns {Promise<Object>} - 返回城市信息 { city: string, province: string, country: string }
 */
export async function getCurrentLocation() {
  console.log('getCurrentLocation 函数被调用')
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockCityInfo
  }
  
  try {
    if (!navigator.geolocation) {
      throw new Error('浏览器不支持地理位置服务')
    }
    
    console.log('浏览器支持地理位置，开始获取位置...')
    
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            console.log('获取到地理位置:', latitude, longitude)
            
            const response = await fetch(`${API_BASE_URL}/location/city`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                latitude,
                longitude
              })
            })
            
            if (!response.ok) {
              throw new Error(`获取城市信息失败: ${response.status}`)
            }
            
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
              const text = await response.text()
              console.error('返回的不是JSON数据:', text.substring(0, 200))
              throw new Error('后端API未实现，请先启动后端服务')
            }
            
            const data = await response.json()
            console.log('获取到城市信息:', data)
            resolve(data)
          } catch (error) {
            console.error('获取城市信息失败:', error)
            reject(error)
          }
        },
        (error) => {
          console.error('获取地理位置失败:', error)
          console.error('错误代码:', error.code)
          console.error('错误消息:', error.message)
          
          let errorMessage = '无法获取您的位置，请检查浏览器权限设置'
          if (error.code === 1) {
            errorMessage = '您拒绝了位置权限请求'
          } else if (error.code === 2) {
            errorMessage = '无法获取位置信息'
          } else if (error.code === 3) {
            errorMessage = '获取位置超时'
          }
          
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    })
  } catch (error) {
    console.error('定位失败:', error)
    throw error
  }
}

/**
 * 搜索旅行计划
 * @param {Object} params - 搜索参数
 * @param {string} params.departureCity - 出发城市
 * @param {string} params.destination - 目的地
 * @param {string} params.startDate - 开始日期
 * @param {string} params.endDate - 结束日期
 * @param {string} params.travelPeople - 人数
 * @returns {Promise<Array>} - 返回旅行计划数组
 */
export async function searchTravelPlan(params) {
  console.log('searchTravelPlan 函数被调用')
  console.log('搜索参数:', params)
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1500))
    return mockTravelPlans
  }
  
  try {
    const queryParams = new URLSearchParams()
    
    if (params.departureCity) {
      queryParams.append('departureCity', params.departureCity)
    }
    if (params.destination) {
      queryParams.append('destination', params.destination)
    }
    if (params.startDate) {
      queryParams.append('startDate', params.startDate)
    }
    if (params.endDate) {
      queryParams.append('endDate', params.endDate)
    }
    if (params.travelPeople) {
      queryParams.append('travelPeople', params.travelPeople)
    }
    
    const url = `${API_BASE_URL}/search/travel-plan?${queryParams.toString()}`
    console.log('请求URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`搜索失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('搜索结果数据:', data)
    return data
  } catch (error) {
    console.error('搜索旅行计划失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}

/**
 * 获取推荐路线
 * @returns {Promise<Array>} - 返回推荐路线数组
 */
export async function getRecommendedRoutes() {
  console.log('getRecommendedRoutes 函数被调用')
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockRecommendedRoutes
  }
  
  try {
    const url = `${API_BASE_URL}/routes/recommended`
    console.log('请求URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`获取推荐路线失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('获取到推荐路线:', data)
    return data
  } catch (error) {
    console.error('获取推荐路线失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}

/**
 * 获取首页整页数据
 * @returns {Promise<Object>} - 返回首页整页数据
 */
export async function getHomePageData() {
  console.log('getHomePageData 函数被调用')
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockHomePageData
  }
  
  try {
    const url = `${API_BASE_URL}/home/snow-ice`
    console.log('请求URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`获取首页数据失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('获取到首页数据:', data)
    return data
  } catch (error) {
    console.error('获取首页数据失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}

/**
 * 获取用户信息
 * @param {number} userId - 用户ID
 * @param {string} [token] - 认证token
 * @returns {Promise<Object>} - 返回用户信息
 */
export async function getUserProfile(userId, token = '') {
  console.log('getUserProfile 函数被调用')
  console.log('用户ID:', userId)
  console.log('Token:', token)
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 800))
    return mockUserProfile
  }
  
  try {
    const url = `${API_BASE_URL}/user/profile/${userId}`
    console.log('请求URL:', url)
    
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['token'] = token
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`获取用户信息失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('获取到用户信息:', data)
    return data
  } catch (error) {
    console.error('获取用户信息失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}

/**
 * 获取路线详情
 * @param {number} routeId - 路线ID
 * @returns {Promise<Object>} - 返回路线详情
 */
export async function getRouteDetails(routeId) {
  console.log('getRouteDetails 函数被调用')
  console.log('路线ID:', routeId)
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 800))
    const routeDetails = mockRouteDetails[routeId]
    if (!routeDetails) {
      throw new Error('路线不存在')
    }
    return routeDetails
  }
  
  try {
    const url = `${API_BASE_URL}/routes/${routeId}`
    console.log('请求URL:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`获取路线详情失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('获取到路线详情:', data)
    return data
  } catch (error) {
    console.error('获取路线详情失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}

/**
 * 获取文章列表
 * @param {number} page - 页码，默认1
 * @param {number} pageSize - 每页数量，默认11
 * @returns {Promise<Array>} - 返回文章列表数组
 */
export async function fetchArticles(page = 1, pageSize = 11) {
  console.log('fetchArticles 函数被调用')
  console.log('请求参数:', { page, pageSize })
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1000))
    return mockArticles
  }
  
  try {
    // 准备请求参数
    const requestData = {
      pageSize,
      page
    }
    
    // 准备请求头
    const myHeaders = new Headers()
    myHeaders.append('token', 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NjQ3NTk4ODIsInVzZXJJcCI6MTYwMTk1MTgwMV0.P-yF7qEFER5WauzPmwHsdhIUYP3DLEJN8B louRg')
    myHeaders.append('Content-Type', 'application/json')
    
    // 发送请求
    const response = await fetch(`${API_BASE_URL}/articles?page=${page}&size=${pageSize}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
    
    console.log('响应状态:', response.status)
    
    if (!response.ok) {
      throw new Error(`获取文章列表失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    const data = await response.json()
    console.log('获取到文章列表:', data)
    return data
  } catch (error) {
    console.error('获取文章列表失败:', error)
    console.error('错误详情:', error.message)
    throw error
  }
}
