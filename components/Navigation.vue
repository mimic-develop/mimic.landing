<script setup lang="ts">
defineProps<{
  length: number
  index: number
}>()
</script>

<template>
  <!-- Scroll Navigation Dots -->
  <div class="scroll-navigation-dots">
    <span v-for="i in length"
          :key="i"
          :class="['dot', i === index ? 'active' : '']"
    />
  </div>
</template>

<style scoped>
/* Scroll Navigation Dots */
.scroll-navigation-dots {
  position: absolute;
  right: calc(190 / 1920 * 100vw); /* 1728.21px from left, so (1920 - 1728.21) from right */
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 38px; /* 37.75px gap */
  z-index: 10;
}

.dot {
  width: 16px;
  height: 16px;
  background-color: #fff;
  opacity: 0.29;
  border-radius: 50%;
}

.dot.active {
  opacity: 1;
}

</style>
