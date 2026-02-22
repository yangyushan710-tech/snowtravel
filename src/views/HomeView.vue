<template>
    <div class="home-page">
      <!-- 顶部导航 + Hero -->
      <HeroSection />
      <!-- 搜索栏 -->
      <SearchBar @search-results="handleSearchResults" />
      <SearchResults :results="searchResults" :searched="searched" @book="handleBook" />
      
      <!-- TRAVEL GUIDE 旅行指南 -->
      <TravelGuide />

      <!-- RECOMMENDED ROUTE 推荐路线 -->
      <RecommendedRoute />
  
      <!-- SCENIC SPOTS 景点概览 -->
      <ScenicSpots />

      <!-- WINTER ACTIVITIES 冬季活动 -->
      <WinterActivities />
  
      <!--出行服务 -->
      <TravelServices />
      <!-- Footer -->
      <Footer />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
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
      
      return {
        searchResults,
        searched,
        handleSearchResults,
        handleBook
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
  </style>
