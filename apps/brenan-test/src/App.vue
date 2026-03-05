<template>
  <div class="app">
    <NavSidebar />
    <main class="page-content">
      <div class="images-container">
        <img :src="`${baseUrl}column.png`" alt="Column" class="column-image" />
        <img :src="`${baseUrl}sidebar.png`" alt="Sidebar" class="sidebar-image" />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavSidebar from './components/NavSidebar.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<style>
html {
  font-size: 62.5%;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: var(--font-family-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Helvetica, Arial, sans-serif);
}

body.dark-mode {
  background: var(--color-gray-800, #312E2B);
}
</style>

<style scoped>
.app {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.page-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  padding-top: 16px;
}

.images-container {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.column-image {
  width: 728px;
  height: auto;
}

.sidebar-image {
  width: 300px;
  height: auto;
}
</style>
