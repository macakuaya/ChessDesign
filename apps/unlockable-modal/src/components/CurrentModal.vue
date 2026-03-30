<script setup>
import { ref } from 'vue'
import {
  CcModal,
  CcButton,
  CcIcon,
} from '@chesscom/design-system'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  unlockable: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue'])

const expanded = ref(false)
const showcaseEnabled = ref(true)

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

    <div class="current-modal">
      <!-- Badge -->
      <div class="current-badge">
        <img
          :src="unlockable.badgeUrl"
          :alt="unlockable.name"
          class="current-badge-img"
        />
      </div>

      <!-- Title -->
      <div class="current-header">
        <h2 class="current-title cc-text-heading-large">{{ unlockable.name }}</h2>
        <span class="current-date cc-text-small">Unlocked · {{ unlockable.unlockedDate }}</span>
        <p class="current-desc cc-text-medium">
          Get the 1st Reward in a Monthly Bot Event:
          Hungry for Treasure
        </p>
      </div>

      <!-- Flair card -->
      <div class="current-flair-card">
        <div class="current-flair-icon">
          <cc-icon name="element-fire" variant="color" :size="32" />
        </div>
        <div class="current-flair-info">
          <span class="current-flair-name cc-text-medium-bold">Treasure Hunter Flair II</span>
          <cc-button variant="secondary" size="medium" full-width label="Equipar" />
        </div>
      </div>

      <!-- More/Less toggle -->
      <button class="current-toggle" @click="expanded = !expanded">
        <span class="cc-text-small-bold">{{ expanded ? 'Less' : 'More' }}</span>
        <cc-icon
          :name="expanded ? 'arrow-chevron-top' : 'arrow-chevron-bottom'"
          :size="12"
        />
      </button>

      <!-- Expanded tier list -->
      <div v-if="expanded" class="current-tier-list">
        <div
          v-for="(tier, i) in unlockable.tiers"
          :key="tier.id"
          class="current-tier-row"
        >
          <div class="current-tier-left">
            <span class="current-tier-name cc-text-small-bold">{{ tier.name }} · Flair</span>
            <span class="current-tier-desc cc-text-x-small">{{ tier.shortDesc }}</span>
          </div>
          <cc-icon
            v-if="i <= 1"
            name="circle-fill-check"
            :size="20"
            class="current-tier-check"
          />
          <cc-icon
            v-else
            name="tool-lock-closed"
            :size="16"
            class="current-tier-lock"
          />
        </div>
      </div>

      <!-- Showcase -->
      <div class="current-showcase">
        <span class="cc-text-small-bold">Showcase Award</span>
        <label class="current-checkbox">
          <input type="checkbox" v-model="showcaseEnabled" />
          <span class="current-checkbox-visual">
            <cc-icon v-if="showcaseEnabled" name="mark-check" :size="12" />
          </span>
        </label>
      </div>

      <!-- Share -->
      <cc-button
        variant="primary"
        size="large"
        full-width
        :icon="{ name: 'graph-nodes-share', variant: 'glyph' }"
        label="Share"
        class="current-share-btn"
      />
    </div>
  </cc-modal>
</template>

<style scoped>
.current-modal {
  display: flex;
  flex-direction: column;
  gap: var(--space-16, 16px);
  padding: var(--space-4, 4px) 0 var(--space-8, 8px);
}

.current-badge {
  display: flex;
  justify-content: center;
}

.current-badge-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

.current-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4, 4px);
  text-align: center;
}

.current-title {
  margin: 0;
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.current-date {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.5));
}

.current-desc {
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
  margin: var(--space-4, 4px) 0 0;
}

.current-flair-card {
  display: flex;
  align-items: center;
  gap: var(--space-12, 12px);
  padding: var(--space-12, 12px);
  background: var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--color-border-default, rgba(255, 255, 255, 0.1));
  border-radius: var(--radius-l, 5px);
}

.current-flair-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.current-flair-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-8, 8px);
  flex: 1;
}

.current-flair-name {
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.current-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4, 4px);
  background: none;
  border: none;
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
  cursor: pointer;
  padding: var(--space-4, 4px);
  font-family: inherit;
}

.current-toggle:hover {
  color: var(--color-text-bolder, rgba(255, 255, 255, 0.85));
}

.current-tier-list {
  display: flex;
  flex-direction: column;
}

.current-tier-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-12, 12px) var(--space-4, 4px);
  border-top: 1px solid var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
}

.current-tier-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.current-tier-name {
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}

.current-tier-desc {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.4));
}

.current-tier-check {
  color: var(--color-green-300, #81B64C);
}

.current-tier-lock {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.25));
}

.current-showcase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4, 4px);
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}

.current-checkbox {
  display: flex;
  cursor: pointer;
}

.current-checkbox input {
  display: none;
}

.current-checkbox-visual {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-m, 3px);
  border: 2px solid var(--color-border-default, rgba(255, 255, 255, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-transparent-white-5, rgba(255, 255, 255, 0.05));
  color: white;
  transition: all 0.15s ease;
}

.current-checkbox input:checked + .current-checkbox-visual {
  background: var(--color-blue-300, #5BA3CF);
  border-color: var(--color-blue-300, #5BA3CF);
}

.current-share-btn {
  --button-bg: var(--color-green-300, #81B64C) !important;
}

/* Override the button to look like the green Share from the screenshot */
.current-share-btn :deep(.cc-button-component) {
  background: linear-gradient(180deg, #8BC34A 0%, #6D9B3A 100%);
}
</style>
