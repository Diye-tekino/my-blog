<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'

import {
  articles,
  addArticle,
  updateArticle,
  deleteArticle
} from '../stores/blog'

const newTitle = ref('')
const newContent = ref('')
const newCategory = ref('技术')
const newCover = ref('')

const searchText = ref('')
const selectedCategory = ref('全部')
const sortOrder = ref('newest')

const editingId = ref(null)
const errorMessage = ref('')

const categories = ['全部', '技术', '生活', '其他']

const filteredArticles = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()

  const result = articles.value.filter(article => {
    const title = (article.title || '').toLowerCase()
    const content = (article.content || '').toLowerCase()

    const matchesSearch =
      title.includes(keyword) ||
      content.includes(keyword)

    const matchesCategory =
      selectedCategory.value === '全部' ||
      article.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })

  return [...result].sort((a, b) => {
    const comparison = String(b.date || '').localeCompare(
      String(a.date || '')
    )

    return sortOrder.value === 'newest'
      ? comparison
      : -comparison
  })
})

function resetForm() {
  newTitle.value = ''
  newContent.value = ''
  newCategory.value = '技术'
  newCover.value = ''
  editingId.value = null
  errorMessage.value = ''
}

function saveArticle() {
  const title = newTitle.value.trim()
  const content = newContent.value.trim()

  if (!title || !content) {
    errorMessage.value = '请填写文章标题和正文'
    return
  }

  const cover = newCover.value.trim()

  if (cover && !/^https:\/\/.+/i.test(cover)) {
    errorMessage.value = '封面图片请填写 HTTPS 地址'
    return
  }

  const changes = {
    title,
    content,
    category: newCategory.value,
    cover
  }

  if (editingId.value !== null) {
    updateArticle(editingId.value, changes)
  } else {
    addArticle({
      id: crypto.randomUUID(),
      ...changes,
      date: new Date().toLocaleDateString('sv-SE')
    })
  }

  resetForm()
}

function editArticle(id) {
  const article = articles.value.find(
    item => String(item.id) === String(id)
  )

  if (!article) return

  editingId.value = article.id
  newTitle.value = article.title
  newContent.value = article.content
  newCategory.value = article.category || '其他'
  newCover.value = article.cover || ''
  errorMessage.value = ''

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function removeArticle(id) {
  if (!window.confirm('确定删除这篇文章吗？')) return

  deleteArticle(id)

  if (String(editingId.value) === String(id)) {
    resetForm()
  }
}
</script>

<template>
  <section class="card editor">
    <h2>
      {{ editingId !== null ? '编辑文章' : '写一篇新文章' }}
    </h2>

    <form @submit.prevent="saveArticle">
      <label for="title">文章标题</label>

      <input
        id="title"
        v-model="newTitle"
        placeholder="请输入文章标题"
      />

      <label for="content">文章正文（支持 Markdown）</label>

      <textarea
        id="content"
        v-model="newContent"
        rows="8"
        placeholder="例如：# 今天的学习笔记"
      ></textarea>

      <label for="category">文章分类</label>

      <select id="category" v-model="newCategory">
        <option value="技术">技术</option>
        <option value="生活">生活</option>
        <option value="其他">其他</option>
      </select>

      <label for="cover">文章封面（可选）</label>

      <input
        id="cover"
        v-model="newCover"
        placeholder="请输入 HTTPS 图片地址"
      />

      <img
        v-if="newCover"
        :src="newCover"
        alt="封面预览"
        class="cover-preview"
      />

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <div class="form-actions">
        <button type="submit" class="primary">
          {{ editingId !== null ? '保存修改' : '发布文章' }}
        </button>

        <button
          v-if="editingId !== null"
          type="button"
          class="secondary"
          @click="resetForm"
        >
          取消编辑
        </button>
      </div>
    </form>
  </section>

  <section id="articles" class="articles-section">
    <div class="section-heading">
      <h2>全部文章</h2>
      <span>共 {{ articles.length }} 篇</span>
    </div>

    <div class="filters">
      <input
        v-model="searchText"
        placeholder="搜索文章标题或正文..."
        aria-label="搜索文章"
      />

      <select
        v-model="selectedCategory"
        aria-label="文章分类"
      >
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <select
        v-model="sortOrder"
        aria-label="文章排序"
      >
        <option value="newest">最新发布</option>
        <option value="oldest">最早发布</option>
      </select>
    </div>

    <div v-if="filteredArticles.length" class="article-list">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :id="article.id"
        :title="article.title"
        :content="article.content"
        :date="article.date"
        :category="article.category || '其他'"
        :cover="article.cover || ''"
        @edit="editArticle(article.id)"
        @delete="removeArticle(article.id)"
      />
    </div>

    <div v-else class="empty">
      暂时没有符合条件的文章。
    </div>
  </section>
</template>

<style scoped>
.editor h2 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: bold;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.error {
  color: red;
}

.cover-preview {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.articles-section {
  margin-top: 36px;
  scroll-margin-top: 20px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.filters {
  display: flex;
  gap: 12px;
  margin: 16px 0 24px;
}

.filters input {
  flex: 1;
}

.filters select {
  width: 150px;
}

.article-list {
  display: grid;
  gap: 18px;
}

.empty {
  text-align: center;
  padding: 40px;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .filters {
    flex-direction: column;
  }

  .filters select {
    width: 100%;
  }
}
</style>