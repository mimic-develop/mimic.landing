<template>
  <div class="sixth-page-container">
    <video ref="videoPlayer" class="video-player" src="https://mimic.im/videos/mimic_brand_film_1080.mp4" loop playsinline></video>
    <div v-if="!isPlaying" class="play-button-overlay" @click="playVideo">
      <div class="button">
        <img src="/images/button-wrapper.svg" alt="Wrapper">
        <span>BRAND FILM</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isCurrentPage: Boolean,
});

const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play();
    isPlaying.value = true;
  }
};

watch(() => props.isCurrentPage, (isCurrent) => {
  if (videoPlayer.value) {
    if (isCurrent) {
      // Optionally, you can autoplay when the page becomes active.
      // For now, we only handle the play button click.
    } else {
      videoPlayer.value.pause();
      videoPlayer.value.currentTime = 0;
      isPlaying.value = false;
    }
  }
});
</script>

<style scoped>
.sixth-page-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.button {
  position: relative;
  width: 312.41px;
  height: 66.11px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.button span {
  font-family: 'Gmarket Sans TTF', sans-serif;
  font-weight: 500;
  font-size: 30px;
  letter-spacing: -0.03em;
  color: #000000;
  z-index: 1;
}
</style>
