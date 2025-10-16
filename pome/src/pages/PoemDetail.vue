<template>
  <div class="page" v-if="poem">
    <!-- Title Section with Animation -->
    <div class="title-section" :class="{ 'fade-in': titleVisible }">
      <h1 class="poem-title">{{ poem.title }}</h1>
      <p class="meta">{{ poem.author }} · {{ poem.dynasty }}</p>
    </div>

    <!-- Poem Content with Typewriter Effect -->
    <section class="content" :class="{ 'fade-in': contentVisible }">
      <p 
        v-for="(line, i) in poem.content" 
        :key="i" 
        class="line"
        :style="{ animationDelay: `${0.5 + i * 0.3}s` }"
      >
        {{ line }}
      </p>
    </section>

    <!-- Interactive Actions with Hover Effects -->
    <div class="actions" :class="{ 'fade-in': actionsVisible }">
      <button 
        class="btn like-btn" 
        @click="toggleLike"
        :class="{ 'liked': poem.liked }"
      >
        <span class="btn-icon">👍</span>
        <span class="btn-text">{{ poem.liked ? '已点赞' : '点赞' }}</span>
        <span class="btn-count">{{ poem.likes }}</span>
      </button>
      
      <button 
        class="btn fav-btn" 
        @click="toggleFav"
        :class="{ 'favorited': poem.favorited }"
      >
        <span class="btn-icon">⭐</span>
        <span class="btn-text">{{ poem.favorited ? '已收藏' : '收藏' }}</span>
        <span class="btn-count">{{ poem.favorites }}</span>
      </button>
      
      <button class="btn share-btn" @click="share">
        <span class="btn-icon">📤</span>
        <span class="btn-text">分享</span>
      </button>
    </div>

    <!-- Expandable Sections with Smooth Animation -->
    <div class="expandable-section" v-for="(section, index) in sections" :key="section.title">
      <div 
        class="section-header" 
        @click="toggleSection(index)"
        :class="{ 'expanded': section.expanded }"
      >
        <h3 class="section-title">{{ section.title }}</h3>
        <span class="expand-icon">{{ section.expanded ? '−' : '+' }}</span>
      </div>
      <transition name="slide">
        <div v-if="section.expanded" class="section-content">
          <div v-if="section.type === 'notes'">
            <ul>
              <li v-for="(n, i) in poem.notes" :key="i" class="note-item">
                <strong>{{ n.keyword }}：</strong>{{ n.explanation }}
              </li>
            </ul>
          </div>
          <p v-else>{{ section.content }}</p>
        </div>
      </transition>
    </div>

    <!-- Comments Section -->
    <section class="comments" :class="{ 'fade-in': commentsVisible }">
      <h3 class="comments-title">评论（示例占位）</h3>
      <div class="comment-input-container">
        <input 
          class="input" 
          placeholder="输入你的评论（前端占位，不保存）" 
          v-model="commentInput"
          @keyup.enter="addComment"
        />
        <button class="comment-btn" @click="addComment">发送</button>
      </div>
      <div class="comment-list">
        <div 
          v-for="(comment, index) in comments" 
          :key="index" 
          class="comment"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ comment }}
        </div>
      </div>
    </section>
  </div>

  <div v-else class="page not-found">
    <div class="not-found-content">
      <h2>未找到该诗词</h2>
      <p>请检查诗词ID是否正确</p>
      <button class="back-btn" @click="$router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { usePoemsStore } from '../stores/poems';

const route = useRoute();
const store = usePoemsStore();
const id = Number(route.params.id);
const poem = computed(() => store.poems.find(p => p.id === id));

// Animation states
const titleVisible = ref(false);
const contentVisible = ref(false);
const actionsVisible = ref(false);
const commentsVisible = ref(false);

// Comments functionality
const commentInput = ref('');
const comments = ref(['很有意境！', '读来令人回味。']);

// Expandable sections
const sections = reactive([
  { title: '注释', type: 'notes', expanded: false, content: '' },
  { title: '译文', type: 'translation', expanded: false, content: computed(() => poem.value?.translation || '') },
  { title: '赏析', type: 'analysis', expanded: false, content: computed(() => poem.value?.analysis || '') },
  { title: '作者介绍', type: 'author', expanded: false, content: computed(() => poem.value?.authorIntro || '') }
]);

function toggleLike() { 
  store.toggleLike(id);
  // Add animation feedback
  const btn = document.querySelector('.like-btn');
  if (btn) {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 600);
  }
}

function toggleFav() { 
  store.toggleFavorite(id);
  // Add animation feedback
  const btn = document.querySelector('.fav-btn');
  if (btn) {
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 600);
  }
}

function share() { 
  // Simulate share animation
  const btn = document.querySelector('.share-btn');
  if (btn) {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 600);
  }
  setTimeout(() => alert('分享功能暂未实现（前端演示）。'), 300);
}

function toggleSection(index) {
  sections[index].expanded = !sections[index].expanded;
}

function addComment() {
  if (commentInput.value.trim()) {
    comments.value.unshift(commentInput.value.trim());
    commentInput.value = '';
  }
}

// Staggered animations
onMounted(() => {
  setTimeout(() => titleVisible.value = true, 100);
  setTimeout(() => contentVisible.value = true, 300);
  setTimeout(() => actionsVisible.value = true, 500);
  setTimeout(() => commentsVisible.value = true, 700);
});
</script>

<style scoped>
.page { 
  padding: 16px; 
  max-width: 800px;
  margin: 0 auto;
  animation: pageLoad 0.8s ease-out;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found-content h2 {
  color: #666;
  margin-bottom: 16px;
}

.back-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.title-section {
  text-align: center;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.title-section.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.poem-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.meta { 
  color: #666; 
  font-size: 1.1rem;
  margin-bottom: 8px; 
}

.content {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: none;
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.content.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.line {
  margin: 12px 0;
  font-size: 1.3rem;
  line-height: 1.8;
  text-align: center;
  color: #2c3e50;
  opacity: 0;
  transform: translateX(-20px);
  animation: lineAppear 0.6s ease forwards;
}

.actions {
  display: flex;
  gap: 12px;
  margin: 24px 0;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.actions.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.like-btn:hover, .like-btn.liked {
  background: #ff6b6b;
  color: white;
}

.fav-btn:hover, .fav-btn.favorited {
  background: #ffd93d;
  color: #333;
}

.share-btn:hover {
  background: #4ecdc4;
  color: white;
}

.btn.pulse {
  animation: pulse 0.6s ease;
}

.btn.shake {
  animation: shake 0.6s ease;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-text {
  font-weight: 500;
}

.btn-count {
  background: rgba(255,255,255,0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.expandable-section {
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.section-header:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
}

.section-header.expanded {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

.section-title {
  margin: 0;
  font-size: 1.1rem;
}

.expand-icon {
  font-size: 1.2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.section-header.expanded .expand-icon {
  transform: rotate(180deg);
}

.section-content {
  padding: 20px;
  background: #fff;
  border-top: 1px solid #eee;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.note-item {
  margin: 8px 0;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.comments {
  margin-top: 32px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.comments.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.comments-title {
  color: #2c3e50;
  margin-bottom: 16px;
}

.comment-input-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.comment-btn {
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.comment-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.comment-list {
  display: grid;
  gap: 12px;
}

.comment {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  opacity: 0;
  transform: translateX(-20px);
  animation: commentAppear 0.5s ease forwards;
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

@keyframes lineAppear {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes commentAppear {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>