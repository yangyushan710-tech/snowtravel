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
        <div class="nav-user" @click="userMenuOpen = !userMenuOpen">
          <div class="avatar"></div>
          <span class="user-name">admin</span>
          <img src="/image/Vector (4).png" alt="arrow" class="arrow" />
          <div v-if="userMenuOpen" class="user-dropdown">
            <a href="#" @click.prevent="goLogin">登录</a>
            <a href="#">消息</a>
            <a href="#">设置</a>
            <a href="#">我的行程</a>
            <a href="#">退出</a>
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
import { useBannerCarousel } from '@/composables/useBannerCarousel'
import './HeroSection.css'

export default {
  name: 'HeroSection',
  setup() {
    const { currentBannerIndex, bannerImages, currentNav, userMenuOpen, goLogin } = useBannerCarousel()
    
    return {
      currentBannerIndex,
      bannerImages,
      currentNav,
      userMenuOpen,
      goLogin
    }
  }
}
</script>
