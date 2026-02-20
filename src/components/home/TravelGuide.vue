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
          <img src="/image/Group 1410084089.png" alt="AI助手" class="ai-assistant-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import './TravelGuide.css'

export default {
  name: 'TravelGuide',
  setup() {
    const currentGuideIndex = ref(0)
    const guideTimerId = ref(null)
    
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
      guideNext
    }
  }
}
</script>
