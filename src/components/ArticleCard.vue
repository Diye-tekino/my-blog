<script setup>
defineProps({
  id: [String, Number],
  title: String,
  content: String,
  date: String,
  category: String,
  cover: String
})

defineEmits(['delete', 'edit'])
</script>

<template>
  <article class="article-card">
    <img
      v-if="cover"
      :src="cover"
      :alt="title"
      class="cover"
    />

    <div class="article-body">
      <div class="article-meta">
        <span class="category">{{ category }}</span>
        <span>{{ date }}</span>
      </div>

      <h2>{{ title }}</h2>

      <p class="excerpt">
        {{ content.slice(0, 100) }}
      </p>

      <div class="article-actions">
        <RouterLink :to="`/article/${id}`">
          阅读全文 →
        </RouterLink>

        <button @click="$emit('edit')">
          编辑
        </button>

        <button class="danger" @click="$emit('delete')">
          删除
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 18px #1a34500d;
}

.cover {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.article-body {
  padding: 24px;
}

.article-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  color: gray;
  font-size: 14px;
}

.category {
  background: #e8f0ff;
  color: #2469cf;
  padding: 3px 10px;
  border-radius: 20px;
}

h2 {
  margin: 14px 0;
}

.excerpt {
  color: #667085;
  overflow-wrap: anywhere;
}

.article-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.article-actions a {
  text-decoration: none;
  font-weight: bold;
}

@media (max-width: 600px) {
  .article-body {
    padding: 18px;
  }
}
</style>