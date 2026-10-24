<script setup>
import { ref, watch } from 'vue'

const darkMode = ref(localStorage.getItem('blog-theme') === 'dark')

watch(darkMode, (value) => {
  localStorage.setItem('blog-theme', value ? 'dark' : 'light')
})
</script>

<template>
  <div class="site" :class="{ dark: darkMode }">
    <header class="hero">
      <div class="container">
        <div class="topbar">
          <RouterLink to="/" class="logo">
            MY PERSONAL BLOG
          </RouterLink>

          <button
            class="theme-button"
            @click="darkMode = !darkMode"
          >
            {{ darkMode ? '☀️ 浅色模式' : '🌙 深色模式' }}
          </button>
        </div>

        <nav>
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/#articles">文章</RouterLink>
          <RouterLink to="/projects">项目展示</RouterLink>
          <RouterLink to="/about">关于我</RouterLink>
        </nav>

        <div class="hero-content">
          <h1>我的个人博客</h1>
          <p>记录编程学习、项目开发和生活成长。</p>
        </div>
      </div>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer>
      <p>© 2026 我的个人博客</p>
      <p>使用 Vue 3 构建</p>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.site {
  --page-bg: #f4f6fb;
  --card-bg: white;
  --text-color: #263246;
  --muted-color: #667085;
  --input-bg: white;
  --border-color: #d6dce6;

  min-height: 100vh;
  background: var(--page-bg);
  color: var(--text-color);
  transition: background 0.25s, color 0.25s;
}

.site.dark {
  --page-bg: #121826;
  --card-bg: #202b3d;
  --text-color: #f3f6fc;
  --muted-color: #c5cede;
  --input-bg: #2a374c;
  --border-color: #526078;
}

.container {
  width: min(100% - 32px, 960px);
  margin: 0 auto;
}

.hero {
  background: #20385c;
  color: white;
  padding: 28px 0 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.logo {
  color: white;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
  text-decoration: none;
}

.theme-button {
  background: white;
  color: #20385c;
  border: 0;
  border-radius: 8px;
  padding: 9px 14px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 24px;
}

nav a {
  color: #dce6f5;
  text-decoration: none;
  padding-bottom: 5px;
}

nav a.router-link-exact-active {
  color: white;
  border-bottom: 2px solid white;
}

.hero-content {
  margin-top: 42px;
}

.hero h1 {
  font-size: clamp(30px, 5vw, 46px);
  margin: 0 0 12px;
}

.hero p {
  color: #dce6f5;
}

main {
  padding-top: 32px;
  padding-bottom: 48px;
}

.card,
.article-card,
.empty {
  background: var(--card-bg) !important;
  color: var(--text-color);
}

.card {
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 6px 24px #1a345010;
}

.article-card .excerpt,
.article-card .article-meta,
.detail .meta {
  color: var(--muted-color);
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg);
  color: var(--text-color);
}

input::placeholder,
textarea::placeholder {
  color: var(--muted-color);
}

button {
  border: 0;
  border-radius: 8px;
  padding: 10px 16px;
}

.primary {
  background: #2469cf;
  color: white;
}

.secondary {
  background: #e8edf5;
  color: #263246;
}

.danger {
  background: #fff0f0;
  color: #c53b3b;
}

a {
  color: #2469cf;
}

.hero a {
  color: white;
}

footer {
  text-align: center;
  padding: 28px;
  color: var(--muted-color);
}

footer p {
  margin: 4px 0;
}

@media (max-width: 600px) {
  .hero {
    padding: 24px 0 36px;
  }

  .hero-content {
    margin-top: 30px;
  }

  .card {
    padding: 18px;
  }

  .logo {
    font-size: 11px;
  }

  .theme-button {
    font-size: 12px;
    padding: 8px;
  }
}
</style>