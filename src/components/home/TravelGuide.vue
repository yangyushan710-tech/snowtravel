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
          <img src="/image/Group 1410084089.png" alt="AI助手" class="ai-assistant-image" @click="openAIChat" style="cursor: pointer;" />
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
    
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getSubjects, getSubjectById } from '@/api/travelGuide'
import './TravelGuide.css'

export default {
  name: 'TravelGuide',
  emits: ['open-snow-ai'],
  setup(props, { emit }) {
    const currentGuideIndex = ref(0)
    const guideTimerId = ref(null)
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
    
    // 打开AI聊天
    const openAIChat = () => {
      // 导航到完整的AI助手页面
      emit('open-snow-ai')
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
      isLoadingSubjects,
      showSubjectDetail,
      currentSubject,
      isLoadingDetail,
      openSubjectDetail,
      closeSubjectDetail,
      openAIChat
    }
  }
}
</script>