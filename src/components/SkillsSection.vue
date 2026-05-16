<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

const skillCategories = [
  {
    title: 'Frontend',
    description: 'Building responsive, accessible interfaces',
    skills: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    description: 'Designing scalable server-side systems',
    skills: ['Python', 'REST APIs', 'MySQL', 'Laravel'],
  },
  {
    title: 'Tools & Workflow',
    description: 'Streamlining development processes',
    skills: ['Git', 'Antigravity', 'VS Code', 'Figma', 'Linux'],
  },
]
</script>

<template>
  <section id="skills" class="py-24 sm:py-32 bg-muted/30">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <h2
          class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap"
        >
          Skills
        </h2>
        <Separator class="flex-1" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.title"
          class="group relative"
        >
          <!-- Category card -->
          <div
            class="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-border/80 transition-all duration-300 h-full"
          >
            <!-- Index number -->
            <div class="text-[11px] font-mono text-muted-foreground/40 mb-4">0{{ index + 1 }}</div>

            <h3 class="text-lg font-semibold text-foreground mb-1.5">
              {{ category.title }}
            </h3>
            <p class="text-sm text-muted-foreground mb-6">
              {{ category.description }}
            </p>

            <!-- Skills as badges -->
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="skill in category.skills"
                :key="skill"
                variant="secondary"
                class="font-normal text-xs hover:bg-secondary/80 transition-colors"
              >
                {{ skill }}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
