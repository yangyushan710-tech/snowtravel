<template>
  <section class="section scenic-spots">
    <div class="scenic-wrapper">
      <div
        class="scenic-bg"
        :style="{ backgroundImage: `url('/image/花瓣素材_风光通用连绵雪山背景元素素材_193516301 1.png')` }"
      ></div>
      <div class="scenic-grid">
        <div 
          v-for="(spot, index) in scenicSpots" 
          :key="index" 
          class="scenic-item"
        >
          <div class="scenic-img">
            <img :src="spot.image" :alt="spot.name" />
            <div class="scenic-overlay">
              <img src="/image/Frame 1597884353.png" alt="location" class="location-icon" />
            </div>
          </div>
          <div class="scenic-info">
            <h3 class="location-name">{{ spot.name }}</h3>
            <p class="location-desc">{{ spot.desc }}</p>
            <img src="/image/Vector (9).png" alt="arrow" class="arrow-icon" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import './ScenicSpots.css'

export default {
  name: 'ScenicSpots',
  setup() {
    const scenicSpots = ref([
      {
        name: '本溪大石湖风景区',
        desc: '坐落于辽宁本溪满族自治县，以其清澈的湖水和壮丽的山景而闻名',
        image: '/image/Rectangle 34628276.png'
      },
      {
        name: '大兴安岭',
        desc: '雄踞中国东北，广袤的原始森林和独特的生态系统令人叹为观止',
        image: '/image/Rectangle 34628284.png'
      },
      {
        name: '长白山',
        desc: '坐落于中国吉林省东南部，以其壮丽的天池和丰富的自然资源而著称',
        image: '/image/Rectangle 34628285.png'
      },
      {
        name: '双峰林场',
        desc: '中国雪乡，位于黑龙江省牡丹江市海林市，冬季雪景如童话世界',
        image: '/image/Rectangle 34628286.png'
      },
      {
        name: '哈尔滨冰雪大世界',
        desc: '世界最大的冰雪主题公园，以其精美的冰雕和雪雕艺术而闻名',
        image: '/image/Rectangle 34628257.png'
      },
      {
        name: '亚布力滑雪场',
        desc: '中国现代滑雪运动的发源地，拥有优质的雪道和完善的设施',
        image: '/image/Rectangle 34628258.png'
      },
      {
        name: '沈阳故宫',
        desc: '中国现存完整的两大宫殿建筑群之一，具有极高的历史和艺术价值',
        image: '/image/Rectangle 34628259.png'
      },
      {
        name: '大连星海广场',
        desc: '亚洲最大的城市广场，以其壮观的建筑和美丽的海景而著称',
        image: '/image/Rectangle 34628261.png'
      },
      {
        name: '漠河北极村',
        desc: '中国最北端的村庄，是观赏极光和体验北极文化的绝佳地点',
        image: '/image/Rectangle 34628265.png'
      }
    ])
    
    return {
      scenicSpots
    }
  }
}
</script>
