/**
 * AI智能推荐引擎
 * 根据用户偏好提供个性化冰雪旅游推荐和路线规划
 */

// 冰雪旅游目的地数据库
const snowDestinations = {
  harbin: {
    name: '哈尔滨',
    province: '黑龙江',
    highlight: '冰雪艺术',
    description: '中国冰城，以冰雕和雪雕艺术闻名',
    bestTime: '12月-2月',
    temperature: '-15℃ ~ -25℃',
    attractions: [
      { name: '冰雪大世界', duration: '4小时', type: '冰雪艺术' },
      { name: '太阳岛雪博会', duration: '3小时', type: '雪雕' },
      { name: '索菲亚大教堂', duration: '2小时', type: '文化景观' },
      { name: '中央大街', duration: '2小时', type: '商业街' }
    ],
    accommodation: ['五星酒店', '四星酒店', '民宿'],
    dining: ['东北乱炖', '哈尔滨红肠', '锅包肉', '马迭尔冰棍'],
    recommendedDays: 4,
    suitable: ['赏雪', '摄影', '亲子']
  },
  
  changbaishan: {
    name: '长白山',
    province: '吉林',
    highlight: '天池奇观',
    description: '中国最高的火山，冬季天池冰雪壮观',
    bestTime: '12月-2月',
    temperature: '-20℃ ~ -30℃',
    attractions: [
      { name: '天池', duration: '3小时', type: '自然景观' },
      { name: '瀑布', duration: '2小时', type: '自然景观' },
      { name: '温泉', duration: '2小时', type: '温泉' },
      { name: '滑雪', duration: '全天', type: '滑雪' }
    ],
    accommodation: ['山区酒店', '温泉酒店', '民宿'],
    dining: ['山珍野味', '温泉鱼', '东北菜'],
    recommendedDays: 3,
    suitable: ['滑雪', '温泉', '赏雪', '摄影']
  },
  
  yabuali: {
    name: '亚布力',
    province: '黑龙江',
    highlight: '滑雪天堂',
    description: '中国最大的滑雪场，适合各级滑雪爱好者',
    bestTime: '12月-2月',
    temperature: '-10℃ ~ -20℃',
    attractions: [
      { name: '高级滑雪道', duration: '全天', type: '滑雪' },
      { name: '中级滑雪道', duration: '全天', type: '滑雪' },
      { name: '初级滑雪道', duration: '全天', type: '滑雪' },
      { name: '雪地越野', duration: '3小时', type: '运动' }
    ],
    accommodation: ['滑雪度假酒店', '山区旅馆'],
    dining: ['东北菜', '快餐'],
    recommendedDays: 2,
    suitable: ['滑雪', '亲子', '运动爱好者']
  },
  
  xuexiang: {
    name: '雪乡（双峰林场）',
    province: '黑龙江',
    highlight: '童话世界',
    description: '童话般的雪景，冬季积雪深厚',
    bestTime: '1月-2月',
    temperature: '-20℃ ~ -30℃',
    attractions: [
      { name: '梦幻家园', duration: '2小时', type: '景观' },
      { name: '雪乡风景', duration: '全天', type: '摄影' },
      { name: '篝火晚会', duration: '2小时', type: '文娱' },
      { name: '雪橇', duration: '2小时', type: '运动' }
    ],
    accommodation: ['雪乡民宿', '温馨客栈'],
    dining: ['农家菜', '东北特色'],
    recommendedDays: 2,
    suitable: ['赏雪', '摄影', '亲子']
  },
  
  mohe: {
    name: '漠河',
    province: '黑龙江',
    highlight: '极光之地',
    description: '中国最北端，有机会看到北极光',
    bestTime: '11月-1月',
    temperature: '-30℃ ~ -50℃',
    attractions: [
      { name: '北极村', duration: '2小时', type: '景观' },
      { name: '北极光观赏', duration: '4小时', type: '自然现象' },
      { name: '极夜体验', duration: '全天', type: '体验' }
    ],
    accommodation: ['民宿', '招待所'],
    dining: ['东北菜', '当地特色'],
    recommendedDays: 3,
    suitable: ['摄影', '探险', '赏雪']
  }
}

// 用户偏好映射到目的地
const preferenceDestinationMap = {
  '滑雪': ['yabuali', 'changbaishan'],
  '赏雪': ['xuexiang', 'harbin', 'mohe'],
  '温泉': ['changbaishan'],
  '亲子': ['harbin', 'yabuali', 'xuexiang'],
  '摄影': ['xuexiang', 'mohe', 'changbaishan'],
  '极光': ['mohe'],
  '冰雕': ['harbin']
}

// 聊天上下文
let conversationContext = {
  origin: null,
  days: null,
  budget: null,
  people: null,
  preferences: [],
  recommendedDestinations: [],
  itinerary: null
}

/**
 * 重置对话上下文
 */
export function resetContext() {
  conversationContext = {
    origin: null,
    days: null,
    budget: null,
    people: null,
    preferences: [],
    recommendedDestinations: [],
    itinerary: null
  }
}

/**
 * 获取初始欢迎信息
 */
export function getWelcomeMessage() {
  return `🎿 欢迎来到冰雪旅游智能推荐助手！\n\n我可以帮您：\n✅ 推荐适合的冰雪旅游目的地\n✅ 生成详细的每日行程安排\n✅ 提供穿搭、安全、装备建议\n\n请告诉我您的基本信息：\n1️⃣ 您的出发地是哪里？\n2️⃣ 计划出行几天？\n3️⃣ 预算范围是多少？(如：5000元)\n4️⃣ 有几个人出行？\n5️⃣ 您的偏好是什么？(如：滑雪、赏雪、温泉、亲子、摄影等)\n\n请按顺序告诉我这些信息～`
}

/**
 * 智能对话处理
 */
export async function processUserInput(userMessage) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const message = userMessage.toLowerCase()
  
  // 检测重置请求
  if (message.includes('重新') || message.includes('重置') || message.includes('开始') && message.includes('新')) {
    resetContext()
    return getWelcomeMessage()
  }
  
  // 如果信息不完整，收集信息
  if (!conversationContext.origin && !message.includes('来自') && !message.includes('出发')) {
    extractOrigin(userMessage)
  }
  
  if (!conversationContext.days) {
    extractDays(userMessage)
  }
  
  if (!conversationContext.budget) {
    extractBudget(userMessage)
  }
  
  if (!conversationContext.people) {
    extractPeople(userMessage)
  }
  
  // 提取偏好
  extractPreferences(userMessage)
  
  // 根据完成度返回相应的建议
  return generateResponse()
}

/**
 * 提取出发地
 */
function extractOrigin(message) {
  const originKeywords = ['北京', '上海', '广州', '深圳', '杭州', '成都', '西安', '南京', '武汉', '重庆']
  for (let city of originKeywords) {
    if (message.includes(city)) {
      conversationContext.origin = city
      break
    }
  }
}

/**
 * 提取出行天数
 */
function extractDays(message) {
  const daysMatch = message.match(/(\d+)\s*天|(\d+)\s*天/)
  if (daysMatch) {
    conversationContext.days = parseInt(daysMatch[1] || daysMatch[2])
  }
}

/**
 * 提取预算
 */
function extractBudget(message) {
  const budgetMatch = message.match(/(\d+)\s*(元|块)/)
  if (budgetMatch) {
    conversationContext.budget = parseInt(budgetMatch[1])
  }
}

/**
 * 提取人数
 */
function extractPeople(message) {
  const peopleMatch = message.match(/(\d+)\s*个?人/)
  if (peopleMatch) {
    conversationContext.people = parseInt(peopleMatch[1])
  }
}

/**
 * 提取用户偏好
 */
function extractPreferences(message) {
  const preferenceKeywords = Object.keys(preferenceDestinationMap)
  for (let pref of preferenceKeywords) {
    if (message.includes(pref) && !conversationContext.preferences.includes(pref)) {
      conversationContext.preferences.push(pref)
    }
  }
}

/**
 * 生成响应
 */
function generateResponse() {
  // 如果还没有收集到所有信息
  if (!conversationContext.origin) {
    return `出发地在哪里呢？\n\n常见出发城市：北京、上海、广州、深圳、杭州、成都、西安、南京、武汉、重庆\n请告诉我您的出发地～`
  }
  
  if (!conversationContext.days) {
    return `计划出行${conversationContext.origin}冰雪旅游几天呢？\n\n💡 建议：\n🎿 滑雪专项：2-3天\n❄️ 冰雪风景：3-4天\n🌄 综合体验：4-5天\n\n请告诉我您的出行天数～`
  }
  
  if (!conversationContext.budget) {
    return `${conversationContext.days}天冰雪之旅，预算大概是多少呢？\n\n💡 参考价格(人均)：\n💰 经济型：3000-5000元\n💰 舒适型：5000-8000元\n💰 豪华型：8000+元\n\n请告诉我您的预算范围～`
  }
  
  if (!conversationContext.people) {
    return `总共有几个人出行呢？\n\n请告诉我人数(如：2人、4人)～`
  }
  
  if (conversationContext.preferences.length === 0) {
    return `请告诉我您的出行偏好，这样我能更精准地推荐：\n\n🎿 滑雪 - 适合滑雪爱好者\n❄️ 赏雪 - 欣赏雪景风景\n♨️ 温泉 - 泡温泉放松\n👨‍👩‍👧‍👦 亲子 - 家庭亲子活动\n📸 摄影 - 拍摄美景\n🌌 极光 - 观赏极光\n\n可以选择多个哦～`
  }
  
  // 所有信息都收集完整，生成推荐
  return generateRecommendation()
}

/**
 * 生成完整的旅游推荐
 */
function generateRecommendation() {
  // 根据偏好选择目的地
  let destinationKeys = []
  for (let pref of conversationContext.preferences) {
    const destinations = preferenceDestinationMap[pref] || []
    destinationKeys = [...new Set([...destinationKeys, ...destinations])]
  }
  
  if (destinationKeys.length === 0) {
    destinationKeys = ['harbin', 'xuexiang', 'yabuali']
  }
  
  // 选择最适合的目的地
  const topDestinations = destinationKeys.slice(0, 3).map(key => snowDestinations[key])
  conversationContext.recommendedDestinations = topDestinations
  
  let response = `🎉 根据您的需求，我为您推荐以下冰雪旅游目的地：\n\n`
  
  topDestinations.forEach((dest, index) => {
    response += `${index + 1}️⃣ **${dest.name}** (${dest.province})\n`
    response += `📍 特色：${dest.highlight}\n`
    response += `🌡️ 温度：${dest.temperature}\n`
    response += `⏱️ 建议天数：${dest.recommendedDays}天\n`
    response += `✨ 适合：${dest.suitable.join('、')}\n\n`
  })
  
  response += `💡 我已经准备好了详细的行程规划。请选择您最感兴趣的目的地，我会为您生成详细的每日行程安排！\n\n`
  response += `例如，您可以回复：\n- "我要${topDestinations[0].name}"\n- "帮我规划${topDestinations[1].name}"\n- "生成${topDestinations[2].name}行程"`
  
  return response
}

/**
 * 生成详细行程
 */
export function generateItinerary(destinationName) {
  // 查找目的地
  let destination = null
  for (let key in snowDestinations) {
    if (snowDestinations[key].name === destinationName) {
      destination = snowDestinations[key]
      break
    }
  }
  
  if (!destination) {
    return `未找到"${destinationName}"的目的地信息，请重新选择。`
  }
  
  const days = Math.min(conversationContext.days, destination.recommendedDays)
  let itinerary = `🗺️ **${destinationName}冰雪之旅 ${days}日行程规划**\n\n`
  itinerary += `👥 出行人数：${conversationContext.people}人\n`
  itinerary += `💰 预算范围：${conversationContext.budget}元\n\n`
  
  // 生成每日行程
  const attractions = destination.attractions.slice(0, days)
  
  for (let i = 0; i < days; i++) {
    itinerary += `**第${i + 1}天**\n`
    if (i === 0) {
      itinerary += `🚄 上午：从${conversationContext.origin}出发，前往${destination.name}\n`
      itinerary += `🏨 下午：到达酒店，办理入住\n`
      itinerary += `🍽️ 晚上：品尝当地特色菜：${destination.dining.slice(0, 2).join('、')}\n\n`
    } else if (i === days - 1) {
      itinerary += `🎯 主要活动：${attractions[i]?.name || '自由活动'}\n`
      itinerary += `⏱️ 游玩时间：${attractions[i]?.duration || '2-3小时'}\n`
      itinerary += `🚄 返程：下午返回${conversationContext.origin}\n\n`
    } else {
      itinerary += `🎯 主要景点：${attractions[i]?.name || '特色景点'}\n`
      itinerary += `⏱️ 游玩时间：${attractions[i]?.duration || '全天'}\n`
      itinerary += `🍽️ 用餐：${destination.dining[i % destination.dining.length]}\n\n`
    }
  }
  
  // 添加实用建议
  itinerary += `**🧥 穿搭建议：**\n`
  itinerary += `- 羽绒服（保暖指数必须8分以上）\n`
  itinerary += `- 保暖内衣、毛衣、发热裤\n`
  itinerary += `- 帽子、围巾、手套、口罩\n`
  itinerary += `- 防水防滑雪地靴\n\n`
  
  itinerary += `**⚠️ 安全提示：**\n`
  itinerary += `- 冬季路滑，要穿防滑鞋\n`
  itinerary += `- 室内外温差大，避免感冒\n`
  itinerary += `- 高原地区要预防高反\n`
  itinerary += `- 滑雪前做好热身运动\n\n`
  
  itinerary += `**🎒 装备检查：**\n`
  itinerary += `- 保暖用品、防晒霜（雪地反光强）\n`
  itinerary += `- 常用药物、创可贴\n`
  itinerary += `- 充电宝（低温耗电快）\n`
  itinerary += `- 相机、防水袋\n\n`
  
  itinerary += `**💰 费用预估(人均):**\n`
  itinerary += `- 交通：${Math.round(conversationContext.budget * 0.2)}-${Math.round(conversationContext.budget * 0.3)}元\n`
  itinerary += `- 住宿：${Math.round(conversationContext.budget * 0.3)}-${Math.round(conversationContext.budget * 0.4)}元\n`
  itinerary += `- 景点门票：${Math.round(conversationContext.budget * 0.2)}-${Math.round(conversationContext.budget * 0.25)}元\n`
  itinerary += `- 餐饮购物：${Math.round(conversationContext.budget * 0.1)}-${Math.round(conversationContext.budget * 0.15)}元\n\n`
  
  itinerary += `✨ 有其他问题吗？可以继续咨询我！`
  
  conversationContext.itinerary = itinerary
  return itinerary
}

/**
 * 处理用户的后续问题
 */
export function handleFollowUpQuestion(question) {
  const q = question.toLowerCase()
  
  if (q.includes('穿') || q.includes('衣') || q.includes('穿搭')) {
    return `❄️ **冰雪旅游穿搭建议**\n\n
👔 分层穿搭法（最重要）：
- 第1层：排汗层（快干衣）
- 第2层：保暖层（抓绒衣、毛衣）
- 第3层：防风层（羽绒服、滑雪服）

🧢 头部保护：
- 帽子：防风设计，不要露出耳朵
- 围巾：要厚实的羊毛或抓绒
- 口罩：可以防风和保暖面部

🧤 手脚保护：
- 手套：最好选发热手套，不要太厚影响活动
- 袜子：选择加厚羊毛袜，不要穿紧身牛仔裤
- 鞋：防水防滑的雪地靴，内部要够宽松

💡 tips：
- 衣服不要穿太紧，影响血液循环
- 多准备几套内衣，容易出汗要及时更换
- 不要过度出汗，会加速体温散失`
  }
  
  if (q.includes('安全') || q.includes('危险') || q.includes('注意')) {
    return `⚠️ **冰雪旅游安全指南**\n\n
🛟 滑雪安全：
- 初学者一定要请教练教学
- 不要超越自己的能力范围
- 一定要穿护具（头盔、护膝、护腕）
- 不要在缆车下方停留
- 雾天不要滑雪

🌨️ 气候安全：
- 不要在暴风雪天出门
- 定期涂防晒霜和润唇膏（雪地反光强）
- 手脚容易冻伤，要定期检查
- 长时间户外活动要热身和休息

🏔️ 高原安全：
- 到达后第一天不要剧烈运动
- 多喝水，不要喝酒
- 有头晕症状要立即休息
- 不要过度疲劳

🚗 交通安全：
- 冬季开车换雪地轮胎
- 保持车距，减速慢行
- 不要急加速或急制动
- 冬季停车要检查车窗不结冰`
  }
  
  if (q.includes('装备') || q.includes('准备') || q.includes('带什么')) {
    return `🎒 **冰雪旅游装备清单**\n\n
衣服类：
☑️ 羽绒服（最重要）
☑️ 保暖内衣2套
☑️ 毛衣/抓绒衣
☑️ 防水防滑鞋
☑️ 厚羊毛袜3-5双
☑️ 帽子、围巾、手套、口罩
☑️ 紧身牛仔裤要换成宽松裤子

护肤类：
☑️ 防晒霜50+
☑️ 润唇膏
☑️ 面膜/护肤品
☑️ 护手霜

其他类：
☑️ 充电宝（冬天电池耗电快）
☑️ 常用药（感冒、消炎、肠胃）
☑️ 创可贴、冻伤膏
☑️ 相机防护用品
☑️ 防水手机壳

可选类：
☑️ 暖宝宝
☑️ 热水杯
☑️ 登山杖（雪地防滑）
☑️ 防雪镜`
  }
  
  if (q.includes('避坑') || q.includes('坑') || q.includes('陷阱')) {
    return `⚠️ **冰雪旅游常见陷阱及避坑指南**\n\n
💰 消费陷阱：
❌ 导游强制消费
❌ 景区天价餐饮
❌ 购物店虚高定价
❌ 假的特产和纪念品

✅ 避坑方案：
- 提前查好景区内餐饮价格
- 自带干粮和水
- 相信品牌店而不是路边摊
- 购物前查一下商品网络价格

🚗 交通陷阱：
❌ 黑出租乱收费
❌ 包车司机绕路
❌ 飞车销售高价景点票

✅ 避坑方案：
- 用打车软件叫车
- 提前预订包车服务
- 通过官方渠道买门票

🎿 体验陷阱：
❌ 滑雪场黑教练收费过高
❌ 隐形消费（存包、租赁设备）
❌ 雪场人满为患，体验差

✅ 避坑方案：
- 提前在线预订滑雪课程
- 提前咨询所有收费项目
- 避开周末和假期高峰`
  }
  
  // 默认回复
  return `💬 我理解您的问题。根据您的行程规划，建议：\n\n1️⃣ 更详细的行程信息\n2️⃣ 预定酒店和机票\n3️⃣ 准备装备和衣物\n4️⃣ 办理必要的文件和保险\n\n有其他具体问题吗？我可以继续帮您～`
}
