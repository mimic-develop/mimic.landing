<template>
  <!-- Header Section (Fixed) -->
  <header class="header">
    <h1 class="logo">MIMIC</h1>
    <div class="header-actions">
      <img
          src="~/assets/images/instagram_button.svg"
          alt="Instagram"
          class="instagram-button"
          @click="goToInstagram"
      />
      <div class="app-download-button" @click="handleAppDownload">
        <span>APP DOWNLOAD</span>
      </div>
    </div>
  </header>

  <div class="mimic-landing-page">
    <!-- QR Code Popup -->
    <div v-if="showQrPopup" class="qr-popup-overlay" @click.self="closeQrPopup">
      <div class="qr-popup-content">
        <img src="~/assets/images/qr_img.png" alt="QR Code" class="qr-image" />
      </div>
    </div>
    <Navigation :length="9" :index="currentPage" />
    <div class="sections-container" ref="sectionsContainer">
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
        <FifthPage @update:is-scrolling="changeScrolling" @update:add-wheel-event="handelWheelEvent"/>
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
import MainPage from '~/components/MainPage.vue';
import SecondPage from '~/components/SecondPage.vue';
import ThirdPage from '~/components/ThirdPage.vue';
import FourthPage from '~/components/FourthPage.vue';
import FifthPage from '~/components/FifthPage.vue';
import SixthPage from "~/components/SixthPage.vue";
import SeventhPage from "~/components/SeventhPage.vue";
import EighthPage from "~/components/EighthPage.vue";
import NinthPage from "~/components/NinthPage.vue";
import Navigation from "~/components/Navigation.vue";


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
const showQrPopup = ref(false); // New ref for QR popup visibility
let observer: IntersectionObserver | null = null;
let scrollEndTimer: number | null = null;
let wheelTimeout: number | null = null;
let touchTimeout: number | null = null;
const WHEEL_DELAY = 100; // 100ms 딜레이
const TOUCH_DELAY = 100; // 100ms 딜레이 (wheel과 동일)
const MIN_DELTA = 10; // 최소 스크롤 임계값

// iOS 제스처용
let touchStartY = 0;
const TOUCH_THRESHOLD = 30;

const changeScrolling = (value: boolean) => {
  stopScroll.value = value
}

onMounted(() => {
  // Header animation
  gsap.fromTo('.header',
      { autoAlpha: 0, y: -50 },
      { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }
  );

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

  handelWheelEvent(false)
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (sectionsContainer.value) {
    handelWheelEvent(true)
  }
  if (scrollEndTimer) {
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = null;
  }
  if (wheelTimeout) {
    clearTimeout(wheelTimeout);
    wheelTimeout = null;
  }
  if (touchTimeout) {
    clearTimeout(touchTimeout);
    touchTimeout = null;
  }
});

const handelWheelEvent = (value: boolean) => {
  if (value) {
    // sectionsContainer.value.removeEventListener('wheel', handleWheel as EventListener);
    // sectionsContainer.value.removeEventListener('scroll', onScroll);
    // sectionsContainer.value.removeEventListener('touchstart', onTouchStart);
    // sectionsContainer.value.removeEventListener('touchmove', onTouchMove);
  } else {
    sectionsContainer.value.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    sectionsContainer.value.addEventListener('scroll', onScroll, { passive: true });

    // iOS Safari 제스처
    sectionsContainer.value.addEventListener('touchstart', onTouchStart, { passive: true });
    sectionsContainer.value.addEventListener('touchmove', onTouchMove, { passive: false });
  }
}

const handleWheel = (event) => {
  if (stopScroll.value || isScrolling.value) {
    event.preventDefault()

    return
  }

  // 최소 스크롤 임계값 확인
  if (Math.abs(event.deltaY) < MIN_DELTA) return;

  // 이전 타이머 취소
  if (wheelTimeout) {
    clearTimeout(wheelTimeout);
  }

  // 새 타이머 설정 (디바운싱)
  wheelTimeout = setTimeout(() => {
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
  }, WHEEL_DELAY);
};

const scrollToPage = (pageNumber) => {
  if (stopScroll.value || isScrolling.value) return;
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

    targetSection.addEventListener(
        'transitionend', // 또는 'scrollend' 지원 브라우저면 scrollend
        () => { isScrolling.value = false; },
        { once: true }
    );

    targetSection.addEventListener(
        'scrollend', // 또는 'scrollend' 지원 브라우저면 scrollend
        () => { isScrolling.value = false; },
        { once: true }
    );
  }
};

// iOS Safari 제스처 대응
const onTouchStart = (e: TouchEvent) => {
  if (!e.touches || e.touches.length === 0) return;
  touchStartY = e.touches[0].clientY;
};

const onTouchMove = (e: TouchEvent) => {
  if (stopScroll.value || isScrolling.value) {
    e.preventDefault()
    return
  }

  const currentY = e.touches[0].clientY;
  const deltaY = touchStartY - currentY; // 양수: 아래로 스와이프(다음 섹션)

  if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

  // 기본 스크롤 방지
  if (e.cancelable) e.preventDefault();

  // 이전 타이머 취소
  if (touchTimeout) {
    clearTimeout(touchTimeout);
  }

  // 새 타이머 설정 (디바운싱)
  touchTimeout = setTimeout(() => {
    if (deltaY > 0 && currentPage.value < 9) {
      scrollToPage(currentPage.value + 1);
    } else if (deltaY < 0 && currentPage.value > 1) {
      scrollToPage(currentPage.value - 1);
    }
  }, TOUCH_DELAY);
};

const onScroll = () => {
  // 스크롤 종료 판단 (scrollend 대체)
  if (scrollEndTimer) window.clearTimeout(scrollEndTimer);
  scrollEndTimer = window.setTimeout(() => {
    isScrolling.value = false;
  }, 200); // 120ms에서 200ms로 증가
};

const goToInstagram = () => {
  window.open('https://www.instagram.com/mimics_official/', '_blank');
};

const handleAppDownload = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const androidLink = 'https://play.google.com/store/apps/details?id=com.mimic.mimicapp';
  const iosLink = 'https://apps.apple.com/kr/app/%EB%AF%B8%EB%AF%B9/id6739243256';

  // Check if it's a mobile device
  const isMobile = /android|ipad|iphone|ipod/i.test(userAgent);

  if (isMobile) {
    if (/android/i.test(userAgent)) {
      window.open(androidLink, '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.open(iosLink, '_blank');
    }
  } else {
    // Desktop: Show QR code popup
    showQrPopup.value = true;
  }
};

const closeQrPopup = () => {
  showQrPopup.value = false;
};
</script>

<style>
@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('~/assets/fonts/GmarketSansTTFLight.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('~/assets/fonts/GmarketSansTTFMedium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('~/assets/fonts/GmarketSansTTFBold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Figerona';
  src: url('~/assets/fonts/Figerona-VF.ttf') format('truetype'); /* 폰트 파일명 확인 필요 */
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Figerona';
  src: url('~/assets/fonts/Figerona-Light.otf') format('truetype'); /* 폰트 파일명 확인 필요 */
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('~/assets/fonts/Inter_24pt-Regular.ttf') format('truetype'); /* 폰트 파일명 확인 필요 */
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Courage';
  src: url('~/assets/fonts/Courage-Regular.otf') format('truetype'); /* 폰트 파일명 확인 필요 */
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
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  scroll-snap-stop: always;
  touch-action: none;
}

.sections-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.section {
  position: relative; /* Add this line */
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Header Styles (Moved from MainPage.vue) */
.header {
  position: fixed;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  max-width: 1536px; /* 1920px * 0.8 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.logo {
  font-family: 'Courage', sans-serif;
  font-weight: normal;
  font-size: 42px;
  font-style: italic;
  color: #fff;
  letter-spacing: 0.06em;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 29px;
}

.instagram-button {
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: transform 0.3s ease; /* Add transition for smooth animation */
}

.instagram-button:hover {
  transform: scale(1.1); /* Scale up on hover */
}

.app-download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #000;
  padding: 11px 18px 8px 18px;
  border-radius: 9999px;
  cursor: pointer;
  font-family: 'Figerona', sans-serif;
  font-weight: 500;
  font-size: 19px;
  letter-spacing: 0.03em;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Add transition */
}

.app-download-button:hover {
  background-color: #e0e0e0; /* Slightly darker white on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

/* QR Code Popup Styles */
.qr-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.qr-popup-content {
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 500px; /* Max width for desktop */
  width: 90%; /* Responsive width */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.qr-image {
  width: 100%;
  height: auto;
  display: block;
}

.qr-popup-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff; /* Changed to white */
}

@media (max-width: 768px) {
  html {
    font-size: 62.5%; /* 1rem = 10px */
  }

  .header {
    top: 3vh;
    width: 90vw;
    left: 50%;
    transform: translateX(-50%) scale(0.9); /* Scale down for mobile */
  }

  .logo {
    font-size: 6vw;
  }

  .header-actions {
    gap: 4vw;
  }

  .instagram-button {
    width: 6vw;
    height: 6vw;
  }

  .app-download-button {
    font-size: 3vw;
    padding: 1.8vw 3vw 1.2vw 3vw;
  }


  .qr-popup-content {
    width: 100%; /* Full width on mobile */
    max-width: none;
    border-radius: 0;
    padding: 0;
    background-color: transparent; /* Remove white background on mobile */
  }

  .qr-popup-close {
    color: #fff;
    z-index: 101;
  }
}
</style>
