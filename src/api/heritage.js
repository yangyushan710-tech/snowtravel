/**
 * 非遗相关 API
 */

const API_BASE_URL = 'http://test-cn.your-api-server.com/api'
const USE_MOCK_DATA = true

// 模拟非遗文章详情数据
const mockArticleDetail = (id) => {
  return {
    id: parseInt(id),
    title: '东北非遗文化保护与传承',
    content: '本文详细介绍了东北三省的非物质文化遗产保护现状、面临的挑战以及未来的发展方向。',
    author: '文化遗产保护专家',
    publishDate: '2026-02-24',
    heritageItems: [
      {
        id: 1,
        name: '东北大秧歌',
        description: '东北大秧歌是一种古老的民间舞蹈形式，具有浓郁的地方特色和文化内涵。',
        image: '/image/Rectangle 26.png'
      },
      {
        id: 2,
        name: '长白山放山文化',
        description: '长白山放山文化是东北地区特有的采参习俗，蕴含着丰富的生态智慧和文化传统。',
        image: '/image/Rectangle 27.png'
      },
      {
        id: 3,
        name: '营口木浮雕',
        description: '营口木浮雕是一种精细的传统雕刻工艺，以其独特的艺术风格和精湛的技艺著称。',
        image: '/image/Rectangle 28.png'
      }
    ]
  }
}

// 获取非遗文章详情
/**
 * 获取非遗文章详情
 * @param {number} id - 文章ID
 * @returns {Promise<Object>} 文章详情数据
 */
export async function getArticleDetail(id) {
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据获取非遗文章详情')
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockArticleDetail(id)
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('非遗文章详情获取成功:', data)
    return data
  } catch (err) {
    console.error('获取非遗文章详情失败:', err)
    // 使用mock数据作为 fallback
    return mockArticleDetail(id)
  }
}

// 获取非遗项目列表
/**
 * 获取非遗项目列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @param {string} params.category - 分类
 * @returns {Promise<Array>} 非遗项目列表
 */
export async function getHeritageList(params = {}) {
  const { page = 1, limit = 10, category = '' } = params
  
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据获取非遗项目列表')
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟非遗项目列表数据
    const mockHeritageList = [
      {
        id: 1,
        name: '东北大秧歌',
        category: '舞蹈',
        region: '东北三省',
        description: '东北大秧歌是一种古老的民间舞蹈形式，具有浓郁的地方特色和文化内涵。',
        image: '/image/Rectangle 26.png',
        status: 'active'
      },
      {
        id: 2,
        name: '长白山放山文化',
        category: '习俗',
        region: '吉林',
        description: '长白山放山文化是东北地区特有的采参习俗，蕴含着丰富的生态智慧和文化传统。',
        image: '/image/Rectangle 27.png',
        status: 'active'
      },
      {
        id: 3,
        name: '营口木浮雕',
        category: '工艺',
        region: '辽宁',
        description: '营口木浮雕是一种精细的传统雕刻工艺，以其独特的艺术风格和精湛的技艺著称。',
        image: '/image/Rectangle 28.png',
        status: 'active'
      }
    ]
    
    return {
      list: mockHeritageList,
      total: mockHeritageList.length,
      page,
      limit,
      totalPages: Math.ceil(mockHeritageList.length / limit)
    }
  }
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category })
    })
    
    const response = await fetch(`${API_BASE_URL}/heritage?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('非遗项目列表获取成功:', data)
    return data
  } catch (err) {
    console.error('获取非遗项目列表失败:', err)
    // 返回空列表作为 fallback
    return {
      list: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    }
  }
}

// 搜索非遗项目
/**
 * 搜索非遗项目
 * @param {string} keyword - 搜索关键词
 * @param {Object} params - 其他查询参数
 * @returns {Promise<Array>} 搜索结果
 */
export async function searchHeritage(keyword, params = {}) {
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据搜索非遗项目')
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟搜索结果
    const mockSearchResults = [
      {
        id: 1,
        name: '东北大秧歌',
        category: '舞蹈',
        region: '东北三省',
        description: '东北大秧歌是一种古老的民间舞蹈形式，具有浓郁的地方特色和文化内涵。',
        image: '/image/Rectangle 26.png',
        matchScore: 0.95
      },
      {
        id: 2,
        name: '长白山放山文化',
        category: '习俗',
        region: '吉林',
        description: '长白山放山文化是东北地区特有的采参习俗，蕴含着丰富的生态智慧和文化传统。',
        image: '/image/Rectangle 27.png',
        matchScore: 0.87
      }
    ]
    
    return {
      results: mockSearchResults,
      total: mockSearchResults.length,
      keyword
    }
  }
  
  try {
    const queryParams = new URLSearchParams({
      keyword,
      ...params
    })
    
    const response = await fetch(`${API_BASE_URL}/heritage/search?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('非遗项目搜索成功:', data)
    return data
  } catch (err) {
    console.error('搜索非遗项目失败:', err)
    // 返回空结果作为 fallback
    return {
      results: [],
      total: 0,
      keyword
    }
  }
}