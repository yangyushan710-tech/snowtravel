<template>
  <section class="section travel-services">
    <div class="section-inner">
      <img src="/image/Group 1410084058.png" alt="出行服务" class="travel-services-title-img" />
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
</template>

<script>
import './TravelServices.css'

export default {
  name: 'TravelServices',
  data() {
    return {
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
  }
}
</script>
