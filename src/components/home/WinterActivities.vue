<template>
  <section class="section winter-activities">
    <div class="winter-activities-header">
      <img src="/image/Group 1410084059.png" alt="冬季活动标题" class="winter-activities-title-img" />
    </div>
    <div class="section-inner">
      <div class="winter-activities-content">
        <div class="winter-activities-left">
          <h3 class="winter-activities-title-cn">东北民俗非遗的现代蜕变</h3>
          <p class="winter-activities-desc">
            东北民俗与非遗在现代化进程中，通过节庆活化、教育传承和创新设计（如鱼皮画文创）持续焕发生命力，成为中华文化多元一体格局的重要见证。
          </p>
          <button class="winter-activities-cta" @click="handleExperienceClick">
            立即体验
            <img src="/image/Vector (9).png" alt="箭头" class="cta-arrow" />
          </button>
        </div>
        <div class="winter-activities-right">
          <div class="winter-activities-container">
            <div class="winter-activities-grid">
              <div class="winter-activities-grid-item" :class="index % 2 === 0 ? 'img-down' : 'img-up'" v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="`冬季活动图片${index + 1}`" :class="['winter-activities-grid-img', index === 3 ? 'winter-activities-grid-img-small' : '']" />
              </div>
            </div>
            <div class="winter-activities-nav">
              <button class="winter-activities-nav-btn" @click="prevSlide">
                <img src="/image/Group 1410084043 (3).png" alt="左箭头" />
              </button>
              <button class="winter-activities-nav-btn active" @click="nextSlide">
                <img src="/image/Group 1410084044 (3).png" alt="右箭头" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './WinterActivities.css'

export default {
  name: 'WinterActivities',
  data() {
    return {
      images: [
        '/image/Rectangle 34628284.png',
        '/image/Rectangle 34628276.png',
        '/image/Rectangle 34628285.png',
        '/image/OIP-C.png'
      ]
    }
  },
  methods: {
    handleExperienceClick() {
      window.location.href = '#/heritage'
    },
    prevSlide() {
      // 将最后一张图片移到最前面
      const lastImage = this.images.pop()
      this.images.unshift(lastImage)
    },
    nextSlide() {
      // 将第一张图片移到最后面
      const firstImage = this.images.shift()
      this.images.push(firstImage)
    }
  }
}
</script>
