<template>
  <div class="page">
    <!-- Hero Section with Animation -->
    <section class="hero" :class="{ 'fade-in': heroVisible }">
      <h1 class="title-animate">诗词鉴赏平台</h1>
      <p class="subtitle-animate">探索中国古典诗词之美，学习注释与赏析。</p>
    </section>

    <!-- Featured Carousel with Hover Effects -->
    <section class="carousel">
      <div 
        class="slide" 
        v-for="(p, index) in featured" 
        :key="p.id" 
        @click="$router.push('/poems/' + p.id)"
        :style="{ animationDelay: `${index * 0.2}s` }"
      >
        <div class="slide-content">
          <h3 class="slide-title">{{ p.title }}</h3>
          <p class="meta">{{ p.author }} · {{ p.dynasty }}</p>
          <p class="excerpt">{{ p.content.join(' / ') }}</p>
        </div>
      </div>
    </section>

    <!-- Hot Poems with Staggered Animation -->
    <section>
      <h2 class="section-title">热门诗词</h2>
      <div class="cards">
        <div 
          class="card" 
          v-for="(p, index) in hotPoems" 
          :key="p.id" 
          @click="$router.push('/poems/' + p.id)"
          :style="{ animationDelay: `${0.3 + index * 0.1}s` }"
        >
          <div class="card-content">
            <h3>{{ p.title }}</h3>
            <p class="meta">{{ p.author }} · {{ p.dynasty }}</p>
            <p class="excerpt">{{ p.content.slice(0,2).join(' / ') }}</p>
            <div class="card-hover"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Poems with Staggered Animation -->
    <section>
      <h2 class="section-title">最新诗词</h2>
      <div class="cards">
        <div 
          class="card" 
          v-for="(p, index) in latestPoems" 
          :key="p.id" 
          @click="$router.push('/poems/' + p.id)"
          :style="{ animationDelay: `${0.5 + index * 0.1}s` }"
        >
          <div class="card-content">
            <h3>{{ p.title }}</h3>
            <p class="meta">{{ p.author }} · {{ p.dynasty }}</p>
            <p class="excerpt">{{ p.content.slice(0,2).join(' / ') }}</p>
            <div class="card-hover"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { usePoemsStore } from '../stores/poems';

const store = usePoemsStore();
const heroVisible = ref(false);

const featured = computed(() => store.poems.slice(0, 2));
const hotPoems = computed(() => [...store.poems].sort((a,b) => b.likes - a.likes).slice(0, 4));
const latestPoems = computed(() => [...store.poems].sort((a,b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 4));

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true;
  }, 100);
});
</script>

<style scoped>
.page { 
  padding: 16px; 
  animation: pageLoad 0.8s ease-out;
}

.hero { 
  padding: 24px; 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px; 
  text-align: center; 
  margin-bottom: 16px; 
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.hero.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.title-animate {
  font-size: 2.5rem;
  margin-bottom: 12px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

.subtitle-animate {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: subtitleFade 2s ease-in-out infinite alternate;
}

.carousel { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  gap: 16px; 
  margin-bottom: 24px; 
}

.slide { 
  padding: 0;
  border: none;
  border-radius: 12px; 
  background: #fff; 
  cursor: pointer; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.6s ease forwards;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.slide:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.slide-content {
  padding: 20px;
  position: relative;
  z-index: 2;
}

.slide-title {
  color: #2c3e50;
  margin-bottom: 8px;
  position: relative;
}

.slide-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.slide:hover .slide-title::after {
  width: 100%;
}

.cards { 
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 16px; 
  margin-top: 16px;
}

.card { 
  padding: 0;
  border: none;
  border-radius: 12px; 
  background: #fff; 
  cursor: pointer; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transform: translateY(20px);
  opacity: 0;
  animation: cardAppear 0.6s ease forwards;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.card-content {
  padding: 20px;
  position: relative;
  z-index: 2;
}

.card-hover {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s ease;
}

.card:hover .card-hover {
  left: 100%;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 8px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.meta { 
  color: #666; 
  font-size: 13px; 
  margin-bottom: 8px;
}

.excerpt { 
  color: #333; 
  margin-top: 8px;
  line-height: 1.5;
}

@keyframes pageLoad {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titleGlow {
  from {
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
  }
  to {
    text-shadow: 0 0 30px rgba(255,255,255,0.8);
  }
}

@keyframes subtitleFade {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>