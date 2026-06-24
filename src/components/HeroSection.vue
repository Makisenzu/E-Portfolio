<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-vue-next'
import { isAppLoading } from '@/store'
import EvilEye from './EvilEye.vue'
const isVisible = ref(false)

// Dog scroll behavior
const isScrolledDown = ref(false)
const showBubble = ref(true)
const bubbleDismissed = ref(false)

// Greeting Animation
const greetingText = ref('')
const greetings = ['Hello! Mabuhay!', 'Kamusta!', 'Welcome!', 'Hi, I am']
let currentGreetingIndex = 0
let isDeleting = false
let typingTimeout: ReturnType<typeof setTimeout> | null = null

const typeGreeting = () => {
  const currentPhrase = greetings[currentGreetingIndex] || ''

  if (isDeleting) {
    greetingText.value = currentPhrase.substring(0, greetingText.value.length - 1)
  } else {
    greetingText.value = currentPhrase.substring(0, greetingText.value.length + 1)
  }

  let typeSpeed = isDeleting ? 40 : 100

  if (!isDeleting && greetingText.value === currentPhrase) {
    typeSpeed = 2500 // Pause before deleting
    isDeleting = true
  } else if (isDeleting && greetingText.value === '') {
    isDeleting = false
    currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length
    typeSpeed = 400 // Pause before typing next phrase
  }

  typingTimeout = setTimeout(typeGreeting, typeSpeed)
}

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

const handleInteraction = (eOrDuration?: Event | number) => {
  const durationMs = typeof eOrDuration === 'number' ? eOrDuration : 800
  let iteration = 0
  if (interval) clearInterval(interval)

  const intervalMs = 30
  const totalSteps = durationMs / intervalMs
  const stepSize = originalName.length / totalSteps

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
      displayText.value = originalName // Ensure it settles cleanly
    }

    iteration += stepSize
  }, intervalMs)
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
  if (e.touches && e.touches.length > 0) {
    const touch = e.touches[0]
    if (!touch) return
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

const heroPosition = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
const heroOffset = ref(50)
const scrolledPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const scrolledOffset = ref(85) // default top-right peeping upside down
const isRepositionedWhileScrolled = ref(false)
const scrolledRepositionedPosition = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const scrolledRepositionedOffset = ref(85)
const isBlobHiding = ref(false)
const edges = ['top', 'bottom', 'left', 'right'] as const

const handleBlobClick = () => {
  // Dismiss speech bubble on first click
  if (!bubbleDismissed.value) {
    bubbleDismissed.value = true
    showBubble.value = false
  }

  if (isBlobHiding.value) return
  isBlobHiding.value = true

  setTimeout(() => {
    let newEdge: 'top' | 'bottom' | 'left' | 'right' = edges[0]
    const currentEdge = isScrolledDown.value
      ? isRepositionedWhileScrolled.value
        ? scrolledRepositionedPosition.value
        : scrolledPosition.value
      : heroPosition.value

    do {
      const randomIndex = Math.floor(Math.random() * edges.length)
      newEdge = edges[randomIndex] || edges[0]
    } while (newEdge === currentEdge)

    const newOffset = 20 + Math.random() * 60

    if (isScrolledDown.value) {
      scrolledRepositionedPosition.value = newEdge
      scrolledRepositionedOffset.value = newOffset
      isRepositionedWhileScrolled.value = true
    } else {
      heroPosition.value = newEdge
      heroOffset.value = newOffset
    }

    isBlobHiding.value = false
  }, 400)
}

let lastScrollTop = 0

// Handle scroll: dock dog to top-right/left peeping upside down or reset if repositioned
const handleDogScroll = () => {
  const heroEl = document.getElementById('hero')
  if (!heroEl) return
  const heroBottom = heroEl.getBoundingClientRect().bottom

  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  const isScrollMovement = Math.abs(currentScrollTop - lastScrollTop) > 2
  lastScrollTop = currentScrollTop

  isScrolledDown.value = heroBottom < window.innerHeight * 0.5

  // If scrolled down and manually repositioned, scrolling again resets the dog back to default top-right peeping position
  if (isScrolledDown.value && isRepositionedWhileScrolled.value && isScrollMovement) {
    isRepositionedWhileScrolled.value = false
  }

  // Dismiss bubble on scroll
  if (isScrolledDown.value && !bubbleDismissed.value) {
    bubbleDismissed.value = true
    showBubble.value = false
  }
}

const getBlobStyle = () => {
  const style: Record<string, string> = {
    transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }

  let hideTranslate = ''
  let rotation = ''

  const activePosition = isScrolledDown.value
    ? isRepositionedWhileScrolled.value
      ? scrolledRepositionedPosition.value
      : scrolledPosition.value
    : heroPosition.value

  const activeOffset = isScrolledDown.value
    ? isRepositionedWhileScrolled.value
      ? scrolledRepositionedOffset.value
      : scrolledOffset.value
    : heroOffset.value

  if (activePosition === 'bottom') {
    style.bottom = '0'
    style.left = `${activeOffset}%`
    hideTranslate = isBlobHiding.value ? 'translate(-50%, 100%)' : 'translate(-50%, 30%)'
    rotation = 'rotate(0deg)'
  } else if (activePosition === 'top') {
    style.top = '0'
    style.left = `${activeOffset}%`
    hideTranslate = isBlobHiding.value ? 'translate(-50%, -100%)' : 'translate(-50%, -30%)'
    rotation = 'rotate(180deg)'
  } else if (activePosition === 'left') {
    style.left = '0'
    style.top = `${activeOffset}%`
    hideTranslate = isBlobHiding.value ? 'translate(-100%, -50%)' : 'translate(-30%, -50%)'
    rotation = 'rotate(90deg)'
  } else if (activePosition === 'right') {
    style.right = '0'
    style.top = `${activeOffset}%`
    hideTranslate = isBlobHiding.value ? 'translate(100%, -50%)' : 'translate(30%, -50%)'
    rotation = 'rotate(-90deg)'
  }

  style.transform = `${hideTranslate} ${rotation}`
  return style
}

const parallaxCoords = computed(() => {
  let x = mouseX.value
  let y = mouseY.value

  const activePosition = isScrolledDown.value
    ? isRepositionedWhileScrolled.value
      ? scrolledRepositionedPosition.value
      : scrolledPosition.value
    : heroPosition.value

  if (activePosition === 'top') {
    x = -mouseX.value
    y = -mouseY.value
  } else if (activePosition === 'left') {
    x = mouseY.value
    y = -mouseX.value
  } else if (activePosition === 'right') {
    x = -mouseY.value
    y = mouseX.value
  }

  return { x, y }
})

const eyeTransform = computed(
  () => `translate(${parallaxCoords.value.x}px, ${parallaxCoords.value.y}px)`,
)

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleTouchMove, { passive: true })
  window.addEventListener('deviceorientation', handleDeviceOrientation)
  window.addEventListener('scroll', handleDogScroll, { passive: true })

  const startAnimations = () => {
    setTimeout(() => {
      isVisible.value = true

      // Auto-trigger the name animation for 3 seconds
      handleInteraction(3000)

      // Start typewriter animation slightly after component mounts
      setTimeout(() => {
        typeGreeting()
      }, 600)
    }, 500) // Wait for the preloader to mostly fade out before showing Hero content
  }

  if (!isAppLoading.value) {
    startAnimations()
  } else {
    const unwatch = watch(isAppLoading, (newVal) => {
      if (!newVal) {
        startAnimations()
        unwatch() // Stop watching once triggered
      }
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
  window.removeEventListener('scroll', handleDogScroll)
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <div class="absolute inset-0 z-0 w-full h-full min-h-[90vh] overflow-hidden pointer-events-none">
    <div
      class="w-full h-full min-h-[90vh] transition-transform duration-75 ease-out"
      :style="{ transform: eyeTransform }"
    >
      <EvilEye
        eye-color="#029f08"
        :intensity="1.5"
        :pupil-size="2"
        :iris-width="0.25"
        :glow-intensity="0.35"
        :scale="0.6"
        :noise-scale="1.0"
        :pupil-follow="1.3"
        :flame-speed="0.9"
        background-color="#000000"
      />
    </div>
  </div>
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

    <!-- <div
      class="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    > -->
    <!-- <div class="flex flex-col items-center lg:items-start text-center lg:text-left mt-16 lg:mt-0">
        <div
          class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-md mb-8 shadow-sm"
        >
          <Sun v-if="isDayTime" class="w-4 h-4 text-amber-500 animate-[spin_10s_linear_infinite]" />
          <Moon v-else class="w-4 h-4 text-blue-400 animate-pulse" />
          <span
            class="text-sm font-medium text-foreground tracking-wide flex items-center min-h-[20px]"
          >
            {{ greetingText }}
            <span
              class="w-1.5 h-3.5 bg-primary ml-1 rounded-full animate-[pulse_1s_infinite]"
            ></span>
          </span>
        </div>

        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] flex flex-col gap-2"
        >
          <span
            class="font-mono text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground hover:from-primary hover:to-emerald-500 cursor-crosshair transition-all duration-300 inline-block whitespace-nowrap"
            @mouseenter="handleInteraction"
            @touchstart="handleInteraction"
          >
            {{ displayText }}
          </span>
        </h1>

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
      </div> -->

    <!-- Right Content: Interactive 3D Parallax Graphic (Desktop Only) -->
    <!-- <div
        class="hidden lg:flex justify-center items-center relative perspective-1000 w-full aspect-square max-w-[500px] ml-auto"
      >
        <div
          class="relative w-full h-full transition-transform duration-300 ease-out preserve-3d"
          :style="{ transform: `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)` }"
        >
          <div
            class="absolute inset-12 bg-linear-to-tr from-primary/20 via-transparent to-emerald-500/20 rounded-full blur-2xl animate-pulse"
            style="animation-duration: 4s"
          />

          <div
            class="absolute top-1/2 left-1/2 w-[85%] bg-card/80 border border-border/60 p-6 rounded-2xl shadow-2xl backdrop-blur-xl transition-transform duration-300"
            :style="{
              transform: `translate(-50%, -50%) translateZ(60px) translateX(${mouseX * -1.5}px) translateY(${mouseY * -1.5}px)`,
            }"
          >
            <div class="flex gap-2 mb-6">
              <div class="w-3 h-3 rounded-full bg-destructive/80"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>

            <div class="font-mono text-sm leading-relaxed space-y-2 text-muted-foreground">
              <p>
                <span class="text-primary font-semibold">const </span>
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
    </div> -->

    <div class="fixed z-50 cursor-pointer" :style="getBlobStyle()" @click="handleBlobClick">
      <!-- Speech Bubble -->
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0 scale-75 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90 -translate-y-1"
      >
        <div
          v-if="showBubble && !isScrolledDown"
          class="absolute -top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div
            class="relative bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-[bubble-float_2s_ease-in-out_infinite]"
          >
            Click Me!
            <!-- Tail/arrow -->
            <div
              class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground rotate-45 rounded-sm"
            ></div>
          </div>
        </div>
      </Transition>

      <div :class="isScrolledDown ? '' : 'animate-[bounce_3s_infinite]'">
        <!-- The Dog Head -->
        <div
          class="relative bg-linear-to-br from-amber-400/80 to-orange-500/80 shadow-lg backdrop-blur-md flex justify-center items-center rounded-[45%] transition-all duration-500"
          :class="isScrolledDown ? 'w-16 h-16' : 'w-28 h-28 sm:w-32 sm:h-32'"
        >
          <!-- Left Ear (parallax depth and rotation) -->
          <div
            class="absolute -left-2 top-1 bg-amber-600/90 rounded-[40%_40%_50%_50%] origin-top -z-10 shadow-inner transition-all duration-500"
            :class="isScrolledDown ? 'w-6 h-9' : 'w-10 h-16 -left-3 top-2'"
            :style="{
              transform: `translate(${parallaxCoords.x * -0.2}px, ${parallaxCoords.y * -0.2}px) rotate(${-25 + parallaxCoords.x * 0.5}deg)`,
            }"
          ></div>

          <!-- Right Ear (parallax depth and rotation) -->
          <div
            class="absolute -right-2 top-1 bg-amber-600/90 rounded-[40%_40%_50%_50%] origin-top -z-10 shadow-inner transition-all duration-500"
            :class="isScrolledDown ? 'w-6 h-9' : 'w-10 h-16 -right-3 top-2'"
            :style="{
              transform: `translate(${parallaxCoords.x * -0.2}px, ${parallaxCoords.y * -0.2}px) rotate(${25 + parallaxCoords.x * 0.5}deg)`,
            }"
          ></div>

          <!-- Face Container (shifts with tilt for 3D depth) -->
          <div
            class="relative flex flex-col items-center mt-2 w-full h-full justify-center transition-transform duration-75"
            :style="{ transform: eyeTransform }"
          >
            <!-- Eyes -->
            <div class="flex mb-1 z-10" :class="isScrolledDown ? 'gap-3' : 'gap-6'">
              <!-- Left Eye -->
              <div
                class="bg-foreground rounded-full flex justify-center items-start pt-0.5 overflow-hidden shadow-sm transition-all duration-500"
                :class="isScrolledDown ? 'w-2 h-2.5' : 'w-3 h-4'"
              >
                <div
                  class="bg-background rounded-full mt-0.5"
                  :class="isScrolledDown ? 'w-1 h-1' : 'w-1.5 h-1.5'"
                ></div>
              </div>
              <!-- Right Eye -->
              <div
                class="bg-foreground rounded-full flex justify-center items-start pt-0.5 overflow-hidden shadow-sm transition-all duration-500"
                :class="isScrolledDown ? 'w-2 h-2.5' : 'w-3 h-4'"
              >
                <div
                  class="bg-background rounded-full mt-0.5"
                  :class="isScrolledDown ? 'w-1 h-1' : 'w-1.5 h-1.5'"
                ></div>
              </div>
            </div>

            <!-- Snout -->
            <div
              class="relative bg-background/90 rounded-[45%] flex flex-col items-center pt-1 shadow-md z-10 transition-all duration-500"
              :class="isScrolledDown ? 'w-8 h-5' : 'w-14 h-9 pt-1.5'"
            >
              <!-- Nose -->
              <div
                class="bg-foreground rounded-full mb-0.5 transition-all duration-500"
                :class="isScrolledDown ? 'w-2.5 h-1.5' : 'w-4 h-2.5'"
              ></div>
              <!-- Mouth (Dog W-shape) -->
              <div
                class="flex justify-center -space-x-0.5 mt-0.5"
                :class="{ 'scale-75': isScrolledDown }"
              >
                <div
                  class="w-3 h-3 border-b-2 border-r-2 border-foreground rounded-br-full transform rotate-12"
                ></div>
                <div
                  class="w-3 h-3 border-b-2 border-l-2 border-foreground rounded-bl-full transform -rotate-12"
                ></div>
              </div>
              <!-- Tongue -->
              <div
                class="absolute -bottom-2 w-4 h-5 bg-rose-400 rounded-b-full shadow-sm z-[-1] animate-pulse"
                :class="{ 'w-2.5 h-3 -bottom-1': isScrolledDown }"
              ></div>
            </div>

            <!-- Blush -->
            <div
              class="absolute top-1/2 -mt-4 left-[20%] bg-rose-400/80 rounded-full blur-[2px] z-10 transition-all duration-500"
              :class="isScrolledDown ? 'w-2 h-1' : 'w-3.5 h-1.5'"
            ></div>
            <div
              class="absolute top-1/2 -mt-4 right-[20%] bg-rose-400/80 rounded-full blur-[2px] z-10 transition-all duration-500"
              :class="isScrolledDown ? 'w-2 h-1' : 'w-3.5 h-1.5'"
            ></div>
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

/* Custom dog styling and animations */

/* Speech bubble floating animation */
@keyframes bubble-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
</style>
