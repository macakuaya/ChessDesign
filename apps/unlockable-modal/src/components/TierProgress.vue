<script setup>
import { ref } from 'vue'
import { CcIcon } from '@chesscom/design-system'

const props = defineProps({
  tiers: { type: Array, required: true },
  currentTierIndex: { type: Number, required: true },
})

const emit = defineEmits(['select-tier'])
const hoveredIndex = ref(null)
</script>

<template>
  <div class="tier-progress">
    <div class="tier-track">
      <div
        v-for="(tier, i) in tiers"
        :key="tier.id"
        class="tier-node"
        :class="{
          'tier-node--completed': i < currentTierIndex,
          'tier-node--current': i === currentTierIndex,
          'tier-node--locked': i > currentTierIndex,
        }"
        @mouseenter="hoveredIndex = i"
        @mouseleave="hoveredIndex = null"
        @click="emit('select-tier', i)"
      >
        <div class="tier-dot" :class="{ 'tier-dot--hovered': hoveredIndex === i }">
          <cc-icon
            v-if="i < currentTierIndex"
            name="mark-check"
            :size="12"
          />
          <cc-icon
            v-else-if="i === currentTierIndex"
            name="element-fire"
            :size="12"
          />
          <cc-icon
            v-else
            name="tool-lock-closed"
            :size="12"
          />
        </div>
        <div v-if="i < tiers.length - 1" class="tier-connector" :class="{ 'tier-connector--filled': i < currentTierIndex }" />
      </div>
    </div>

    <!-- Tooltip for hovered tier -->
    <div class="tier-info">
      <template v-if="hoveredIndex !== null">
        <span class="tier-info-name cc-text-x-small-bold">{{ tiers[hoveredIndex].rewardName }}</span>
      </template>
      <template v-else>
        <span class="tier-info-count cc-text-x-small-bold">{{ currentTierIndex + 1 }}/{{ tiers.length }} Unlocked</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tier-progress {
  display: flex;
  flex-direction: column;
  gap: var(--space-8, 8px);
  padding: 0 var(--space-8, 8px);
}

.tier-track {
  display: flex;
  align-items: center;
}

.tier-node {
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
}

.tier-node:last-child {
  flex: 0;
}

.tier-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.tier-dot--hovered {
  transform: scale(1.15);
}

.tier-node--completed .tier-dot {
  background: var(--color-green-300, #81B64C);
  color: white;
}

.tier-node--current .tier-dot {
  background: var(--color-gold-300, #E8A43A);
  color: white;
  box-shadow: 0 0 0 3px rgba(232, 164, 58, 0.25);
}

.tier-node--locked .tier-dot {
  background: var(--color-transparent-white-10, rgba(255, 255, 255, 0.1));
  color: var(--color-icon-subtle, rgba(255, 255, 255, 0.3));
}

.tier-connector {
  flex: 1;
  height: 2px;
  background: var(--color-transparent-white-10, rgba(255, 255, 255, 0.1));
  transition: background 0.2s ease;
}

.tier-connector--filled {
  background: var(--color-green-300, #81B64C);
}

.tier-info {
  text-align: center;
  min-height: 16px;
}

.tier-info-count {
  color: var(--color-text-subtle, rgba(255, 255, 255, 0.5));
}

.tier-info-name {
  color: var(--color-text-default, rgba(255, 255, 255, 0.72));
}
</style>
