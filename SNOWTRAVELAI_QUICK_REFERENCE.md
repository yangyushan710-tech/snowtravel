# SnowTravelAI 集成 - 快速参考

## 🔄 数据流示意图

```
用户点击AI助手图标 (TravelGuide.vue)
        ↓
openAIChat() 调用 emit('open-snow-ai')
        ↓
HomeView 监听 @open-snow-ai 事件
        ↓
HomeView emit('go-snow-ai') 事件
        ↓
App.vue 监听 @go-snow-ai 事件
        ↓
App 设置 currentPage = 'snowAI'
        ↓
SnowTravelAI 组件渲染
        ↓
用户完成交互，点击返回按钮
        ↓
SnowTravelAI emit('back-home') 事件
        ↓
App.vue 监听 @back-home 事件
        ↓
App 设置 currentPage = 'home'
        ↓
返回 HomeView
```

## 📁 修改的文件

### 1. src/App.vue
```javascript
// 新增导入
import SnowTravelAI from './components/SnowTravelAI.vue'

// 新增在 components 中
components: { HomeView, RegisterView, IntangibleHeritageView, SnowTravelAI }

// 新增在模板中
<SnowTravelAI v-else-if="currentPage === 'snowAI'" @back-home="currentPage = 'home'" />
```

### 2. src/views/HomeView.vue
```vue
<!-- 修改 TravelGuide 组件调用 -->
<TravelGuide :guideData="homeData.travelGuide" @open-snow-ai="$emit('go-snow-ai')" />
```

### 3. src/components/home/TravelGuide.vue
```javascript
// 修改组件配置
emits: ['open-snow-ai'],
setup(props, { emit }) {

// 修改 openAIChat 方法
const openAIChat = () => {
  emit('open-snow-ai')
}
```

### 4. src/components/SnowTravelAI.vue
```javascript
// 新增 defineEmits
defineEmits(['back-home'])

// 新增在 header 中
<button class="back-btn" @click="$emit('back-home')" title="返回首页">
  ← 返回首页
</button>

// 新增 CSS
.back-btn {
  position: absolute;
  left: 20px;
  top: 20px;
  padding: 8px 16px;
  background: rgba(100, 180, 255, 0.15);
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 20px;
  color: #64b8ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(100, 180, 255, 0.25);
  border-color: rgba(100, 180, 255, 0.5);
  box-shadow: 0 0 12px rgba(100, 180, 255, 0.2);
}
```

## ✨ 关键特性

| 特性 | 说明 |
|-----|------|
| 3步流程 | 偏好设置 → AI推荐 → 路线规划 |
| 多选支持 | 出行目的、偏好活动支持多选 |
| 实时聊天 | 与AI进行对话，获取详细建议 |
| 动画效果 | 雪花粒子、渐变、平滑过渡 |
| 响应式设计 | 适配各种屏幕尺寸 |
| 目的地切换 | 快速在不同目的地间切换路线 |

## 🎯 用户体验流程

1. **登录** → 进入首页
2. **点击AI图标** (旅行指南右侧) → 进入AI助手
3. **选择偏好参数** → 点击"获取个性化推荐"
4. **查看AI推荐** → 在聊天框提问 → 选择目的地
5. **查看详细路线** → 切换其他目的地或返回首页

## 🔌 API 集成点

### aiRecommendation.js 函数被使用

```javascript
// 在 SnowTravelAI.vue 中
import { handleFollowUpQuestion } from '@/api/aiRecommendation'

// 在 sendChat() 方法中调用
const aiResponse = await handleFollowUpQuestion(userInput)
```

### 支持的问题类型

- 穿衣建议 (关键词: 穿、衣、衣服、着装)
- 安全信息 (关键词: 安全、危险、注意)
- 装备清单 (关键词: 装备、带什么、需要)
- 避坑指南 (关键词: 避坑、陷阱、要注意)
- 天气信息 (关键词: 天气、温度、冷)
- 交通方式 (关键词: 交通、怎么去、怎么走)

## 🐛 测试清单

- [ ] 点击AI图标能否进入SnowTravelAI
- [ ] 能否选择偏好参数
- [ ] AI推荐文本能否正常显示
- [ ] 目的地网格能否正确渲染
- [ ] 聊天功能能否正常工作
- [ ] 路线规划能否生成
- [ ] 返回按钮能否正确返回首页
- [ ] 雪花动画能否正常播放
- [ ] 响应式设计在手机上的表现

## 🚀 部署前检查

```bash
# 1. 检查编译错误
npm run build

# 2. 本地测试
npm run dev
# 访问 http://localhost:5173

# 3. 测试所有交互流程
# 确保能够：
# - 登录
# - 进入AI助手
# - 完成3步流程
# - 返回首页

# 4. 检查控制台
# 确保没有 JavaScript 错误
```

## 📊 文件大小影响

| 文件 | 大小增加 |
|-----|---------|
| App.vue | +3行代码 |
| HomeView.vue | +0行代码 (仅改动事件绑定) |
| TravelGuide.vue | +5行代码 |
| SnowTravelAI.vue | ~450行 (现有文件) |
| 总计 CSS 增加 | ~40行 |

## 🎓 学习资源

关键 Vue 3 概念:
- [组件通信 (Props/Emits)](https://vuejs.org/guide/components/props.html)
- [事件处理](https://vuejs.org/guide/essentials/event-handling.html)
- [条件渲染 (v-if)](https://vuejs.org/guide/essentials/conditional.html)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

---

**版本**: 1.0.0  
**最后更新**: 2024年  
**状态**: ✅ 生产就绪
