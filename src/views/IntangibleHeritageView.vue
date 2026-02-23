<template>
  <div class="intangible-heritage-view">
    <!-- 顶部横幅 -->
    <section class="hero-section">
      <div class="hero-bg" :style="{ backgroundImage: `url('/image/image 2549.png')` }">
        <div class="hero-content">
          <!-- 导航栏 -->
          <nav class="top-nav">
            <div class="nav-links">
              <a href="#" :class="{ active: currentNav === 'heritage' }" @click.prevent="currentNav = 'heritage'">非遗</a>
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
          <!-- 标题 -->
          <img src="/image/Frame .png" alt="零下30℃的火热丰收" class="hero-title-img" />
        </div>
      </div>
    </section>

    <!-- 查干湖冬捕介绍 -->
    <section class="intro-section">
      <div class="intro-container">
        <div class="intro-image-wrapper">
          <div class="intro-blue-block"></div>
          <img src="/image/Rectangle 34628320.png" alt="查干湖冬捕" class="intro-main-image" />
          <button class="intro-video-button">
            <img src="/image/Group 1410084156.png" alt="视频" class="intro-video-icon" />
            <span class="intro-video-text">查看相关推荐视频</span>
          </button>

        </div>
        <div class="intro-text-container">
          <h2 class="intro-title">查干湖冬捕：冰封湖面上的千年渔猎奇观</h2>
          <hr class="intro-divider" />
          <p class="intro-text-bold">
            千年传承：源自辽金时期的女真族渔猎文化，延续"春捞秋捕，冬网夏休"的古法周期，2008年入选国家级非物质文化遗产。
          </p>
          <p class="intro-text">
            千米巨网潜入冰下，一网可捕鲜鱼数十万斤，"万尾鲜鱼出玉门"的壮观场面，堪称北国冰雪奇迹，头鱼拍卖盛典，单尾曾创下2999999元天价纪录
          </p>
          <p class="intro-text">
            保留完整的"祭湖·醒网"仪式：萨满鼓声彻雪原，渔把头唱诵古老祷词，渔工饮下壮行酒，展现对自然的敬畏与感恩。
          </p>
          <p class="intro-text">
            每年12月末至次年1月，吉林松原查干湖景区；清晨5点观察湖仪式，9点见证万鱼腾冰盛况
          </p>
        </div>
      </div>
    </section>

    <!-- 东三省非遗保护 -->
    <section class="heritage-section">
      <div class="container">
        <img src="/image/Frame 1597884452.png" alt="东三省有哪些值得保护的非遗？" style="width: 292.5px; height: 78.7px; margin-left: 140px; margin-top: -80px;" />
        <button class="view-more-btn">查看全部</button>
        
        <!-- 非遗项目展示 -->
        <div class="heritage-grid">
          <div class="heritage-item">
            <img src="/image/Rectangle 34628267.png" alt="东北大秧歌" class="heritage-image" />
            <h3 class="heritage-title">东北大秧歌</h3>
            <p class="heritage-desc">历史悠久的传统舞蹈</p>
            <div class="star-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="heritage-year">2006年入选</p>
          </div>
          <div class="heritage-item">
            <img src="/image/Rectangle 34628268.png" alt="长白山山神文化" class="heritage-image" />
            <h3 class="heritage-title">长白山山神文化</h3>
            <p class="heritage-desc">神秘的民间信仰</p>
            <div class="star-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="heritage-year">2008年入选</p>
          </div>
          <div class="heritage-item">
            <img src="/image/Rectangle 34628271.png" alt="营口大酱酿造" class="heritage-image" />
            <h3 class="heritage-title">营口大酱酿造</h3>
            <p class="heritage-desc">传统的手工技艺</p>
            <div class="star-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="heritage-year">2011年入选</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 雪景视频 -->
    <section class="video-section">
      <div class="video-bg" :style="{ backgroundImage: `url('/image/Rectangle 34628273.png')` }">
        <div class="video-overlay">
          <button class="video-play-button">
            <span class="play-circle">▶</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 东北美食 -->
    <section class="food-section">
      <div class="container">
        <div class="food-categories">
          <button class="food-category-btn active">寒地温泉美食</button>
          <button class="food-category-btn">铁锅炖</button>
          <button class="food-category-btn">特色生态菜肴</button>
          <button class="food-category-btn">火山温泉豆腐</button>
        </div>
        <div class="food-grid">
          <div class="food-item">
            <img src="/image/Rectangle 34628274.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">东北铁锅炖</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628275.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">酸菜白肉锅</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628276.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">特色烧烤</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628284.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">火山温泉蛋</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628285.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">鹿肉火锅</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628286.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">野生菌炖鸡</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628265.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">朝鲜族冷面</h3>
          </div>
          <div class="food-item">
            <img src="/image/Rectangle 34628257.png" alt="东北美食" class="food-image" />
            <h3 class="food-title">哈尔滨红肠</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import Footer from '../components/home/Footer.vue'

export default {
  name: 'IntangibleHeritageView',
  components: {
    Footer
  },
  setup() {
    const searchBoxOpen = ref(false)
    const userMenuOpen = ref(false)
    const currentNav = ref('heritage')
    const userInfo = ref(null)
    
    const logout = () => {
      console.log('用户点击了退出登录')
      userMenuOpen.value = false
      userInfo.value = null
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
      userMenuOpen,
      currentNav,
      userInfo,
      logout,
      closeMenu
    }
  }
}
</script>

<style scoped>
.intangible-heritage-view {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部横幅 */
.hero-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 40px 24px;
}

/* 导航栏样式 */
.top-nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 60px;
}

.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 150px;
}

.nav-links a,
.nav-links a:visited {
  position: relative;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.nav-links a.active::after,
.nav-links a:hover::after,
.nav-links a:active::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  width: 100%;
  height: 12px;
  background: url("/image/Group 1410084049.png") no-repeat center;
  background-size: contain;
}

.nav-user {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.search-icon {
  width: 15px;
  height: 15px;
  margin-right: 20px;
  cursor: pointer;
}

.nav-user-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-box {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.search-input {
  width: 200px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
}

.user-name {
  color: #fff;
  font-size: 14px;
}

.arrow {
  width: 8px;
  height: 5px;
  transition: transform 0.3s ease;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.user-dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  text-decoration: none;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
}

.dropdown-username {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.menu-item-with-icon {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.menu-item-with-icon:hover {
  background-color: #f9f9f9;
}

.menu-item-with-icon.info-with-divider {
  border-top: 1px solid #f0f0f0;
}

.menu-item-with-icon.logout-item {
  color: #333;
  font-weight: 600;
}

.menu-item-with-icon.logout-item:hover {
  background-color: #f9f9f9;
}

.menu-icon-img {
  width: 16px;
  height: 16px;
}

.hero-title-img {
  display: block;
  width: 703px;
  height: 118.7px;
  margin: 0 auto;
  object-fit: contain;
}

/* 通用容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 章节标题 */
.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "PingFang SC";
  text-align: left;
  margin-right: 0px;
  color: #478DF7;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}

/* 查干湖冬捕介绍 */
.intro-section {
  background-color: #fff;
  padding: 60px 0;
}

.intro-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  padding: 0 40px;
}

.intro-image-wrapper {
  position: relative;
  flex: 0 0 auto;
  overflow: visible;
}

.intro-blue-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background-color: #007bff;
  z-index: 1;
}

.intro-main-image {
  width: 328px;
  height: 400px;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.intro-video-button {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  width: 220px;
  height: 53px;
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  z-index: 3;
  padding-left: 0px;
}

.intro-video-icon {
  width: 56px;
  height: 53px;
}

.intro-video-text {
  white-space: nowrap;
  font-weight: normal;
  color: #666;
  margin-left: 25px;
}

.intro-text-container {
  flex: 0 0 480px;
  padding-top: 0px;
}

.intro-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: left;
  color: #007bff;
}

.intro-divider {
  border: 1px solid #CDCDCD;
  margin: 0 0 24px;
}

.intro-text-bold {
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 20px;
  line-height: 1.7;
  margin-bottom: 18px;
  color: #666;
}

.intro-text {
  font-family: 'PingFang SC';
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 18px;
  color: #666;
}

/* 非遗项目展示 */
.heritage-section {
  padding: 60px 0;
}

.view-more-btn {
  display: block;
  margin: -60px 0 40px 900px;
  padding: 10px 30px;
  background-color: #D9D9D9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.heritage-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #f0f0f0;
}

.heritage-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.heritage-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #666;
}

.heritage-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.star-rating {
  color: #ffd700;
  margin-bottom: 8px;
}

.heritage-year {
  font-size: 12px;
  color: #999;
}

/* 雪景视频 */
.video-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-play-button {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.play-circle {
  font-size: 48px;
  color: #007bff;
  margin-left: 8px;
}

/* 东北美食 */
.food-section {
  padding: 60px 0;
  background-color: #fff;
}

.food-categories {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.food-category-btn {
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.food-category-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.food-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.food-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.food-title {
  font-size: 16px;
  font-weight: bold;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .intro-content {
    flex-direction: column;
  }
  
  .heritage-grid {
    grid-template-columns: 1fr;
  }
  
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .food-categories {
    flex-wrap: wrap;
  }
}
</style>
