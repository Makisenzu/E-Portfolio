<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-vue-next'

const isVisible = ref(false)

// Day/Night feature
const isDayTime = computed(() => {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18
})

// Interactive Name Feature
const originalName = 'Denmark Rivera'
const displayText = ref(originalName)
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let interval: ReturnType<typeof setInterval> | null = null

const handleInteraction = () => {
  let iteration = 0
  if (interval) clearInterval(interval)

  interval = setInterval(() => {
    displayText.value = originalName
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' '
        if (index < iteration) {
          return originalName[index]
        }
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join('')

    if (iteration >= originalName.length) {
      if (interval) clearInterval(interval)
    }

    iteration += 1 / 3
  }, 30)
}

// Interactive Parallax Animation
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  // Calculate relative mouse position (-1 to 1)
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = (e.clientY / window.innerHeight) * 2 - 1

  // Ease the values slightly for smoother animation (handled by CSS transition)
  mouseX.value = x * 15 // max rotation/translation amount
  mouseY.value = y * 15
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0]
    const x = (touch.clientX / window.innerWidth) * 2 - 1
    const y = (touch.clientY / window.innerHeight) * 2 - 1
    
    mouseX.value = x * 15
    mouseY.value = y * 15
  }
}

const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
  let gamma = e.gamma || 0
  let beta = e.beta || 0

  // Constrain gamma (-45 to 45)
  if (gamma > 45) gamma = 45
  if (gamma < -45) gamma = -45
  
  // Center beta around 45 degrees (typical viewing angle) and constrain
  let betaRelative = beta - 45
  if (betaRelative > 45) betaRelative = 45
  if (betaRelative < -45) betaRelative = -45

  // Map the angles to our parallax translation (-15 to 15)
  mouseX.value = (gamma / 45) * 15
  mouseY.value = (betaRelative / 45) * 15
}

const blobPosition = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
const blobOffset = ref(50)
const isBlobHiding = ref(false)
const edges = ['top', 'bottom', 'left', 'right'] as const

const handleBlobClick = () => {
  if (isBlobHiding.value) return
  isBlobHiding.value = true
  
  setTimeout(() => {
    let newEdge
    do {
      newEdge = edges[Math.floor(Math.random() * edges.length)]
    } while (newEdge === blobPosition.value)
    
    blobPosition.value = newEdge
    blobOffset.value = 20 + Math.random() * 60
    isBlobHiding.value = false
  }, 400)
}

const getBlobStyle = () => {
  const style: Record<string, string> = {
    transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
  
  let hideTranslate = ''
  let rotation = ''
  
  if (blobPosition.value === 'bottom') {
    style.bottom = '0'
    style.left = `${blobOffset.value}%`
    hideTranslate = isBlobHiding.value ? 'translate(-50%, 100%)' : 'translate(-50%, 30%)'
    rotation = 'rotate(0deg)'
  } else if (blobPosition.value === 'top') {
    style.top = '0'
    style.left = `${blobOffset.value}%`
    hideTranslate = isBlobHiding.value ? 'translate(-50%, -100%)' : 'translate(-50%, -30%)'
    rotation = 'rotate(180deg)'
  } else if (blobPosition.value === 'left') {
    style.left = '0'
    style.top = `${blobOffset.value}%`
    hideTranslate = isBlobHiding.value ? 'translate(-100%, -50%)' : 'translate(-30%, -50%)'
    rotation = 'rotate(90deg)'
  } else if (blobPosition.value === 'right') {
    style.right = '0'
    style.top = `${blobOffset.value}%`
    hideTranslate = isBlobHiding.value ? 'translate(100%, -50%)' : 'translate(30%, -50%)'
    rotation = 'rotate(-90deg)'
  }
  
  style.transform = `${hideTranslate} ${rotation}`
  return style
}

const eyeTransform = computed(() => {
  let x = mouseX.value
  let y = mouseY.value
  
  if (blobPosition.value === 'top') {
    x = -mouseX.value
    y = -mouseY.value
  } else if (blobPosition.value === 'left') {
    x = mouseY.value
    y = -mouseX.value
  } else if (blobPosition.value === 'right') {
    x = -mouseY.value
    y = mouseX.value
  }
  
  return `translate(${x}px, ${y}px)`
})

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleTouchMove, { passive: true })
  window.addEventListener('deviceorientation', handleDeviceOrientation)
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
})
</script>

<template>
  <section id="hero" class="relative min-h-[90vh] flex items-center overflow-hidden">
    <!-- Subtle grid background pattern -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
      <div
        class="absolute inset-0"
        style="
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        "
      />
    </div>

    <!-- Floating gradient orbs -->
    <div
      class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"
      style="animation-duration: 8s"
    />
    <div
      class="absolute bottom-1/4 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"
      style="animation-duration: 12s"
    />

    <div
      class="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <!-- Left Content: Repositioned Text -->
      <div class="flex flex-col items-center lg:items-start text-center lg:text-left mt-16 lg:mt-0">
        <!-- Day/Night Pill -->
        <div
          class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-md mb-8 shadow-sm"
        >
          <Sun v-if="isDayTime" class="w-4 h-4 text-amber-500 animate-[spin_10s_linear_infinite]" />
          <Moon v-else class="w-4 h-4 text-blue-400 animate-pulse" />
          <span class="text-sm font-medium text-foreground tracking-wide">Hi I am</span>
        </div>

        <!-- Main heading / Interactive Name -->
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] flex flex-col gap-2"
        >
          <span
            class="font-mono text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground hover:from-primary hover:to-emerald-500 cursor-crosshair transition-all duration-300 inline-block whitespace-nowrap"
            @mouseenter="handleInteraction"
            @touchstart="handleInteraction"
          >
            {{ displayText }}
          </span>
          <!-- <span class="text-muted-foreground/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >Software Engineer.</span
          > -->
        </h1>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            id="hero-cta-projects"
            size="lg"
            class="w-full sm:w-auto px-8"
            @click="
              $el
                .closest('section')
                ?.parentElement?.querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            "
          >
            View Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          </Button>
          <Button
            id="hero-cta-contact"
            variant="outline"
            size="lg"
            class="w-full sm:w-auto px-8"
            @click="
              $el
                .closest('section')
                ?.parentElement?.querySelector('#experience')
                ?.scrollIntoView({ behavior: 'smooth' })
            "
          >
            Experience
          </Button>
        </div>
      </div>


      <!-- Right Content: Interactive 3D Parallax Graphic (Desktop Only) -->
      <div
        class="hidden lg:flex justify-center items-center relative perspective-1000 w-full aspect-square max-w-[500px] ml-auto"
      >
        <div
          class="relative w-full h-full transition-transform duration-300 ease-out preserve-3d"
          :style="{ transform: `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)` }"
        >
          <!-- Background glow/mesh -->
          <div
            class="absolute inset-12 bg-gradient-to-tr from-primary/20 via-transparent to-emerald-500/20 rounded-full blur-2xl animate-pulse"
            style="animation-duration: 4s"
          />

          <!-- Code snippet card (Front) -->
          <div
            class="absolute top-1/2 left-1/2 w-[85%] bg-card/80 border border-border/60 p-6 rounded-2xl shadow-2xl backdrop-blur-xl transition-transform duration-300"
            :style="{
              transform: `translate(-50%, -50%) translateZ(60px) translateX(${mouseX * -1.5}px) translateY(${mouseY * -1.5}px)`,
            }"
          >
            <!-- Mac style window dots -->
            <div class="flex gap-2 mb-6">
              <div class="w-3 h-3 rounded-full bg-destructive/80"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>

            <div class="font-mono text-sm leading-relaxed space-y-2 text-muted-foreground">
              <p>
                <span class="text-primary font-semibold">const</span>
                <span class="text-foreground">developer</span> = {
              </p>
              <p class="pl-6">name: <span class="text-emerald-500">"Denmark Rivera"</span>,</p>
              <p class="pl-6">passion: <span class="text-emerald-500">"Web Dev"</span>,</p>
              <p class="pl-6">
                skills: [<span class="text-emerald-500">"Vue"</span>,
                <span class="text-emerald-500">"Laravel"</span>,
                <span class="text-emerald-500">"React"</span>],
              </p>
              <p class="pl-6">caffeineLevel: <span class="text-primary font-semibold">100</span></p>
              <p>}</p>
            </div>
          </div>

          <!-- Floating Badges -->
          <div
            class="absolute top-[20%] -left-4 bg-background/90 border border-primary/20 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md transition-transform duration-300 flex items-center gap-2"
            :style="{
              transform: `translateZ(100px) translateX(${mouseX * 2}px) translateY(${mouseY * 2}px)`,
            }"
          >
            <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span class="font-mono text-xs font-bold text-foreground">Vue.js</span>
          </div>

          <div
            class="absolute bottom-[25%] -right-4 bg-background/90 border border-emerald-500/20 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md transition-transform duration-300 flex items-center gap-2"
            :style="{
              transform: `translateZ(120px) translateX(${mouseX * -2}px) translateY(${mouseY * -2}px)`,
            }"
          >
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="font-mono text-xs font-bold text-foreground">Laravel</span>
          </div>

          <div
            class="absolute -top-2 right-[20%] bg-background/90 border border-blue-500/20 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md transition-transform duration-300 flex items-center gap-2"
            :style="{
              transform: `translateZ(80px) translateX(${mouseX * 1}px) translateY(${mouseY * 1}px)`,
            }"
          >
            <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span class="font-mono text-xs font-bold text-foreground">React</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Content: Peeping Blob -->
    <div 
      class="fixed lg:hidden z-50 cursor-pointer"
      :style="getBlobStyle()"
      @click="handleBlobClick"
    >
      <div class="animate-[bounce_3s_infinite]">
        <div 
          class="relative w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/30 to-emerald-500/30 shadow-lg backdrop-blur-md flex justify-center items-center transition-all duration-200"
          :style="{ 
            borderRadius: `${50 + mouseX}% ${50 - mouseX}% ${50 + Math.abs(mouseY)}% ${50 - Math.abs(mouseY)}%`
          }"
        >
          <!-- Eyes Container (shifts with tilt) -->
          <div class="relative flex gap-5 mb-2 transition-transform duration-75"
               :style="{ transform: eyeTransform }">
               
            <!-- Left Eye -->
            <div class="w-3.5 h-5 bg-foreground rounded-full flex justify-center items-center overflow-hidden">
              <div class="w-1.5 h-1.5 bg-background rounded-full mt-1"></div>
            </div>
            
            <!-- Right Eye -->
            <div class="w-3.5 h-5 bg-foreground rounded-full flex justify-center items-center overflow-hidden">
              <div class="w-1.5 h-1.5 bg-background rounded-full mt-1"></div>
            </div>

            <!-- Blush -->
            <div class="absolute top-5 -left-3 w-3 h-1.5 bg-rose-400/60 rounded-full blur-[2px]"></div>
            <div class="absolute top-5 -right-3 w-3 h-1.5 bg-rose-400/60 rounded-full blur-[2px]"></div>

            <!-- Smile -->
            <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-foreground rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      style="animation-duration: 2s"
    >
      <span class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium"
        >Scroll</span
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-muted-foreground/40"
      >
        <path d="m7 13 5 5 5-5" />
        <path d="m7 6 5 5 5-5" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
</style>
