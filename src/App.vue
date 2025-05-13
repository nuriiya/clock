<template>
  <div id="app">
    <!-- 固定导航栏 -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="brand">
          <img alt="健康监测" src="./assets/logo.png" class="logo">
          <span class="app-name">健康数据监测系统</span>
        </div>
        <div class="nav-links">
          <router-link to="/value-editor" class="nav-item">
            <span class="icon">📤</span>
            <span class="text">数据上传</span>
          </router-link>
          <router-link to="/historyData" class="nav-item">
            <span class="icon">📊</span>
            <span class="text">历史记录</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --background-light: #f8f9fa;
  --text-dark: #2c3e50;
  --nav-height: 60px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-dark);
}

.main-nav {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: var(--nav-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 40px;
  width: auto;
}

.app-name {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: var(--background-light);
  transform: translateY(-2px);
}

.nav-item.router-link-exact-active {
  color: var(--secondary-color);
  font-weight: 500;
}

.nav-item .icon {
  font-size: 1.2rem;
}

.content-wrapper {
  margin-top: var(--nav-height);
  min-height: calc(100vh - var(--nav-height));
  padding: 30px 20px;
  background: var(--background-light);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }

  .app-name {
    display: none;
  }

  .nav-links {
    gap: 15px;
  }

  .nav-item .text {
    display: none;
  }

  .nav-item .icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 20px 10px;
  }
}
</style>