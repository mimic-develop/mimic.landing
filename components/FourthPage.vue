<template>
  <div class="fourth-page" ref="fourthPage">
    <img src="/images/object-1.png" alt="object-1" class="object-1-large" :class="{ 'visible': isVisible }" />
    <img src="/images/object-1.png" alt="object-1" class="object-1-small" :class="{ 'visible': isVisible }" />

    <div class="stats-container">
      <div class="total-game-group group" :class="{ 'visible': isVisible }">
        <img src="/images/red-dot-icon.svg" alt="red-dot-icon" class="red-dot-icon" />
        <span class="count-number">{{ animatedTotalGameCount }}</span>
        <h3 class="group-title">TOTAL GAME</h3>
      </div>

      <div class="user-group group" :class="{ 'visible': isVisible }">
        <img src="/images/red-dot-icon.svg" alt="red-dot-icon" class="red-dot-icon" />
        <span class="count-number">{{ animatedUserCount }}</span>
        <h3 class="group-title">USER</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

const fourthPage = ref(null);
const isVisible = ref(false);
let observer = null;

const totalGameCount = ref(0);
const userCount = ref(0);
const animatedTotalGameCount = ref('0');
const animatedUserCount = ref('0');

// 기준 날짜 및 일일 증가량
const startDate = new Date('2025-07-20T00:00:00');
const initialTotalGame = 100000; // 2025년 7월 20일 기준 초기값
const initialUser = 20000; // 2025년 7월 20일 기준 초기값
const dailyGameIncrease = 43;
const dailyUserIncrease = 17;

let targetTotalGameCount = 0;
let targetUserCount = 0;

onMounted(() => {
  const options = {
    threshold: 0.5, // 50% 이상 보일 때
  };

  // 현재 날짜와 기준 날짜 사이의 일수 계산
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 목표 값 계산
  targetTotalGameCount = initialTotalGame + (diffDays * dailyGameIncrease);
  targetUserCount = initialUser + (diffDays * dailyUserIncrease);

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        startCountAnimation();
      } else {
        isVisible.value = false;
        // Reset counts when not visible
        totalGameCount.value = 0;
        userCount.value = 0;
        animatedTotalGameCount.value = '0';
        animatedUserCount.value = '0';
      }
    });
  }, options);

  observer.observe(fourthPage.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
});

const startCountAnimation = () => {
  // 목표 값의 80%부터 시작하도록 조정
  totalGameCount.value = targetTotalGameCount * 0.8
  userCount.value = targetUserCount * 0.8

  gsap.to(totalGameCount, { duration: 1.2, value: targetTotalGameCount, ease: "power2.out", onUpdate: () => {
    animatedTotalGameCount.value = `${Math.floor(totalGameCount.value).toLocaleString()} +`
  }})
  gsap.to(userCount, { duration: 1.2, value: targetUserCount, ease: "power2.out", onUpdate: () => {
    animatedUserCount.value = `${Math.floor(userCount.value).toLocaleString()} +`
  }})
}

</script>

<style scoped>
.fourth-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  color: #fff;
  overflow: hidden;
}

.object-1-large,
.object-1-small {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.object-1-large {
  width: 573px;
  height: 573px;
  bottom: -100px;
  right: -190px;
}


.object-1-small {
  width: 260px;
  height: 260px;
  top: 38px;
  left: 96px;
}

.object-1-large.visible {
  opacity: 0.8;
  transform: rotate(-136.97deg);
}

.object-1-small.visible {
  opacity: 0.8;
  transform: rotate(170deg);
}

.stats-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 100px; /* 그룹 간 간격 */
  z-index: 1;
}

.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.group.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 2s ease-out, transform 2s ease-out;
}

.red-dot-icon {
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
}

.count-number {
  font-family: "Figerona", sans-serif;
  font-weight: 400;
  font-size: 58px;
  line-height: 1.6em;
  letter-spacing: 0.03em;
  text-align: center;
  margin-bottom: 20px;
  font-variant-numeric: tabular-nums; /* 숫자 너비 고정 */
  min-width: 258px; /* '100,000 +'에 맞춰 충분한 너비 설정 */
}

.group-title {
  font-family: "Figerona", sans-serif;
  font-weight: 300;
  font-size: 28px;
  line-height: 1.6em;
  letter-spacing: 0.02em;
  text-align: center;
}
</style>
