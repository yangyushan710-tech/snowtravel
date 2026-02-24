<template>
  <section class="section winter-activities">
    <div class="winter-activities-header">
      <img src="/image/Group 1410084059.png" alt="冬季活动标题" class="winter-activities-title-img" />
    </div>
    <div class="section-inner">
      <div class="winter-activities-content">
        <div class="winter-activities-left">
          <h3 class="winter-activities-title-cn">{{ articleTitle }}</h3>
          <p class="winter-activities-desc">
            {{ articleDescription }}
          </p>
          <button class="winter-activities-cta" @click="handleExperienceClick">
            立即体验
            <img src="/image/Vector (9).png" alt="箭头" class="cta-arrow" />
          </button>
        </div>
        <div class="winter-activities-right">
          <div class="winter-activities-container">
            <div class="winter-activities-grid" :class="{ 'sliding': isSliding }">
              <div 
                class="winter-activities-grid-item" 
                :class="{
                  'img-down': index % 2 === 0,
                  'img-up': index % 2 !== 0,
                  'main-image': index === 1,
                  'sliding-item': isSliding
                }" 
                v-for="(image, index) in images" 
                :key="index"
                :style="{
                  transitionDelay: `${index * 0.1}s`
                }"
              >
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
import { fetchArticles } from '../../api/travel'

export default {
  name: 'WinterActivities',
  data() {
    return {
      images: [
        '/image/Rectangle 34628284.png',
        '/image/Rectangle 34628276.png',  // 第二个图片（主图）
        '/image/Rectangle 34628285.png',
        '/image/OIP-C.png'
      ],
      articleTitle: '东北民俗非遗的现代蜕变',
      articleDescription: '东北民俗与非遗在现代化进程中，通过节庆活化、教育传承和创新设计（如鱼皮画文创）持续焕发生命力，成为中华文化多元一体格局的重要见证。',
      articles: [],
      isSliding: false,
      currentIndex: 1  // 当前主图索引（第二个图片）
    }
  },
  mounted() {
    this.loadArticles()
  },
  methods: {
    handleExperienceClick() {
      window.location.href = '#/heritage'
    },
    prevSlide() {
      if (this.isSliding) return
      
      this.isSliding = true
      
      // 执行轮播逻辑（向右轮播 - 下一张）
      setTimeout(() => {
        // 将第一张图片移到最后面
        const firstImage = this.images.shift()
        this.images.push(firstImage)
        
        // 动画结束后重置状态
        setTimeout(() => {
          this.isSliding = false
        }, 600)
      }, 100)
    },
    nextSlide() {
      if (this.isSliding) return
      
      this.isSliding = true
      
      // 执行轮播逻辑（向左轮播 - 上一张）
      setTimeout(() => {
        // 将最后一张图片移到最前面
        const lastImage = this.images.pop()
        this.images.unshift(lastImage)
        
        // 动画结束后重置状态
        setTimeout(() => {
          this.isSliding = false
        }, 600)
      }, 100)
    },
    async loadArticles() {
      try {
        const result = await fetchArticles()
        console.log('加载文章数据:', result)
        this.articles = result
        
        // 如果有文章数据，更新标题和描述
        if (result && result.length > 0) {
          this.articleTitle = result[0].title || this.articleTitle
          this.articleDescription = result[0].content || this.articleDescription
        }
      } catch (error) {
        console.error('加载文章错误:', error)
      }
    }
  }
}
</script>
