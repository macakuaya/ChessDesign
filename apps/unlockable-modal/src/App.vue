<script setup>
import { ref, reactive } from 'vue'
import { CcButton, CcIcon, CcChip } from '@chesscom/design-system'
import CurrentModal from './components/CurrentModal.vue'
import UnlockableModal from './components/UnlockableModal.vue'

const showCurrent = ref(false)
const showImproved = ref(false)

const unlockable = reactive({
  name: 'Hungry for Treasure II',
  description: 'Get the 2nd Reward in a Monthly Bot Event: Hungry for Treasure',
  currentLevel: 2,
  totalLevels: 30,
  unlockedDate: 'March 11th 2026',
  badgeUrl: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/SamCopeland/phpBxfkmq.png',
  equippable: true,
  equippableType: 'Board',
  currentTierId: 'tier-2',
  tiers: [
    { id: 'tier-2', rewardName: 'Treasure Hunter Flair II', icon: 'element-fire' },
  ],
})

function onEquip(tier) {
  alert(`Equipped: ${tier.rewardName}`)
}

function onShare(data) {
  alert(`Shared: ${data.name}`)
}
</script>

<template>
  <div class="app">
    <div class="app-content">
      <div class="app-header">
        <h1 class="app-title cc-text-heading-x-large">Unlockable Modal</h1>
        <p class="app-subtitle cc-text-large">Comparison: Current vs. Improved design</p>
      </div>

      <div class="app-cards">
        <!-- Current Design -->
        <div class="app-card" @click="showCurrent = true">
          <div class="app-card-badge">
            <cc-chip label="Current" color="red" variant="translucent" />
          </div>
          <div class="app-card-icon">
            <cc-icon name="trophy-medal-badge-star" :size="48" />
          </div>
          <div class="app-card-info">
            <span class="app-card-title cc-text-large-bold">Current Design</span>
            <span class="app-card-desc cc-text-small">
              The existing unlockable modal with hidden progression, inverted CTA hierarchy, and disconnected elements.
            </span>
          </div>
          <cc-button variant="secondary" size="medium" label="Open Modal" full-width />
        </div>

        <!-- Improved Design -->
        <div class="app-card app-card--improved" @click="showImproved = true">
          <div class="app-card-badge">
            <cc-chip label="Improved" color="green" variant="translucent" />
          </div>
          <div class="app-card-icon app-card-icon--glow">
            <cc-icon name="trophy-medal-badge-star" :size="48" />
          </div>
          <div class="app-card-info">
            <span class="app-card-title cc-text-large-bold">Improved Design</span>
            <span class="app-card-desc cc-text-small">
              Clean celebration modal, named reward, conditional equip, no progression clutter.
            </span>
          </div>
          <cc-button variant="primary" size="medium" label="Open Modal" full-width />
        </div>
      </div>

      <!-- Changes list -->
      <div class="app-changes">
        <h3 class="app-changes-title cc-text-medium-bold">What changed</h3>
        <div class="app-change-list">
          <div class="app-change">
            <cc-icon name="circle-fill-check" :size="16" class="app-change-icon" />
            <span class="cc-text-small">No progression indicator — works for awards with 4 or 30 tiers</span>
          </div>
          <div class="app-change">
            <cc-icon name="circle-fill-check" :size="16" class="app-change-icon" />
            <span class="cc-text-small">Reward name with icon identifies what you unlocked</span>
          </div>
          <div class="app-change">
            <cc-icon name="circle-fill-check" :size="16" class="app-change-icon" />
            <span class="cc-text-small">Equip section only appears when the award has equippable items</span>
          </div>
          <div class="app-change">
            <cc-icon name="circle-fill-check" :size="16" class="app-change-icon" />
            <span class="cc-text-small">Showcase Award checkbox with helper text: "Display on your profile"</span>
          </div>
          <div class="app-change">
            <cc-icon name="circle-fill-check" :size="16" class="app-change-icon" />
            <span class="cc-text-small">Share is the primary CTA — universal for all award types</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CurrentModal
      v-if="showCurrent"
      v-model="showCurrent"
      :unlockable="unlockable"
    />

    <UnlockableModal
      v-if="showImproved"
      v-model="showImproved"
      :unlockable="unlockable"
      @equip="onEquip"
      @share="onShare"
    />
  </div>
</template>

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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-32, 32px);
}

.app-content {
  max-width: 720px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-32, 32px);
}

.app-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 4px);
}

.app-title {
  margin: 0;
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.app-subtitle {
  margin: 0;
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.5));
}

/* Cards */
.app-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16, 16px);
}

.app-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-16, 16px);
  padding: var(--space-24, 24px);
  background: var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--color-border-default, rgba(255, 255, 255, 0.1));
  border-radius: var(--radius-l, 5px);
  cursor: pointer;
  transition: all 0.2s ease;
}

.app-card:hover {
  border-color: var(--color-transparent-white-20, rgba(255, 255, 255, 0.2));
  transform: translateY(-2px);
}

.app-card--improved {
  border-color: var(--color-transparent-white-20, rgba(255, 255, 255, 0.15));
}

.app-card-badge {
  display: flex;
}

.app-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-l, 5px);
  background: var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  color: var(--color-icon-default, rgba(255, 255, 255, 0.5));
}

.app-card-icon--glow {
  color: var(--color-gold-300, #E8A43A);
  background: rgba(232, 164, 58, 0.1);
}

.app-card-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 4px);
  flex: 1;
}

.app-card-title {
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.app-card-desc {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.5));
  line-height: 1.4;
}

/* Changes */
.app-changes {
  display: flex;
  flex-direction: column;
  gap: var(--space-12, 12px);
  padding: var(--space-20, 20px);
  background: var(--color-transparent-white-5, rgba(255, 255, 255, 0.03));
  border-radius: var(--radius-l, 5px);
}

.app-changes-title {
  margin: 0;
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}

.app-change-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8, 8px);
}

.app-change {
  display: flex;
  align-items: flex-start;
  gap: var(--space-8, 8px);
}

.app-change-icon {
  flex-shrink: 0;
  color: var(--color-green-300, #81B64C);
  margin-top: 1px;
}

.app-change .cc-text-small {
  color: var(--color-text-default, rgba(255, 255, 255, 0.6));
  line-height: 1.4;
}

@media (max-width: 600px) {
  .app-cards {
    grid-template-columns: 1fr;
  }
}
</style>
