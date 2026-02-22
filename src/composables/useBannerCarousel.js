import { ref, onMounted, onUnmounted } from 'vue'
import { getUserProfile } from '@/api/travel.js'

export function useBannerCarousel() {
  const currentBannerIndex = ref(0)
  const currentNav = ref('home')
  const userMenuOpen = ref(false)
  const bannerTimerId = ref(null)
  const userInfo = ref(null)
  const userLoading = ref(false)
  const userError = ref('')
  
  const bannerImages = [
    '/image/Group 1410081960.png',
    '/image/banner2 (1).png',
    '/image/banner3 (1).png',
    '/image/banner3.png',
    '/image/image 2517.png',
  ]
  
  const fetchUserInfo = async () => {
    userLoading.value = true
    userError.value = ''
    
    try {
      // 假设默认用户ID为1
      const userId = 1
      // 这里可以从localStorage或其他地方获取token
      const token = ''
      
      const data = await getUserProfile(userId, token)
      userInfo.value = data
      console.log('✅ 获取用户信息成功:', data)
    } catch (err) {
      userError.value = `获取用户信息失败: ${err.message}`
      console.error('获取用户信息失败:', err)
    } finally {
      userLoading.value = false
    }
  }
  
  const goLogin = () => {
    console.log('Navigate to login')
  }
  
  onMounted(() => {
    bannerTimerId.value = setInterval(() => {
      currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerImages.length
    }, 5000)
    
    // 加载用户信息
    fetchUserInfo()
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
    userInfo,
    userLoading,
    userError,
    goLogin,
    fetchUserInfo
  }
}
