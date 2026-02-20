<template>
  <div class="home-page">
    <HeroSection />
    <SearchBar @search-results="handleSearchResults" />
    <SearchResults :results="searchResults" :searched="searched" @book="handleBook" />
    <TravelGuide />
    <RecommendedRoute />
    <ScenicSpots />
    <WinterActivities />
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import SearchBar from '@/components/home/SearchBar.vue'
import SearchResults from '@/components/home/SearchResults.vue'
import TravelGuide from '@/components/home/TravelGuide.vue'
import RecommendedRoute from '@/components/home/RecommendedRoute.vue'
import ScenicSpots from '@/components/home/ScenicSpots.vue'
import WinterActivities from '@/components/home/WinterActivities.vue'
import Footer from '@/components/home/Footer.vue'
import './HomeViewRefactored.global.css'
import './HomeViewRefactored.css'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    SearchBar,
    SearchResults,
    TravelGuide,
    RecommendedRoute,
    ScenicSpots,
    WinterActivities,
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
  }
}
</script>
