<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <section id="about" class="py-24 sm:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <h2 class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          About
        </h2>
        <Separator class="flex-1" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <!-- Left column - Bio -->
        <div class="lg:col-span-3 space-y-6">
          <h3 class="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            A developer who cares about the details that matter.
          </h3>
          <div class="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm Denmark, a full-stack developer passionate about building software that is both functional and elegant. I specialize in creating responsive web applications with clean architectures and intuitive user interfaces.
            </p>
            <p>
              My approach combines technical precision with creative problem-solving. I believe great software emerges from understanding both the technology and the people who use it. Every line of code I write serves a purpose.
            </p>
            <p>
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects, or refining my craft through continuous learning.
            </p>
          </div>
        </div>

        <!-- Right column - Quick facts -->
        <div class="lg:col-span-2 space-y-8">
          <div class="space-y-6">
            <div v-for="item in [
              { label: 'Location', value: 'Philippines' },
              { label: 'Education', value: 'Computer Science' },
              { label: 'Focus', value: 'Full-Stack Development' },
              { label: 'Languages', value: 'TypeScript, Python, Java' },
            ]" :key="item.label" class="group">
              <div class="text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60 font-medium mb-1">
                {{ item.label }}
              </div>
              <div class="text-sm text-foreground font-medium">
                {{ item.value }}
              </div>
            </div>
          </div>

          <Separator />

          <div class="grid grid-cols-2 gap-6">
            <div v-for="stat in [
              { number: '2+', label: 'Years Experience' },
              { number: '10+', label: 'Projects Built' },
            ]" :key="stat.label">
              <div class="text-3xl font-bold text-foreground tracking-tight">{{ stat.number }}</div>
              <div class="text-xs text-muted-foreground mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
