import { ref, onMounted, onUnmounted } from 'vue'

export function useBannerCarousel() {
  const currentBannerIndex = ref(0)
  const currentNav = ref('home')
  const userMenuOpen = ref(false)
  const bannerTimerId = ref(null)
  
  const bannerImages = [
    '/image/Group 1410081960.png',
    '/image/banner2 (1).png',
    '/image/banner3 (1).png',
    '/image/banner3.png',
    '/image/image 2517.png',
  ]
  
  const goLogin = () => {
    console.log('Navigate to login')
  }
  
  onMounted(() => {
    bannerTimerId.value = setInterval(() => {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerImages.length
    }, 5000)
  })
  
  onUnmounted(() => {
    if (bannerTimerId.value) {
      clearInterval(bannerTimerId.value)
    }
  })
  
  return {
    currentBannerIndex,
    bannerImages,
    currentNav,
    userMenuOpen,
    goLogin
  }
}
