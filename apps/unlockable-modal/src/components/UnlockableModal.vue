<script setup>
import { ref, computed } from 'vue'
import {
  CcModal,
  CcButton,
  CcIcon,
} from '@chesscom/design-system'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  unlockable: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue', 'equip', 'share'])

const showcaseEnabled = ref(true)

const currentTier = computed(() => {
  if (!props.unlockable.tiers) return null
  return props.unlockable.tiers.find(t => t.id === props.unlockable.currentTierId)
})

const hasEquippable = computed(() => {
  return !!props.unlockable.equippable
})

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <cc-modal
    :dismissable="true"
    modal-width="sm"
    @hide="close"
  >

    <div class="unlock-modal">
      <!-- Badge -->
      <div class="unlock-badge">
        <img
          :src="unlockable.badgeUrl"
          :alt="unlockable.name"
          class="unlock-badge-img"
        />
      </div>

      <!-- Title + Meta -->
      <div class="unlock-header">
        <h2 class="unlock-title cc-text-heading-large">{{ unlockable.name }}</h2>
        <span class="unlock-date cc-text-small">
          <template v-if="unlockable.currentLevel && unlockable.totalLevels">
            Level {{ unlockable.currentLevel }} of {{ unlockable.totalLevels }} ·
          </template>
          Unlocked · {{ unlockable.unlockedDate }}
        </span>
        <p class="unlock-desc cc-text-medium">{{ unlockable.description }}</p>
      </div>

      <!-- Equippable Reward (conditional) -->
      <div v-if="hasEquippable && currentTier" class="unlock-reward">
        <div class="unlock-reward-card">
          <div class="unlock-reward-icon">
            <cc-icon :name="currentTier.icon" variant="color" :size="32" />
          </div>
          <div class="unlock-reward-info">
            <span class="unlock-reward-name cc-text-medium-bold">{{ currentTier.rewardName }}</span>
          </div>
        </div>
        <cc-button
          variant="secondary"
          size="medium"
          full-width
          :label="'Equip ' + (unlockable.equippableType || 'Board')"
          @click="emit('equip', currentTier)"
        />
      </div>

      <!-- Footer: Showcase + Share -->
      <div class="unlock-footer">
        <div class="unlock-showcase">
          <div class="unlock-showcase-text">
            <span class="cc-text-small-bold">Showcase Award</span>
            <span class="unlock-showcase-hint cc-text-x-small">Display on your profile</span>
          </div>
          <label class="unlock-checkbox">
            <input type="checkbox" v-model="showcaseEnabled" />
            <span class="unlock-checkbox-box">
              <cc-icon v-if="showcaseEnabled" name="mark-check" :size="12" />
            </span>
          </label>
        </div>

        <cc-button
          variant="primary"
          size="large"
          full-width
          :icon="{ name: 'graph-nodes-share', variant: 'glyph' }"
          label="Share"
          @click="emit('share', unlockable)"
        />
      </div>
    </div>
  </cc-modal>
</template>

<style scoped>
.unlock-modal {
  display: flex;
  flex-direction: column;
  gap: var(--space-16, 16px);
  padding: var(--space-4, 4px) 0 var(--space-8, 8px);
}

/* Badge */
.unlock-badge {
  display: flex;
  justify-content: center;
}

.unlock-badge-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

/* Header */
.unlock-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4, 4px);
  text-align: center;
}

.unlock-title {
  margin: 0;
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.unlock-date {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.5));
}

.unlock-desc {
  margin: var(--space-4, 4px) 0 0;
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}

/* Equippable Reward */
.unlock-reward {
  display: flex;
  flex-direction: column;
  gap: var(--space-8, 8px);
  border-top: 1px solid var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  padding-top: var(--space-12, 12px);
}

.unlock-reward-card {
  display: flex;
  align-items: center;
  gap: var(--space-12, 12px);
  padding: var(--space-8, 8px) var(--space-4, 4px);
}

.unlock-reward-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.unlock-reward-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.unlock-reward-name {
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

/* Footer */
.unlock-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-12, 12px);
  border-top: 1px solid var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  padding-top: var(--space-12, 12px);
}

.unlock-showcase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4, 4px);
}

.unlock-showcase-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.unlock-showcase-text .cc-text-small-bold {
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}

.unlock-showcase-hint {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.4));
}

/* Checkbox */
.unlock-checkbox {
  display: flex;
  cursor: pointer;
}

.unlock-checkbox input {
  display: none;
}

.unlock-checkbox-box {
  width: 22px;
  height: 22px;
  border-radius: var(--radius-m, 3px);
  border: 2px solid var(--color-transparent-white-20, rgba(255, 255, 255, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: white;
  transition: all 0.15s ease;
}

.unlock-checkbox input:checked + .unlock-checkbox-box {
  background: var(--color-blue-300, #5BA3CF);
  border-color: var(--color-blue-300, #5BA3CF);
}
</style>
