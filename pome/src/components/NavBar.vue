<template>
  <header class="nav" :class="{ 'scrolled': isScrolled }">
    <div class="nav-left" @click="$router.push('/')">
      <span class="logo">
        <span class="logo-icon">📚</span>
        <span class="logo-text">诗词鉴赏</span>
      </span>
    </div>
    
    <div class="nav-center">
      <div class="search-container" :class="{ 'focused': isSearchFocused }">
        <input
          v-model="q"
          @keyup.enter="search"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
          type="text"
          class="search"
          placeholder="搜索：标题 / 作者 / 内容"
        />
        <button class="search-btn" @click="search">
          <span class="search-icon">🔍</span>
          <span class="search-text">搜索</span>
        </button>
      </div>
    </div>
    
    <nav class="nav-right">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="nav-link"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { usePoemsStore } from '../stores/poems';

const store = usePoemsStore();
const q = ref(store.query);
const isScrolled = ref(false);
const isSearchFocused = ref(false);

const navItems = [
  { path: '/', text: '首页', icon: '🏠' },
  { path: '/poems', text: '诗词列表', icon: '📖' },
  { path: '/profile', text: '个人中心', icon: '👤' }
];

function search() {
  store.setQuery(q.value);
  // Add search animation
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.classList.add('searching');
    setTimeout(() => searchBtn.classList.remove('searching'), 600);
  }
  
  if (location.pathname !== '/poems') {
    // 跳到列表页展示搜索结果
    window.history.pushState({}, '', '/poems');
    // 触发路由跳转
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(q, (val) => store.setQuery(val));
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(238, 238, 238, 0.8);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
}

.nav-left {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-left:hover {
  transform: scale(1.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 20px;
  color: #2c3e50;
}

.logo-icon {
  font-size: 24px;
  animation: logoBounce 2s ease-in-out infinite;
}

.logo-text {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-center {
  display: flex;
  justify-content: center;
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
}

.search-container {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  padding: 4px;
  transition: all 0.3s ease;
  width: 100%;
}

.search-container.focused {
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.search-btn.searching {
  animation: searchPulse 0.6s ease;
}

.nav-right {
  display: flex;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  text-decoration: none;
  color: #666;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #667eea;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  font-size: 16px;
}

.nav-text {
  font-weight: 500;
  font-size: 14px;
}

@keyframes logoBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes searchPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .nav {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .nav-center {
    order: 3;
    margin: 0;
    max-width: 100%;
  }
  
  .nav-text {
    display: none;
  }
  
  .nav-link {
    padding: 8px 12px;
  }
}
</style>