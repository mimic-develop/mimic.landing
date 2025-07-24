<template>
  <div class="eighth-page-container">
    <div class="content-wrapper" ref="contentWrapper">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-left" ref="object1Left">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-right">

      <img src="/images/branch-image.svg" alt="Branch Image" class="branch-image" ref="branchImage">
      <img src="/images/map-image.svg" alt="Map Image" class="map-image" ref="mapImage">

      <p class="location-text" ref="locationText">LOCATION</p>
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
const object1Left = ref<HTMLImageElement | null>(null);
const branchImage = ref<HTMLImageElement | null>(null);
const mapImage = ref<HTMLImageElement | null>(null);
const locationText = ref<HTMLParagraphElement | null>(null);

const tl = gsap.timeline({ paused: true });

const setupAnimation = () => {
  tl.clear();

  const animatedElements = [
    object1Left.value,
    branchImage.value,
    mapImage.value,
    locationText.value,
  ];

  // Initial states
  gsap.set(animatedElements, { y: 50, autoAlpha: 0 });

  // Animation sequence
  tl
    .to(object1Left.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, "-=.5")
    .to([locationText.value, mapImage.value], { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, ">")
    .to([branchImage.value], { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, ">");
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
.eighth-page-container {
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
  height: 1080px;
  transform: scale(0.8);
}

.object-1-left {
  position: absolute;
  width: 897px;
  height: 897px;
  bottom: -860px;
  left: -400px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.object-1-right {
  position: absolute;
  width: 500px;
  height: 500px;
  top: -600px;
  right: -130px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.branch-image {
  position: absolute;
  width: 630.69px;
  height: 297.77px;
  top: 267.73px;
  left: 1038.22px;
}

.map-image {
  position: absolute;
  width: 579.22px;
  height: 794.03px;
  top: 142.57px;
  left: 946.29px;
}

.location-text {
  position: absolute;
  width: 280px;
  height: 40px;
  top: 536px;
  left: 174px;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  font-size: 60px;
  line-height: 0.67em;
  letter-spacing: 0.03em;
  text-align: center;
}

.branch-name-text {
  position: absolute;
  width: 105px;
  height: 40px;
  top: 293px;
  left: 1566px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 2em;
  letter-spacing: 0.03em;
  text-align: center;
}
</style>
