<script setup>
const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'Vue 3',
  'Git',
  'GitHub'
]
</script>

<template>
  <div class="about-page">
    <section class="card">
      <div class="avatar">DEV</div>

      <h1>关于我</h1>

      <p>
        你好！欢迎来到我的个人博客。
      </p>

      <p>
        我正在学习前端开发，希望成为一名能够独立开发网站的程序员。
      </p>

      <p>
        这个博客使用 Vue 3 开发，
        用来记录我的编程学习、项目实践和成长过程。
      </p>
    </section>

    <section class="card">
      <h2>我的技术栈</h2>

      <div class="skills">
        <span
          v-for="skill in skills"
          :key="skill"
          class="skill"
        >
          {{ skill }}
        </span>
      </div>
    </section>

    <section class="card">
      <h2>我的目标</h2>

      <p>
        持续学习前端和全栈开发，积累真实项目经验，
        逐步具备独立开发和交付网站的能力。
      </p>

      <p>
        未来希望参与更多实际项目，并尝试自由职业开发。
      </p>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  display: grid;
  gap: 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #2469cf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
}

h1 {
  font-size: 32px;
}

p {
  line-height: 1.9;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill {
  background: #e8f0ff;
  color: #2469cf;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
}
</style>