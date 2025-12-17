<template>
  <div class="eighth-page-container">
    <div class="content-wrapper" ref="contentWrapper">
      <img src="~/assets/images/object-1.png" alt="Object 1" class="object-1-left" ref="object1Left">
      <img src="~/assets/images/object-1.png" alt="Object 1" class="object-1-right">

      <div class="location-wrapper">
        <p class="location-text" ref="locationText">LOCATION</p>

        <div class="map-wrapper">
          <img src="~/assets/images/branch-image.svg" alt="Branch Image" class="branch-image" ref="branchImage">
          <img src="~/assets/images/map-image.svg" alt="Map Image" class="map-image" ref="mapImage">
        </div>
      </div>
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
    .to([locationText.value, mapImage.value], { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, ">")
    .to([branchImage.value], { y: 0, autoAlpha: 1, duration: 2, ease: 'power2.out' }, ">");
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.object-1-left {
  position: absolute;
  width: 634px;
  height: 634px;
  bottom: -440px;
  left: -100px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.object-1-right {
  position: absolute;
  width: 500px;
  height: 500px;
  top: -390px;
  right: 30px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.location-wrapper {
  width: 1920px;
  height: 100%;
  padding: 0 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-wrapper {
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.branch-image {
  width: 631px;
  height: 404px;
  margin-left: 235px;
  margin-bottom: 140px;
}

.map-image {
  position: absolute;
  width: 579px;
  height: 794px;
}

.location-text {
  width: 280px;
  height: 40px;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  font-size: 60px;
  line-height: 0.67em;
  letter-spacing: 0.03em;
  text-align: center;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    width: 100%;
    padding: 20px;
  }

  .object-1-left {
    width: 200px;
    height: 200px;
    bottom: auto;
    left: 0;
    top: 50px;
    rotate: 0deg;
  }

  .object-1-right {
    width: 150px;
    height: 150px;
    top: auto;
    right: 0;
    bottom: 50px;
    rotate: 0deg;
  }

  .location-wrapper {
    flex-direction: column;
    padding: 0;
    width: 100%;
    height: auto;
  }

  .location-text {
    font-size: 40px;
    margin-bottom: 150px;
  }

  .map-wrapper {
    width: 344px;
    flex-direction: column;
  }

  .branch-image {
    width: calc(344px*0.8);
    height: auto;
    margin: 0 0 -250px 60px;
  }

  .map-image {
    width: calc(344px*0.90);
    height: auto;
    position: relative;
  }
}
</style>
