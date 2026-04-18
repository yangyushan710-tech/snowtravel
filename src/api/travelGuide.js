/**
 * 旅游攻略相关 API
 * Travel Guide API
 */

const API_BASE_URL = 'http://test-cn.your-api-server.com/api'
const USE_MOCK_DATA = true

// 模拟专题列表数据
const mockSubjects = () => {
  return [
    {
      id: 1,
      title: '索菲亚大教堂',
      desc: '拜占庭风格东正教堂',
      img: '/image/Mask group (1).png',
      location: '哈尔滨',
      category: '建筑'
    },
    {
      id: 2,
      title: '长白山',
      desc: '天池雪景',
      img: '/image/Rectangle 34628259.png',
      location: '吉林',
      category: '自然风光'
    },
    {
      id: 3,
      title: '哈尔滨冰雪大世界',
      desc: '享受冰雪乐园',
      img: '/image/Rectangle 34628257.png',
      location: '哈尔滨',
      category: '主题乐园'
    },
    {
      id: 4,
      title: '哈尔滨',
      desc: '济南出发黑龙江4晚3天跟团游',
      img: '/image/Rectangle 34628258.png',
      location: '哈尔滨',
      category: '旅游路线'
    },
    {
      id: 5,
      title: '亚布力滑雪场',
      desc: '中国现代滑雪运动的发源地',
      img: '/image/Rectangle 34628261.png',
      location: '黑龙江',
      category: '运动休闲'
    }
  ]
}

/**
 * 获取专题列表（Travel Guide）
 * @param {Object} params - 查询参数
 * @param {string} params.token - 用户认证token（可选）
 * @returns {Promise<Array>} 专题列表数据
 */
export async function getSubjects(params = {}) {
  const { token = '' } = params
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据获取专题列表')
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockSubjects()
  }
  
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    // 如果提供了token，添加到请求头
    if (token) {
      headers['token'] = token
    }
    
    const response = await fetch(`${API_BASE_URL}/subjects`, {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('专题列表获取成功:', data)
    return data
  } catch (err) {
    console.error('获取专题列表失败:', err)
    // 使用mock数据作为 fallback
    return mockSubjects()
  }
}

/**
 * 根据ID获取单个专题详情
 * @param {number} id - 专题ID
 * @param {Object} params - 其他参数
 * @param {string} params.token - 用户认证token（可选）
 * @returns {Promise<Object>} 专题详情
 */
export async function getSubjectById(id, params = {}) {
  const { token = '' } = params
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据获取专题详情')
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const subjects = mockSubjects()
    const subject = subjects.find(s => s.id === parseInt(id))
    
    if (subject) {
      return {
        ...subject,
        detail: `${subject.title}是东北地区著名的旅游景点，吸引了大量游客前来观光。`,
        images: [subject.img],
        tags: [subject.category, subject.location]
      }
    }
    
    throw new Error('专题不存在')
  }
  
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['token'] = token
    }
    
    const response = await fetch(`${API_BASE_URL}/subjects/${id}`, {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('专题详情获取成功:', data)
    return data
  } catch (err) {
    console.error('获取专题详情失败:', err)
    throw err
  }
}

/**
 * 搜索专题
 * @param {string} keyword - 搜索关键词
 * @param {Object} params - 其他参数
 * @param {string} params.token - 用户认证token（可选）
 * @returns {Promise<Array>} 搜索结果
 */
export async function searchSubjects(keyword, params = {}) {
  const { token = '' } = params
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据搜索专题')
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const subjects = mockSubjects()
    const results = subjects.filter(s => 
      s.title.includes(keyword) || 
      s.desc.includes(keyword) ||
      s.location.includes(keyword)
    )
    
    return results
  }
  
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (token) {
      headers['token'] = token
    }
    
    const queryParams = new URLSearchParams({ keyword })
    
    const response = await fetch(`${API_BASE_URL}/subjects/search?${queryParams}`, {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('专题搜索成功:', data)
    return data
  } catch (err) {
    console.error('搜索专题失败:', err)
    return []
  }
}