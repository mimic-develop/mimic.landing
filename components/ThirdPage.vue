<template>
  <div class="third-page" ref="thirdPage">
    <div class="group-container">
      <div class="group" :class="{ 'visible': isVisible }" style="transition-delay: 0s;">
        <img src="/images/red-dot-icon.svg" alt="Icon" class="group-icon" />
        <h3 class="group-title">FLOW</h3>
        <p class="group-detail">“집중을 이끄는 순간”</p>
      </div>
      <div class="group" :class="{ 'visible': isVisible }" style="transition-delay: 0.65s;">
        <img src="/images/red-dot-icon.svg" alt="Icon" class="group-icon" />
        <h3 class="group-title">IMMERSION</h3>
        <p class="group-detail">“기억 깊이 남는 순간”</p>
      </div>
      <div class="group" :class="{ 'visible': isVisible }" style="transition-delay: 1.3s;">
        <img src="/images/red-dot-icon.svg" alt="Icon" class="group-icon" />
        <h3 class="group-title">TRIGGER</h3>
        <p class="group-detail">“마음을 움직이는 순간”</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const thirdPage = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  const options = {
    threshold: 0.5, // 50% 이상 보일 때
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    });
  }, options);

  observer.observe(thirdPage.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.third-page {
  width: 100%;
  height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.group-container {
  display: flex;
  gap: 274px; /* 그룹 간 간격 */
}

.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 2s ease-out, transform 2s ease-out;
}

.group.visible {
  opacity: 1;
  transform: translateY(0);
}

.group-icon {
  width: 107.04px;
  height: 107.04px;
  /* margin-bottom: 33.37px; */ /* Removed */
}

.group-title {
  font-family: "Gmarket Sans TTF", sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 2.09em;
  letter-spacing: 0.03em;
  text-align: center;
  margin-top: -73.67px; /* Added for overlap */
  margin-bottom: 44px;
}

.group-detail {
  font-family: "Gmarket Sans TTF", sans-serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 2.09em;
  letter-spacing: 0.03em;
  text-align: center;
}
</style>
