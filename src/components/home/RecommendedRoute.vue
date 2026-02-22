<template>
  <section class="section recommended-route">
    <div class="section-inner">
      <div class="route-title-container">
        <img src="/image/Frame 1597884346.png" alt="推荐路线" class="route-title-image" />
        <img src="/image/Vector 4214.png" alt="装饰线" class="route-decoration-line" />
      </div>
      <div class="route-content">
        <div class="timeline-wrap">
          <button class="route-carousel-btn prev" @click="timelinePrev">
            <img src="/image/Group 1410084043 (1).png" alt="上一页" class="carousel-btn-image" />
          </button>
          <div class="timeline">
            <div class="timeline-item" v-for="(node, i) in displayTimelineNodes" :key="node.date + i" :class="{ 'middle-item': node.position === 'middle', 'left-item': node.position === 'left', 'right-item': node.position === 'right' }">
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
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import './RecommendedRoute.css'

export default {
  name: 'RecommendedRoute',
  setup() {
    const currentTimelineIndex = ref(0)
    let autoPlayTimer = null
    
    const timelineNodes = [
      { date: '2026.12.11', title: '自然奇观:盘锦鞍山 5日', desc: '红海滩&千山风景区&广厦艺术街&辽河湿地' },
      { date: '2026.12.11', location: '辽宁', title: '滨海风情:大连旅顺5日', desc: '金石滩 & 老虎滩海洋公园&旅顺军港&星海广场' },
      { date: '2026.12.24', title: '历史探寻:沈阳本溪 5日', desc: '沈阳故宫&张氏帅府&本溪水洞&中街步行街' },
      { date: '2026.12.25', title: '冰雪世界:哈尔滨冰雪大世界', desc: '冰雪艺术&冰雕展览&冰雪娱乐' },
      { date: '2026.12.26', title: '长白山天池:冰雪奇观', desc: '天池雪景&温泉体验&滑雪运动' },
      { date: '2026.12.27', title: '漠河极光:神州北极之旅', desc: '极光观赏&北极村体验&冰雪探险' },
    ]
    
    const displayTimelineNodes = computed(() => {
      const nodes = timelineNodes
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
      currentTimelineIndex.value = (currentTimelineIndex.value - 1 + timelineNodes.length) % timelineNodes.length
      resetAutoPlay()
    }
    
    const timelineNext = () => {
      currentTimelineIndex.value = (currentTimelineIndex.value + 1) % timelineNodes.length
      resetAutoPlay()
    }
    
    const startAutoPlay = () => {
      autoPlayTimer = setInterval(() => {
        currentTimelineIndex.value = (currentTimelineIndex.value + 1) % timelineNodes.length
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
    
    onMounted(() => {
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
      timelineNext
    }
  }
}
</script>
