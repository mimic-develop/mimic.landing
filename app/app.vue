<template>
  <div class="mimic-landing-page">
    <Navigation :length="8" :index="1"/>
    <MainPage />
  </div>
</template>

<script setup>
import MainPage from '../components/MainPage.vue';
import Navigation from "~~/components/Navigation.vue";
</script>

<style>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
