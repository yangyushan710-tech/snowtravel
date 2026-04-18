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
                  <img src="/image/logo.jpg" alt="默认头像" class="avatar-img" />
                </div>
                <div class="avatar" v-else>
                  <img :src="userInfo.avatar" :alt="userInfo.username" class="avatar-img" />
                </div>
                <span class="user-name">{{ userInfo ? userInfo.nickname : '游客' }}</span>
                <img src="/image/Vector (4).png" alt="arrow" class="arrow" />
                <div v-if="userMenuOpen" class="user-dropdown">
                  <!-- 用户信息 -->
                  <template v-if="userInfo">
                    <a href="#" class="user-dropdown-header">
                      <div class="dropdown-avatar" v-if="userInfo.avatar">
                        <img :src="userInfo.avatar" :alt="userInfo.username" class="avatar-img" />
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
        <div class="hero-container">
          <img src="/image/Frame 1597884452.png" alt="东三省有哪些值得保护的非遗？" class="hero-title-image" />
          <div class="hero-content-wrapper">
            <p class="hero-text">
              这些文章都来自于我们之前客户真实的旅行经历，希望这些内容可以给您作为参考，当您有多个喜欢的地方时，可以运用我们的网站，我们会量身的为您规划路线与时间安排
            </p>
            <div class="hero-buttons">
              <img src="/image/Group 1.png" alt="prev" class="hero-button" @click="prevHeritageSlide" />
              <img src="/image/Group 2.png" alt="next" class="hero-button" @click="nextHeritageSlide" />
            </div>
          </div>
          <img src="/image/花瓣素材_龙年春节新春新年过年除夕3D立体中国风国潮舞狮组合元素素材_193369630 1.png" alt="背景" class="hero-background" />
        </div>
        <button class="view-more-btn" @click="handleViewMore">查看全部</button>
        
        <!-- 非遗项目展示 -->
        <div class="heritage-grid">
          <transition-group name="heritage-fade" tag="div" class="heritage-items-container">
            <div v-for="(item, index) in heritageItems" :key="item.image" class="heritage-item no-padding">
              <img :src="item.image" :alt="item.title" class="full-width-image" />
              <div class="content-padding">
                <h3 class="heritage-title">{{ item.title }}</h3>
                <div class="recommendation-container">
                  <div class="recommendation">推荐指数</div>
                  <div class="star-rating">
                  <img src="/image/Star 3.png" alt="star" class="star-img" />
                  <img src="/image/Star 3.png" alt="star" class="star-img" />
                  <img src="/image/Star 3.png" alt="star" class="star-img" />
                  <img src="/image/Star 3.png" alt="star" class="star-img" />
                  <img src="/image/Star 3.png" alt="star" class="star-img" />
                  </div>
                </div>
                <p class="heritage-description">{{ item.description }}</p>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- 雪景视频 -->
    <section class="video-section">
      <div class="video-bg video-bg-custom">
        <div class="white-banner">
          <img src="/image/Frame 1597884461.png" alt="Frame 1597884461" class="frame-image clickable-image" @click="handleImageClick('Frame 1597884461')" />
          <div class="gray-vertical-line"></div>
          <img src="/image/Frame 1597884462.png" alt="Frame 1597884462" class="frame-image frame-image-2 clickable-image" @click="handleImageClick('Frame 1597884462')" />
          <div class="gray-vertical-line"></div>
          <img src="/image/Frame 1597884463.png" alt="Frame 1597884463" class="frame-image frame-image-3 clickable-image" @click="handleImageClick('Frame 1597884463')" />
          <div class="gray-vertical-line"></div>
          <img src="/image/Frame 1597884464.png" alt="Frame 1597884464" class="frame-image frame-image-4 clickable-image" @click="handleImageClick('Frame 1597884464')" />
        </div>
        <div class="video-overlay">
          <img src="/image/Group 1410084193.png" alt="play" class="video-play-button" />
        </div>
      </div>
    </section>

    <!-- 东北美食 -->
    <section class="food-section">
      <div class="container">
        <div class="food-grid">
          <div v-for="(item, index) in currentFoodItems" :key="index" class="food-item">
            <img :src="item.image" :alt="item.title" class="food-image" />
            <div class="food-title-bg"></div>
            <h3 class="food-title">{{ item.title }}</h3>
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
import { getArticleDetail } from '../api/heritage.js'

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
    
    const defaultFoodItems = [
      { image: '/image/Rectangle 34628335.png', title: '东北铁锅炖' },
      { image: '/image/Rectangle 34628336.png', title: '酸菜白肉锅' },
      { image: '/image/Rectangle 34628337.png', title: '关东大灶台' },
      { image: '/image/Rectangle 34628338.png', title: '黑土地粗粮坊' },
      { image: '/image/Rectangle 35.png', title: '松花江渔歌·鲜鱼馆' },
      { image: '/image/Rectangle 36.png', title: '整点儿东北菜' },
      { image: '/image/Rectangle 37.png', title: '锅包肉研究院' },
      { image: '/image/Rectangle 38.png', title: '凛冬食记' }
    ]
    
    const shoppingMallItems = [
      { image: '/image/ouya.png', title: '长春欧亚卖场' },
      { image: '/image/hb.png', title: '哈尔滨红博广场' },
      { image: '/image/wx.png', title: '沈阳万象汇商场' },
      { image: '/image/ly.png', title: '辽阳商业城' },
      { image: '/image/dd.png', title: '丹东步行街商场' },
      { image: '/image/dl.png', title: '大连友谊商城' },
      { image: '/image/dyc.png', title: '中粮沈阳大悦城' },
      { image: '/image/K11.png', title: '沈阳K11' }
    ]
    
    const hotSpringItems = [
      { image: '/image/qhbd.png', title: '沈阳清河半岛温泉度假酒店' },
      { image: '/image/jnsh.png', title: '沈阳江南水汇' },
      { image: '/image/ysy.png', title: '大连云水瑶汤泉' },
      { image: '/image/qswt.png', title: '沈阳清水瓦台' },
      { image: '/image/qsw.png', title: '长春清水湾' },
      { image: '/image/ltsh.png', title: '哈尔滨澜亭水汇' },
      { image: '/image/nhlw.png', title: '哈尔滨那海澜湾' },
      { image: '/image/xch.png', title: '长春星辰汇' }
    ]
    
    const skiResortItems = [
      { image: '/image/ybl.png', title: '亚布力滑雪场' },
      { image: '/image/bdh.png', title: '北大湖滑雪场' },
      { image: '/image/shh.png', title: '吉林万科松花湖滑雪场' },
      { image: '/image/cbs.png', title: '长白山红松王滑雪场' },
      { image: '/image/hp.png', title: '长白山和平滑雪场' },
      { image: '/image/wd.png', title: '万达长白山滑雪场' },
      { image: '/image/ln.png', title: '长白山鲁能滑雪场' },
      { image: '/image/th.png', title: '通化万峰滑雪场' }
    ]
    
    const currentFoodItems = ref(defaultFoodItems)
    
    // 非遗项目数据
    const heritageItems = ref([
      {
        image: '/image/Rectangle 26.png',
        title: '东北大秧歌',
        description: '"太有感染力了！一开始我只是在旁边看，后来一个大妈直接把扇子塞我手里，拉着我就进了队..."'
      },
      {
        image: '/image/Rectangle 27.png',
        title: '长白山放山文化',
        description: '"小时候跟爷爷进山，觉得那些规矩太多余了。现在才明白，放山的每一条规矩，都是最朴素的可..."'
      },
      {
        image: '/image/Rectangle 28.png',
        title: '营口木浮雕',
        description: '"第一次看到时非常震撼！它完全颠覆了我对木雕‘笨重’的刻板印象。它竟然能把国画的留白意..."'
      }
    ])
    
    const currentHeritageIndex = ref(0)
    const isSliding = ref(false)
    
    // API调用相关
    const articleDetail = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    
    // 调用文章详情API
    const fetchArticleDetail = async (id) => {
      isLoading.value = true
      error.value = null
      try {
        const data = await getArticleDetail(id)
        articleDetail.value = data
        console.log('文章详情获取成功:', data)
      } catch (err) {
        error.value = err.message
        console.error('获取文章详情失败:', err)
      } finally {
        isLoading.value = false
      }
    }
    

    
    // 轮播图导航方法
    const prevHeritageSlide = () => {
      if (isSliding.value) return
      isSliding.value = true
      const firstItem = heritageItems.value.shift()
      heritageItems.value.push(firstItem)
      setTimeout(() => {
        isSliding.value = false
      }, 300)
    }
    
    const nextHeritageSlide = () => {
      if (isSliding.value) return
      isSliding.value = true
      const lastItem = heritageItems.value.pop()
      heritageItems.value.unshift(lastItem)
      setTimeout(() => {
        isSliding.value = false
      }, 300)
    }
    
    // 页面加载时获取文章详情
    fetchArticleDetail(1)
    

    
    const logout = () => {
      console.log('用户点击了退出登录')
      userMenuOpen.value = false
      userInfo.value = null
      // 清除所有用户相关的localStorage数据
      localStorage.removeItem('userToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('token')
      console.log('退出登录成功')
      // 跳转到登录界面
      window.location.href = '/#/login'
    }
    
    const closeMenu = () => {
      userMenuOpen.value = false
    }
    
    const handleImageClick = (imageId) => {
      console.log('点击了图片:', imageId)
      if (imageId === 'Frame 1597884462') {
        currentFoodItems.value = shoppingMallItems
      } else if (imageId === 'Frame 1597884461') {
        currentFoodItems.value = defaultFoodItems
      } else if (imageId === 'Frame 1597884463') {
        currentFoodItems.value = hotSpringItems
      } else if (imageId === 'Frame 1597884464') {
        currentFoodItems.value = skiResortItems
      }
    }
    
    const handleViewMore = () => {
      console.log('点击了查看全部按钮')
      // 这里可以添加查看全部的逻辑，比如跳转到对应页面
    }
    
    return {
      searchBoxOpen,
      userMenuOpen,
      currentNav,
      userInfo,
      logout,
      closeMenu,
      handleImageClick,
      currentFoodItems,
      handleViewMore,
      heritageItems,
      prevHeritageSlide,
      nextHeritageSlide,
      articleDetail,
      isLoading,
      error
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
  padding: 20px 0;
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
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  background-color: #C0C0C0;
  color: #333;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(3, 240px);
  gap: 20px;
  justify-content: start;
  margin-left: 420px;
  margin-top: 50px;
  transition: all 0.5s ease;
}

.heritage-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #C5C5C5;
  width: 240px;
  height: 355.6px;
  box-sizing: border-box;
  transition: all 0.5s ease;
}

.heritage-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.heritage-title {
  font-size: 20px;
  font-weight: 600;
  font-family: 'PingFang SC';
  margin-bottom: 8px;
  color: #333;
  text-align: left;
}

.heritage-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.star-rating {
  color: #FF7700;
  margin-bottom: 8px;
}

.star-img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.heritage-year {
  font-size: 12px;
  color: #999;
}

.heritage-description {
  font-family: 'PingFang SC';
  font-size: 13.7px;
  color: #666;
  margin-top: 8px;
  text-align: left;
  line-height: 1.4;
}

/* 雪景视频 */
.video-section {
  position: relative;
  height: 500px;
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

.video-bg-custom {
  background-image: url('/image/Rectangle 34628333.png');
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-play-button {
  width: 125px;
  height: 125px;
  cursor: pointer;
  position: relative;
  z-index: 5;
}

.play-circle {
  font-size: 48px;
  color: #007bff;
  margin-left: 8px;
}

/* 东北美食 */
.food-section {
  padding: 100px 0 30px 0;
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
  grid-template-columns: repeat(4, 209px);
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;
  margin-top: -20px;
}

.food-item {
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  width: 209px;
  height: 178.7px;
  position: relative;
  padding: 0;
}

.food-image {
  width: 209px;
  height: 178.7px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0;
}

.food-title-bg {
  width: 209px;
  height: 37px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.food-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-top: -40px;
  position: relative;
  z-index: 2;
  line-height: 37px;
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

/* 新增的类选择器，替代行内样式 */
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.hero-container {
  position: relative;
  margin-left: 100px;
}

.hero-title-image {
  width: 292.5px;
  height: 78.7px;
  margin-top: -80px;
  display: block;
  position: relative;
  z-index: 2;
}

.hero-content-wrapper {
  position: absolute;
  top: 120px;
  left: 0;
  z-index: 2;
  max-width: 300px;
}

.hero-text {
  font-family: 'PingFang SC';
  font-weight: 500;
  font-size: 13.7px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: left;
}

.hero-buttons {
  display: flex;
  gap: 40px;
}

.hero-button {
  width: 55px;
  height: 55px;
  cursor: pointer;
}

.hero-background {
  width: 408.7px;
  height: 438.7px;
  position: absolute;
  top: 20px;
  left: -160px;
  display: block;
  z-index: 1;
}

.no-padding {
  padding: 0;
}

.full-width-image {
  width: 240px;
  height: 197.5px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.content-padding {
  padding: 10px 15px 15px 15px;
}

.recommendation-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}

.recommendation {
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 13.7px;
  color: #FF7700;
  white-space: nowrap;
}

.star-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #FF7700;
  margin-bottom: 0;
  white-space: nowrap;
}

.star-img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.white-banner {
  width: 875px;
  height: 150px;
  background-color: #fff;
  position: absolute;
  top: 420px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;
}

.frame-image {
  width: 105px;
  height: 81.8px;
  object-fit: contain;
}

.frame-image-2 {
  margin-left: 60px;
}

.frame-image-3 {
  margin-left: 60px;
}

.frame-image-4 {
  margin-left: 60px;
}

.clickable-image {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.clickable-image:hover {
  transform: scale(1.05);
}

.gray-vertical-line {
  width: 1px;
  height: 60px;
  background-color: #E0E0E0;
  margin-left: 60px;
}

/* 轮播过渡动画 */
.heritage-items-container {
  display: grid;
  grid-template-columns: repeat(3, 240px);
  gap: 20px;
}

.heritage-fade-enter-active,
.heritage-fade-leave-active {
  transition: all 0.8s ease;
}

.heritage-fade-enter-from,
.heritage-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.heritage-fade-move {
  transition: transform 0.8s ease;
}
</style>
