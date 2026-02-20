/**
 * 模拟API数据 - 用于前端开发测试
 * 当后端API未实现时，使用这些模拟数据
 */

export const mockTravelPlans = [
  {
    id: 1,
    title: '哈尔滨冰雪大世界5日游',
    description: '体验冰雪艺术，欣赏精美冰雕，感受北国风光',
    adultPrice: 2999,
    images: ['/image/Rectangle 34628276.png']
  },
  {
    id: 2,
    title: '长白山滑雪度假7日游',
    description: '长白山天池美景，专业滑雪场，温泉体验',
    adultPrice: 4599,
    images: ['/image/Rectangle 34628284.png']
  },
  {
    id: 3,
    title: '雪乡童话之旅4日游',
    description: '中国雪乡，童话世界，雪蘑菇，红灯笼',
    adultPrice: 2399,
    images: ['/image/Rectangle 34628285.png']
  },
  {
    id: 4,
    title: '漠河北极村6日游',
    description: '中国最北端，寻找北极光，体验极寒',
    adultPrice: 5299,
    images: ['/image/Rectangle 34628286.png']
  },
  {
    id: 5,
    title: '吉林雾凇岛3日游',
    description: '观赏雾凇奇观，体验东北民俗',
    adultPrice: 1899,
    images: ['/image/Rectangle 34628271.png']
  },
  {
    id: 6,
    title: '沈阳故宫+棋盘山5日游',
    description: '清代皇宫，棋盘山滑雪，东北美食',
    adultPrice: 2699,
    images: ['/image/Rectangle 34628273.png']
  }
]

export const mockCityInfo = {
  city: '北京市',
  province: '北京市',
  country: '中国'
}

export const mockCaptcha = {
  captchaId: 'mock-captcha-123',
  captchaImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
}

export const mockUserProfile = {
  userId: 'user-123',
  phone: '138****8888',
  nickname: '旅行达人',
  avatar: '/image/logo.jpg'
}
