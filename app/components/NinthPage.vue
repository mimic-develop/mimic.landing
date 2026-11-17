<template>
  <div class="ninth-page-container">
    <div class="content-wrapper" ref="contentWrapper">
      <img src="~/assets/images/object-1.png" alt="Object 1" class="object-1-top-left" ref="object1TopLeft">
      <img src="~/assets/images/object-1.png" alt="Object 1" class="object-1-middle-left" ref="object1MiddleLeft">
      <img src="~/assets/images/object-1.png" alt="Object 1" class="object-1-bottom-right" ref="object1BottomRight">

      <img src="~/assets/images/contact-image.svg" alt="Contact Image" class="contact-image" ref="contactImage">
    </div>
    <a href="/probability" class="probability-link">확률형 아이템 정보</a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  isCurrentPage: Boolean,
});

const contentWrapper = ref<HTMLDivElement | null>(null);
const object1TopLeft = ref<HTMLImageElement | null>(null);
const object1MiddleLeft = ref<HTMLImageElement | null>(null);
const object1BottomRight = ref<HTMLImageElement | null>(null);
const contactImage = ref<HTMLImageElement | null>(null);

const tl = gsap.timeline({ paused: true });

const setupAnimation = () => {
  tl.clear();

  const animatedElements = [
    // object1TopLeft.value,
    // object1MiddleLeft.value,
    object1BottomRight.value,
    contactImage.value,
  ];

  // Initial states
  // gsap.set(contentWrapper.value, { y: 100, autoAlpha: 0 });
  gsap.set(animatedElements, { y: 50, autoAlpha: 0 });

  // Animation sequence
  tl.to(contentWrapper.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' })
    // .to(object1TopLeft.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "-=.5")
    // .to(object1MiddleLeft.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "-=.7")
    .to(object1BottomRight.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "-=.7")
    .to(contactImage.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "-=.5");
};

watch(() => props.isCurrentPage, (isCurrent) => {
  if (isCurrent) {
    tl.restart();
  } else {
    tl.pause(0);
  }
});

onMounted(() => {
  setupAnimation();
  if (props.isCurrentPage) {
    tl.play();
  }
});
</script>

<style scoped>
.ninth-page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: white;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.object-1-top-left {
  position: absolute;
  width: 634px;
  height: 634px;
  left: -100px;
  top: -190px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.object-1-middle-left {
  position: absolute;
  width: 246px;
  height: 246px;
  top: 220px;
  left: 10px;
  opacity: 0.8;
  rotate: 164.22deg;
}

.object-1-bottom-right {
  position: absolute;
  width: 369px;
  height: 369px;
  bottom: 100px;
  right: 80px;
  opacity: 0.8;
  rotate: 68.73deg;
}

.contact-image {
  width: 35rem;
}

.probability-link {
  position: absolute;
  bottom: 16px;
  /* 화면 높이가 100vh 라 휴대폰 주소창·툴바가 접히지 않음 → 그만큼 올려서 보이게. svh 미지원 브라우저는 위 16px 유지 */
  bottom: calc(16px + 100vh - 100svh + env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #8a8a8a;
  text-decoration: underline;
  white-space: nowrap;
  z-index: 1;
}

@media (max-width: 768px) {
  .contact-image {
    width: 80vw;
  }

  .object-1-top-left {
    position: absolute;
    width: 200px;
    height: 200px;
    left: -20px;
    top: -30px;
    opacity: 0.8;
    rotate: -136.97deg;
  }

  .object-1-middle-left {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 100px;
    left: 10px;
    opacity: 0.8;
    rotate: 164.22deg;
  }

  .object-1-bottom-right {
    position: absolute;
    width: 150px;
    height: 150px;
    bottom: 0;
    right: 5px;
    opacity: 0.8;
    rotate: 68.73deg;
  }
}
</style>
