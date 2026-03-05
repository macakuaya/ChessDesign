<script setup>
import { CcIcon } from '@chesscom/design-system'

const activities = [
  {
    type: 'learn',
    icon: 'lessons',
    title: 'Learn',
    subtitle: 'How to Move the Pieces',
  },
  {
    type: 'puzzles',
    icon: 'puzzle-piece',
    title: 'Puzzles',
    badge: '12',
    progress: 50,
  },
  {
    type: 'coach',
    title: 'Play Coach',
    subtitle: 'Hikaru',
    avatar: 'https://images.chesscomfiles.com/uploads/v1/master_player/d6b31b00-2f37-11e4-8075-7fbc1fd63a63.jpeg',
  },
  {
    type: 'bots',
    title: 'Play Bots',
    subtitle: 'Codemiko',
    avatar: 'https://images.chesscomfiles.com/uploads/v1/user/309956008.4e91d832.200x200o.3fc2af09bd73.png',
  },
]
</script>

<template>
  <div class="cc-section activities-component">
    <div class="cc-section-content activities-grid">
      <div
        v-for="activity in activities"
        :key="activity.type"
        class="activity-card cc-bg-secondary">
        <div class="card-media">
          <template v-if="activity.avatar">
            <img
              :src="activity.avatar"
              :alt="activity.title"
              class="card-avatar" />
          </template>
          <template v-else>
            <div class="card-icon-wrapper">
              <CcIcon
                :name="activity.icon"
                variant="color"
                :size="64" />
              <span v-if="activity.badge" class="card-badge">{{ activity.badge }}</span>
            </div>
          </template>
        </div>

        <div class="card-header cc-heading-xx-small">
          {{ activity.title }}
        </div>

        <div class="card-body cc-text-small">
          <template v-if="activity.progress != null">
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: activity.progress + '%' }" />
            </div>
          </template>
          <template v-else>
            {{ activity.subtitle }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activities-component {
  width: 100%;
  min-width: 100%;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(7rem, 1fr));
  gap: var(--space-12, 1.2rem);
}

.activity-card {
  align-items: center;
  background: var(--cc-bg-color);
  border: none;
  border-radius: var(--radius-10, 1rem);
  box-shadow: var(--cc-bg-box-shadow);
  display: flex;
  flex-direction: column;
  min-height: 15.6rem;
  padding: var(--space-24, 2.4rem) var(--space-12, 1.2rem) var(--space-12, 1.2rem);
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.card-media {
  height: 6.4rem;
  width: 6.4rem;
  margin-bottom: var(--space-12, 1.2rem);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 3.2rem;
  color: var(--color-neutrals-white, #fff);
  text-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.card-avatar {
  width: 6.4rem;
  height: 6.4rem;
  border-radius: var(--radius-3, 0.3rem);
  object-fit: cover;
  display: block;
}

.card-header {
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4, 0.4rem);
  margin-bottom: var(--space-4, 0.4rem);
}

.card-body {
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 1.2rem;
  background: var(--color-bg-progress-track, rgba(255, 255, 255, 0.1));
  border-radius: var(--radius-xl, 1rem);
  overflow: hidden;
  margin-top: var(--space-4, 0.4rem);
}

.progress-fill {
  height: 100%;
  background: var(--color-bg-progress-completed, #81b64c);
  border-radius: var(--radius-xl, 1rem);
  transition: width var(--motion-duration-slower, 700ms) var(--motion-ease-out-dramatic, cubic-bezier(.2, 1, .3, 1));
}
</style>
