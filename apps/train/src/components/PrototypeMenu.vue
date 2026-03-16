<script setup>
import { CcIcon } from '@chesscom/design-system'

defineProps({
  open: { type: Boolean, default: false },
  selectedActivity: { type: String, default: null },
})

const emit = defineEmits(['select', 'close'])

const categories = [
  {
    id: 'openings',
    label: 'Openings',
    activities: [
      { id: 'playing-the-opening', label: 'Playing the Opening' },
      { id: 'your-opening-mistakes', label: 'Your Opening Mistakes' },
    ],
  },
  {
    id: 'tactics',
    label: 'Tactics',
    activities: [
      { id: 'your-tactical-misses', label: 'Your Tactical Misses' },
      { id: 'blunder-or-brilliant', label: 'Blunder or Brilliant' },
      { id: 'themed-puzzles', label: 'Themed Puzzles' },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy',
    activities: [
      { id: 'attacking', label: 'Attacking' },
      { id: 'defending', label: 'Defending' },
      { id: 'strategic-puzzles', label: 'Strategic Puzzles' },
    ],
  },
  {
    id: 'endgames',
    label: 'Endgames',
    activities: [
      { id: 'convert-the-win', label: 'Convert the Win' },
      { id: 'hold-the-draw', label: 'Hold the Draw' },
      { id: 'your-endgame-mistakes', label: 'Your Endgame Mistakes' },
    ],
  },
]
</script>

<template>
  <Transition name="menu">
    <div v-if="open" class="prototype-menu-overlay" @click.self="$emit('close')">
      <div class="prototype-menu-panel">
        <div class="panel-header">
          <span class="panel-title">Train</span>
          <button class="close-button" @click="$emit('close')">
            <CcIcon name="mark-cross" :size="16" />
          </button>
        </div>

        <div class="panel-content">
          <div v-for="cat in categories" :key="cat.id" class="category-group">
            <div class="category-header cc-text-small-bold">{{ cat.label }}</div>
            <button
              v-for="activity in cat.activities"
              :key="activity.id"
              class="activity-item"
              :class="{ 'activity-item-selected': selectedActivity === activity.id }"
              @click="emit('select', activity.id)"
            >
              <span class="activity-item-label cc-text-small">{{ activity.label }}</span>
              <CcIcon name="arrow-chevron-right" :size="12" class="activity-item-arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.prototype-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.77);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.prototype-menu-panel {
  width: 360px;
  height: 100%;
  background: #262421;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-title {
  font-family: 'Chess Sans', sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  color: white;
}

.close-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  margin-right: -12px;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.panel-content {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.category-group {
  margin-bottom: 20px;
}

.category-header {
  color: rgba(255, 255, 255, 0.5);
  padding: 0 4px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 4px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  text-align: left;
}

.activity-item:last-child {
  border-bottom: none;
  margin-bottom: 8px;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.activity-item-selected {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 5px;
}

.activity-item-label {
  color: rgba(255, 255, 255, 0.72);
}

.activity-item:hover .activity-item-label,
.activity-item-selected .activity-item-label {
  color: rgba(255, 255, 255, 0.85);
}

.activity-item-arrow {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.3);
}

.activity-item:hover .activity-item-arrow,
.activity-item-selected .activity-item-arrow {
  color: rgba(255, 255, 255, 0.5);
}

/* Transition animations */
.menu-enter-active {
  transition: opacity 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-leave-active {
  transition: opacity 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-enter-active .prototype-menu-panel {
  transition: transform 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-leave-active .prototype-menu-panel {
  transition: transform 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-enter-active .panel-header,
.menu-enter-active .panel-content {
  transition: opacity 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-leave-active .panel-header,
.menu-leave-active .panel-content {
  transition: opacity 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-from .prototype-menu-panel,
.menu-leave-to .prototype-menu-panel {
  transform: translateX(100%);
}

.menu-enter-from .panel-header,
.menu-enter-from .panel-content,
.menu-leave-to .panel-header,
.menu-leave-to .panel-content {
  opacity: 0;
}
</style>
