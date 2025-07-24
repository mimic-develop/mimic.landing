<template>
  <div class="ninth-page-container">
    <div class="content-wrapper" ref="contentWrapper">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-top-left" ref="object1TopLeft">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-middle-left" ref="object1MiddleLeft">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-bottom-right" ref="object1BottomRight">

      <img src="/images/contact-image.svg" alt="Contact Image" class="contact-image" ref="contactImage">
    </div>
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
</style>
