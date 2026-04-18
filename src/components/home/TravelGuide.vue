<template>
  <section class="section travel-guide">
    <div class="section-inner">
      <div class="section-title-container">
        <img src="/image/Group 1410084060.png" alt="TRAVEL GUIDE" class="section-title-image" />
      </div>
      <div class="carousel-wrap">
        <transition-group name="carousel" tag="div" class="cards-carousel">
          <div 
            class="guide-card" 
            v-for="(item, i) in displayCards" 
            :key="item.img" 
            :class="{ active: i === 2 }"
            @click="i === 2 && openSubjectDetail(item)"
          >
            <div class="card-img" :style="{ backgroundImage: `url('${item.img}')` }">
              <div class="card-info" v-if="i === 2">
                <img src="/image/dingwei-6 1.png" alt="定位" class="location-icon" />
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="carousel-controls">
          <button class="carousel-btn prev" @click="guidePrev">
            <img src="/image/Group 1410084043.png" alt="上一页" class="carousel-btn-image" />
          </button>
          <button class="carousel-btn next" @click="guideNext">
            <img src="/image/Group 1410084044.png" alt="下一页" class="carousel-btn-image" />
          </button>
          <img src="/image/Group 1410084089.png" alt="AI助手" class="ai-assistant-image" @click="openAIChat" />
        </div>
      </div>
    </div>
    
    <!-- 专题详情弹窗 -->
    <div v-if="showSubjectDetail" class="subject-detail-modal" @click.self="closeSubjectDetail">
      <div class="subject-detail-container">
        <div class="subject-detail-header">
          <h3>{{ currentSubject?.title || '专题详情' }}</h3>
          <button class="close-btn" @click="closeSubjectDetail">✕</button>
        </div>
        <div class="subject-detail-content" v-if="!isLoadingDetail">
          <div class="subject-images" v-if="currentSubject?.images?.length">
            <img v-for="(img, index) in currentSubject.images" :key="index" :src="img" :alt="currentSubject.title" />
          </div>
          <div class="subject-info">
            <p class="subject-desc">{{ currentSubject?.desc }}</p>
            <p class="subject-detail-text">{{ currentSubject?.detail }}</p>
            <div class="subject-tags" v-if="currentSubject?.tags?.length">
              <span v-for="(tag, index) in currentSubject.tags" :key="index" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
        <div class="subject-detail-loading" v-else>
          <p>加载中...</p>
        </div>
      </div>
    </div>
    
    <div v-if="showAIChat" class="ai-chat-modal" @click.self="closeAIChat">
      <div class="ai-chat-container">
        <div class="ai-chat-header">
          <h3>AI助手</h3>
          <button class="close-btn" @click="closeAIChat">✕</button>
        </div>
        <div class="ai-chat-messages" ref="messagesContainer">
          <div v-for="(msg, index) in chatMessages" :key="index" :class="['chat-message', msg.role]">
            <div class="message-content">{{ msg.content }}</div>
          </div>
        </div>
        <div class="ai-chat-input">
          <input 
            type="text" 
            v-model="userInput" 
            placeholder="请输入您的问题..." 
            @keyup.enter="sendMessage"
            :disabled="loading"
          />
          <button class="send-btn" @click="sendMessage" :disabled="loading || !userInput.trim()">
            {{ loading ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { sendChatMessage } from '@/api/chat'
import { getSubjects, getSubjectById } from '@/api/travelGuide'
import './TravelGuide.css'

export default {
  name: 'TravelGuide',
  setup() {
    const currentGuideIndex = ref(0)
    const guideTimerId = ref(null)
    const showAIChat = ref(false)
    const chatMessages = ref([])
    const userInput = ref('')
    const loading = ref(false)
    const messagesContainer = ref(null)
    const guideCards = ref([])
    const isLoadingSubjects = ref(false)
    
    // 专题详情相关
    const showSubjectDetail = ref(false)
    const currentSubject = ref(null)
    const isLoadingDetail = ref(false)
    
    // 获取专题列表
    const fetchSubjects = async () => {
      isLoadingSubjects.value = true
      try {
        const data = await getSubjects()
        guideCards.value = data.map(item => ({
          id: item.id,
          title: item.title,
          desc: item.desc,
          img: item.img
        }))
        console.log('专题列表加载成功:', guideCards.value)
      } catch (err) {
        console.error('加载专题列表失败:', err)
      } finally {
        isLoadingSubjects.value = false
      }
    }
    
    // 打开专题详情
    const openSubjectDetail = async (item) => {
      console.log('打开专题详情:', item)
      isLoadingDetail.value = true
      showSubjectDetail.value = true
      
      try {
        // 如果item有id，调用API获取详情
        if (item.id) {
          const detail = await getSubjectById(item.id)
          currentSubject.value = detail
          console.log('专题详情获取成功:', detail)
        } else {
          // 如果没有id，使用当前item作为基础数据
          currentSubject.value = {
            ...item,
            detail: `${item.title}是东北地区著名的旅游景点，吸引了大量游客前来观光。`,
            images: [item.img],
            tags: ['旅游', '景点']
          }
        }
      } catch (err) {
        console.error('获取专题详情失败:', err)
        // 使用基础数据作为fallback
        currentSubject.value = {
          ...item,
          detail: `${item.title}是东北地区著名的旅游景点，吸引了大量游客前来观光。`,
          images: [item.img],
          tags: ['旅游', '景点']
        }
      } finally {
        isLoadingDetail.value = false
      }
    }
    
    // 关闭专题详情
    const closeSubjectDetail = () => {
      showSubjectDetail.value = false
      currentSubject.value = null
    }
    
    const openAIChat = () => {
      showAIChat.value = true
      if (!chatMessages.value || chatMessages.value.length === 0) {
        chatMessages.value.push({
          role: 'assistant',
          content: '您好！我是AI助手，有什么可以帮助您的吗？'
        })
      }
    }
    
    const displayCards = computed(() => {
      const cards = guideCards.value
      const len = cards.length
      if (len === 0) return []
      return [
        cards[(currentGuideIndex.value - 2 + len) % len],
        cards[(currentGuideIndex.value - 1 + len) % len],
        cards[currentGuideIndex.value],
        cards[(currentGuideIndex.value + 1) % len],
        cards[(currentGuideIndex.value + 2) % len]
      ]
    })
    
    const guidePrev = () => {
      if (guideCards.value.length === 0) return
      currentGuideIndex.value = (currentGuideIndex.value - 1 + guideCards.value.length) % guideCards.value.length
    }
    
    const guideNext = () => {
      if (guideCards.value.length === 0) return
      currentGuideIndex.value = (currentGuideIndex.value + 1) % guideCards.value.length
    }
    
    const closeAIChat = () => {
      showAIChat.value = false
    }
    
    const sendMessage = async () => {
      console.log('sendMessage 被调用')
      console.log('userInput:', userInput.value)
      console.log('loading:', loading.value)
      console.log('chatMessages.value:', chatMessages.value)
      
      if (!userInput.value.trim() || loading.value) {
        console.log('消息为空或正在加载，跳过')
        return
      }
      
      const message = userInput.value.trim()
      console.log('准备发送消息:', message)
      
      if (!Array.isArray(chatMessages.value)) {
        console.error('chatMessages.value 不是数组，重新初始化')
        chatMessages.value = []
      }
      
      chatMessages.value.push({
        role: 'user',
        content: message
      })
      
      userInput.value = ''
      loading.value = true
      
      console.log('已添加用户消息，开始调用API')
      
      await nextTick()
      scrollToBottom()
      
      try {
        console.log('调用 sendChatMessage API...')
        const response = await sendChatMessage(message)
        console.log('API响应:', response)
        
        if (response && response.message) {
          chatMessages.value.push({
            role: 'assistant',
            content: response.message
          })
          console.log('已添加AI回复')
        } else {
          throw new Error('API返回格式不正确')
        }
      } catch (error) {
        console.error('发送消息失败:', error)
        console.error('错误详情:', error.message)
        chatMessages.value.push({
          role: 'assistant',
          content: '抱歉，我遇到了一些问题，请稍后再试。'
        })
      } finally {
        loading.value = false
        console.log('发送完成，loading设为false')
        await nextTick()
        scrollToBottom()
      }
    }
    
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }
    
    onMounted(() => {
      // 获取专题列表
      fetchSubjects()
      
      // 启动轮播定时器
      guideTimerId.value = setInterval(() => {
        if (guideCards.value.length > 0) {
          currentGuideIndex.value = (currentGuideIndex.value + 1) % guideCards.value.length
        }
      }, 15000)
    })
    
    onUnmounted(() => {
      if (guideTimerId.value) {
        clearInterval(guideTimerId.value)
      }
    })
    
    return {
      currentGuideIndex,
      guideCards,
      displayCards,
      guidePrev,
      guideNext,
      showAIChat,
      chatMessages,
      userInput,
      loading,
      messagesContainer,
      isLoadingSubjects,
      showSubjectDetail,
      currentSubject,
      isLoadingDetail,
      openAIChat,
      closeAIChat,
      sendMessage,
      openSubjectDetail,
      closeSubjectDetail
    }
  }
}
</script>
