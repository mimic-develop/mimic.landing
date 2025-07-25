<template>
  <div class="second-page" ref="secondPage">
    <div class="wrapper">
      <div class="content">
        <h2 class="title">All in Fun</h2>
        <p class="detail">
          다양한 재미가 자연스럽게 공존하는 곳, 미믹입니다<br />
          그렇게 만들어진 공간은 미믹에 어울리는 사람들을 끌어당깁니다<br />
          미믹은 언제 찾아와도 편안하고, 다시 오고 싶은 당신의 제 3의 공간이 됩니다
        </p>
      </div>
      <div class="images-container">
        <img alt="object-2" class="rectangle-3" :class="{ 'visible': isVisible }" src="~/assets/images/object-2.png" />
        <img alt="object-2" class="rectangle-4" :class="{ 'visible': isVisible }" src="~/assets/images/object-2.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const secondPage = ref(null);
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

  observer.observe(secondPage.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.second-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  color: #fff;
  padding: 0 10%; /* 좌우 여백 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center; /* 양쪽 정렬 */
}

.content {
  text-align: left;
}

.wrapper {
  position: relative;
  width: 1920px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-family: "Courage", sans-serif;
  font-size: 70px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.05em;
  margin-bottom: 76px;
}

.detail {
  font-family: "Gmarket Sans TTF", sans-serif;
  font-size: 19px;
  font-weight: 300;
  line-height: 2.1;
  letter-spacing: 0.03em;
}

.images-container {
  position: relative;
  width: 50%;
  height: 100%;
}

.rectangle-3,
.rectangle-4 {
  position: absolute;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.rectangle-3 {
  width: 512px;
  height: 512px;
  top: 115px;
  left: calc(50% + 200px); /* Figma x: 1494.31 -> 1920/2 + 200 (임의 조정) */
  transform: translateY(50px) rotate(-15deg);
}

.rectangle-4 {
  width: 266px;
  height: 266px;
  top: 555px;
  left: calc(50% + 2vw); /* Figma x: 1291.34 -> 1920/2 - 100 (임의 조정) */
  transform: translateY(50px) rotate(53.3deg);
}

.rectangle-3.visible {
  opacity: 0.8;
  transform: translateY(0) rotate(-15deg);
  animation: float-3 6s ease-in-out infinite;
}

.rectangle-4.visible {
  opacity: 0.8;
  transform: translateY(0) rotate(53.3deg);
  transition-delay: 0.5s; /* 0.5초 지연 */
  animation: float-4 8s ease-in-out infinite 0.5s;
}

@keyframes float-3 {
  0% {
    transform: translateY(0px) rotate(-15deg);
  }
  50% {
    transform: translateY(-20px) rotate(-15deg);
  }
  100% {
    transform: translateY(0px) rotate(-15deg);
  }
}

@keyframes float-4 {
  0% {
    transform: translateY(0px) rotate(53.3deg);
  }
  50% {
    transform: translateY(-20px) rotate(53.3deg);
  }
  100% {
    transform: translateY(0px) rotate(53.3deg);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: calc(100vw / 9);
  }

  .detail {
    font-size: calc(100vw / 25);
  }

  .rectangle-4 {
    width: 200px;
    height: 200px;
    top: 500px;
    left: 0 /* Figma x: 1494.31 -> 1920/2 + 200 (임의 조정) */
  }

  .rectangle-3 {
    width: 300px;
    height: 300px;
    top: 200px;
    left: -40px /* Figma x: 1494.31 -> 1920/2 + 200 (임의 조정) */
  }
}
</style>
