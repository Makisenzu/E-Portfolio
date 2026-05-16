<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <RouterView />
</template>

<style>
/* Base global styles (can optionally stay here or in main.css) */
html {
  scroll-behavior: smooth;
}
</style>
