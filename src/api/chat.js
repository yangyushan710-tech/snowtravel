const API_BASE_URL = '/api'
const USE_MOCK_DATA = true

const mockResponses = [
  '您好！关于东北旅游，我可以为您提供很多建议。您想了解哪个方面的信息呢？',
  '东北冬季旅游的最佳时间是12月至次年2月，这时候可以欣赏到最美的冰雪景观。建议您提前预订酒店和门票。',
  '哈尔滨冰雪大世界是必去的景点！建议您穿保暖的羽绒服和防滑鞋，室内外温差很大，要注意保暖。',
  '长白山天池是自然奇观，建议您提前查看天气预报，选择晴朗的日子前往，这样可以看到完整的天池美景。',
  '东北美食推荐：哈尔滨红肠、锅包肉、马迭尔冰棍、东北乱炖、酸菜白肉血肠等，都是非常有特色的美食。',
  '关于滑雪，亚布力滑雪场是很好的选择，有适合初学者的初级道，也有适合专业人士的高级道。',
  '东北冬季气温很低，建议您准备：羽绒服、保暖内衣、帽子、手套、围巾、雪地靴等保暖用品。',
  '漠河是中国最北端的城市，如果您想体验极光，建议在12月至次年1月前往，虽然极光不一定能看到，但可以体验极夜现象。',
  '关于交通，东北城市之间有高铁连接，非常方便。冬季自驾需要更换雪地胎，并关注天气情况。',
  '如果您计划前往边境地区，需要提前办理《边境管理区通行证》，可以在当地办理。'
]

export async function sendChatMessage(message) {
  if (USE_MOCK_DATA) {
    console.log('使用模拟数据')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const randomIndex = Math.floor(Math.random() * mockResponses.length)
    return {
      message: mockResponses[randomIndex]
    }
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    })
    
    if (!response.ok) {
      throw new Error(`发送消息失败: ${response.status}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('返回的不是JSON数据:', text.substring(0, 200))
      throw new Error('后端API未实现，请先启动后端服务')
    }
    
    return await response.json()
  } catch (error) {
    console.error('发送消息失败:', error)
    throw error
  }
}
