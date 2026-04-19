<template>
  <div class="snow-travel-container">
    <!-- Snow particles -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="snow-particle"
      :style="{
        left: `${particle.left}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
      }"
    />

    <div class="content-wrapper">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" @click="$emit('back-home')" title="返回首页">
          ← 返回首页
        </button>
        <div class="emoji-title">❄️</div>
        <h1 class="main-title">AI 冰雪旅游助手</h1>
        <p class="subtitle">个性化推荐 · 智能路线规划 · 专属旅游顾问</p>

        <!-- Step nav -->
        <div class="step-nav">
          <div
            v-for="(item, index) in stepNav"
            :key="item.key"
            class="step-item"
          >
            <div
              class="step-badge"
              :class="{ active: currentStep === item.key }"
            >
              {{ item.label }}
            </div>
            <div v-if="index < stepNav.length - 1" class="step-separator">›</div>
          </div>
        </div>
      </div>

      <!-- ===== STEP: HOME / PREFS ===== -->
      <div v-if="currentStep === 'home'" class="step-container fade-in">
        <!-- Destination showcase -->
        <div class="showcase-section">
          <div class="section-title">✦ 热门冰雪目的地</div>
          <div class="destinations-grid">
            <div
              v-for="dest in destinations"
              :key="dest.id"
              class="dest-card card-hover"
            >
              <div class="dest-emoji">{{ dest.img }}</div>
              <div class="dest-name">{{ dest.name.slice(0, 4) }}</div>
              <div class="dest-temp">{{ dest.temp }}</div>
            </div>
          </div>
        </div>

        <!-- Preference form -->
        <div class="pref-form">
          <div class="form-title">🎯 告诉我您的旅行偏好</div>

          <!-- Purpose -->
          <div class="pref-group">
            <div class="group-label">出行目的（可多选）</div>
            <div class="tags-container">
              <button
                v-for="p in prefOptions.purpose"
                :key="p"
                class="tag-btn"
                :class="{ active: prefs.purpose.includes(p) }"
                @click="togglePref('purpose', p)"
              >
                {{ p }}
              </button>
            </div>
          </div>

          <!-- Budget -->
          <div class="pref-group">
            <div class="group-label">
              旅行预算 <span class="required">*</span>
            </div>
            <div class="tags-container">
              <button
                v-for="b in prefOptions.budget"
                :key="b"
                class="tag-btn"
                :class="{ active: prefs.budget === b }"
                @click="togglePref('budget', b)"
              >
                {{ b }}
              </button>
            </div>
          </div>

          <!-- Duration -->
          <div class="pref-group">
            <div class="group-label">
              行程时长 <span class="required">*</span>
            </div>
            <div class="tags-container">
              <button
                v-for="d in prefOptions.duration"
                :key="d"
                class="tag-btn"
                :class="{ active: prefs.duration === d }"
                @click="togglePref('duration', d)"
              >
                {{ d }}
              </button>
            </div>
          </div>

          <!-- Activities -->
          <div class="pref-group">
            <div class="group-label">喜欢的活动（可多选）</div>
            <div class="tags-container">
              <button
                v-for="a in prefOptions.activity"
                :key="a"
                class="tag-btn"
                :class="{ active: prefs.activity.includes(a) }"
                @click="togglePref('activity', a)"
              >
                {{ a }}
              </button>
            </div>
          </div>

          <button
            class="btn-primary"
            :disabled="!canProceed"
            @click="getRecommendation"
          >
            ✨ 获取 AI 个性化推荐
          </button>
          <div v-if="!canProceed" class="hint-text">
            请选择预算和行程时长
          </div>
        </div>
      </div>

      <!-- ===== STEP: RESULT ===== -->
      <div v-if="currentStep === 'result'" class="step-container fade-in">
        <!-- AI Recommendation Card -->
        <div class="ai-card">
          <div class="ai-header">
            <div class="ai-icon">🤖</div>
            <div class="ai-info">
              <div class="ai-title">AI 个性化推荐</div>
              <div class="ai-subtitle">基于您的偏好智能分析</div>
            </div>
            <button class="btn-reset" @click="currentStep = 'home'">
              重新选择
            </button>
          </div>

          <div v-if="loadingRecommendation" class="loading-state">
            <div class="loading-emoji">❄️</div>
            <div class="loading-text">
              AI 正在分析您的偏好，生成专属推荐...
            </div>
            <div class="loading-dots">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
          <div v-else class="prose-text">{{ aiResult }}</div>
        </div>

        <!-- Quick route buttons -->
        <div v-if="!loadingRecommendation" class="route-section">
          <div class="section-title">✦ 选择目的地生成详细路线</div>
          <div class="dest-buttons-grid">
            <div
              v-for="dest in destinations.slice(0, 4)"
              :key="dest.id"
              class="dest-btn-card card-hover"
              @click="generateRoute(dest.name)"
            >
              <div class="dest-btn-header">
                <div>
                  <div class="dest-btn-name">{{ dest.name }}</div>
                  <div class="dest-btn-meta">
                    {{ dest.region }} · {{ dest.temp }}
                  </div>
                </div>
                <div class="dest-btn-emoji">{{ dest.img }}</div>
              </div>
              <div class="dest-tags">
                <span
                  v-for="tag in dest.tags"
                  :key="tag"
                  class="dest-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <div class="dest-btn-action">→ 生成路线规划</div>
            </div>
          </div>
        </div>

        <!-- Chat -->
        <div v-if="!loadingRecommendation" class="chat-box">
          <div class="chat-header">
            💬 继续咨询 AI 旅游顾问
          </div>
          <div ref="chatContainer" class="chat-messages">
            <div
              v-for="(msg, index) in chatMessages"
              :key="index"
              class="chat-message"
              :class="msg.role === 'user' ? 'user' : 'ai'"
            >
              <div class="chat-bubble" :class="`chat-bubble-${msg.role}`">
                {{ msg.content }}
              </div>
            </div>
            <div
              v-if="chatLoading"
              class="chat-message ai"
            >
              <div class="chat-bubble chat-bubble-ai">
                <div class="loading-dots">
                  <span>●</span><span>●</span><span>●</span>
                </div>
              </div>
            </div>
            <div ref="chatEnd" />
          </div>
          <div class="chat-input-box">
            <input
              v-model="chatInput"
              placeholder="问我任何冰雪旅游问题..."
              @keydown.enter="sendChat"
              class="chat-input"
            />
            <button
              class="chat-send-btn"
              :disabled="chatLoading || !chatInput.trim()"
              @click="sendChat"
            >
              发送
            </button>
          </div>
        </div>
      </div>

      <!-- ===== STEP: ROUTE ===== -->
      <div v-if="currentStep === 'route'" class="step-container fade-in">
        <div class="route-card">
          <div class="route-header">
            <div class="route-icon">🗺️</div>
            <div class="route-info">
              <div class="route-title">智能路线规划</div>
              <div class="route-subtitle">{{ selectedDestination }} · 专属行程方案</div>
            </div>
            <button class="btn-reset" @click="currentStep = 'result'">
              ← 返回推荐
            </button>
          </div>

          <div v-if="loadingRoute" class="loading-state">
            <div class="loading-emoji">🗺️</div>
            <div class="loading-text">
              正在为您规划 {{ selectedDestination }} 专属路线...
            </div>
            <div class="loading-dots">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
          <div v-else class="prose-text">{{ routePlan }}</div>
        </div>

        <!-- Other destinations -->
        <div v-if="!loadingRoute" class="other-dest-section">
          <div class="section-title">✦ 换一个目的地</div>
          <div class="other-dest-buttons">
            <button
              v-for="dest in destinations.filter(d => d.name !== selectedDestination).slice(0, 3)"
              :key="dest.id"
              class="other-dest-btn"
              @click="generateRoute(dest.name)"
            >
              {{ dest.img }} {{ dest.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { handleFollowUpQuestion } from '@/api/aiRecommendation'

defineEmits(['back-home'])

const currentStep = ref('home')
const loadingRecommendation = ref(false)
const loadingRoute = ref(false)
const chatLoading = ref(false)
const chatContainer = ref(null)
const chatEnd = ref(null)
const selectedDestination = ref('')
const particles = ref([])

const stepNav = [
  { key: 'home', label: '偏好设置' },
  { key: 'result', label: 'AI推荐' },
  { key: 'route', label: '路线规划' },
]

const destinations = [
  { id: 1, name: '哈尔滨', region: '东北', emoji: '🏔️', tags: ['冰雕', '夜景', '家庭'], temp: '-20°C', days: '2-3天', img: '❄️' },
  { id: 2, name: '长白山', region: '东北', emoji: '🌋', tags: ['自然', '滑雪', '摄影'], temp: '-25°C', days: '3-4天', img: '🗻' },
  { id: 3, name: '滑雪场', region: '东北', emoji: '⛷️', tags: ['滑雪', '运动', '冬奥'], temp: '-22°C', days: '2-3天', img: '🏂' },
  { id: 4, name: '雪乡', region: '东北', emoji: '❄️', tags: ['雪景', '摄影', '村镇'], temp: '-28°C', days: '2-3天', img: '🌲' },
  { id: 5, name: '漠河', region: '东北', emoji: '🌌', tags: ['极光', '极地', '探险'], temp: '-35°C', days: '3-4天', img: '🌠' },
  { id: 6, name: '净月潭', region: '东北', emoji: '🏞️', tags: ['滑雪', '风景', '休闲'], temp: '-18°C', days: '1-2天', img: '🎿' },
]

const prefOptions = {
  purpose: ['家庭亲子', '情侣蜜月', '摄影采风', '运动极限', '文化体验', '独自旅行'],
  budget: ['经济型 <3000元', '舒适型 3000-8000元', '豪华型 >8000元'],
  duration: ['周末2天', '短假3-4天', '长假5-7天', '深度10天+'],
  activity: ['滑雪/滑冰', '冰雕观赏', '温泉泡浴', '狗拉雪橇', '民俗体验', '雪地摄影'],
}

const prefs = ref({
  purpose: [],
  budget: '',
  duration: '',
  activity: [],
})

const aiResult = ref('')
const routePlan = ref('')
const chatMessages = ref([])
const chatInput = ref('')

const canProceed = computed(() => prefs.value.budget && prefs.value.duration)

// Initialize snow particles
onMounted(() => {
  const ps = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 4 + Math.random() * 8,
    opacity: 0.3 + Math.random() * 0.5,
  }))
  particles.value = ps
})

// Auto scroll chat
const scrollToBottom = async () => {
  await nextTick()
  chatEnd.value?.scrollIntoView({ behavior: 'smooth' })
}

const togglePref = (key, val) => {
  if (Array.isArray(prefs.value[key])) {
    if (prefs.value[key].includes(val)) {
      prefs.value[key] = prefs.value[key].filter(x => x !== val)
    } else {
      prefs.value[key].push(val)
    }
  } else {
    prefs.value[key] = prefs.value[key] === val ? '' : val
  }
}

const getRecommendation = async () => {
  if (!canProceed.value) return
  loadingRecommendation.value = true
  currentStep.value = 'result'

  try {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 生成推荐文本
    const prompt = `用户冰雪旅游偏好：
- 出行目的：${prefs.value.purpose.join('、') || '未指定'}
- 预算：${prefs.value.budget}
- 行程天数：${prefs.value.duration}
- 偏好活动：${prefs.value.activity.join('、') || '未指定'}

请从这些目的地中推荐最适合的2-3个：${destinations.map(d => d.name).join('、')}

格式：
🥇 首选：【目的地名称】
理由：（2句话）

🥈 次选：【目的地名称】
理由：（2句话）

🥉 备选：【目的地名称】
理由：（1句话）

💡 小贴士：（1条针对用户偏好的出行建议）`

    // 这里可以调用真实的Claude API或使用本地推荐逻辑
    aiResult.value = `🥇 首选：长白山天池
根据您的${prefs.value.purpose.join('、')}偏好和${prefs.value.duration}的行程安排，长白山天池是理想选择。这里既有壮观的自然景观，也提供专业的滑雪设施和温泉体验。

🥈 次选：哈尔滨冰雪大世界
作为冰雕艺术的圣殿，哈尔滨冰雪大世界适合全家人游玩。${prefs.value.purpose.includes('家庭亲子') ? '这里有专门为儿童设计的冰雪项目。' : '这里提供多种难度的冰雪活动。'}

🥉 备选：${destinations[Math.floor(Math.random() * 3)].name}
${prefs.value.activity.length > 0 ? `这里特别适合${prefs.value.activity.join('和')}爱好者。` : '这是一个独特的冰雪体验地。'}

💡 小贴士：${prefs.value.duration.includes('2天') ? '周末短假建议选择交通便利的地点。' : '充足的时间让您可以深度体验目的地的特色。'}`

    chatMessages.value = [{
      role: 'assistant',
      content: '✨ 已为您完成个性化分析！推荐结果如上。\n\n您可以继续问我任何关于冰雪旅游的问题，例如：\n• "哈尔滨最佳游览时间是几月？"\n• "长白山需要提前预约吗？"\n• "帮我生成详细行程路线"'
    }]
  } catch (error) {
    console.error('获取推荐失败:', error)
    aiResult.value = '获取推荐时遇到问题，请检查网络连接。'
  } finally {
    loadingRecommendation.value = false
    await scrollToBottom()
  }
}

const generateRoute = async (destName) => {
  loadingRoute.value = true
  selectedDestination.value = destName
  currentStep.value = 'route'

  try {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1200))

    // 生成路线文本
    routePlan.value = `📍 **${destName} 冰雪深度游**

**Day 1 — 抵达与适应**
🌅 上午：从出发地抵达${destName}，办理入住（建议提前预订酒店）
☀️ 下午：休整并熟悉周边环境，购买必需的防寒用品
🌙 晚上：品尝当地特色美食，早休息调整时差
🏨 住宿推荐：4星或5星酒店，参考价格500-1000元/晚

**Day 2 — 主要体验**
🌅 上午：参加核心景区游览（3-4小时）
☀️ 下午：休闲活动或专项运动体验（2-3小时）
🌙 晚上：特色晚餐或温泉浴
🏨 住宿推荐：同上

**Day 3 — 深度探索**
🌅 上午：二级景区或特色体验
☀️ 下午：自由活动或购物
🌙 晚上：返程准备
🏨 住宿推荐：返程前夜可选择靠近交通枢纽的酒店

**💰 费用估算**
交通：${prefs.value.budget.includes('经济') ? '800-1200' : prefs.value.budget.includes('舒适') ? '1500-2500' : '2500+'}元
住宿：${prefs.value.budget.includes('经济') ? '300-500' : prefs.value.budget.includes('舒适') ? '500-1000' : '1000+'}元/晚
门票：${prefs.value.budget.includes('经济') ? '200-400' : prefs.value.budget.includes('舒适') ? '400-800' : '800+'}元
餐饮：${prefs.value.budget.includes('经济') ? '150-250' : prefs.value.budget.includes('舒适') ? '250-500' : '500+'}元/天
合计：约${prefs.value.budget}元

**⚠️ 注意事项**
1. 冬季温度低，必须准备厚重防寒衣物，建议分层穿搭
2. 需提前关注天气预报，避开恶劣天气出行
3. 预订热门景区门票建议提前1-2周，旺季可能需要更早预订`
  } catch (error) {
    console.error('生成路线失败:', error)
    routePlan.value = '生成路线规划时遇到问题，请稍后重试。'
  } finally {
    loadingRoute.value = false
  }
}

const sendChat = async () => {
  if (!chatInput.value.trim() || chatLoading.value) return

  const userMsg = chatInput.value.trim()
  chatInput.value = ''
  chatMessages.value.push({ role: 'user', content: userMsg })
  chatLoading.value = true

  try {
    await scrollToBottom()
    
    // 使用现有的问答系统
    const aiResponse = handleFollowUpQuestion(userMsg)
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    chatMessages.value.push({ role: 'assistant', content: aiResponse })
    await scrollToBottom()
  } catch (error) {
    console.error('发送消息失败:', error)
    chatMessages.value.push({
      role: 'assistant',
      content: '抱歉，暂时无法回答，请稍后再试。'
    })
  } finally {
    chatLoading.value = false
  }
}
</script>

<style scoped>
@keyframes snowfall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(100, 200, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(100, 200, 255, 0);
  }
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeSlideUp 0.5s ease;
}

.snow-travel-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1628 0%, #0d2444 40%, #0a1f3d 70%, #071525 100%);
  font-family: 'Noto Serif SC', 'Source Han Serif CN', serif;
  position: relative;
  overflow: hidden;
  color: #e8f4fd;
}

.snow-particle {
  position: fixed;
  top: -20px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  animation: snowfall linear infinite;
  z-index: 0;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 16px 40px;
}

/* ===== HEADER ===== */
.header {
  position: relative;
  text-align: center;
  padding: 40px 0 32px;
  animation: fadeSlideUp 0.6s ease;
}

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

.emoji-title {
  font-size: 48px;
  margin-bottom: 8px;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #e8f4fd, #64b8ff, #a0d8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #7ab3d4;
  font-size: 14px;
  margin-top: 8px;
  letter-spacing: 1px;
}

.step-nav {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-top: 24px;
  font-size: 13px;
}

.step-item {
  display: flex;
  align-items: center;
}

.step-badge {
  padding: 5px 16px;
  border-radius: 20px;
  background: transparent;
  color: #4a7fa0;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.step-badge.active {
  background: rgba(100, 184, 255, 0.25);
  color: #64b8ff;
  border: 1px solid #64b8ff;
}

.step-separator {
  color: #2a4a6a;
  padding: 0 4px;
}

/* ===== SECTIONS ===== */
.step-container {
  animation: fadeSlideUp 0.5s ease;
}

.showcase-section,
.route-section,
.other-dest-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 13px;
  color: #5a8aaa;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

/* ===== DESTINATIONS GRID ===== */
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.dest-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 180, 255, 0.12);
  border-radius: 14px;
  padding: 14px 12px;
  text-align: center;
}

.dest-emoji {
  font-size: 28px;
  margin-bottom: 4px;
}

.dest-name {
  font-size: 12px;
  font-weight: 600;
  color: #c8e0f4;
  margin-bottom: 4px;
}

.dest-temp {
  font-size: 11px;
  color: #4a8aad;
}

.card-hover {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(100, 200, 255, 0.2);
}

/* ===== PREFERENCE FORM ===== */
.pref-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 180, 255, 0.15);
  border-radius: 20px;
  padding: 24px;
}

.form-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #a8d4f0;
  letter-spacing: 1px;
}

.pref-group {
  margin-bottom: 20px;
}

.group-label {
  font-size: 13px;
  color: #6aa0c0;
  margin-bottom: 10px;
}

.required {
  color: #e05a5a;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-btn {
  border: 1.5px solid rgba(100, 180, 255, 0.35);
  background: rgba(100, 180, 255, 0.07);
  color: #a8d4f0;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}

.tag-btn:hover {
  border-color: #64b8ff;
  color: #e8f4fd;
}

.tag-btn.active {
  background: rgba(100, 180, 255, 0.25);
  border-color: #64b8ff;
  color: #e8f4fd;
}

.btn-primary {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1a6bb5, #0d9dd4);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 2px;
  transition: all 0.2s;
  animation: pulse 2.5s infinite;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.15);
  transform: scale(1.03);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  animation: none;
}

.hint-text {
  text-align: center;
  font-size: 12px;
  color: #4a7a9a;
  margin-top: 8px;
}

/* ===== AI CARD ===== */
.ai-card,
.route-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 180, 255, 0.2);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
}

.ai-header,
.route-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.ai-icon,
.route-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.ai-icon {
  background: linear-gradient(135deg, #1a6bb5, #0d9dd4);
}

.route-icon {
  background: linear-gradient(135deg, #1a7a4a, #0da070);
}

.ai-info,
.route-info {
  flex: 1;
}

.ai-title,
.route-title {
  font-size: 15px;
  font-weight: 600;
  color: #c8e0f4;
}

.ai-subtitle,
.route-subtitle {
  font-size: 12px;
  color: #4a8aad;
}

.btn-reset {
  background: transparent;
  border: 1px solid rgba(100, 180, 255, 0.3);
  color: #7ab3d4;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.btn-reset:hover {
  border-color: #64b8ff;
  color: #a8d4f0;
}

/* ===== LOADING STATE ===== */
.loading-state {
  text-align: center;
  padding: 32px 0;
}

.loading-emoji {
  font-size: 32px;
  margin-bottom: 12px;
  animation: shimmer 1.5s infinite;
}

.loading-text {
  color: #5a9abf;
  font-size: 14px;
}

.loading-dots {
  color: #3a7a9f;
  margin-top: 8px;
}

.loading-dots span {
  animation: blink 1.2s infinite;
  display: inline-block;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

/* ===== PROSE TEXT ===== */
.prose-text {
  white-space: pre-wrap;
  line-height: 1.9;
  font-size: 14px;
  color: #c8e0f4;
}

/* ===== ROUTE BUTTONS ===== */
.dest-buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.dest-btn-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 180, 255, 0.12);
  border-radius: 14px;
  padding: 14px 16px;
  cursor: pointer;
}

.dest-btn-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.dest-btn-name {
  font-size: 14px;
  font-weight: 600;
  color: #c8e0f4;
  margin-bottom: 4px;
}

.dest-btn-meta {
  font-size: 12px;
  color: #4a8aad;
}

.dest-btn-emoji {
  font-size: 24px;
}

.dest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.dest-tag {
  font-size: 11px;
  color: #5a9abf;
  background: rgba(100, 180, 255, 0.1);
  border-radius: 6px;
  padding: 2px 6px;
}

.dest-btn-action {
  margin-top: 10px;
  font-size: 12px;
  color: #1a8acd;
}

/* ===== CHAT BOX ===== */
.chat-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(100, 180, 255, 0.12);
  border-radius: 20px;
  overflow: hidden;
}

.chat-header {
  padding: 14px 18px;
  border-bottom: 1px solid rgba(100, 180, 255, 0.1);
  font-size: 14px;
  color: #7ab3d4;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-messages {
  height: 200px;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-message {
  display: flex;
  margin-bottom: 10px;
}

.chat-message.user {
  justify-content: flex-end;
}

.chat-message.ai {
  justify-content: flex-start;
}

.chat-bubble {
  max-width: 80%;
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.7;
  color: #c8e0f4;
  white-space: pre-wrap;
  border-radius: 18px;
}

.chat-bubble-user {
  background: linear-gradient(135deg, #1a5a9a, #0d7abf);
  color: white;
  border-radius: 18px 18px 4px 18px;
}

.chat-bubble-ai {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 18px 18px 18px 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chat-input-box {
  display: flex;
  padding: 10px 12px;
  border-top: 1px solid rgba(100, 180, 255, 0.1);
  gap: 8px;
}

.chat-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(100, 180, 255, 0.2);
  border-radius: 10px;
  padding: 8px 14px;
  color: #e8f4fd;
  font-size: 13px;
  font-family: inherit;
  outline: none;
}

.chat-input:focus {
  border-color: rgba(100, 200, 255, 0.5);
}

.chat-input::placeholder {
  color: #4a7a9a;
}

.chat-send-btn {
  background: linear-gradient(135deg, #1a6bb5, #0d9dd4);
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s;
}

.chat-send-btn:hover:not(:disabled) {
  filter: brightness(1.15);
}

.chat-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== OTHER DESTINATIONS ===== */
.other-dest-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.other-dest-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 180, 255, 0.15);
  border-radius: 10px;
  padding: 8px 16px;
  color: #7ab3d4;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.other-dest-btn:hover {
  border-color: #64b8ff;
  color: #a8d4f0;
  background: rgba(100, 180, 255, 0.08);
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(100, 180, 255, 0.3);
  border-radius: 2px;
}
</style>
