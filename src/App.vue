<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import { isAppLoading } from './store'

const phase = ref<'terminal' | 'welcome'>('terminal')
const loadingLines = ref<string[]>([])
const showCursor = ref(true)

onMounted(() => {
  const sequence = [
    { text: 'Initializing', delay: 400 },
    { text: 'Loading', delay: 1200 },
  ]

  sequence.forEach((item) => {
    setTimeout(() => {
      loadingLines.value.push(item.text)
    }, item.delay)
  })

  // Transition to WELCOME phase
  setTimeout(() => {
    phase.value = 'welcome'
  }, 2200)

  // Fade out preloader entirely
  setTimeout(() => {
    isAppLoading.value = false
  }, 3500) // Give welcome text enough time to shine
})
</script>

<template>
  <Transition name="preloader">
    <div
      v-if="isAppLoading"
      class="fixed inset-0 z-100 flex flex-col justify-center items-center bg-zinc-950 font-mono p-6 overflow-hidden"
    >
      <!-- Phase 1: Terminal & Spinner -->
      <Transition name="terminal-phase">
        <div
          v-if="phase === 'terminal'"
          class="absolute flex flex-col items-center w-full max-w-lg px-4 sm:px-0"
        >
          <!-- Premium loader animation -->
          <div
            class="relative w-16 h-16 sm:w-24 sm:h-24 mb-8 sm:mb-12 flex items-center justify-center"
          >
            <!-- Outer glow -->
            <div
              class="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"
            ></div>
            <!-- Spinning rings -->
            <div
              class="absolute inset-0 rounded-full border-[3px] border-emerald-500/10 border-t-emerald-500 animate-spin"
              style="animation-duration: 1s"
            ></div>
            <div
              class="absolute inset-3 rounded-full border-[3px] border-primary/10 border-b-primary animate-[spin_1.5s_linear_infinite_reverse]"
            ></div>
            <!-- Center element -->
            <div
              class="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-ping shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            ></div>
          </div>

          <div class="w-full flex flex-col items-start gap-2 sm:gap-3">
            <template v-for="(line, index) in loadingLines" :key="index">
              <div
                class="w-full text-left text-emerald-500/90 text-sm sm:text-lg md:text-xl tracking-wider"
              >
                <span class="mr-2 sm:mr-3 opacity-60">root@portfolio:~#</span>
                {{ line }}
                <span
                  v-if="index === loadingLines.length - 1 && showCursor"
                  class="inline-block w-2 h-4 sm:w-2.5 sm:h-5 bg-emerald-500 align-middle ml-1 sm:ml-2 animate-[pulse_0.8s_infinite]"
                ></span>
              </div>
            </template>

            <!-- Initial Cursor -->
            <div
              v-if="loadingLines.length === 0"
              class="text-emerald-500/90 text-sm sm:text-lg md:text-xl tracking-wider"
            >
              <span class="mr-2 sm:mr-3 opacity-60">root@portfolio:~#</span>
              <span
                class="inline-block w-2 h-4 sm:w-2.5 sm:h-5 bg-emerald-500 align-middle animate-[pulse_0.8s_infinite]"
              ></span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Phase 2: WELCOME Burst -->
      <Transition name="welcome-phase">
        <div
          v-if="phase === 'welcome'"
          class="absolute w-full px-4 flex flex-col items-center justify-center"
        >
          <div
            class="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-emerald-500 font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-center drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] pl-[0.15em] sm:pl-[0.2em] md:pl-[0.3em] w-full"
          >
            WELCOME
          </div>
          <!-- Hacker-style expanding underscore -->
          <div
            class="w-3/4 sm:w-full max-w-lg h-1 md:h-2 bg-emerald-500 mt-4 sm:mt-6 md:mt-8 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[expand-width_0.6s_ease-out_forwards]"
          ></div>
        </div>
      </Transition>
    </div>
  </Transition>

  <TheNavbar />
  <RouterView />
</template>

<style>
/* Base global styles */
html {
  scroll-behavior: smooth;
}

.preloader-leave-active {
  transition:
    opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1),
    transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}
.preloader-leave-to {
  opacity: 0;
  transform: scale(1.1); /* Deep zoom out for transition */
  pointer-events: none;
}

/* Phase Transitions */
.terminal-phase-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.terminal-phase-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  filter: blur(5px);
}

.welcome-phase-enter-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 0.2s; /* Wait for terminal to fade out */
}
.welcome-phase-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  letter-spacing: 0.1em;
  filter: blur(10px);
}
.welcome-phase-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0px);
}

@keyframes expand-width {
  0% {
    width: 0%;
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}
</style>
