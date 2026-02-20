<template>
    <div class="home-page">
      <!-- 顶部导航 + Hero -->
      <header class="hero-section">
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
              <img src="/image/Vector (4).png" alt="arrow" class="arrow" style="width: 7.3px; height: 4px;" />
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
</header>
        <!-- 搜索栏 -->
        <div class="search-bar-wrap">
          <div class="search-title">
            <img src="/image/Frame 1597884340.png" alt="你在寻找什么？" class="search-title-image" />
          </div>
          <div class="search-bar">
            <div class="search-item location">
              <img src="/image/Vector (1).png" alt="location" class="search-icon" style="width: 18.7px; height: 18.7px;" />
              <input type="text" placeholder="定位城市" />
            </div>
            <div class="search-item destination">
              <img src="/image/Vector (1).png" alt="destination" class="search-icon" style="width: 18.7px; height: 18.7px;" />
              <input type="text" placeholder="目的地" />
            </div>
            <div class="search-item checkin">
              <img src="/image/Vector (2).png" alt="checkin" class="search-icon" style="width: 18.7px; height: 18.7px;" />
              <input type="text" placeholder="开始日期" v-model="checkinDate" />
              <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" style="width: 8.8px; height: 5.5px; cursor: pointer; position: absolute; right: 12px;" @click="toggleDateDropdown('checkin')" />
              <div v-if="showDateDropdown === 'checkin'" class="date-dropdown">
                <div class="date-picker">
                  <p class="dropdown-title">游玩开始时间</p>
                  <div class="date-selector">
                    <div class="year-month-selector">
                      <select v-model="selectedYear" class="date-select">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
                      </select>
                      <select v-model="selectedMonth" class="date-select">
                        <option v-for="month in 12" :key="month" :value="month">{{ month }}月</option>
                      </select>
                    </div>
                    <div class="date-grid">
                      <div v-for="i in 30" :key="'checkin-' + i" class="date-item" @click="selectDate('checkin', i)">
                        {{ i }}日
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="search-item checkout">
              <img src="/image/Vector (2).png" alt="checkout" class="search-icon" style="width: 18.7px; height: 18.7px;" />
              <input type="text" placeholder="结束日期" v-model="checkoutDate" />
              <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" style="width: 8.8px; height: 5.5px; cursor: pointer; position: absolute; right: 12px;" @click="toggleDateDropdown('checkout')" />
              <div v-if="showDateDropdown === 'checkout'" class="date-dropdown">
                <div class="date-picker">
                  <p class="dropdown-title">游玩结束日期</p>
                  <div class="date-selector">
                    <div class="year-month-selector">
                      <select v-model="selectedYear" class="date-select">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}年</option>
                      </select>
                      <select v-model="selectedMonth" class="date-select">
                        <option v-for="month in 12" :key="month" :value="month">{{ month }}月</option>
                      </select>
                    </div>
                    <div class="date-grid">
                      <div v-for="i in 30" :key="'checkout-' + i" class="date-item" @click="selectDate('checkout', i)">
                        {{ i }}日
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="search-item people">
              <input type="text" placeholder="人数" v-model="peopleCount" />
              <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" style="width: 8.8px; height: 5.5px; cursor: pointer; position: absolute; right: 12px;" @click="togglePeopleDropdown" />
              <div v-if="showPeopleDropdown" class="people-dropdown">
                <div class="people-picker">
                  <p class="dropdown-title">选择人数</p>
                  <div class="people-grid">
                    <div v-for="i in 15" :key="'people-' + i" class="people-item" @click="selectPeople(i)">
                      {{ i }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="search-btn">启程</button>
          </div>
        </div>
      

      <!-- TRAVEL GUIDE 旅行指南 -->
      <section class="section travel-guide">
        <div class="section-inner">
          <div class="section-title-container">
            <img src="/image/Group 1410084060.png" alt="TRAVEL GUIDE" class="section-title-image" />
          </div>
          <div class="carousel-wrap">
            <transition-group name="carousel" tag="div" class="cards-carousel">
              <div class="guide-card" v-for="(item, i) in displayCards" :key="item.img" :class="{ active: i === 2 }">
                <div class="card-img" :style="{ backgroundImage: `url('${item.img}')` }">
                  <div class="card-info" v-if="i === 2">
                    <img src="/image/dingwei-6 1.png" alt="定位" class="location-icon" />
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </transition-group>
            <div class="carousel-controls">
              <button class="carousel-btn prev" @click="guidePrev">
                <img src="/image/Group 1410084043.png" alt="上一页" class="carousel-btn-image" />
              </button>
              <button class="carousel-btn next" @click="guideNext">
                <img src="/image/Group 1410084044.png" alt="下一页" class="carousel-btn-image" />
              </button>
              <img src="/image/Group 1410084089.png" alt="AI助手" class="ai-assistant-image" />
            </div>
          </div>
        </div>
      </section>

      <!-- RECOMMENDED ROUTE 推荐路线 -->
      <section class="section recommended-route">
        <div class="section-inner">
          <div class="route-title-container">
            <img src="/image/Frame 1597884346.png" alt="推荐路线" class="route-title-image" />
            <img src="/image/Vector 4214.png" alt="装饰线" class="route-decoration-line" />
          </div>
          <div class="route-content">
            <div class="timeline-wrap">
              <button class="route-carousel-btn prev" @click="timelinePrev">
                <img src="/image/Group 1410084043 (1).png" alt="上一页" class="carousel-btn-image" />
              </button>
              <div class="timeline">
                <div class="timeline-item" v-for="(node, i) in displayTimelineNodes" :key="node.date + i" :class="{ 'middle-item': node.position === 'middle', 'left-item': node.position === 'left', 'right-item': node.position === 'right' }">
                  <div class="timeline-top">
                    <template v-if="node.position !== 'middle'">
                      <p class="timeline-title">{{ node.title }}</p>
                      <p class="timeline-desc">{{ node.desc }}</p>
                    </template>
                  </div>
                  <div class="timeline-dot-wrap">
                    <img v-if="node.position === 'left' || node.position === 'right'" src="/image/Ellipse 5101.png" alt="dot" class="timeline-dot" />
                    <img v-else src="/image/Ellipse 5100.png" alt="dot" class="timeline-dot" />
                  </div>
                  <div class="timeline-bottom">
                    <template v-if="node.position !== 'middle'">
                      <span class="timeline-date">{{ node.date }}</span>
                    </template>
                    <template v-else>
                      <div class="timeline-middle-content" :class="{ 'long-content': node.title.length >= 8 || node.desc.length >= 12 }">
                        <p class="timeline-date-location">{{ node.date }}{{ node.location ? '-' + node.location : '' }}</p>
                        <p class="timeline-title">{{ node.title }}</p>
                        <p class="timeline-desc">{{ node.desc }}</p>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <button class="route-carousel-btn next" @click="timelineNext">
                <img src="/image/Group 1410084044 (1).png" alt="下一页" class="carousel-btn-image" />
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- SCENIC SPOTS 景点概览 -->
      <section class="section scenic-spots">
        <div class="scenic-wrapper">
          <div
            class="scenic-bg"
            :style="{ backgroundImage: `url('../../image/花瓣素材_风光通用连绵雪山背景元素素材_193516301 1.png')` }"
          ></div>

          <div class="scenic-grid">
            <!-- 第一行 -->
            <div class="scenic-grid-item row-1 col-1">
              <img src="../../image/Rectangle 34628275.png" alt="第一行第一列" class="scenic-grid-img" />
              <div class="frame-overlay">
                <img src="../../image/Frame 1597884353.png" alt="Frame" class="frame-image" />
              </div>
            </div>
            <div class="scenic-grid-item row-1 col-2">
              <img src="../../image/Rectangle 34628266.png" alt="第一行第二列" class="scenic-grid-img" />
              <div class="text-overlay">
                <div class="location-content">
                  <div class="location-name">本溪大石湖风景区</div>
                  <div class="location-desc">坐落于辽宁本溪满族自治县，大石湖在冬日里化身林海雪原的璀璨明珠——冰瀑如琼雕叠玉，雪覆红枫似丹青写意，这片凝固了四季轮回的辽东秘境，静候着踏雪而来的知音</div>
                  <div class="vector-icon">
                    <img src="../../image/Vector (9).png" alt="Vector" class="vector-image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="scenic-grid-item row-1 col-3">
              <img src="../../image/Rectangle 34628267.png" alt="第一行第三列" class="scenic-grid-img" />
            </div>

            <!-- 第二行 -->
            <div class="scenic-grid-item row-2 col-1">
              <img src="../../image/Rectangle 34628266.png" alt="第二行第一列" class="scenic-grid-img" />
              <div class="text-overlay">
                <div class="location-content">
                  <div class="location-name">大兴安岭</div>
                  <div class="location-desc">大兴安岭，雄踞中国东北，迤逦于黑龙江与内蒙古境内，北接俄罗斯，是绵延千里的原始林海雪原，素有"中国寒极"与"绿色宝库"之称。</div>
                  <div class="vector-icon vector-icon-daxing">
                    <img src="../../image/Vector (10).png" alt="Vector" class="vector-image vector-image-daxing" />
                  </div>
                </div>
              </div>
            </div>
            <div class="scenic-grid-item row-2 col-2">
              <img src="../../image/Rectangle 34628268.png" alt="第二行第二列" class="scenic-grid-img" />
            </div>
            <div class="scenic-grid-item row-2 col-3">
              <img src="../../image/Rectangle 34628266.png" alt="第二行第三列" class="scenic-grid-img" />
              <div class="text-overlay">
                <div class="location-content">
                  <div class="location-name">长白山</div>
                  <div class="location-desc">长白山坐落于中国吉林省东南部，地处中朝边境，是欧亚大陆东缘最高山系。主峰因多白色浮石与积雪得名，坐拥天池等标志性景观，也是三江发源地。</div>
                  <div class="vector-icon vector-icon-changbai">
                    <img src="../../image/Vector (11).png" alt="Vector" class="vector-image" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 第三行 -->
            <div class="scenic-grid-item row-3 col-1">
              <img src="../../image/Rectangle 34628273.png" alt="第三行第一列" class="scenic-grid-img" />
            </div>
            <div class="scenic-grid-item row-3 col-2">
              <img src="../../image/Rectangle 34628274.png" alt="第三行第二列" class="scenic-grid-img" />
              <div class="text-overlay">
                <div class="location-content">
                  <div class="location-name location-name-black">双峰林场</div>
                  <div class="location-desc location-desc-black">双峰林场（中国雪乡），位于黑龙江省牡丹江市海林市，地处长白山脉张广才岭与老秃顶子山之间。其特殊的高山盆地地形，造就了这里长达七个月的积雪期和独特的雪景奇观。</div>
                  <div class="vector-icon">
                    <img src="../../image/Vector (12).png" alt="Vector" class="vector-image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="scenic-grid-item row-3 col-3">
              <img src="../../image/Rectangle 34628271.png" alt="第三行第三列" class="scenic-grid-img" />
            </div>
          </div>
        </div>
      </section>

      <!-- WINTER ACTIVITIES 冬季活动 -->
      <section class="section winter-activities">
        <div class="winter-activities-header">
          <img src="../../image/Group 1410084059.png" alt="冬季活动标题" class="winter-activities-title-img" />
        </div>
        <div class="section-inner">
          <div class="winter-activities-content">
            <div class="winter-activities-left">
              <h3 class="winter-activities-title-cn">东北民俗非遗的现代蜕变</h3>
              <p class="winter-activities-desc">
                东北民俗与非遗在现代化进程中，通过节庆活化、教育传承和创新设计（如鱼皮画文创）持续焕发生命力，成为中华文化多元一体格局的重要见证。
              </p>
              <button class="winter-activities-cta">
                立即体验
                <img src="../../image/Vector (9).png" alt="箭头" class="cta-arrow" />
              </button>
            </div>
            <div class="winter-activities-right">
              <div class="winter-activities-main-card">
                <img src="../../image/Rectangle 34628276.png" alt="冬季民俗活动主图" class="winter-activities-main-img" />
              </div>
              <div class="winter-activities-gallery">
                <img src="../../image/Rectangle 34628284.png" alt="冬季活动图片1" class="winter-activities-gallery-img img-up" />
                <img src="../../image/Rectangle 34628285.png" alt="冬季活动图片2" class="winter-activities-gallery-img img-down" />
                <img src="../../image/Rectangle 34628286.png" alt="冬季活动图片3" class="winter-activities-gallery-img img-up img-full-width" />
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!--出行服务 -->
      <section class="section travel-services">
        <div class="section-inner">
          <img src="../../image/Group 1410084058.png" alt="出行服务" class="travel-services-title-img" />
          <div class="services-grid">
            <div class="service-item" v-for="(s, i) in services" :key="i">
              <img :src="`/image/Group 141008406${i + 1}.png`" :alt="s.title" class="service-icon-img" />
              <div class="service-content">
                <h3 class="service-title">{{ s.title }}</h3>
                <p class="service-desc">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Footer -->
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-main">
            <div class="footer-logo">
              <img src="../../image/logo.jpg" alt="logo" class="footer-logo-img" />
              <div class="footer-logo-divider"></div>
            </div>
            <div class="footer-links">
              <div class="footer-col">
                <h4>智慧解决方案</h4>
                <a href="#">旅行计划</a>
                <a href="#">东三省非遗</a>
                <a href="#">旅行指导</a>
                <a href="#">推荐路线</a>
              </div>
              <div class="footer-col">
                <h4>旅行动态</h4>
                <a href="#">长白山雪景</a>
                <a href="#">哈尔滨冰雪大世界开启</a>
              </div>
              <div class="footer-col">
                <h4>关于我们</h4>
                <a href="#">公司简介</a>
                <a href="#">发展历程</a>
                <a href="#">加入我们</a>
              </div>
            </div>
            <div class="footer-right">
              <div class="social-icons">
                <img src="../../image/Vector (13).png" alt="Vector 13" class="social-icon-img" />
                <img src="../../image/Vector (14).png" alt="Vector 14" class="social-icon-img" />
                <img src="../../image/baidu 1.png" alt="Baidu" class="social-icon-img" />
                <img src="../../image/douyin 2.png" alt="Douyin" class="social-icon-img" />
                <img src="../../image/kuaishou 1.png" alt="Kuaishou" class="social-icon-img" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    computed: {
    displayCards() {
      const cards = this.guideCards
      const len = cards.length
      return [
        cards[(this.currentGuideIndex - 2 + len) % len],
        cards[(this.currentGuideIndex - 1 + len) % len],
        cards[this.currentGuideIndex],
        cards[(this.currentGuideIndex + 1) % len],
        cards[(this.currentGuideIndex + 2) % len]
      ]
    },
    displayTimelineNodes() {
      const nodes = this.timelineNodes
      const len = nodes.length
      const currentIndex = this.currentTimelineIndex
      
      // 获取当前索引和前后的节点
      const prevIndex = (currentIndex - 1 + len) % len
      const nextIndex = (currentIndex + 1) % len
      
      return [
        { ...nodes[prevIndex], position: 'left' },
        { ...nodes[currentIndex], position: 'middle' },
        { ...nodes[nextIndex], position: 'right' }
      ]
    }
  },
  data() {
    return {
      currentNav: 'home',
      userMenuOpen: false,
      currentBannerIndex: 0,
      bannerTimerId: null,
      currentGuideIndex: 0,
      checkinDate: '',
      checkoutDate: '',
      peopleCount: '',
      showDateDropdown: '',
      showPeopleDropdown: false,
      selectedYear: 2026,
      selectedMonth: 2,
      years: [2026, 2027, 2028, 2029, 2030],
      bannerImages: [
      '/image/Group 1410081960.png',
      '/image/banner2 (1).png',
      '/image/banner3 (1).png',
      '/image/banner3.png',
      '/image/image 2517.png',
    ],
    guideCards: [
      { title: '索菲亚大教堂', desc: '拜占庭风格东正教堂', img: '/image/Mask group (1).png' },
      { title: '长白山', desc: '天池雪景', img: '/image/Rectangle 34628259.png' },
      { title: '哈尔滨冰雪大世界', desc: '享受冰雪乐园', img: '/image/Rectangle 34628257.png' },
      { title: '哈尔滨', desc: '济南出发黑龙江4晚3天跟团游', img: '/image/Rectangle 34628258.png' },
      { title: '亚布力滑雪场', desc: '中国现代滑雪运动的发源地', img: '/image/Rectangle 34628261.png' },
    ],
    timelineNodes: [
      { date: '2026.12.11', title: '自然奇观:盘锦鞍山 5日', desc: '红海滩&千山风景区&广厦艺术街&辽河湿地' },
      { date: '2026.12.11', location: '辽宁', title: '滨海风情:大连旅顺5日', desc: '金石滩 & 老虎滩海洋公园&旅顺军港&星海广场' },
      { date: '2026.12.24', title: '历史探寻:沈阳本溪 5日', desc: '沈阳故宫&张氏帅府&本溪水洞&中街步行街' },
      { date: '2026.12.25', title: '冰雪世界:哈尔滨冰雪大世界', desc: '冰雪艺术&冰雕展览&冰雪娱乐' },
      { date: '2026.12.26', title: '长白山天池:冰雪奇观', desc: '天池雪景&温泉体验&滑雪运动' },
      { date: '2026.12.27', title: '漠河极光:神州北极之旅', desc: '极光观赏&北极村体验&冰雪探险' },
    ],
    currentTimelineIndex: 0,
    services: [
      { 
        title: '出行时间', 
        desc: '确定好您的出行时间,冬季(12月-2月)是体验冰雪景观的最佳季节,夏季(6月~8月)则适合避暑。' 
      },
      { 
        title: '天气', 
        desc: '提前了解东北各地区天气,冬季备足防寒衣物(羽绒服、帽子、手套、雪地靴),夏季也需准备长袖外套以应对温差。' 
      },
      { 
        title: '证件', 
        desc: '出行前确保身份证有效。如计划前往边境地区(如漠河、绥芬河、长白山等地需提前办理或在当地办理《边境管理区通行证》' 
      },
      { 
        title: '交通', 
        desc: '备好当地交通出行码,在手机上下载各类导航及打车APP。冬季自驾需更换雪地胎,并密切关注航班/铁路动态,以免因天气误航误车。' 
      },
      { 
        title: '电子设备保护', 
        desc: '务必为手机、相机等设备做好保暖,低温会导致电量快速耗尽甚至自动关机。可准备充电宝,并将设备贴身存放。' 
      },
      { 
        title: '安全', 
        desc: '晚上住宿注意关好门窗,使用暖气时注意通风。在冰雪路面行走需防滑防摔,参与滑雪等户外运动时请遵守安全规则。' 
      },
    ],
  }
},
mounted() {
  this.bannerTimerId = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.bannerImages.length
    }, 15000)
  
  this.guideTimerId = setInterval(() => {
      this.currentGuideIndex = (this.currentGuideIndex + 1) % this.guideCards.length
    }, 15000)
  },
  beforeUnmount() {
    if (this.bannerTimerId) clearInterval(this.bannerTimerId)
    if (this.guideTimerId) clearInterval(this.guideTimerId)
  },
    methods: {
      goLogin() {
        this.userMenuOpen = false
        this.$emit('go-login')
      },
      guidePrev() {
        const len = this.guideCards.length
        this.currentGuideIndex = (this.currentGuideIndex - 1 + len) % len
      },
      guideNext() {
        const len = this.guideCards.length
        this.currentGuideIndex = (this.currentGuideIndex + 1) % len
      },
      timelinePrev() {
        const len = this.timelineNodes.length
        this.currentTimelineIndex = (this.currentTimelineIndex - 1 + len) % len
      },
      timelineNext() {
        const len = this.timelineNodes.length
        this.currentTimelineIndex = (this.currentTimelineIndex + 1) % len
      },
      toggleDateDropdown(type) {
        if (this.showDateDropdown === type) {
          this.showDateDropdown = ''
        } else {
          this.showDateDropdown = type
          this.showPeopleDropdown = false
        }
      },
      togglePeopleDropdown() {
        this.showPeopleDropdown = !this.showPeopleDropdown
        this.showDateDropdown = ''
      },
      selectDate(type, day) {
        if (type === 'checkin') {
          this.checkinDate = this.selectedYear + '年' + this.selectedMonth + '月' + day + '日'
        } else {
          this.checkoutDate = this.selectedYear + '年' + this.selectedMonth + '月' + day + '日'
        }
        this.showDateDropdown = ''
      },
      selectPeople(count) {
        this.peopleCount = count
        this.showPeopleDropdown = false
      },
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
  
  /* Hero */
  .hero-section {
    position: relative;
    width: 100%;
    height: 625px;
    color: #fff;
  }
  
  .hero-bg-wrap {
  position: absolute;
  inset: 0;
}

  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }

  .fade-enter-active,
  .fade-leave-active {
  transition: opacity 0.6s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
  opacity: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    height: 100%;
   display: flex;
   flex-direction: column;
   padding: 24px 40px 24px;
  }
  
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
  .nav-links a:active::after{
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

  .user-name {
    font-size: 14px;
    color: #fff;
    margin-right: 4px;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.8);
  }
  
  .user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: #fff;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 8px 0;
    width: 143.7px;
    height: 188.7px;
  }
  
  .user-dropdown a {
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-size: 13px;
  }
  
  .hero-text {
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
  }
  
  .hero-title-img {
  display: block;
  width: 703px;
  height: 160px;
  margin: 70px auto 20px;
  transform: translateX(-150px);
  object-fit: contain;
  }
  
  .carousel-dots {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 16px;
}

  
  .dot {
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    background: #00000080;
    cursor: pointer;
    transition: width 0.25s ease, border-radius 0.25s ease;
  }
  
  .dot.active {
    width: 31px;
    height: 12.5px;
    border-radius: 35px;
    opacity: 1;
    background: #fff;
  }
  
  /* Search bar */
  .search-bar-wrap {
    position: relative;
    z-index: 2;
    width: 1200px;
    height: 188px;
    margin: 0 auto 10px;
    padding: 40px;
    background: url('/image/image 2518.png') no-repeat center;
    background-size: cover;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .search-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    margin-top: -10px;
  }

  .search-title-image {
    width: 332.5px;
    height: 59px;
  }

  .search-bar {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .search-item {
    min-width: 80px;
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid #C5C5C5;
    border-radius: 4px;
    padding: 0 12px;
    height: 41.2px;
    transition: border-color 0.3s ease;
  }

  .search-item:focus-within {
    border: 1px solid #2E8AFF;
  }

  .search-item.location,
  .search-item.destination {
    width: 163.7px;
  }

  .search-item.checkin,
  .search-item.checkout {
    width: 150px;
  }

  .search-item.people {
    width: 81.2px;
  }

  .search-icon {
    margin-right: 8px;
    font-size: 14px;
  }

  .search-item input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 14px;
    outline: none;
  }

  .search-btn {
    width: 81.2px;
    height: 41.2px;
    background: #2E8AFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-family: "PingFang SC";
    font-weight: 500;
    font-size: 17.5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .dropdown-icon {
    margin-left: 8px;
  }

  .date-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    min-width: 200px;
    z-index: 1000;
  }

  .people-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 16px;
    min-width: 120px;
    z-index: 1000;
  }

  .dropdown-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }

  .date-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin-top: 12px;
  }

  .year-month-selector {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  .date-select {
    padding: 6px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
  }

  .date-select:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  .people-grid {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 120px;
    overflow-y: auto;
  }

  .date-item,
  .people-item {
    padding: 8px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 12.5px;
  }

  .date-item:hover,
  .people-item:hover {
    background-color: #f0f0f0;
  }

  .search-item {
    position: relative;
  }

  /* Section common */
  .section {
    padding: 48px 40px;
  }
  
  .section-inner {
    width: 1120px;
    margin: 0;
  }
  
  .section-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4px;
    letter-spacing: 1px;
  }
  
  .section-subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 28px;
  }

  .section-title-container {
    margin-bottom: 28px;
    margin-left: 135px;
  }

  .section-title-image {
    width: 181px;
    height: 66.8px;
  }

  /* Travel Guide */
  .travel-guide {
    background: #fff;
  }
  
  .carousel-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .carousel-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin-top: 10px;
    position: relative;
  }

  .carousel-controls .prev {
    margin-left: 320px;
  }

  .carousel-controls .next {
    margin-right: 280px;
  }

  .decorative-image {
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    width: 161px;
    height: 161px;
  }

  .ai-assistant-image {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 161px;
    height: 161px;
  }
  
  .carousel-btn {
    width: 55px;
    height: 55px;
    border: none;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .carousel-btn:hover {
    transform: scale(1.1);
  }

  .carousel-btn.prev {
    margin-right: 20px;
  }

  .carousel-btn.next {
    margin-left: 20px;
  }

  .carousel-btn-image {
    width: 55px;
    height: 55px;
  }

  .cards-carousel {
    display: flex;
    gap: 0;
    position: relative;
    width: 1200px;
    justify-content: center;
    transition: all 0.5s ease-in-out;
  }

  .guide-card {
    flex: 0 0 287.5px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    position: relative;
    margin-right: -25px;
    padding: 0;
    border: none;
  }

  .guide-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
    z-index: 10;
  }

  .guide-card:nth-child(1) {
    z-index: 1;
    transform: rotateY(-3deg) translateX(10px) translateY(80px) scale(0.95);
    height: 288.7px;
  }

  .guide-card:nth-child(2) {
    z-index: 2;
    transform: rotateY(-1.5deg) translateX(5px) translateY(40px) scale(0.98);
    height: 362.5px;
  }

  .guide-card:nth-child(3) {
    z-index: 5;
    transform: scale(1.02);
    height: 435px;
  }

  .guide-card:nth-child(4) {
    z-index: 2;
    transform: rotateY(1.5deg) translateX(-5px) translateY(40px) scale(0.98);
    height: 362.5px;
  }

  .guide-card:nth-child(5) {
    z-index: 1;
    transform: rotateY(3deg) translateX(-10px) translateY(80px) scale(0.95);
    height: 288.7px;
  }

  .card-img {
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .card-info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #fff;
    text-align: center;
    z-index: 10;
  }

  .guide-card.active .card-info {
    background: rgba(0,0,0,0.6);
  }

  .card-info h3 {
    font-size: 27.5px;
    font-family: "PingFang SC";
    margin-bottom: 8px;
    color: #fff;
    font-weight: 500;
  }

  .card-info p {
    font-size: 15px;
    font-weight: 200;
    font-family: "PingFang SC";
    color: rgba(255,255,255,0.9);
    line-height: 1.4;
  }

  .location-icon {
    width: 51.2px;
    height: 51.2px;
    margin-bottom: 10px;
  }

  /* Transition group styles for smooth carousel */
  .carousel-enter-active,
  .carousel-leave-active {
    transition: all 0.6s ease-in-out;
  }

  .carousel-enter-from {
    opacity: 0;
    transform: scale(0.9);
  }

  .carousel-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }

  .carousel-move {
    transition: transform 0.6s ease-in-out;
  }

  /* Recommended Route */
  .recommended-route {
    background: linear-gradient(180deg, #e8f4fc 0%, #f0f8ff 50%, #fff 100%);
    background-image: url('/image/image 2521.png');
    background-size: 1200px 370px;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 370px;
    position: relative;
    margin-top: -40px;
  }

  .timeline-wrap {
    margin-top: -40px;
  }

  .route-title-container {
    margin-left: 125px;
    margin-top: 50px;
    margin-bottom: 60px;
    width: 270px;
  }

  .route-title-image {
    width: 270px;
    height: 59px;
    display: block;
    margin-bottom: 4px;
  }

  .route-decoration-line {
    width: 21px;
    height: 2px;
    display: block;
    margin-left: 3px;
  }

  .route-content {
    margin-top: 20px;
  }

  .timeline-wrap {
    display: flex;
    align-items: stretch;
    gap: 0;
    max-width: 1100px;
    margin: 0 auto;
  }

  .route-carousel-btn {
    width: 55px;
    height: 55px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
  }

  .route-carousel-btn .carousel-btn-image {
    width: 55px;
    height: 55px;
  }

  .route-carousel-btn.prev {
    margin-right: 16px;
    margin-top: 35px;
  }

  .route-carousel-btn.next {
    margin-left: 16px;
    margin-top: 30px;
  }

  .timeline {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
    flex: 1;
    position: relative;
    padding: 0;
    min-height: 220px;
    overflow: hidden;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 70px;
    right: 70px;
    top: 87px;
    height: 2px;
    background: linear-gradient(to right, transparent, #666 10%, #666 25%, #2E8AFF 35%, #2E8AFF 65%, #666 75%, #666 90%, transparent);
    z-index: 0;
  }

  .timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 1 auto;
    position: relative;
    z-index: 1;
    max-width: 200px;
    transition: all 0.4s ease-in-out;
  }

  .timeline-item.left-item {
    align-items: flex-start;
    opacity: 1;
    transform: translateX(-20px) scale(0.95);
  }

  .timeline-item.right-item {
    align-items: flex-end;
    opacity: 1;
    transform: translateX(20px) scale(0.95);
  }

  .timeline-item.middle-item {
    align-items: center;
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  .timeline-middle-content {
    background-image: url('/image/Rectangle 34628265.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 15px;
    text-align: center;
    display: inline-block;
    min-width: 180px;
    min-height: 100px;
  }

  .timeline-middle-content.long-content {
    padding: 20px 25px;
    min-width: 250px;
    min-height: 130px;
  }

  .timeline-middle-content.long-content .timeline-title {
    font-size: 12px;
    white-space: nowrap;
  }

  .timeline-middle-content.long-content .timeline-desc {
    font-size: 10px;
    line-height: 1.4;
    white-space: nowrap;
  }

  .timeline-slide-enter-active {
    transition: all 0.4s ease-in-out;
  }

  .timeline-slide-leave-active {
    transition: all 0.3s ease-in-out;
    position: absolute;
    width: 100%;
  }

  .timeline-slide-enter-from {
    opacity: 0;
    transform: translateX(50px);
  }

  .timeline-slide-enter-to {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-slide-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }

  .timeline-top {
    min-height: 70px;
    max-width: 280px;
    margin-bottom: 8px;
  }

  .timeline-item.left-item .timeline-top {
    text-align: left;
  }

  .timeline-item.right-item .timeline-top {
    text-align: right;
  }

  .timeline-dot-wrap {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -2px 0;
  }

  .timeline-dot-wrap .timeline-dot {
    width: 21px;
    height: 21px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .timeline-bottom {
    min-height: 20px;
    max-width: 280px;
    margin-top: 8px;
  }

  .timeline-item.left-item .timeline-bottom {
    text-align: left;
  }

  .timeline-item.right-item .timeline-bottom {
    text-align: right;
  }

  .timeline-item.middle-item .timeline-bottom {
    text-align: center;
  }

  .timeline-date {
    font-size: 14px;
    color: #333;
  }

  .timeline-date-location {
    font-size: 16px;
    font-weight: 700;
    color: #2E8AFF;
    margin: 0 0 6px 0;
  }

  .timeline-title {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 0 0 4px 0;
    white-space: nowrap;
  }

  .timeline-item.middle-item .timeline-title {
    color: #5ba3f5;
    margin: 0 0 4px 0;
  }

  .timeline-item.middle-item .timeline-desc {
    color: rgba(46, 138, 255, 0.85);
  }

  .timeline-desc {
    font-size: 13px;
    color: #666;
    margin: 0;
    line-height: 1.5;
    white-space: nowrap;
  }
  
  /* Scenic Spots 景点概览 */
  .scenic-spots {
    padding: 20px 0 35px;
    background: #ffffff;
  }

  /* Winter Activities Header */
  .winter-activities-header {
    text-align: left;
    margin-bottom: 20px;
    padding-left: 120px;
  }

  .winter-activities-title-img {
    height: 66.8px;
    object-fit: contain;
  }

  .scenic-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
  }

  .scenic-bg {
    position: absolute;
    inset: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center top;
    opacity: 0.98;
  }

  .scenic-grid {
    position: relative;
    z-index: 1;
    width: 874.6px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 266.8px 341px 266.8px;
    grid-template-rows: 174.3px 174.3px 174.3px;
    gap: 0;
    padding: 52px 0 0;
  }

  .scenic-grid-item {
    position: relative;
  }

  .row-1 {
    grid-row: 1;
  }

  .row-2 {
    grid-row: 2;
  }

  .row-3 {
    grid-row: 3;
  }

  .scenic-grid-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .frame-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .frame-image {
    width: 220px;
    height: 70px;
    object-fit: contain;
  }

  .text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-start;
    padding: 30px;
    z-index: 2;
  }

  .location-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .location-name {
    font-family: "PingFang SC";
    font-weight: 600;
    font-style: normal;
    font-size: 16px;
    line-height: 8.7px;
    letter-spacing: 0px;
    vertical-align: middle;
    color: white;
    text-align: left;
  }

  .location-name-black {
    color: black;
  }

  .location-desc {
    font-family: "PingFang SC";
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0px;
    color: white;
    margin-top: 6px;
    text-align: left;
  }

  .location-desc-black {
    color: black;
  }

  .vector-icon {
    margin-top: 8px;
    text-align: left;
  }

  .vector-icon-changbai {
    margin-top: 0px;
  }

  .vector-image {
    width: 18px;
    height: 26px;
    object-fit: contain;
  }

  .vector-image-daxing {
    width: 15px;
    height: 22px;
  }

  .row-1 .scenic-grid-img {
    height: 174.3px;
  }

  .row-2 .scenic-grid-img {
    height: 174.3px;
  }

  .row-3 .scenic-grid-img {
    height: 174.3px;
  }

  .col-1 .scenic-grid-img {
    width: 266.8px;
  }

  .col-2 .scenic-grid-img {
    width: 341px;
  }

  .col-3 .scenic-grid-img {
    width: 266.8px;
  }

  .scenic-content {
    position: relative;
    z-index: 1;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 16px;
    padding: 40px 0 24px;
  }

  .scenic-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* 左侧主视觉 */
  .scenic-main-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  .scenic-main-img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 260px;
    object-fit: cover;
  }

  .scenic-main-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 46, 92, 0.75) 60%, rgba(0, 46, 92, 0.9) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 48px 40px;
    color: #ffffff;
  }

  .scenic-main-title-cn {
    font-size: 30px;
    letter-spacing: 4px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .scenic-main-title-en {
    font-size: 14px;
    text-transform: uppercase;
    opacity: 0.9;
  }

  .scenic-text-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(0, 53, 107, 0.78);
    color: #ffffff;
  }

  .scenic-text-inner {
    padding: 24px 24px 18px;
  }

  .scenic-text-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .scenic-text-desc {
    font-size: 12px;
    line-height: 1.7;
    opacity: 0.9;
  }

  .scenic-text-arrow {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
  }

  /* 通用图片卡片 */
  .scenic-image-card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  .scenic-card-img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 160px;
    object-fit: cover;
  }

  .scenic-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(7, 64, 126, 0.7);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 24px 22px;
  }

  .scenic-card-overlay-light {
    background: rgba(255, 255, 255, 0.82);
    color: #16335b;
  }

  .scenic-card-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .scenic-card-desc {
    font-size: 12px;
    line-height: 1.7;
  }

  .scenic-card-arrow {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    align-self: flex-start;
  }
  
  /* Winter Activities */
  .winter-activities {
    background: #fff;
  }
  
  .winter-activities-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
  }
  
  .winter-activities-left {
    flex: 0 0 360px;
    margin-left: 30px;
  }
  
  .winter-activities-title-cn {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }
  
  .winter-activities-desc {
    font-size: 14px;
    color: #555;
    line-height: 1.8;
    max-width: 280px;
    margin-bottom: 24px;
  }
  
  .winter-activities-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px 10px 32px;
    background: #2E8AFF;
    border-radius: 999px;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  .cta-arrow {
    width: 14px;
    height: auto;
    margin-left: 8px;
  }
  
  .winter-activities-right {
    flex: 1;
    display: flex;
    align-items: stretch;
    gap: 16px;
    justify-content: flex-end;
  }
  
  .winter-activities-main-card {
    flex: 0 0 189px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
    margin-top: 40px;
  }

  .winter-activities-main-img {
    width: 100%;
    height: 100%;
    min-height: 250.6px;
    object-fit: cover;
    display: block;
    transition: none;
  }

  .winter-activities-main-card:hover .winter-activities-main-img {
    transform: none;
  }
  
  .winter-activities-gallery {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: flex-end;
  }
  
  .winter-activities-gallery-img {
    width: 189px;
    height: 250.6px;
    border-radius: 16px;
    object-fit: cover;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  .img-down {
    margin-top: 40px;
  }

  .img-up {
    margin-top: -40px;
  }

  .img-full-width {
    width: auto;
    margin-right: -36px;
  }

  .winter-activities-footer {
    margin-top: 28px;
    display: flex;
    justify-content: flex-end;
    gap: 36px;
    margin-right: 120px;
  }
  
  .winter-activities-nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    border: none;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .winter-activities-nav-btn img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  
  .winter-activities-nav-btn.active {
    background: #2E8AFF;
  }
  
  /* Travel Services */
  .travel-services {
    background: url('../../image/image 2522.png') no-repeat center center;
    background-size: cover;
    padding: 40px 0;
    margin-top: 50px;
  }

  .travel-services-title-img {
    width: 181px;
    height: 66.8px;
    margin-bottom: 40px;
    margin-left: 135px;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 30px 0px;
    column-gap: 0px;
    row-gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 0 60px;
    transform: translateX(70px);
  }
  
  .service-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  
  .service-icon-img {
    width: 62.5px;
    height: 62.5px;
    flex-shrink: 0;
    object-fit: contain;
  }
  
  .service-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .service-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0;
    line-height: 1.4;
  }
  
  .service-desc {
    font-size: 12.5px;
    color: #666;
    margin: 0;
    line-height: 1.6;
    max-width: 170px;
  }
  
  /* Footer */
  .footer {
    margin-top: auto;
    background: #ffffff;
  }
  
  .footer-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 5px;
    padding: 40px 40px 24px;
    position: relative;
  }

  .footer-logo-img {
    grid-column: 1;
    grid-row: 1;
    height: 100px;
    width: 100px;
    object-fit: contain;
    margin-top: -20px;
    margin-left: 80px;
  }

  .footer-logo-divider {
    position: absolute;
    left: 0;
    right: 0;
    top: 115px;
    width: 100%;
    height: 2px;
    background: #ddd;
  }

  .footer-links {
    grid-column: 1 / -1;
    grid-row: 3;
    display: flex;
    gap: 80px;
    flex: 1;
    margin-top: 20px;
  }
  
  .footer-col h4 {
    font-size: 16px;
    margin-bottom: 12px;
    color: #1a1a1a;
  }
  
  .footer-col a {
    display: block;
    font-size: 13px;
    color: #666;
    text-decoration: none;
    margin-bottom: 12px;
  }
  
  .footer-right {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    margin-top: 20px;
    margin-right: 10px;
  }

  .social-icons {
    display: flex;
    gap: 24px;
  }
  
  .social-icons a {
    color: #666;
    text-decoration: none;
    font-size: 18px;
  }

  .social-icon-img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
  </style>
  