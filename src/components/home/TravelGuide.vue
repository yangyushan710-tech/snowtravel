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
    
    const openAIChat = () => {
      showAIChat.value = true
      if (!chatMessages.value || chatMessages.value.length === 0) {
        chatMessages.value.push({
          role: 'assistant',
          content: '您好！我是AI助手，有什么可以帮助您的吗？'
        })
      }
    }
    
    const guideCards = [
      { title: '索菲亚大教堂', desc: '拜占庭风格东正教堂', img: '/image/Mask group (1).png' },
      { title: '长白山', desc: '天池雪景', img: '/image/Rectangle 34628259.png' },
      { title: '哈尔滨冰雪大世界', desc: '享受冰雪乐园', img: '/image/Rectangle 34628257.png' },
      { title: '哈尔滨', desc: '济南出发黑龙江4晚3天跟团游', img: '/image/Rectangle 34628258.png' },
      { title: '亚布力滑雪场', desc: '中国现代滑雪运动的发源地', img: '/image/Rectangle 34628261.png' },
    ]
    
    const displayCards = computed(() => {
      const cards = guideCards
      const len = cards.length
      return [
        cards[(currentGuideIndex.value - 2 + len) % len],
        cards[(currentGuideIndex.value - 1 + len) % len],
        cards[currentGuideIndex.value],
        cards[(currentGuideIndex.value + 1) % len],
        cards[(currentGuideIndex.value + 2) % len]
      ]
    })
    
    const guidePrev = () => {
      currentGuideIndex.value = (currentGuideIndex.value - 1 + guideCards.length) % guideCards.length
    }
    
    const guideNext = () => {
      currentGuideIndex.value = (currentGuideIndex.value + 1) % guideCards.length
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
      guideTimerId.value = setInterval(() => {
        currentGuideIndex.value = (currentGuideIndex.value + 1) % guideCards.length
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
      openAIChat,
      closeAIChat,
      sendMessage
    }
  }
}
</script>
