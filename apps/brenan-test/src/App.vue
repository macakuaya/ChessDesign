<template>
  <div class="app">
    <NavSidebar />
    <main class="page-content">
      <div class="images-container">
        <div class="column-section">
          <CoachBubble message="Ah, my favorite student! It's good to see you." />
          <RecommendedActivities />
          <div class="placeholder-column"></div>
        </div>
        <div class="placeholder-sidebar"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavSidebar from './components/NavSidebar.vue'
import CoachBubble from './components/CoachBubble.vue'
import RecommendedActivities from './components/RecommendedActivities.vue'
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
  --color-bg-speech: var(--color-neutrals-white, #FFFFFF);
  --color-text-speech: var(--color-gray-800, #312E2B);
}

:root {
  --coach-tail-width: 1.5rem;
  --coach-avatar-speech-overlap: var(--space-4, 0.4rem);
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

.column-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 728px;
  flex-shrink: 0;
}

.placeholder-column {
  width: 100%;
  height: 160rem;
  border-radius: var(--radius-10, 1rem);
  box-sizing: border-box;
  background-color: var(--color-bg-secondary);
}

.placeholder-sidebar {
  width: 300px;
  height: 160rem;
  flex-shrink: 0;
  border-radius: var(--radius-10, 1rem);
  box-sizing: border-box;
  background-color: var(--color-bg-secondary);
}
</style>
