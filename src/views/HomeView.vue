<template>
    <div class="home-page">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载首页数据中...</p>
      </div>
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button class="retry-btn" @click="fetchHomePageData">重试</button>
      </div>
      <div v-else>
        <!-- 顶部导航 + Hero -->
        <HeroSection :heroData="homeData.hero" />
        <!-- 搜索栏 -->
        <SearchBar @search-results="handleSearchResults" />
        <SearchResults :results="searchResults" :searched="searched" @book="handleBook" />
        
        <!-- TRAVEL GUIDE 旅行指南 -->
        <TravelGuide :guideData="homeData.travelGuide" />

        <!-- RECOMMENDED ROUTE 推荐路线 -->
        <RecommendedRoute :routesData="homeData.recommendedRoutes" />
    
        <!-- SCENIC SPOTS 景点概览 -->
        <ScenicSpots :spotsData="homeData.scenicSpots" />

        <!-- WINTER ACTIVITIES 冬季活动 -->
        <WinterActivities :activitiesData="homeData.winterActivities" />
    
        <!--出行服务 -->
        <TravelServices :servicesData="homeData.travelServices" />
        <!-- Footer -->
        <Footer :footerData="homeData.footer" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getHomePageData } from '@/api/travel.js'
  import SearchBar from '@/components/home/SearchBar.vue'
  import SearchResults from '@/components/home/SearchResults.vue'
  import TravelGuide from '@/components/home/TravelGuide.vue'
  import HeroSection from '@/components/home/HeroSection.vue'
  import RecommendedRoute from '@/components/home/RecommendedRoute.vue'
  import ScenicSpots from '@/components/home/ScenicSpots.vue'
  import WinterActivities from '@/components/home/WinterActivities.vue'
  import TravelServices from '@/components/home/TravelServices.vue'
  import Footer from '@/components/home/Footer.vue'
  
  export default {
    name: 'HomeView',
    components: {
      SearchBar,
      SearchResults,
      TravelGuide,
      HeroSection,
      RecommendedRoute,
      ScenicSpots,
      WinterActivities,
      TravelServices,
      Footer
    },
    setup() {
      const searchResults = ref([])
      const searched = ref(false)
      const loading = ref(false)
      const error = ref('')
      const homeData = ref({
        hero: {
          title: '自在游，安心享',
          subtitle: '探索冰雪世界的奇妙之旅',
          image: '/image/welcome.png'
        },
        travelGuide: {
          title: '旅行指南',
          items: []
        },
        recommendedRoutes: [],
        scenicSpots: {
          title: '热门景点',
          spots: []
        },
        winterActivities: {
          title: '冬季活动',
          activities: []
        },
        travelServices: {
          title: '出行服务',
          services: []
        },
        footer: {
          logo: '/image/logo.jpg',
          links: [],
          social: [],
          copyright: ''
        }
      })
      
      const fetchHomePageData = async () => {
        loading.value = true
        error.value = ''
        
        try {
          const data = await getHomePageData()
          homeData.value = data
          console.log('✅ 首页数据加载成功:', data)
        } catch (err) {
          error.value = `获取首页数据失败: ${err.message}`
          console.error('获取首页数据失败:', err)
        } finally {
          loading.value = false
        }
      }
      
      const handleSearchResults = (results) => {
        searchResults.value = results
        searched.value = true
        
        if (results.length > 0) {
          console.log('搜索成功，找到', results.length, '个结果')
        } else {
          console.log('没有找到符合条件的旅行计划')
        }
      }
      
      const handleBook = (item) => {
        console.log('预订:', item)
        alert(`您选择了: ${item.title}`)
      }
      
      onMounted(() => {
        fetchHomePageData()
      })
      
      return {
        searchResults,
        searched,
        loading,
        error,
        homeData,
        handleSearchResults,
        handleBook,
        fetchHomePageData
      }
    },
  data() {
    return {
    }
},
    methods: {
    },
  }
  </script>
  
  <style>
  /* 全局样式重置 */
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>

<style scoped>
  .home-page {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 16px;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(46, 138, 255, 0.2);
    border-top: 3px solid #2E8AFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-container p {
    color: #666;
    font-size: 14px;
  }
  
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 16px;
    text-align: center;
    padding: 0 20px;
  }
  
  .error-message {
    color: #ff4d4f;
    font-size: 14px;
    margin: 0;
  }
  
  .retry-btn {
    padding: 8px 16px;
    background-color: #2E8AFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .retry-btn:hover {
    background-color: #1890ff;
  }
  </style>
