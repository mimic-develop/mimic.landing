<template>
  <div class="seventh-page-container">
    <div class="content-wrapper" ref="contentWrapper">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-small" ref="object1Small">
      <img src="/images/object-1.png" alt="Object 1" class="object-1-large" ref="object1Large">

      <div class="svg-container" ref="svgContainer">
        <svg class="path-svg" width="702" height="277" viewBox="0 0 702 277" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref="path1" opacity="0.43" d="M263.12 252.7C214 263.76 168.03 270.94 128.29 273.56C59.0996 278.13 17.1396 268.47 10.1196 246.37C3.10964 224.26 31.8296 192.18 90.9996 156.03C130.3 132.02 179.89 108.18 235.35 86.4199C235.21 85.9699 235.06 85.5096 234.93 85.0596C179.36 106.86 129.66 130.75 90.2697 154.82C30.4897 191.35 1.53966 224.01 8.76966 246.8C14.8497 265.96 45.8297 276.08 97.0797 276.08C106.8 276.08 117.25 275.72 128.39 274.98C168.23 272.35 214.32 265.16 263.55 254.06C263.4 253.61 263.26 253.15 263.13 252.7H263.12Z" fill="white"/>
          <path ref="path2" opacity="0.43" d="M693.239 29.6602C686.009 6.87022 643.529 -3.13947 573.619 1.48053C568.429 1.82053 563.119 2.25006 557.719 2.75006C557.949 3.19006 558.159 3.63991 558.369 4.08991C575.169 2.53991 590.799 1.75006 604.989 1.75006C653.819 1.75006 685.819 10.9997 691.879 30.0997C704.819 70.8797 595.219 143.1 439.069 200.51C439.199 200.97 439.329 201.43 439.449 201.9C506.169 177.4 565.929 149.65 611.739 121.66C671.519 85.1402 700.469 52.4697 693.239 29.6798V29.6602Z" fill="white"/>
          <path ref="path3" opacity="0.43" d="M261.259 244.82C208.989 252.82 160.309 256.88 118.779 256.5C49.4394 255.88 8.31938 243.1 2.97938 220.53C-6.15062 181.93 91.7794 124.25 233.639 79.7402C233.539 79.2702 233.459 78.8003 233.369 78.3203C178.669 95.4603 129.419 114.9 89.7494 135.23C27.3994 167.18 -3.91063 197.58 1.59937 220.85C7.10937 244.12 48.7094 257.28 118.769 257.91C120.539 257.93 122.319 257.93 124.119 257.93C164.549 257.93 211.389 253.87 261.509 246.2C261.419 245.73 261.349 245.27 261.259 244.8V244.82Z" fill="white"/>
          <path ref="path4" opacity="0.43" d="M700.4 55.5902C694.9 32.3202 653.289 19.1607 583.229 18.5307C576.729 18.4707 570.049 18.5203 563.219 18.6703C563.319 19.1403 563.41 19.6007 563.49 20.0707C568.54 19.9507 573.489 19.8901 578.319 19.8901C647.439 19.8901 693.35 31.9503 699.02 55.9203C704.36 78.4903 673.309 108.331 611.599 139.951C565.349 163.651 506.05 186.151 440.25 205.191C440.35 205.651 440.46 206.12 440.55 206.58C506.48 187.5 565.9 164.96 612.25 141.21C674.6 109.26 705.91 78.8602 700.4 55.5902Z" fill="white"/>
        </svg>
        <ThirdTextAnimation class="text-animation" ref="thirdText" />
      </div>

      <p class="my-text" ref="myText">MY</p>
      <p class="place-text" ref="placeText">PLACE</p>
      <p class="all-in-fun" ref="allInFunText">ALL IN FUN</p>
      <p class="mimic-text" ref="mimicText">MIMIC</p>

      <p class="description" ref="descriptionText">
        MIMIC이 가진 핵심 가치인 친철한 응대, 공정한 게임 운영, 청결한 환경, 초보자에 대한 배려 그리고 공동체의 성장을 바탕으로<br>
        브랜드 가치를 지키며 어디서든 MIMIC의 경험을 누릴 수 있도록 확장해 나갑니다
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import ThirdTextAnimation from './ThirdTextAnimation.vue';

const props = defineProps({
  isCurrentPage: Boolean,
});

const tl = gsap.timeline({ paused: true });

const contentWrapper = ref<HTMLDivElement | null>(null);
const object1Small = ref<HTMLImageElement | null>(null);
const object1Large = ref<HTMLImageElement | null>(null);
const svgContainer = ref<HTMLDivElement | null>(null);
const thirdText = ref(null);
const myText = ref<HTMLParagraphElement | null>(null);
const placeText = ref<HTMLParagraphElement | null>(null);
const allInFunText = ref<HTMLParagraphElement | null>(null);
const mimicText = ref<HTMLParagraphElement | null>(null);
const descriptionText = ref<HTMLParagraphElement | null>(null);
const path1 = ref<SVGPathElement | null>(null);
const path2 = ref<SVGPathElement | null>(null);
const path3 = ref<SVGPathElement | null>(null);
const path4 = ref<SVGPathElement | null>(null);

const setupAnimation = () => {
  const paths = [path1.value, path2.value, path3.value, path4.value].filter(p => p);
  const animatedTexts = [myText.value, placeText.value, allInFunText.value, mimicText.value, descriptionText.value];

  tl.clear(); // Clear previous timeline

  // Initial states
  gsap.set(contentWrapper.value, { y: 100, autoAlpha: 0 });
  gsap.set([object1Small.value, object1Large.value, svgContainer.value], { autoAlpha: 0});
  gsap.set(animatedTexts, { y: 30, autoAlpha: 0 }); // Set initial position for slide-up

  paths.forEach(path => {
    if(path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, stroke: 'white', fill: 'none' });
    }
  });

  // Animation sequence
  tl.to(contentWrapper.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' })
    .to([object1Small.value, object1Large.value], { autoAlpha: 1, duration: 1 }, "-=1.5")
    .to(svgContainer.value, { autoAlpha: 1, duration: 1 }, "-=.5")
    .add(() => {
      if (thirdText.value) {
        (thirdText.value as any).animatePaths();
      }
    })
    .to(paths, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power1.inOut',
      stagger: 0.2
    }, ">")
    .to([myText.value, placeText.value], { y: 0, autoAlpha: 1, duration: 2, ease: 'power2.out' }, "-=1.5")
    .to(allInFunText.value, { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out' }, "-=1.2")
    .to(mimicText.value, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power2.out' }, "-=0.9")
    .to(descriptionText.value, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, ">-0.5");
};

watch(() => props.isCurrentPage, (isCurrent) => {
  if (isCurrent) {
    tl.restart();
  } else {
    tl.pause(0); // Rewind and pause
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
.seventh-page-container {
  width: 100vw;
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
}

.object-1-small {
  position: absolute;
  width: 318px;
  height: 318px;
  top: 34px;
  left: 0;
  opacity: 0.8;
  rotate: -136.97deg;
}

.object-1-large {
  position: absolute;
  width: 500px;
  height: 500px;
  bottom: -110px;
  right: 30px;
  opacity: 0.8;
  rotate: -136.97deg;
}

.svg-container {
  position: absolute;
  width: 700.04px;
  height: 275.7px;
  top: 318.38px;
  left: 609.98px;
}

.path-svg {
  position: absolute;
  top: 0;
  left: 0;
}

.text-animation {
  position: absolute;
  top: 6.14px; /* (275.7 - 64.91) / 2 - (318.38 - 324.52) */
  left: 233.75px; /* (700.04 - 177.32) / 2 - (609.98 - 843.73) */
}

.my-text {
  position: absolute;
  top: 248px; /* 298 - 50 */
  left: 759px;
  font-family: 'Figerona', sans-serif;
  font-weight: 100;
  font-size: 62px;
  line-height: 1.6em;
  letter-spacing: 2%;
}

.place-text {
  position: absolute;
  top: 248px; /* 298 - 50 */
  left: 982px;
  font-family: 'Figerona', sans-serif;
  font-weight: 100;
  font-size: 62px;
  line-height: 1.6em;
  letter-spacing: 2%;
}

.all-in-fun {
  position: absolute;
  top: 342px; /* 392 - 50 */
  left: 815px;
  font-family: 'Figerona', sans-serif;
  font-weight: 100;
  font-size: 62px;
  line-height: 1.6em;
  letter-spacing: 2%;
}

.mimic-text {
  position: absolute;
  top: 436px; /* 486 - 50 */
  left: 886px;
  font-family: 'Figerona', sans-serif;
  font-weight: 100;
  font-size: 62px;
  line-height: 1.6em;
  letter-spacing: 2%;
}

.description {
  position: absolute;
  width: 1065px;
  top: 689px;
  left: 428px;
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 300;
  font-size: 19px;
  line-height: 2.1em;
  letter-spacing: 3%;
  text-align: center;
}
</style>
