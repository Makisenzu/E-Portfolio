<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Subtle grid background pattern -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
      <div
        class="absolute inset-0"
        style="background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 60px 60px;"
      />
    </div>

    <!-- Floating gradient orbs -->
    <div class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style="animation-duration: 8s;" />
    <div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-muted/30 rounded-full blur-3xl animate-pulse" style="animation-duration: 12s;" />

    <div
      class="relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ease-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <!-- Status indicator -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span class="text-xs text-muted-foreground font-medium tracking-wide">Available for work</span>
      </div>

      <!-- Main heading -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
        I build things<br />
        <span class="text-muted-foreground">for the web.</span>
      </h1>

      <!-- Subtitle -->
      <p class="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
        Full-stack developer crafting clean, performant, and accessible digital experiences. Focused on modern technologies and thoughtful design.
      </p>

      <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          id="hero-cta-projects"
          size="lg"
          class="w-full sm:w-auto"
          @click="$el.closest('section')?.parentElement?.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })"
        >
          View Projects
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
        </Button>
        <Button
          id="hero-cta-contact"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto"
          @click="$el.closest('section')?.parentElement?.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })"
        >
          View Experience
        </Button>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style="animation-duration: 2s;">
      <span class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">Scroll</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/40"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
    </div>
  </section>
</template>
