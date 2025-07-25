<template>
  <!-- Main Content Section -->
  <main class="main-content">
    <div class="main-text">
      <img
          src="~/assets/images/third_text.png"
          alt="Third Text"
          class="third-text"
      />
      <p class="my-text">MY</p>
      <p class="place-text">PLACE</p>
      <p class="mimic-main-text">MIMIC</p>
    </div>

    <!-- Background elements or main container -->
    <div class="background-elements">
      <!-- Rectangle 1 -->
      <img
          src="~/assets/images/object-1.png"
          alt="Decorative Rectangle 1"
          class="rectangle rectangle-1"
      />
      <!-- Rectangle 2 -->
      <img
          src="~/assets/images/object-1.png"
          alt="Decorative Rectangle 2"
          class="rectangle rectangle-2"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const mainContent = ref(null);

onMounted(() => {
  const tl = gsap.timeline();

  // Initial states
  gsap.set('.main-content > div', { autoAlpha: 0, y: 30 });

  // Animation sequence
  tl.to('.background-elements', { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5")
  .to('.main-text', { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=0.5");
});
</script>

<style scoped>

/* Background Elements (Rectangles) */
.background-elements {
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangle {
  position: absolute;
  object-fit: cover;
  opacity: 0.8;
}

.rectangle-1 {
  width: 120px;
  top: 440px; /* 439.4px */
  right: 120px; /* 545.27px */
  transform: rotate(20deg); /* Static rotation as per user feedback */
}

.rectangle-2 {
  width: 350px; /* 492.08px */
  top: 57px; /* 211.57px (main group y) + 0px (rectangle y relative to main) */
  left: 64px; /* 526.29px (main group x) + 0px (rectangle x relative to main) */
  transform: rotate(-135deg); /* Static rotation as per user feedback */
}

/* Main Content */
.main-content {
  position: relative;
  display: flex;
  width: 800px;
  height: 600px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 5;
  font-size: 82px;
  margin: 0 auto; /* 수평 중앙 정렬 */
}

.main-text {
  position: relative;
  width: 100%;
  height: 100%;
}

.third-text {
  position: absolute;
  width: 261px;
  top: 202px;
  left: 332px;
  color: #BA0C19;
}

.my-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.03em;
  top: 99px;
  left: 300px;
}

.place-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.04em;
  top: 304px;
  left: 229px;
}

.mimic-main-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.12em;
  top: 408px;
  left: 368px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.45); /* Adjust scale for better fit */
    margin: 0; /* Reset margin */
    padding-top: 10vh; /* Add padding to account for fixed header */
  }

  .scroll-navigation-dots {
    display: none;
  }
}
</style>
