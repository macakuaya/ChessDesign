<script setup>
const base = import.meta.env.BASE_URL
const avatarSrc = `${base}icons/misc/coach-avatar.svg`
const tipSrc = `${base}icons/misc/bubble-tip.svg`
</script>

<template>
  <div class="coach-container">
    <div class="coach-avatar">
      <img :src="avatarSrc" alt="Coach" />
    </div>

    <div class="bubble-wrapper">
      <div class="bubble">
        <div class="tip">
          <img :src="tipSrc" alt="" />
        </div>
        <div class="bubble-content">
          <p class="coach-message">Coach text goes here!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coach-container {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0;
  width: 100%;
  min-height: 96px;
}

.coach-avatar {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 3px;
}

.coach-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bubble-wrapper {
  position: relative;
  flex: 1;
  max-width: 275px;
  min-height: 80px;
  margin-left: -6px;
  display: flex;
  align-items: flex-end;
}

.bubble {
  position: relative;
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  overflow: visible;
}

.tip {
  position: absolute;
  left: -13px;
  bottom: 20px;
  width: 14px;
  height: 22px;
  z-index: 1;
}

.tip img {
  width: 100%;
  height: 100%;
}

.bubble-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 12px;
}

.coach-message {
  margin: 0;
  font-family: 'SF Pro Text', -apple-system, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: #312e2b;
}
</style>
