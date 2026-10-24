import { ref, watch } from 'vue'

const defaultArticles = [
  {
    id: 1,
    title: '我的第一篇博客',
    content: '今天我开始制作个人博客网站。',
    date: '2026-10-21',
    category: '生活',
    cover: ''
  },
  {
    id: 2,
    title: 'JavaScript 学习笔记',
    content: '今天复习了 JavaScript 基础知识。',
    date: '2026-10-22',
    category: '技术',
    cover: ''
  },
  {
    id: 3,
    title: '学习 Vue 3',
    content: '今天学习了 Vue 3 组件开发。',
    date: '2026-10-23',
    category: '技术',
    cover: ''
  },
  {
    id: 4,
    title: '我的第四篇博客',
    content: '我已经能够使用组件显示多篇文章。',
    date: '2026-10-24',
    category: '生活',
    cover: ''
  }
]

function loadArticles() {
  try {
    const saved = localStorage.getItem('my-blog-articles')
    if (!saved) return defaultArticles

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : defaultArticles
  } catch {
    return defaultArticles
  }
}

export const articles = ref(loadArticles())

watch(
  articles,
  value => {
    localStorage.setItem('my-blog-articles', JSON.stringify(value))
  },
  { deep: true }
)

export function addArticle(article) {
  articles.value.unshift(article)
}

export function updateArticle(id, changes) {
  const article = articles.value.find(item => String(item.id) === String(id))

  if (article) {
    Object.assign(article, changes)
  }
}

export function deleteArticle(id) {
  articles.value = articles.value.filter(
    article => String(article.id) !== String(id)
  )
}

export function getArticle(id) {
  return articles.value.find(
    article => String(article.id) === String(id)
  )
}