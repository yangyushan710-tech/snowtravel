<template>
  <div class="hero-section">
    <div class="hero-bg-wrap">
      <transition name="fade">
        <div
          class="hero-bg"
          :style="{ backgroundImage: `url('${bannerImages[currentBannerIndex]}')` }"
          :key="currentBannerIndex"
        ></div>
      </transition>
    </div>
    <div class="hero-content">
      <nav class="top-nav">
        <div class="nav-links">
          <a href="#" :class="{ active: currentNav === 'home' }" @click.prevent="currentNav = 'home'">首页</a>
          <a href="#" :class="{ active: currentNav === 'category' }" @click.prevent="currentNav = 'category'">分类</a>
        </div>
        <div class="nav-user">
          <div v-if="searchBoxOpen" class="search-box">
            <input type="text" placeholder="搜索..." class="search-input" />
          </div>
          <img src="/image/Vector.png" alt="search" class="search-icon" @click.stop="searchBoxOpen = !searchBoxOpen" />
          <div class="nav-user-info" @click="userMenuOpen = !userMenuOpen">
            <div class="avatar" v-if="!userInfo">
              <img src="/image/logo.jpg" alt="默认头像" style="width: 100%; height: 100%; border-radius: 50%;" />
            </div>
            <div class="avatar" v-else>
              <img :src="userInfo.avatar" :alt="userInfo.username" style="width: 100%; height: 100%; border-radius: 50%;" />
            </div>
            <span class="user-name">{{ userInfo ? userInfo.nickname : '游客' }}</span>
            <img src="/image/Vector (4).png" alt="arrow" class="arrow" />
            <div v-if="userMenuOpen" class="user-dropdown">
              <!-- 用户信息 -->
              <template v-if="userInfo">
                <a href="#" class="user-dropdown-header">
                  <div class="dropdown-avatar" v-if="userInfo.avatar">
                    <img :src="userInfo.avatar" :alt="userInfo.username" style="width: 100%; height: 100%; border-radius: 50%;" />
                  </div>
                  <span class="dropdown-username">{{ userInfo.username }}</span>
                </a>
              </template>
              <!-- 菜单项 -->
              <a href="#" class="menu-item-with-icon" @click.prevent="closeMenu">
                <img src="/image/jifen-2 1.png" alt="积分" class="menu-icon-img jifen-icon-img" />
                <span>我的积分</span>
              </a>
              <a href="#" class="menu-item-with-icon" @click.prevent="closeMenu">
                <img src="/image/Vector (5).png" alt="订单" class="menu-icon-img order-icon-img" />
                <span>我的订单</span>
              </a>
              <a href="#" class="menu-item-with-icon" @click.prevent="closeMenu">
                <img src="/image/Vector (6).png" alt="钱包" class="menu-icon-img wallet-icon-img" />
                <span>我的钱包</span>
              </a>
              <a href="#" class="menu-item-with-icon info-with-divider" @click.prevent="closeMenu">
                <img src="/image/Vector (7).png" alt="常用信息" class="menu-icon-img info-icon-img" />
                <span>常用信息</span>
              </a>
              <a href="#" class="menu-item-with-icon logout-item" @click.prevent="logout">
                <img src="/image/Vector (8).png" alt="退出登录" class="menu-icon-img logout-icon-img" />
                <span>退出登录</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="hero-text">
        <img src="/image/Frame 1597884336.png" alt="Snow and ice landscape" class="hero-title-img" />
        <div class="carousel-dots">
          <span
            v-for="(_, i) in bannerImages"
            :key="i"
            class="dot"
            :class="{ active: currentBannerIndex === i }"
            @click="currentBannerIndex = i"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { useBannerCarousel } from '@/composables/useBannerCarousel'
import './HeroSection.css'

export default {
  name: 'HeroSection',
  setup() {
    const searchBoxOpen = ref(false)
    const { currentBannerIndex, bannerImages, currentNav, userMenuOpen, userInfo, userLoading, userError, goLogin, fetchUserInfo } = useBannerCarousel()
    
    const logout = () => {
      console.log('用户点击了退出登录')
      // 关闭下拉菜单
      userMenuOpen.value = false
      // 清除用户信息
      userInfo.value = null
      // 清除localStorage中的token
      localStorage.removeItem('token')
      console.log('退出登录成功')
      // 刷新页面，返回登录界面
      window.location.href = '/'
    }
    
    const closeMenu = () => {
      userMenuOpen.value = false
    }
    
    return {
      searchBoxOpen,
      currentBannerIndex,
      bannerImages,
      currentNav,
      userMenuOpen,
      userInfo,
      userLoading,
      userError,
      goLogin,
      fetchUserInfo,
      logout,
      closeMenu
    }
  }
}
</script>
