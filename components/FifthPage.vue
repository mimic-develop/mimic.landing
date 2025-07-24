<template>
  <div class="fifth-page-container" ref="fifthPage">
    <div class="text-content">
      미믹의 아레나 테이블은 실시간으로 유저 정보를 테이블에 띄우는 국내 최초의 몰입형 홀덤 시스템 입니다
    </div>
    <img
        src="/images/table-image-red.svg"
        alt="Table Image Red"
        class="table-image-red"/>
    <div class="gms-text">GMS</div>
    <div class="game-management-system-text">GAME MANAGEMENT SYSTEM</div>
    <img src="/images/hand-box.svg" alt="Hand Box" class="hand-box-image" />
    <img src="/images/rank-system.svg" alt="Rank System" class="rank-system-image" />
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const emits = defineEmits<{
  (e: 'update:isScrolling', isScrolling: boolean): void;
}>()

gsap.registerPlugin(ScrollTrigger);

let timeline: gsap.core.Timeline | null = null;

const fifthPage = ref(null);
const isVisible = ref(false);
let observer: any = null;

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

watch(isVisible, (newValue) => {
  if (newValue) {
    window.addEventListener('wheel', handleWheel, { passive: false });
    const tableImage = document.querySelector('.table-image-red') as HTMLImageElement;
    if (tableImage) {
      tableImage.src = '/images/table-image-red.svg'; // 이미지 초기화
    }
    if (timeline) {
      timeline.seek(0).pause(); // 타임라인 초기화 및 일시 정지
      timeline.play(); // 초기 애니메이션 시작
    }
  } else {
    window.removeEventListener('wheel', handleWheel);
    if (timeline) {
      timeline.seek(0).pause(); // 페이지를 벗어나면 타임라인 초기화
    }
  }
});

onMounted(() => {
  const tableImage = document.querySelector('.table-image-red') as HTMLImageElement;
  const handBoxImage = document.querySelector('.hand-box-image') as HTMLImageElement;
  const rankSystemImage = document.querySelector('.rank-system-image') as HTMLImageElement;

  timeline = gsap.timeline({ paused: true });

  const textElements = [
    document.querySelector('.text-content'),
    document.querySelector('.gms-text'),
    document.querySelector('.game-management-system-text'),
  ];

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
    left: -293,
    top: 317.58,
    width: 1120,
    height: 444.42,
    ease: 'power2.inOut',
    onComplete: () => {
      if (tableImage) {
        tableImage.src = '/images/table-image-white.svg';
      }
    },
    onReverseComplete: () => {
      if (tableImage) {
        tableImage.src = '/images/table-image-red.svg';
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
  position: relative;
  width: 1920px; /* Figma frame width */
  height: 1080px; /* Figma frame height */
  background-color: #000000;
  overflow: hidden;
}

.gms-text, .text-content, .game-management-system-text {
  /* transform: translateY(60px); */ /* 제거 */
  /* transition: opacity 1s ease-out, transform 1s ease-out; */ /* 제거 */
}

.text-content {
  position: absolute;
  left: 532px;
  top: 825.19px;
  width: 856px;
  height: 22px;
  font-family: "Gmarket Sans TTF";
  font-weight: 500;
  font-size: 19px;
  line-height: 1.15em;
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
  transform: translateY(60px); /* GSAP 초기 상태 */
}

.table-image-red {
  position: absolute;
  left: 506px;
  top: 416.59px;
  width: 908.35px;
  height: 360.44px;
  object-fit: contain;
  opacity: 0; /* 초기 투명도 설정 */
  transform: translateY(60px); /* GSAP 초기 상태 */
}

.gms-text {
  position: absolute;
  left: 897px;
  top: 225px;
  width: 125px;
  height: 96px;
  font-family: "Figerona";
  font-weight: 400;
  font-size: 60px;
  line-height: 1.6em;
  letter-spacing: 0.04em; /* 4% */
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
  transform: translateY(60px); /* GSAP 초기 상태 */
}

.game-management-system-text {
  position: absolute;
  left: 784px;
  top: 336px;
  width: 353px;
  height: 29px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 24px;
  line-height: 1.2102272510528564em;
  text-align: center;
  color: #FFFFFF;
  opacity: 0; /* 초기 투명도 설정 */
  transform: translateY(60px); /* GSAP 초기 상태 */
}

.fifth-page-container .visible {
  /* opacity: 1; */ /* 제거 */
  /* transform: translateY(0); */ /* 제거 */
}

.hand-box-image {
  position: absolute;
  left: 550px; /* 피그마에서 확인한 x 위치 */
  top: 273.63px; /* 피그마에서 확인한 y 위치 */
  width: 1039.04px; /* 피그마에서 확인한 너비 */
  height: 274.9px; /* 피그마에서 확인한 높이 */
  opacity: 0; /* 초기 투명도 설정 */
}

.rank-system-image {
  position: absolute;
  left: 607px; /* 피그마에서 확인한 x 위치 */
  top: 546.6px; /* 피그마에서 확인한 y 위치 */
  width: 982.04px; /* 피그마에서 확인한 너비 */
  height: 259.47px; /* 피그마에서 확인한 높이 */
  opacity: 0; /* 초기 투명도 설정 */
}
</style>
