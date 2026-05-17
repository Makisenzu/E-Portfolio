<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'

const isLoading = ref(true)
const loadingLines = ref<{text: string, isWelcome?: boolean}[]>([])
const showCursor = ref(true)

onMounted(() => {
  const sequence = [
    { text: 'Initializing', delay: 400 },
    { text: 'Loading', delay: 1200 },
    { text: 'WELCOME', delay: 2000, isWelcome: true }
  ]

  // Add each line to the screen based on its delay
  sequence.forEach((item) => {
    setTimeout(() => {
      loadingLines.value.push(item)
    }, item.delay)
  })

  // Hide the terminal cursor right when WELCOME appears
  setTimeout(() => {
    showCursor.value = false
  }, 2000)

  // Fade out the entire loading screen
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
})
</script>

<template>
  <Transition name="preloader">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-zinc-950 font-mono p-6"
    >
      <!-- Premium loader animation -->
      <div class="relative w-24 h-24 mb-8 flex items-center justify-center">
        <!-- Outer glow -->
        <div class="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
        
        <!-- Spinning rings -->
        <div class="absolute inset-0 rounded-full border-[3px] border-emerald-500/10 border-t-emerald-500 animate-spin" style="animation-duration: 1.5s;"></div>
        <div class="absolute inset-3 rounded-full border-[3px] border-primary/10 border-b-primary animate-[spin_2s_linear_infinite_reverse]"></div>
        
        <!-- Center element -->
        <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
      </div>

      <div class="w-full max-w-lg flex flex-col items-start gap-3">
        <!-- Render sequence lines -->
        <template v-for="(line, index) in loadingLines" :key="index">
          <div 
            :class="[
              'w-full text-left',
              line.isWelcome 
                ? 'text-5xl md:text-7xl text-emerald-500 font-bold mt-8 tracking-[0.2em] text-center animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                : 'text-emerald-500 text-lg sm:text-xl tracking-wider'
            ]"
          >
            <!-- Terminal Prefix for normal lines -->
            <span v-if="!line.isWelcome" class="mr-3 opacity-60">root@portfolio:~#</span>
            
            {{ line.text }}
            
            <!-- Blinking cursor for the last active line -->
            <span 
              v-if="index === loadingLines.length - 1 && showCursor && !line.isWelcome" 
              class="inline-block w-2.5 h-5 bg-emerald-500 align-middle ml-2 animate-[pulse_0.8s_infinite]"
            ></span>
          </div>
        </template>
        
        <!-- Initial Cursor before anything loads -->
        <div v-if="loadingLines.length === 0" class="text-emerald-500 text-lg sm:text-xl tracking-wider">
          <span class="mr-3 opacity-60">root@portfolio:~#</span>
          <span class="inline-block w-2.5 h-5 bg-emerald-500 align-middle animate-[pulse_0.8s_infinite]"></span>
        </div>
      </div>
    </div>
  </Transition>

  <TheNavbar />
  <RouterView />
</template>

<style>
/* Base global styles (can optionally stay here or in main.css) */
html {
  scroll-behavior: smooth;
}

.preloader-leave-active {
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}
.preloader-leave-to {
  opacity: 0;
  transform: scale(1.05); /* Slight scale up for a smooth dismount */
  pointer-events: none;
}
</style>
