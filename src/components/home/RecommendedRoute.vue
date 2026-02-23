<template>
  <section class="section recommended-route">
    <div class="section-inner">
      <div class="route-title-container">
        <img src="/image/Frame 1597884346.png" alt="推荐路线" class="route-title-image" />
        <img src="/image/Vector 4214.png" alt="装饰线" class="route-decoration-line" />
      </div>
      <div class="route-content">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载推荐路线中...</p>
        </div>
        <div v-else-if="error" class="error-container">
          <p class="error-message">{{ error }}</p>
          <button class="retry-btn" @click="fetchRecommendedRoutes">重试</button>
        </div>
        <div v-else>
          <div class="timeline-wrap">
            <button class="route-carousel-btn prev" @click="timelinePrev">
              <img src="/image/Group 1410084043 (1).png" alt="上一页" class="carousel-btn-image" />
            </button>
            <div class="timeline">
              <div class="timeline-item" v-for="(node, i) in displayTimelineNodes" :key="node.date + i" :class="{ 'middle-item': node.position === 'middle', 'left-item': node.position === 'left', 'right-item': node.position === 'right' }" @click="routeClick(node)">
                <div class="timeline-top">
                  <template v-if="node.position !== 'middle'">
                    <p class="timeline-title">{{ node.title }}</p>
                    <p class="timeline-desc">{{ node.desc }}</p>
                  </template>
                </div>
                <div class="timeline-dot-wrap">
                  <img v-if="node.position === 'left' || node.position === 'right'" src="/image/Ellipse 5101.png" alt="dot" class="timeline-dot" />
                  <img v-else src="/image/Ellipse 5100.png" alt="dot" class="timeline-dot" />
                </div>
                <div class="timeline-bottom">
                  <template v-if="node.position !== 'middle'">
                    <span class="timeline-date">{{ node.date }}</span>
                  </template>
                  <template v-else>
                    <div class="timeline-middle-content" :class="{ 'long-content': node.title.length >= 8 || node.desc.length >= 12 }">
                      <p class="timeline-date-location">{{ node.date }}{{ node.location ? '-' + node.location : '' }}</p>
                      <p class="timeline-title">{{ node.title }}</p>
                      <p class="timeline-desc">{{ node.desc }}</p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <button class="route-carousel-btn next" @click="timelineNext">
              <img src="/image/Group 1410084044 (1).png" alt="下一页" class="carousel-btn-image" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getRecommendedRoutes } from '../../api/travel.js'
import './RecommendedRoute.css'

export default {
  name: 'RecommendedRoute',
  setup() {
    const currentTimelineIndex = ref(0)
    let autoPlayTimer = null
    const loading = ref(false)
    const error = ref('')
    const timelineNodes = ref([
      { date: '2026.12.11', title: '自然奇观:盘锦鞍山 5日', desc: '红海滩&千山风景区&广厦艺术街&辽河湿地' },
      { date: '2026.12.11', location: '辽宁', title: '滨海风情:大连旅顺5日', desc: '金石滩 & 老虎滩海洋公园&旅顺军港&星海广场' },
      { date: '2026.12.24', title: '历史探寻:沈阳本溪 5日', desc: '沈阳故宫&张氏帅府&本溪水洞&中街步行街' },
      { date: '2026.12.25', title: '冰雪世界:哈尔滨冰雪大世界', desc: '冰雪艺术&冰雕展览&冰雪娱乐' },
      { date: '2026.12.26', title: '长白山天池:冰雪奇观', desc: '天池雪景&温泉体验&滑雪运动' },
      { date: '2026.12.27', title: '漠河极光:神州北极之旅', desc: '极光观赏&北极村体验&冰雪探险' },
    ])
    
    const fetchRecommendedRoutes = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const routes = await getRecommendedRoutes()
        // 将API返回的数据转换为组件需要的格式
        const formattedRoutes = routes.map((route, index) => {
          // 生成模拟日期（从今天开始）
          const date = new Date()
          date.setDate(date.getDate() + index)
          const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
          
          return {
            id: route.id,
            date: formattedDate,
            title: route.title,
            desc: route.description,
            location: '中国',
            originalRoute: route
          }
        })
        
        // 合并API数据和原有数据
        timelineNodes.value = [...formattedRoutes, ...timelineNodes.value]
      } catch (err) {
        error.value = `获取推荐路线失败: ${err.message}`
        console.error('获取推荐路线失败:', err)
      } finally {
        loading.value = false
      }
    }
    
    const displayTimelineNodes = computed(() => {
      const nodes = timelineNodes.value
      const len = nodes.length
      const currentIndex = currentTimelineIndex.value
      
      const prevIndex = (currentIndex - 1 + len) % len
      const nextIndex = (currentIndex + 1) % len
      
      return [
        { ...nodes[prevIndex], position: 'left' },
        { ...nodes[currentIndex], position: 'middle' },
        { ...nodes[nextIndex], position: 'right' }
      ]
    })
    
    const timelinePrev = () => {
      currentTimelineIndex.value = (currentTimelineIndex.value - 1 + timelineNodes.value.length) % timelineNodes.value.length
      resetAutoPlay()
    }
    
    const timelineNext = () => {
      currentTimelineIndex.value = (currentTimelineIndex.value + 1) % timelineNodes.value.length
      resetAutoPlay()
    }
    
    const startAutoPlay = () => {
      autoPlayTimer = setInterval(() => {
        currentTimelineIndex.value = (currentTimelineIndex.value + 1) % timelineNodes.value.length
      }, 3000)
    }
    
    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
      }
    }
    
    const resetAutoPlay = () => {
      stopAutoPlay()
      startAutoPlay()
    }
    
    const routeClick = (node) => {
      console.log('点击了路线:', node)
      alert('点击了路线: ' + node.title)
      if (node.id) {
        // 这里可以添加跳转到路线详情页面的逻辑
        console.log('跳转到路线详情页面，路线ID:', node.id)
        // 例如：window.location.href = `/route-detail/${node.id}`
      } else {
        console.log('该路线没有ID，无法跳转到详情页')
      }
    }
    
    onMounted(() => {
      fetchRecommendedRoutes()
      startAutoPlay()
    })
    
    onUnmounted(() => {
      stopAutoPlay()
    })
    
    return {
      currentTimelineIndex,
      timelineNodes,
      displayTimelineNodes,
      timelinePrev,
      timelineNext,
      loading,
      error,
      fetchRecommendedRoutes,
      routeClick
    }
  }
}
</script>
