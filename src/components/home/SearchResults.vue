<template>
  <div class="search-results-container" v-if="results.length > 0">
    <h3 class="results-title">搜索结果 ({{ results.length }})</h3>
    <div class="results-grid">
      <div 
        v-for="item in results" 
        :key="item.id" 
        class="result-card"
      >
        <div class="result-image">
          <img :src="item.images[0]" :alt="item.title" />
        </div>
        <div class="result-content">
          <h4 class="result-title">{{ item.title }}</h4>
          <p class="result-description">{{ item.description }}</p>
          <div class="result-price">
            <span class="price-label">成人价格:</span>
            <span class="price-value">¥{{ item.adultPrice }}</span>
          </div>
          <button class="result-btn" @click="handleBook(item)">
            立即预订
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="no-results" v-else-if="searched">
    <p>没有找到符合条件的旅行计划</p>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Array,
      default: () => []
    },
    searched: {
      type: Boolean,
      default: false
    }
  },
  emits: ['book'],
  setup(props, { emit }) {
    const handleBook = (item) => {
      emit('book', item)
    }
    
    return {
      handleBook
    }
  }
}
</script>

<style scoped>
.search-results-container {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.results-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.result-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.result-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.result-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-content {
  padding: 16px;
}

.result-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.result-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.result-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.price-label {
  font-size: 14px;
  color: #999;
}

.price-value {
  font-size: 24px;
  font-weight: 700;
  color: #2E8AFF;
}

.result-btn {
  width: 100%;
  padding: 10px;
  background: #2E8AFF;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-btn:hover {
  background: #1a7ae8;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}
</style>
