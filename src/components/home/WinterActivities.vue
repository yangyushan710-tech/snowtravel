<template>
  <section class="section winter-activities">
    <div class="section-inner">
      <div class="winter-activities-header">
        <img src="/image/Group 1410084058.png" alt="冬季活动" class="winter-activities-title-img" />
      </div>
      <div class="winter-activities-content">
        <div class="winter-activities-left">
          <h2 class="winter-activities-title-cn">冬季活动</h2>
          <p class="winter-activities-desc">
            东北冬季是体验冰雪文化的绝佳时节，从滑雪到冰雪节庆，从温泉到极光观赏，这里应有尽有。
          </p>
          <button class="winter-activities-cta">
            立即体验
            <img src="/image/Vector (9).png" alt="arrow" class="cta-arrow" />
          </button>
        </div>
        <div class="winter-activities-right">
          <div class="winter-activities-main-card">
            <img src="/image/Rectangle 34628276.png" alt="冬季活动" class="winter-activities-main-img" />
          </div>
          <div class="winter-activities-gallery">
            <img 
              v-for="(img, index) in activityImages" 
              :key="index" 
              :src="img" 
              alt="冬季活动" 
              class="winter-activities-gallery-img"
              :style="{ marginTop: index % 2 === 0 ? '40px' : '0' }"
            />
          </div>
        </div>
      </div>
      <div class="winter-activities-footer">
        <button class="winter-activities-nav-btn prev" @click="activityPrev">
          <img src="/image/Group 1410084043.png" alt="上一页" class="nav-btn-image" />
        </button>
        <button class="winter-activities-nav-btn next" @click="activityNext">
          <img src="/image/Group 1410084044.png" alt="下一页" class="nav-btn-image" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import './WinterActivities.css'

export default {
  name: 'WinterActivities',
  setup() {
    const currentActivityIndex = ref(0)
    
    const activityImages = [
      '/image/Rectangle 34628276.png',
      '/image/Rectangle 34628284.png',
      '/image/Rectangle 34628285.png',
      '/image/Rectangle 34628286.png'
    ]
    
    const activityPrev = () => {
      currentActivityIndex.value = (currentActivityIndex.value - 1 + activityImages.length) % activityImages.length
    }
    
    const activityNext = () => {
      currentActivityIndex.value = (currentActivityIndex.value + 1) % activityImages.length
    }
    
    return {
      currentActivityIndex,
      activityImages,
      activityPrev,
      activityNext
    }
  }
}
</script>
