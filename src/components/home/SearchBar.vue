<template>
  <div class="search-bar-wrap">
    <div class="search-title">
      <img src="/image/Frame 1597884340.png" alt="你在寻找什么？" class="search-title-image" />
    </div>
    <div class="search-bar">
      <div class="search-item location">
        <img src="/image/Vector (1).png" alt="location" class="search-icon location-icon-btn" @click="handleLocation" :class="{ 'locating': locating }" :title="locating ? '定位中...' : '点击定位'" />
        <input type="text" placeholder="定位城市" v-model="departureCity" readonly />
      </div>
      <div class="search-item destination">
        <input type="text" placeholder="目的地" v-model="destination" readonly @click="toggleCityDropdown" />
        <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" @click="toggleCityDropdown" />
        <div v-if="showCityDropdown" class="city-dropdown">
          <div class="city-picker">
            <p class="dropdown-title">选择目的地</p>
            <div class="city-list">
              <div v-for="city in northeastCities" :key="city" class="city-item" @click="selectCity(city)">
                {{ city }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-item checkin">
        <img src="/image/Vector (2).png" alt="checkin" class="search-icon" />
        <input type="text" placeholder="开始日期" v-model="checkinDate" />
        <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" @click="toggleDateDropdown('checkin')" />
        <div v-if="showDateDropdown === 'checkin'" class="date-dropdown">
          <div class="date-picker">
            <p class="dropdown-title">游玩开始时间</p>
            <div class="date-selector">
              <div class="year-month-selector">
                <button @click="prevMonth" class="nav-btn">‹</button>
                <span>{{ selectedYear }}年{{ selectedMonth }}月</span>
                <button @click="nextMonth" class="nav-btn">›</button>
              </div>
              <div class="calendar-grid">
                <div v-for="day in 31" :key="day" class="calendar-day" @click="selectDate('checkin', day)">
                  {{ day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-item checkout">
        <img src="/image/Vector (2).png" alt="checkout" class="search-icon" />
        <input type="text" placeholder="结束日期" v-model="checkoutDate" />
        <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" @click="toggleDateDropdown('checkout')" />
        <div v-if="showDateDropdown === 'checkout'" class="date-dropdown">
          <div class="date-picker">
            <p class="dropdown-title">游玩结束日期</p>
            <div class="date-selector">
              <div class="year-month-selector">
                <button @click="prevMonth" class="nav-btn">‹</button>
                <span>{{ selectedYear }}年{{ selectedMonth }}月</span>
                <button @click="nextMonth" class="nav-btn">›</button>
              </div>
              <div class="calendar-grid">
                <div v-for="day in 31" :key="day" class="calendar-day" @click="selectDate('checkout', day)">
                  {{ day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-item people">
        <img src="/image/Vector (3).png" alt="people" class="search-icon" />
        <input type="text" placeholder="人数" v-model="peopleCount" readonly />
        <img src="/image/Vector (3).png" alt="dropdown" class="dropdown-icon" @click="togglePeopleDropdown" />
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
      <button class="search-btn" @click="handleSearch" :disabled="loading">
        {{ loading ? '搜索中...' : '搜索' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { searchTravelPlan, getCurrentLocation } from '@/api/travel'
import './SearchBar.css'

export default {
  name: 'SearchBar',
  emits: ['search-results'],
  setup(props, { emit }) {
    const departureCity = ref('')
    const destination = ref('')
    const checkinDate = ref('')
    const checkoutDate = ref('')
    const peopleCount = ref('')
    const showDateDropdown = ref('')
    const showPeopleDropdown = ref(false)
    const showCityDropdown = ref(false)
    const selectedYear = ref(2026)
    const selectedMonth = ref(2)
    const years = [2026, 2027, 2028, 2029, 2030]
    const loading = ref(false)
    const locating = ref(false)
    const searchResults = ref([])
    
    const northeastCities = [
      '哈尔滨', '长春', '沈阳', '大连', '吉林市',
      '齐齐哈尔', '牡丹江', '佳木斯', '大庆', '鸡西',
      '双鸭山', '伊春', '七台河', '鹤岗', '黑河',
      '绥化', '大兴安岭', '延吉', '通化', '白山',
      '松原', '白城', '四平', '辽源', '铁岭',
      '朝阳', '阜新', '葫芦岛', '锦州', '盘锦',
      '营口', '鞍山', '丹东', '本溪', '抚顺'
    ]
    
    const toggleDateDropdown = (type) => {
      showDateDropdown.value = showDateDropdown.value === type ? '' : type
    }
    
    const togglePeopleDropdown = () => {
      showPeopleDropdown.value = !showPeopleDropdown.value
    }
    
    const prevMonth = () => {
      if (selectedMonth.value > 1) {
        selectedMonth.value--
      } else {
        selectedMonth.value = 12
        selectedYear.value--
      }
    }
    
    const nextMonth = () => {
      if (selectedMonth.value < 12) {
        selectedMonth.value++
      } else {
        selectedMonth.value = 1
        selectedYear.value++
      }
    }
    
    const selectDate = (type, day) => {
      const date = `${selectedYear.value}.${String(selectedMonth.value).padStart(2, '0')}.${String(day).padStart(2, '0')}`
      if (type === 'checkin') {
        checkinDate.value = date
      } else {
        checkoutDate.value = date
      }
      showDateDropdown.value = ''
    }
    
    const selectPeople = (count) => {
      peopleCount.value = count + '人'
      showPeopleDropdown.value = false
    }
    
    const toggleCityDropdown = () => {
      showCityDropdown.value = !showCityDropdown.value
      showDateDropdown.value = ''
      showPeopleDropdown.value = false
    }
    
    const selectCity = (city) => {
      destination.value = city
      showCityDropdown.value = false
    }
    
    const handleLocation = async () => {
      console.log('定位按钮被点击')
      
      try {
        locating.value = true
        console.log('开始定位...')
        
        const locationData = await getCurrentLocation()
        
        departureCity.value = locationData.city
        
        console.log('定位成功:', locationData)
        alert(`定位成功！您当前在：${locationData.city}`)
      } catch (error) {
        console.error('定位失败:', error)
        console.error('错误详情:', error.message)
        alert(error.message || '定位失败，请稍后重试')
      } finally {
        locating.value = false
        console.log('定位完成')
      }
    }
    
    const handleSearch = async () => {
      console.log('搜索按钮被点击')
      console.log('搜索参数:', {
        departureCity: departureCity.value,
        destination: destination.value,
        startDate: checkinDate.value,
        endDate: checkoutDate.value,
        travelPeople: peopleCount.value
      })
      
      try {
        loading.value = true
        console.log('开始搜索...')
        
        const params = {
          departureCity: departureCity.value,
          destination: destination.value,
          startDate: checkinDate.value,
          endDate: checkoutDate.value,
          travelPeople: peopleCount.value
        }
        
        const results = await searchTravelPlan(params)
        searchResults.value = results
        
        emit('search-results', results)
        
        console.log('搜索结果:', results)
      } catch (error) {
        console.error('搜索失败:', error)
        console.error('错误详情:', error.message)
        alert('搜索失败，请稍后重试')
      } finally {
        loading.value = false
        console.log('搜索完成')
      }
    }
    
    return {
      departureCity,
      destination,
      checkinDate,
      checkoutDate,
      peopleCount,
      showDateDropdown,
      showPeopleDropdown,
      showCityDropdown,
      selectedYear,
      selectedMonth,
      years,
      loading,
      locating,
      searchResults,
      northeastCities,
      toggleDateDropdown,
      togglePeopleDropdown,
      toggleCityDropdown,
      prevMonth,
      nextMonth,
      selectDate,
      selectPeople,
      selectCity,
      handleLocation,
      handleSearch
    }
  }
}
</script>
