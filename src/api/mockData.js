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
  id: 1,
  username: '旅行者小明',
  nickname: '旅行达人',
  avatar: '/image/logo.jpg',
  email: 'traveler@example.com',
  phone: '138****8888',
  bio: '热爱旅行，探索世界的每一个角落',
  memberLevel: 'VIP',
  points: 1280,
  joinDate: '2025-01-15'
}

// 密码登录模拟数据
export const mockPasswordLogin = {
  code: 200,
  msg: '登录成功',
  data: {
    id: 1,
    phone: '13800138000',
    name: '旅行者小明',
    userName: 'traveler',
    token: 'mock-token-123456789',
    expire: 86400 // 24小时过期
  }
}

// 用户注册模拟数据
export const mockRegister = {
  code: 200,
  msg: '注册成功',
  data: {
    id: 2,
    phone: '18556736228',
    name: '新用户',
    userName: 'newuser',
    token: 'mock-token-987654321',
    expire: 86400 // 24小时过期
  }
}

export const mockRecommendedRoutes = [
  {
    id: 1,
    title: '经典滑雪路线',
    description: '适合初学者到中级滑雪爱好者的经典路线',
    duration: '3天2晚',
    difficulty: '中等',
    distance: '120公里',
    highlights: ['专业滑雪场', '温泉度假', '冰雪乐园'],
    image: '/image/Rectangle 34628276.png'
  },
  {
    id: 2,
    title: '冰雪奇缘路线',
    description: '体验童话般的冰雪世界，适合家庭出游',
    duration: '4天3晚',
    difficulty: '轻松',
    distance: '180公里',
    highlights: ['冰雪大世界', '雪乡', '雾凇岛'],
    image: '/image/Rectangle 34628285.png'
  },
  {
    id: 3,
    title: '极限挑战路线',
    description: '适合高级滑雪爱好者的极限挑战路线',
    duration: '5天4晚',
    difficulty: '困难',
    distance: '260公里',
    highlights: ['高级雪道', '野外滑雪', '山地温泉'],
    image: '/image/Rectangle 34628284.png'
  }
]

export const mockHomePageData = {
  hero: {
    title: '自在游，安心享',
    subtitle: '探索冰雪世界的奇妙之旅',
    image: '/image/welcome.png'
  },
  travelGuide: {
    title: '旅行指南',
    items: [
      {
        id: 1,
        title: '出行准备',
        description: '必备物品清单、证件准备',
        image: '/image/Frame 1597884336.png'
      },
      {
        id: 2,
        title: '交通指南',
        description: '机场接送、当地交通',
        image: '/image/Frame 1597884340.png'
      },
      {
        id: 3,
        title: '住宿推荐',
        description: '特色酒店、民宿推荐',
        image: '/image/Frame 1597884346.png'
      }
    ]
  },
  recommendedRoutes: mockRecommendedRoutes,
  scenicSpots: {
    title: '热门景点',
    spots: [
      {
        id: 1,
        name: '冰雪大世界',
        description: '世界最大的冰雪主题乐园',
        image: '/image/Rectangle 34628276.png',
        rating: 4.8
      },
      {
        id: 2,
        name: '雪乡',
        description: '童话般的冰雪世界',
        image: '/image/Rectangle 34628285.png',
        rating: 4.7
      },
      {
        id: 3,
        name: '长白山',
        description: '神秘的雪山天池',
        image: '/image/Rectangle 34628284.png',
        rating: 4.9
      }
    ]
  },
  winterActivities: {
    title: '冬季活动',
    activities: [
      {
        id: 1,
        name: '滑雪',
        description: '体验速度与激情',
        image: '/image/Group 1410084058.png'
      },
      {
        id: 2,
        name: '冰雕',
        description: '欣赏精美的冰雕艺术',
        image: '/image/Group 1410084059.png'
      },
      {
        id: 3,
        name: '温泉',
        description: '在冰天雪地中享受温泉',
        image: '/image/Group 1410084060.png'
      }
    ]
  },
  travelServices: {
    title: '出行服务',
    services: [
      {
        id: 1,
        name: '机票预订',
        description: '便捷的机票预订服务',
        icon: '/image/Group 1410084043 (1).png'
      },
      {
        id: 2,
        name: '酒店预订',
        description: '精选优质酒店',
        icon: '/image/Group 1410084044 (1).png'
      },
      {
        id: 3,
        name: '当地向导',
        description: '专业的当地向导服务',
        icon: '/image/Group 1410084043 (1).png'
      },
      {
        id: 4,
        name: '交通租赁',
        description: '便捷的交通租赁服务',
        icon: '/image/Group 1410084044 (1).png'
      }
    ]
  },
  footer: {
    logo: '/image/logo.jpg',
    links: [
      {
        title: '关于我们',
        url: '#'
      },
      {
        title: '联系方式',
        url: '#'
      },
      {
        title: '服务条款',
        url: '#'
      },
      {
        title: '隐私政策',
        url: '#'
      }
    ],
    social: [
      {
        name: '微信',
        icon: '/image/Vector (1).png'
      },
      {
        name: '微博',
        icon: '/image/Vector (2).png'
      },
      {
        name: '抖音',
        icon: '/image/douyin 2.png'
      }
    ],
    copyright: '© 2026 冰雪旅行. 保留所有权利.'
  }
}

// 路线详情数据
export const mockRouteDetails = {
  1: {
    id: 1,
    title: '经典滑雪路线',
    description: '适合初学者到中级滑雪爱好者的经典路线',
    duration: '3天2晚',
    difficulty: '中等',
    distance: '120公里',
    highlights: ['专业滑雪场', '温泉度假', '冰雪乐园'],
    images: [
      '/image/Rectangle 34628276.png',
      '/image/Rectangle 34628284.png',
      '/image/Rectangle 34628285.png'
    ],
    itinerary: [
      {
        day: 1,
        title: '抵达滑雪场',
        activities: ['机场接送', '入住酒店', '自由活动']
      },
      {
        day: 2,
        title: '全天滑雪',
        activities: ['专业教练指导', '午餐', '温泉放松']
      },
      {
        day: 3,
        title: '返程',
        activities: ['早餐', '自由活动', '送机']
      }
    ],
    price: {
      adult: 2999,
      child: 1999,
      include: ['住宿', '早餐', '滑雪场门票', '机场接送'],
      exclude: ['午餐', '晚餐', '个人消费']
    },
    bookingInfo: {
      minParticipants: 2,
      cancellationPolicy: '出发前7天可免费取消',
      bestTime: '12月至次年3月'
    }
  },
  2: {
    id: 2,
    title: '冰雪奇缘路线',
    description: '体验童话般的冰雪世界，适合家庭出游',
    duration: '4天3晚',
    difficulty: '轻松',
    distance: '180公里',
    highlights: ['冰雪大世界', '雪乡', '雾凇岛'],
    images: [
      '/image/Rectangle 34628285.png',
      '/image/Rectangle 34628276.png',
      '/image/Rectangle 34628271.png'
    ],
    itinerary: [
      {
        day: 1,
        title: '抵达哈尔滨',
        activities: ['机场接送', '入住酒店', '冰雪大世界']
      },
      {
        day: 2,
        title: '雪乡之旅',
        activities: ['前往雪乡', '雪乡游览', '篝火晚会']
      },
      {
        day: 3,
        title: '雾凇岛',
        activities: ['早起看雾凇', '雾凇岛游览', '返回哈尔滨']
      },
      {
        day: 4,
        title: '返程',
        activities: ['早餐', '自由活动', '送机']
      }
    ],
    price: {
      adult: 3999,
      child: 2599,
      include: ['住宿', '早餐', '景区门票', '交通'],
      exclude: ['午餐', '晚餐', '个人消费']
    },
    bookingInfo: {
      minParticipants: 1,
      cancellationPolicy: '出发前5天可免费取消',
      bestTime: '12月至次年2月'
    }
  },
  3: {
    id: 3,
    title: '极限挑战路线',
    description: '适合高级滑雪爱好者的极限挑战路线',
    duration: '5天4晚',
    difficulty: '困难',
    distance: '260公里',
    highlights: ['高级雪道', '野外滑雪', '山地温泉'],
    images: [
      '/image/Rectangle 34628284.png',
      '/image/Rectangle 34628286.png',
      '/image/Rectangle 34628273.png'
    ],
    itinerary: [
      {
        day: 1,
        title: '抵达长白山',
        activities: ['机场接送', '入住度假村', '装备检查']
      },
      {
        day: 2,
        title: '高级雪道体验',
        activities: ['高级雪道滑雪', '午餐', '技术指导']
      },
      {
        day: 3,
        title: '野外滑雪',
        activities: ['野外滑雪体验', '安全培训', '温泉放松']
      },
      {
        day: 4,
        title: '自由滑雪',
        activities: ['自由滑雪', '滑雪比赛', '颁奖晚宴']
      },
      {
        day: 5,
        title: '返程',
        activities: ['早餐', '自由活动', '送机']
      }
    ],
    price: {
      adult: 5999,
      child: 3999,
      include: ['豪华住宿', '全餐', '专业装备', '机场接送'],
      exclude: ['个人消费', '额外保险']
    },
    bookingInfo: {
      minParticipants: 3,
      cancellationPolicy: '出发前10天可免费取消',
      bestTime: '12月至次年3月'
    }
  }
}
