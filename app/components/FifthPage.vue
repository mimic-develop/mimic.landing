<template>
  <div class="fifth-page-container" ref="fifthPage">
    <div class="fifth-page-wrapper">
      <div class="gms-text">GMS</div>
      <div class="game-management-system-text">GAME MANAGEMENT SYSTEM</div>
      <img
          :src="tableImageUrl"
          alt="Table Image Red"
          class="table-image-red"/>
      <div class="text-content" v-html="detailText">
      </div>
      <img :src="isMobile ? handBoxMobile : handBox" alt="Hand Box" class="hand-box-image" />
      <img :src="isMobile ? rankSystemMobile : rankSystem" alt="Rank System" class="rank-system-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import tableImageRed from '~/assets/images/table-image-red.svg';
import tableImageWhite from '~/assets/images/table-image-white.svg';

import handBox from '~/assets/images/hand-box.svg';
import handBoxMobile from '~/assets/images/hand-box-mobile.svg';
import rankSystem from '~/assets/images/rank-system.svg';
import rankSystemMobile from '~/assets/images/rank-system-mobile.svg';


const emits = defineEmits<{
  (e: 'update:isScrolling', isScrolling: boolean): void;
  (e: 'update:addWheelEvent', value: boolean): void;
}>()

gsap.registerPlugin(ScrollTrigger);

let timeline: gsap.core.Timeline | null = null;

const fifthPage = ref(null);
const isVisible = ref(false);
let observer: any = null;

// 터치 이벤트용 변수
let touchStartY = 0;
const TOUCH_THRESHOLD = 30;

const handleWheel = (event: WheelEvent) => {
  if (event.deltaY > 0) { // 아래로 스크롤
    if (timeline && timeline.paused()) { // 타임라인이 일시 정지 상태일 때만
      event.preventDefault();
      timeline.play();
    } else if (timeline && timeline.progress() === 1) { // hand-box-image가 나타난 상태에서 한 번 더 스크롤
      // 아무것도 하지 않아 app.vue의 스크롤 로직이 작동하도록 함
      emits('update:isScrolling', false);
    }
  } else if (event.deltaY < 0) { // 위로 스크롤
    emits('update:isScrolling', false);

    if (timeline && timeline.paused() && timeline.progress() > 0) { // 타임라인이 일시 정지 상태이고 시작 지점이 아닐 때만
      event.preventDefault();
      timeline.reverse();
    } else if (timeline && timeline.progress() === 0) { // 타임라인이 시작 지점일 때
      // 아무것도 하지 않아 app.vue의 스크롤 로직이 작동하도록 함
    }
  }
};

// 터치 이벤트 핸들러
const handleTouchStart = (event: TouchEvent) => {
  if (!event.touches || event.touches.length === 0) return;
  touchStartY = event.touches[0].clientY;
};

const handleTouchMove = (event: TouchEvent) => {
  if (!event.touches || event.touches.length === 0) return;

  const currentY = event.touches[0].clientY;
  const deltaY = touchStartY - currentY; // 양수: 아래로 스와이프, 음수: 위로 스와이프

  if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

  if (deltaY > 0) { // 아래로 스와이프 (스크롤 다운과 동일)
    if (timeline && timeline.paused()) { // 타임라인이 일시 정지 상태일 때만
      event.preventDefault();
      timeline.play();
    } else if (timeline && timeline.progress() === 1) { // hand-box-image가 나타난 상태에서 한 번 더 스와이프
      // 아무것도 하지 않아 app.vue의 스크롤 로직이 작동하도록 함
      emits('update:isScrolling', false);
    }
  } else if (deltaY < 0) { // 위로 스와이프 (스크롤 업과 동일)
    emits('update:isScrolling', false);

    if (timeline && timeline.paused() && timeline.progress() > 0) { // 타임라인이 일시 정지 상태이고 시작 지점이 아닐 때만
      event.preventDefault();
      timeline.reverse();
    } else if (timeline && timeline.progress() === 0) { // 타임라인이 시작 지점일 때
      // 아무것도 하지 않아 app.vue의 스크롤 로직이 작동하도록 함
    }
  }

  // 연속 트리거 방지
  touchStartY = currentY;
};

const tableImageUrl = ref(tableImageRed);

watch(isVisible, (newValue) => {
  if (newValue) {

    emits('update:addWheelEvent', true)
    emits('update:isScrolling', true)

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    tableImageUrl.value = tableImageRed

    if (timeline) {
      timeline.seek(0).pause(); // 타임라인 초기화 및 일시 정지
      timeline.play(); // 초기 애니메이션 시작
    }
  } else {
    emits('update:addWheelEvent', false)
    emits('update:isScrolling', false)

    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', handleTouchMove);
    if (timeline) {
      timeline.seek(0).pause(); // 페이지를 벗어나면 타임라인 초기화
    }
  }
});

const isMobile = ref(false);

const detailText = ref('미믹의 아레나 테이블은 실시간으로 유저 정보를 테이블에 띄우는 국내 최초의 몰입형 홀덤 시스템 입니다')

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;

  if (isMobile.value) {
    detailText.value = `미믹의 아레나 테이블은<br>실시간으로 유저 정보를 테이블에 띄우는<br>국내 최초의 몰입형 홀덤 시스템 입니다`
  }

  const tableImage = document.querySelector('.table-image-red') as HTMLImageElement;
  const handBoxImage = document.querySelector('.hand-box-image') as HTMLImageElement;
  const rankSystemImage = document.querySelector('.rank-system-image') as HTMLImageElement;

  timeline = gsap.timeline({ paused: true });

  const textElements = [
    document.querySelector('.text-content'),
    document.querySelector('.gms-text'),
    document.querySelector('.game-management-system-text'),
  ];

  // Determine animation values based on screen width
  let tableImageAnimProps = {};
  if (isMobile.value) {
    tableImageAnimProps = {
      marginLeft: '-120vw',
    };
  } else {
    tableImageAnimProps = {
      marginLeft: '-1400px',
      width: 1120,
      height: 444.42,
    };
  }

  // Stage 0: FifthPage가 나타날 때 텍스트와 테이블 이미지 나타나는 애니메이션
  timeline.fromTo(textElements, {
    opacity: 0,
    y: 60
  }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power1.out',
    stagger: 0.2
  });
  timeline.fromTo(tableImage, {
    opacity: 0,
    y: 60
  }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power1.out',
  });

  timeline.addPause(); // 초기 애니메이션 후 일시 정지

  // Stage 1: 텍스트 사라지는 애니메이션
  timeline.to(textElements, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: 'power1.out',
  });

  // Stage 2: 테이블 이미지 애니메이션
  timeline.to(tableImage, {
    duration: 2,
    ...tableImageAnimProps, // Apply dynamic properties
    ease: 'power2.inOut',
    onComplete: () => {
      if (tableImage) {
        tableImageUrl.value = tableImageWhite
      }
    },
    onReverseComplete: () => {
      if (tableImage) {
        tableImageUrl.value = tableImageRed
      }
    }
  }, '>-0.5'); // 텍스트 사라지는 애니메이션과 겹치도록 조정

  // Stage 3: hand-box-image 나타나는 애니메이션
  timeline.fromTo(handBoxImage, {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power1.out'
  }, '>-0.5'); // 테이블 이미지 애니메이션과 겹치도록 조정

  timeline.addPause(); // hand-box-image 나타난 후 일시 정지

  // Stage 4: hand-box-image 사라지고 rank-system-image 나타나는 애니메이션
  timeline.addLabel('stage4_start'); // 일시 정지 후 다음 단계 시작 라벨
  timeline.to(handBoxImage, {
    opacity: 0,
    y: -50,
    duration: 0.5,
    ease: 'power1.out'
  });

  timeline.fromTo(rankSystemImage, {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power1.out'
  }, '<'); // hand-box-image 사라지는 애니메이션과 동시에 시작

  const options = {
    threshold: 0.8, // 80% 이상 보일 때
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible.value = entry.isIntersecting;
    });
  }, options);

  if (fifthPage.value) {
    observer.observe(fifthPage.value);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.fifth-page-container {
  width: 1920px; /* Figma frame width */
  height: 1080px; /* Figma frame height */
  background-color: #000000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fifth-page-wrapper {
  width: 908px;
  height: 700px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.gms-text {
  width: 125px;
  font-family: "Figerona",serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 1.6em;
  letter-spacing: 0.04em; /* 4% */
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
}

.game-management-system-text {
  width: 353px;
  height: 29px;
  font-family: "Inter",serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2102272510528564em;
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
  margin-bottom: 45px;
}

.table-image-red {
  width: 908px;
  height: 360px;
  object-fit: contain;
  opacity: 0; /* 초기 투명도 설정 */
  transform: translateY(60px); /* GSAP 초기 상태 */
  margin-bottom: 45px;
}

.text-content {
  height: 22px;
  font-family: "Gmarket Sans TTF",serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 1.15em;
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
}

.hand-box-image {
  position: absolute;
  margin: 0 0 140px 200px;
  width: 1039px; /* 피그마에서 확인한 너비 */
  height: 275px; /* 피그마에서 확인한 높이 */
  opacity: 0; /* 초기 투명도 설정 */
}

.rank-system-image {
  position: absolute;
  margin: 380px 0 0 260px;
  width: 982px; /* 피그마에서 확인한 너비 */
  height: 259px; /* 피그마에서 확인한 높이 */
  opacity: 0; /* 초기 투명도 설정 */
}

@media (max-width: 768px) {
  .fifth-page-container {
    width: 100vw;
    height: 100%;
    padding: 20px;
  }

  .gms-text {
    font-size: clamp(1rem, 9vw, 5rem); /* 최소 20px, 최대 40px */
    text-align: center;
  }

  .game-management-system-text {
    font-size: clamp(1rem, 4vw, 2.4rem); /* 최소 20px, 최대 40px */
    text-align: center;
    margin-bottom: clamp(1vw, 2vw, 3rem);
  }

  .table-image-red {
    width: 90vw;
    height: auto;
    margin-bottom: clamp(1rem, 3vw, 3rem);
  }

  .text-content {
    font-size: clamp(1rem, 3vw, 2rem);
    line-height: 4vw;
    padding: 0 3vw;
  }

  .hand-box-image {
    position: absolute;
    margin-bottom: 36vw;
    margin-left: clamp(1rem, 9.2vw, 89vw);
    width: 86vw;
    height: auto;
  }

  .rank-system-image {
    position: absolute;
    margin-top: 62vw;
    margin-left: clamp(1rem, 14vw, 89vw);
    width: 82vw;
    height: auto;
  }
}
</style>
