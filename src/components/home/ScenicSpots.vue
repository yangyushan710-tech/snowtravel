<template>
  <section class="section scenic-spots">
    <div class="scenic-wrapper">
      <div
        class="scenic-bg"
        :style="{ backgroundImage: `url('/image/花瓣素材_风光通用连绵雪山背景元素素材_193516301 1.png')` }"
      ></div>

      <div class="scenic-grid">
        <!-- 第一行 -->
        <div class="scenic-grid-item row-1 col-1">
          <img src="/image/Rectangle 34628275.png" alt="第一行第一列" class="scenic-grid-img" />
          <div class="frame-overlay">
            <img src="/image/Frame 1597884353.png" alt="Frame" class="frame-image" />
          </div>
        </div>
        <div class="scenic-grid-item row-1 col-2">
          <img src="/image/Rectangle 34628266.png" alt="第一行第二列" class="scenic-grid-img" />
          <div class="text-overlay">
            <div class="location-content">
              <div class="location-name">本溪大石湖风景区</div>
              <div class="location-desc">坐落于辽宁本溪满族自治县，大石湖在冬日里化身林海雪原的璀璨明珠——冰瀑如琼雕叠玉，雪覆红枫似丹青写意，这片凝固了四季轮回的辽东秘境，静候着踏雪而来的知音</div>
              <div class="vector-icon" @click="handleArrowClick('本溪大石湖风景区')">
                <img src="/image/Vector (9).png" alt="Vector" class="vector-image" />
              </div>
            </div>
          </div>
        </div>
        <div class="scenic-grid-item row-1 col-3">
          <img src="/image/Rectangle 34628267.png" alt="第一行第三列" class="scenic-grid-img" />
        </div>

        <!-- 第二行 -->
        <div class="scenic-grid-item row-2 col-1">
          <img src="/image/Rectangle 34628266.png" alt="第二行第一列" class="scenic-grid-img" />
          <div class="text-overlay">
            <div class="location-content">
              <div class="location-name">大兴安岭</div>
              <div class="location-desc">大兴安岭，雄踞中国东北，迤逦于黑龙江与内蒙古境内，北接俄罗斯，是绵延千里的原始林海雪原，素有"中国寒极"与"绿色宝库"之称。</div>
              <div class="vector-icon vector-icon-daxing" @click="handleArrowClick('大兴安岭')">
                <img src="/image/Vector (10).png" alt="Vector" class="vector-image vector-image-daxing" />
              </div>
            </div>
          </div>
        </div>
        <div class="scenic-grid-item row-2 col-2">
          <img src="/image/Rectangle 34628268.png" alt="第二行第二列" class="scenic-grid-img" />
        </div>
        <div class="scenic-grid-item row-2 col-3">
          <img src="/image/Rectangle 34628266.png" alt="第二行第三列" class="scenic-grid-img" />
          <div class="text-overlay">
            <div class="location-content">
              <div class="location-name">长白山</div>
              <div class="location-desc">长白山坐落于中国吉林省东南部，地处中朝边境，是欧亚大陆东缘最高山系。主峰因多白色浮石与积雪得名，坐拥天池等标志性景观，也是三江发源地。</div>
              <div class="vector-icon vector-icon-changbai" @click="handleArrowClick('长白山')">
                <img src="/image/Vector (11).png" alt="Vector" class="vector-image" />
              </div>
            </div>
          </div>
        </div>

        <!-- 第三行 -->
        <div class="scenic-grid-item row-3 col-1">
          <img src="/image/Rectangle 34628273.png" alt="第三行第一列" class="scenic-grid-img" />
        </div>
        <div class="scenic-grid-item row-3 col-2">
          <img src="/image/Rectangle 34628274.png" alt="第三行第二列" class="scenic-grid-img" />
          <div class="text-overlay">
            <div class="location-content">
              <div class="location-name location-name-black">双峰林场</div>
              <div class="location-desc location-desc-black">双峰林场（中国雪乡），位于黑龙江省牡丹江市海林市，地处长白山脉张广才岭与老秃顶子山之间。其特殊的高山盆地地形，造就了这里长达七个月的积雪期和独特的雪景奇观。</div>
              <div class="vector-icon" @click="handleArrowClick('双峰林场')">
                <img src="/image/Vector (12).png" alt="Vector" class="vector-image" />
              </div>
            </div>
          </div>
        </div>
        <div class="scenic-grid-item row-3 col-3">
          <img src="/image/Rectangle 34628271.png" alt="第三行第三列" class="scenic-grid-img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './ScenicSpots.css'

export default {
  name: 'ScenicSpots',
  methods: {
    handleArrowClick(locationName) {
      console.log('点击了箭头，景点名称:', locationName)
      alert(`您点击了${locationName}的箭头`)
    }
  }
}
</script>
