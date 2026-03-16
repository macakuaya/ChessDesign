<script setup>
import { ref, computed } from 'vue'
import { CcButton, CcIcon } from '@chesscom/design-system'
import Board from './components/Board.vue'
import CoachBubble from './components/CoachBubble.vue'
import PrototypeMenu from './components/PrototypeMenu.vue'

const baseUrl = import.meta.env.BASE_URL

const navIcons = {
  statusRight: `${baseUrl}icons/misc/status-right.svg`,
}

const showPrototypeMenu = ref(false)
const selectedActivity = ref(null)

const ACTIVITY_LABELS = {
  'playing-the-opening': 'Playing the Opening',
  'your-opening-mistakes': 'Your Opening Mistakes',
  'your-tactical-misses': 'Your Tactical Misses',
  'blunder-or-brilliant': 'Blunder or Brilliant',
  'themed-puzzles': 'Themed Puzzles',
  'attacking': 'Attacking',
  'defending': 'Defending',
  'strategic-puzzles': 'Strategic Puzzles',
  'convert-the-win': 'Convert the Win',
  'hold-the-draw': 'Hold the Draw',
  'your-endgame-mistakes': 'Your Endgame Mistakes',
}

const headerTitle = computed(() => {
  if (selectedActivity.value && ACTIVITY_LABELS[selectedActivity.value]) {
    return ACTIVITY_LABELS[selectedActivity.value]
  }
  return 'Train'
})

function onSelectActivity(id) {
  selectedActivity.value = id
}
</script>

<template>
  <div class="app dark-mode">
    <div class="phone-frame">
      <header class="nav-bar">
        <div class="status-bar">
          <div class="status-right">
            <img alt="" :src="navIcons.statusRight" />
          </div>
        </div>
        <div class="nav-header">
          <div class="nav-icon-button nav-icon">
            <CcIcon name="arrow-line-left" :size="20" />
          </div>
          <div class="nav-title">{{ headerTitle }}</div>
          <div class="nav-actions">
            <div class="nav-icon-button nav-icon">
              <CcIcon name="utility-cogwheel" :size="20" />
            </div>
          </div>
        </div>
      </header>

      <section class="coach-area">
        <CoachBubble />
      </section>

      <section class="board-area">
        <div class="board-container">
          <Board :size="375" />
        </div>
      </section>

      <div class="content-spacer"></div>

      <footer class="tab-bar">
        <div class="tabs-container">
          <div class="button-group">
            <CcButton variant="secondary" size="large">Button</CcButton>
            <CcButton variant="primary" size="large">Button</CcButton>
          </div>
        </div>
        <div class="home-indicator"></div>
      </footer>
    </div>

    <button class="menu-button" aria-label="Menu" @click="showPrototypeMenu = !showPrototypeMenu">
      <CcIcon name="mark-menu" :size="24" />
    </button>

    <PrototypeMenu
      :open="showPrototypeMenu"
      :selected-activity="selectedActivity"
      @select="onSelectActivity"
      @close="showPrototypeMenu = false"
    />
  </div>
</template>

<style>
/* Chess Sans Variable Font */
@font-face {
  font-family: 'Chess Sans';
  src: url('/fonts/ChessSansVF.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

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

button.cc-button-component.cc-button-secondary {
  color: rgba(255, 255, 255, 0.85);
}
</style>

<style scoped>
.app {
  background: #1f1f1f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  font-family: 'Chess Sans', system-ui, -apple-system, sans-serif;
  position: relative;
}

.menu-button {
  position: fixed;
  top: 4px;
  right: 4px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: background 0.15s ease;
  z-index: 10;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Phone frame */
.phone-frame {
  width: 375px;
  height: 812px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%),
    #312e2b;
  border-radius: 40px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.06),
    0 12px 30px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Nav bar */
.nav-bar {
  height: 87px;
  display: flex;
  flex-direction: column;
  font-weight: 700;
}

.status-bar {
  height: 47px;
  position: relative;
}

.status-right {
  position: absolute;
  right: 14.67px;
  top: 17.33px;
  width: 66.661px;
  height: 11.336px;
}

.status-right img {
  width: 100%;
  height: 100%;
  display: block;
}

.nav-header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  position: relative;
}

.nav-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 260px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: #fff;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.nav-actions {
  display: flex;
}

.nav-icon {
  color: var(--color-icon-default);
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));
}

/* Coach area */
.coach-area {
  padding: 12px;
  display: flex;
  align-items: flex-end;
  min-height: 128px;
}

/* Board area */
.board-area {
  /* Hugs the board */
}

.board-container {
  position: relative;
  width: 375px;
  height: 375px;
}

/* Spacer pushes tab bar to bottom */
.content-spacer {
  flex: 1;
}

/* Tab bar */
.tab-bar {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  position: relative;
  z-index: 5;
}

.tabs-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 0 12px;
  height: 56px;
}

.button-group {
  display: flex;
  gap: 12px;
  width: 100%;
}

.button-group :deep(button) {
  flex: 1;
}

.home-indicator {
  height: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
}

.home-indicator::after {
  content: '';
  width: 134px;
  height: 5px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 100px;
}
</style>
