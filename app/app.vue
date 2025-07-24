<template>
  <div class="mimic-landing-page" @wheel.prevent="handleWheel">
    <Navigation :length="9" :index="currentPage" />
    <div class="sections-container" ref="sectionsContainer" @scrollend="handleScrollEnd">
      <section class="section" ref="section1">
        <MainPage />
      </section>
      <section class="section" ref="section2">
        <SecondPage />
      </section>
      <section class="section" ref="section3">
        <ThirdPage />
      </section>
      <section class="section" ref="section4">
        <FourthPage />
      </section>
      <section class="section" ref="section5">
        <FifthPage @update:is-scrolling="changeScrolling"/>
      </section>
      <section class="section" ref="section6">
        <SixthPage :is-current-page="currentPage === 6" />
      </section>
      <section class="section" ref="section7">
        <SeventhPage :is-current-page="currentPage === 7" />
      </section>
      <section class="section" ref="section8">
        <EighthPage :is-current-page="currentPage === 8" />
      </section>
      <section class="section" ref="section9">
        <NinthPage :is-current-page="currentPage === 9" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import MainPage from '~~/components/MainPage.vue';
import SecondPage from '~~/components/SecondPage.vue';
import ThirdPage from '~~/components/ThirdPage.vue';
import FourthPage from '~~/components/FourthPage.vue';
import FifthPage from '~~/components/FifthPage.vue';
import SixthPage from "~~/components/SixthPage.vue";
import SeventhPage from "~~/components/SeventhPage.vue";
import EighthPage from "~~/components/EighthPage.vue";
import NinthPage from "~~/components/NinthPage.vue";
import Navigation from "~~/components/Navigation.vue";


const currentPage = ref(1);
const sectionsContainer = ref(null);
const section1 = ref(null);
const section2 = ref(null);
const section3 = ref(null);
const section4 = ref(null);
const section5 = ref(null);
const section6 = ref(null);
const section7 = ref(null);
const section8 = ref(null);
const section9 = ref(null);
const isScrolling = ref(false);
const stopScroll = ref(false);
let observer = null;

const changeScrolling = (value: boolean) => {
  stopScroll.value = value
}

onMounted(() => {
  const options = {
    root: sectionsContainer.value,
    rootMargin: '0px',
    threshold: 0.8, // 80% 이상 보일 때
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === section1.value) {
          currentPage.value = 1;
        } else if (entry.target === section2.value) {
          currentPage.value = 2;
        } else if (entry.target === section3.value) {
          currentPage.value = 3;
        } else if (entry.target === section4.value) {
          currentPage.value = 4;
        } else if (entry.target === section5.value) {
          currentPage.value = 5;
          stopScroll.value = true
        } else if (entry.target === section6.value) {
          currentPage.value = 6;
        } else if (entry.target === section7.value) {
          currentPage.value = 7;
        } else if (entry.target === section8.value) {
          currentPage.value = 8;
        } else if (entry.target === section9.value) {
          currentPage.value = 9;
        }
      }
    });
  }, options);

  observer.observe(section1.value);
  observer.observe(section2.value);
  observer.observe(section3.value);
  observer.observe(section4.value);
  observer.observe(section5.value);
  observer.observe(section6.value);
  observer.observe(section7.value);
  observer.observe(section8.value);
  observer.observe(section9.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});

const handleWheel = (event) => {
  if (stopScroll.value || isScrolling.value) return;

  console.log(stopScroll.value, isScrolling.value)

  const direction = event.deltaY > 0 ? 'down' : 'up';

  if (direction === 'down') {
    if (currentPage.value < 9) {
      scrollToPage(currentPage.value + 1);
    }
  } else {
    if (currentPage.value > 1) {
      scrollToPage(currentPage.value - 1);
    }
  }
};

const scrollToPage = (pageNumber) => {
  isScrolling.value = true;
  let targetSection = null;
  if (pageNumber === 1) {
    targetSection = section1.value;
  }
  else if (pageNumber === 2) {
    targetSection = section2.value;
  }
  else if (pageNumber === 3) {
    targetSection = section3.value;
  }
  else if (pageNumber === 4) {
    targetSection = section4.value;
  }
  else if (pageNumber === 5) {
    targetSection = section5.value;
  }
  else if (pageNumber === 6) {
    targetSection = section6.value;
  }
   else if (pageNumber === 7) {
    targetSection = section7.value;
  }
  else if (pageNumber === 8) {
    targetSection = section8.value;
  }
  else if (pageNumber === 9) {
    targetSection = section9.value;
  }

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleScrollEnd = () => {
  isScrolling.value = false;
};
</script>

<style>
@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('/fonts/GmarketSansTTFLight.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('/fonts/GmarketSansTTFMedium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('/fonts/GmarketSansTTFBold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Figerona';
  src: url('/fonts/Figerona-Regular.ttf') format('truetype'); /* 폰트 파일명 확인 필요 */
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.ttf') format('truetype'); /* 폰트 파일명 확인 필요 */
  font-weight: 400;
  font-style: normal;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mimic-landing-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  color: #fff;
}

.sections-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.sections-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.section {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
