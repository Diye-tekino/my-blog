<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { getArticle } from '../stores/blog'

const route = useRoute()

const article = computed(() => getArticle(route.params.id))

const renderedContent = computed(() => {
  if (!article.value) return ''

  return DOMPurify.sanitize(
    marked.parse(article.value.content)
  )
})
</script>

<template>
  <div v-if="article" class="detail card">
    <RouterLink to="/">← 返回博客首页</RouterLink>

    <img
      v-if="article.cover"
      :src="article.cover"
      :alt="article.title"
      class="detail-cover"
    />

    <div class="meta">
      {{ article.category || '其他' }} · {{ article.date }}
    </div>

    <h1>{{ article.title }}</h1>

    <div class="markdown-body" v-html="renderedContent"></div>
  </div>

  <div v-else class="card">
    <h2>文章不存在</h2>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped>
.detail {
  min-height: 400px;
}

.detail a {
  text-decoration: none;
}

.detail-cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 24px;
}

.meta {
  color: gray;
  margin-top: 24px;
}

h1 {
  font-size: clamp(28px, 5vw, 40px);
  line-height: 1.3;
}

.markdown-body {
  overflow-wrap: anywhere;
  line-height: 1.9;
}

.markdown-body :deep(img) {
  max-width: 100%;
}

.markdown-body :deep(pre) {
  background: #eef2f8;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid #2469cf;
  padding-left: 16px;
  color: gray;
}
</style>