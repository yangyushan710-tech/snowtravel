# 🤖 AI冰雪旅游智能体 - 技术文档

## 📁 项目结构

```
snowTravel/
├── src/
│   ├── api/
│   │   ├── aiRecommendation.js      # 🆕 AI推荐引擎（核心）
│   │   ├── chat.js                  # 聊天API
│   │   ├── travelGuide.js           # 旅游指南API
│   │   └── ...
│   ├── components/
│   │   └── home/
│   │       ├── TravelGuide.vue      # 🔄 更新：集成AI系统
│   │       └── TravelGuide.css      # 🔄 更新：优化UI样式
│   ├── data/
│   ├── config/
│   └── ...
├── AI_SMART_TRAVEL_GUIDE.md         # 📝 用户使用指南
└── AI_SYSTEM_ARCHITECTURE.md        # 📝 技术文档（本文）
```

---

## 🏗️ 系统架构

### 整体设计流程

```
用户点击AI按钮
    ↓
打开AI聊天窗口（showAIChat = true）
    ↓
显示欢迎消息和初始问题
    ↓
收集用户信息（循环）
  ├─ 出发地 (origin)
  ├─ 出行天数 (days)
  ├─ 预算 (budget)
  ├─ 人数 (people)
  └─ 偏好 (preferences)
    ↓
根据偏好推荐目的地
    ↓
用户选择目的地
    ↓
生成详细行程规划
    ↓
处理后续问题
  ├─ 穿搭建议
  ├─ 安全提示
  ├─ 装备清单
  └─ 避坑指南
```

---

## 🔧 核心模块

### 1. AI推荐引擎 (`aiRecommendation.js`)

#### 主要导出函数

| 函数名 | 功能 | 参数 | 返回值 |
|------|------|------|--------|
| `getWelcomeMessage()` | 获取欢迎信息 | - | String |
| `processUserInput(message)` | 处理用户输入 | `message: String` | Promise<String> |
| `generateItinerary(name)` | 生成行程 | `name: String` | String |
| `handleFollowUpQuestion(q)` | 处理后续问题 | `q: String` | String |
| `resetContext()` | 重置对话上下文 | - | - |

#### 数据结构

##### conversationContext
```javascript
{
  origin: String,              // 出发地
  days: Number,                // 出行天数
  budget: Number,              // 预算
  people: Number,              // 人数
  preferences: String[],       // 偏好列表
  recommendedDestinations: Object[],  // 推荐的目的地
  itinerary: String            // 生成的行程
}
```

##### snowDestinations
```javascript
{
  [destinationKey]: {
    name: String,              // 目的地名称
    province: String,          // 省份
    highlight: String,         // 特色
    description: String,       // 描述
    bestTime: String,          // 最佳时间
    temperature: String,       // 温度范围
    attractions: Array,        // 景点列表
      └─ { name, duration, type }
    accommodation: String[],   // 住宿类型
    dining: String[],          // 餐饮建议
    recommendedDays: Number,   // 推荐天数
    suitable: String[]         // 适合的偏好
  }
}
```

---

### 2. TravelGuide.vue 组件

#### 新增响应式数据

```javascript
// AI聊天相关
const showAIChat = ref(false)              // 是否显示聊天窗口
const chatMessages = ref([])               // 聊天消息数组
const userInput = ref('')                  // 用户输入
const loading = ref(false)                 // 加载状态
const messagesContainer = ref(null)        // 消息容器引用
const isAIChatInitialized = ref(false)    // 是否已初始化
```

#### 新增方法

```javascript
openAIChat()          // 打开AI聊天
closeAIChat()         // 关闭AI聊天
sendMessage()         // 发送消息
scrollToBottom()      // 滚动到底部
```

#### 生命周期

- **onMounted**: 初始化时获取专题列表
- **onUnmounted**: 卸载时清理定时器

---

### 3. 样式优化

#### AI聊天窗口样式

```css
.ai-chat-modal {
  position: fixed;              /* 固定定位 */
  width: 800px;                 /* 窗口宽度 */
  max-height: 90vh;             /* 最大高度 */
  z-index: 1000;                /* 层级 */
}

.ai-chat-messages {
  max-height: 600px;            /* 消息区域最大高度 */
  white-space: pre-wrap;        /* 保留换行 */
  word-break: break-word;       /* 自动换行 */
}

.message-content {
  max-width: 90%;               /* 消息最大宽度 */
  line-height: 1.6;             /* 行高 */
}
```

---

## 🔌 API接口设计

### 消息处理流程

#### 输入检测逻辑

```javascript
// 1. 检测重置请求
if (message.includes('重新') || message.includes('重置'))
  → 调用 resetContext()

// 2. 检测选择目的地请求
if (message.includes('我要') || message.includes('规划'))
  → 调用 generateItinerary(destinationName)

// 3. 检测特殊问题
if (message.includes('穿') || message.includes('安全'))
  → 调用 handleFollowUpQuestion(message)

// 4. 普通对话
else
  → 调用 processUserInput(message)
```

#### 信息收集流程

```javascript
// 自动提取用户提供的信息
extractOrigin()      // 提取出发地
extractDays()        // 提取天数
extractBudget()      // 提取预算
extractPeople()      // 提取人数
extractPreferences() // 提取偏好
```

#### 响应生成策略

```javascript
// 优先级：特殊问题 > 信息补全 > 推荐 > 后续问答

if (!context.origin)
  → "请告诉我出发地"
else if (!context.days)
  → "计划几天？"
else if (!context.budget)
  → "预算是多少？"
else if (!context.people)
  → "几个人？"
else if (preferences.length === 0)
  → "请选择偏好"
else
  → generateRecommendation()
```

---

## 🎯 功能详解

### 1. 目的地推荐算法

```javascript
// 步骤1：映射偏好到目的地
preferenceDestinationMap = {
  '滑雪': ['yabuali', 'changbaishan'],
  '赏雪': ['xuexiang', 'harbin', 'mohe'],
  '温泉': ['changbaishan'],
  // ...
}

// 步骤2：去重并选择Top 3
recommendedDestinations = [
  snowDestinations['yabuali'],
  snowDestinations['xuexiang'],
  snowDestinations['harbin']
]

// 步骤3：格式化推荐信息
response = formatRecommendations(recommendedDestinations)
```

### 2. 行程生成算法

```javascript
// 输入：目的地名称、用户信息
// 输出：详细的每日行程

function generateItinerary(destinationName) {
  1. 查找目的地数据
  2. 取最小值(用户天数, 推荐天数)
  3. 生成每日行程：
     - 第1天：交通 + 入住
     - 中间天数：景点 + 餐饮
     - 最后一天：活动 + 返程
  4. 添加建议部分：
     - 穿搭建议
     - 安全提示
     - 装备清单
     - 费用预估
  5. 返回格式化的行程字符串
}
```

### 3. 问答系统

```javascript
// 关键词匹配
const questionCategories = {
  '穿搭': /穿|衣|穿搭/,
  '安全': /安全|危险|注意/,
  '装备': /装备|准备|带什么/,
  '避坑': /避坑|坑|陷阱/
}

// 返回对应的建议文本
handleFollowUpQuestion(question) {
  for (category in questionCategories) {
    if (question.match(regex)) {
      return categoryResponses[category]
    }
  }
}
```

---

## 💬 消息格式

### 系统消息格式

```javascript
{
  role: 'assistant' | 'user',
  content: String  // 支持换行符和格式化
}
```

### 支持的格式化元素

- ✨ 表情符号：🎿 ❄️ 🏔️ 等
- 📝 **粗体**: `**文本**`
- 📋 列表：`- 项目` 或 `1️⃣ 项目`
- 📌 换行：`\n` 符号

### 示例消息

```
🎉 根据您的需求，我为您推荐以下冰雪旅游目的地：

1️⃣ **哈尔滨** (黑龙江)
📍 特色：冰雪艺术
🌡️ 温度：-15℃ ~ -25℃
⏱️ 建议天数：4天
✨ 适合：赏雪、摄影、亲子
```

---

## 🔄 数据流程

### 完整的用户交互流程

```
1. 用户点击AI图标
   ├─ showAIChat.value = true
   ├─ 初始化 chatMessages = [欢迎消息]
   └─ 显示聊天窗口

2. 用户输入问题
   ├─ 获取 userInput
   └─ 点击发送或按Enter

3. 前端处理
   ├─ 添加用户消息到 chatMessages
   ├─ 清空 userInput
   ├─ 设置 loading = true
   └─ 滚动到底部

4. AI处理
   ├─ 调用 processUserInput / generateItinerary / handleFollowUpQuestion
   ├─ 模拟延迟（800ms）
   ├─ 返回AI响应
   └─ 添加AI消息到 chatMessages

5. 前端更新
   ├─ 设置 loading = false
   ├─ 滚动到底部
   └─ 等待用户输入

6. 用户关闭
   ├─ 点击关闭按钮
   ├─ showAIChat.value = false
   └─ 隐藏聊天窗口
```

---

## 🧪 测试场景

### 测试场景1：完整的推荐流程
```
输入: "我来自北京"
输入: "5天"
输入: "8000元"
输入: "2个人"
输入: "滑雪和赏雪"
预期: 推荐亚布力、长白山、雪乡
```

### 测试场景2：生成行程
```
输入: "我要亚布力"
预期: 生成5日详细行程，包括穿搭、安全、装备建议
```

### 测试场景3：穿搭咨询
```
输入: "冰雪旅游要怎么穿搭?"
预期: 返回详细的分层穿搭建议
```

### 测试场景4：安全咨询
```
输入: "有什么安全注意事项?"
预期: 返回滑雪、气候、高原、交通等多方面安全建议
```

### 测试场景5：重新开始
```
输入: "重新开始"
预期: 清空上下文，重新显示欢迎消息
```

---

## 🚀 性能优化

### 已实现的优化
1. ✅ 异步消息处理（async/await）
2. ✅ nextTick自动滚动
3. ✅ 消息渲染优化（白名单模式）
4. ✅ 样式使用CSS-in-JS预优化

### 可以进一步优化的地方
1. 📌 消息虚拟化（处理大量消息时）
2. 📌 本地存储对话历史
3. 📌 消息分页加载
4. 📌 图片懒加载
5. 📌 消息缓存

---

## 🔐 安全考虑

### 当前实现
- ✅ 用户输入验证（trim检查）
- ✅ 目的地验证（白名单）
- ✅ 错误处理和回退机制

### 生产环境需要添加
- 🔒 CSRF防护
- 🔒 XSS防护（HTML转义）
- 🔒 Rate limiting
- 🔒 SQL注入防护（如果有后端）
- 🔒 API认证

---

## 📈 可扩展性

### 添加新目的地的步骤

```javascript
// 1. 在 snowDestinations 中添加新目的地
snowDestinations.newPlace = {
  name: '新地方',
  province: '省份',
  // ...其他字段
}

// 2. 在 preferenceDestinationMap 中添加映射
preferenceDestinationMap['新偏好'].push('newPlace')

// 3. 在 generateItinerary 中添加识别
destinationNames.push('新地方')
```

### 添加新的对话话题

```javascript
// 在 handleFollowUpQuestion 中添加新的条件分支
if (q.includes('新话题')) {
  return `新话题的详细建议...`
}
```

---

## 🐛 已知限制

1. 📌 对话历史不持久化（页面刷新丢失）
2. 📌 目的地预设固定（不可动态扩展）
3. 📌 预算计算基于简单百分比分配
4. 📌 不支持图片或实时数据集成
5. 📌 信息提取基于关键词匹配，不支持复杂句式

---

## 🔮 未来计划

### Phase 2 (下个迭代)
- [ ] 集成真实API（天气、酒店、机票）
- [ ] 对话历史持久化
- [ ] 用户偏好学习
- [ ] 推荐算法优化

### Phase 3 (远期)
- [ ] 多语言支持
- [ ] 语音输入/输出
- [ ] AR景点展示
- [ ] 社区分享功能
- [ ] 云端行程同步

---

## 📚 参考资源

- Vue 3 官方文档: https://v3.vuejs.org/
- Vite 官方文档: https://vitejs.dev/
- ES6 Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

---

**技术栈**: Vue 3 + Vite + JavaScript

**作者**: AI Travel Assistant System

**更新日期**: 2026年4月19日
