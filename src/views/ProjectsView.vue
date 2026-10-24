<script setup>
const projects = [
  {
    id: 1,
    title: 'Vue 3 个人博客',
    description:
      '使用 Vue 3 开发的个人博客，支持文章发布、编辑、删除、搜索、分类和 Markdown 阅读。',
    technologies: ['Vue 3', 'Vue Router', 'JavaScript'],
    status: '开发中'
  },
  {
    id: 2,
    title: '游泳教练预约网站',
    description:
      '用于展示游泳课程、课程价格和预约咨询的个人网站。',
    technologies: ['Vue 3', 'HTML', 'CSS'],
    status: '已有练习版本'
  },
  {
    id: 3,
    title: '电商购物车',
    description:
      '练习商品展示、购物车数量修改、总价计算和组件状态管理。',
    technologies: ['Vue 3', 'Pinia'],
    status: '练习项目'
  }
]
</script>

<template>
  <div class="projects-page">
    <div class="page-heading">
      <h1>我的项目</h1>

      <p>
        这里展示我在编程学习过程中完成和正在开发的项目。
      </p>
    </div>

    <div class="projects-grid">
      <article
        v-for="project in projects"
        :key="project.id"
        class="card project-card"
      >
        <span class="status">
          {{ project.status }}
        </span>

        <h2>{{ project.title }}</h2>

        <p>{{ project.description }}</p>

        <div class="technologies">
          <span
            v-for="technology in project.technologies"
            :key="technology"
            class="technology"
          >
            {{ technology }}
          </span>
        </div>
      </article>
    </div>

    <p class="notice">
      项目代码仓库和演示地址将在发布后陆续添加。
    </p>
  </div>
</template>

<style scoped>
.page-heading {
  margin-bottom: 28px;
}

.page-heading h1 {
  font-size: 32px;
}

.page-heading p {
  color: var(--muted-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card h2 {
  margin: 0;
}

.project-card p {
  line-height: 1.8;
  flex: 1;
}

.status {
  width: fit-content;
  background: #e8f0ff;
  color: #2469cf;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.technology {
  background: #edf3fc;
  color: #2469cf;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 13px;
}

.notice {
  margin-top: 28px;
  text-align: center;
  color: var(--muted-color);
}

@media (max-width: 650px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>