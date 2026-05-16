<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import dashboardImg from '@/assets/images/dashboard.png'
import ecommerceImg from '@/assets/images/ecommerce.png'
import kanbanImg from '@/assets/images/kanban.png'

const projects = [
  {
    title: 'Task Flow',
    description: 'A project management application with real-time collaboration, kanban boards, and analytics dashboard. Built for teams that value simplicity.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
    link: '#',
    github: '#',
    featured: true,
    images: [kanbanImg, dashboardImg]
  },
  {
    title: 'Apex Store',
    description: 'Full-stack e-commerce platform featuring product management, secure checkout, and an admin panel with inventory tracking.',
    tech: ['React', 'Express', 'MongoDB', 'Stripe'],
    link: '#',
    github: '#',
    featured: true,
    images: [ecommerceImg, dashboardImg]
  },
  {
    title: 'Weather Lens',
    description: 'Weather visualization app with interactive maps, 7-day forecasts, and location-based alerts using real-time API data.',
    tech: ['TypeScript', 'Vue.js', 'Mapbox', 'REST API'],
    link: '#',
    github: '#',
    featured: false,
    images: [dashboardImg, kanbanImg]
  },
  {
    title: 'Dev Notes',
    description: 'A markdown-powered note-taking app with syntax highlighting, folder organization, and cloud sync for developers.',
    tech: ['Vue.js', 'Firebase', 'Markdown', 'PWA'],
    link: '#',
    github: '#',
    featured: false,
    images: [kanbanImg, ecommerceImg]
  },
]

const selectedItem = ref<typeof projects[0] | null>(null)
const isGalleryOpen = ref(false)

function openGallery(item: typeof projects[0]) {
  selectedItem.value = item
  isGalleryOpen.value = true
}
</script>

<template>
  <section id="projects" class="py-24 sm:py-32">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <h2 class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          Projects
        </h2>
        <Separator class="flex-1" />
      </div>

      <!-- Featured projects -->
      <div class="space-y-6 mb-16">
        <div
          v-for="(project, index) in projects.filter(p => p.featured)"
          :key="project.title"
          class="group relative rounded-xl border border-border bg-card/30 hover:bg-card/60 hover:border-border/80 transition-all duration-300 overflow-hidden cursor-pointer"
          @click="openGallery(project)"
        >
          <div class="p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div class="flex-1 space-y-3">
                <!-- Project number + label -->
                <div class="flex items-center gap-3">
                  <span class="text-[11px] font-mono text-muted-foreground/40">0{{ index + 1 }}</span>
                  <Badge variant="outline" class="text-[10px] uppercase tracking-wider font-normal">Featured</Badge>
                </div>

                <h3 class="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {{ project.title }}
                </h3>

                <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {{ project.description }}
                </p>

                <!-- Tech stack -->
                <div class="flex flex-wrap gap-2 pt-2">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="text-xs font-mono text-muted-foreground/70 bg-accent/30 px-2 py-0.5 rounded"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <div class="text-xs text-primary font-medium mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  Click to view gallery
                </div>
              </div>

              <!-- Links -->
              <div class="flex items-center gap-2 sm:pt-8" @click.stop>
                <Button variant="ghost" size="icon-sm" as="a" :href="project.github" target="_blank" aria-label="View source">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </Button>
                <Button variant="ghost" size="icon-sm" as="a" :href="project.link" target="_blank" aria-label="View live">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                </Button>
              </div>
            </div>
          </div>

          <!-- Subtle gradient accent on hover -->
          <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <!-- Other projects grid -->
      <h3 class="text-sm font-medium text-muted-foreground mb-6">Other noteworthy projects</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="project in projects.filter(p => !p.featured)"
          :key="project.title"
          class="group relative p-5 rounded-lg border border-border bg-card/20 hover:bg-card/50 hover:border-border/80 transition-all duration-300 cursor-pointer"
          @click="openGallery(project)"
        >
          <div class="flex items-start justify-between mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground/50 group-hover:text-primary transition-colors"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
            <div class="flex gap-1" @click.stop>
              <Button variant="ghost" size="icon-sm" as="a" :href="project.github" target="_blank" aria-label="View source" class="h-7 w-7">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Button>
              <Button variant="ghost" size="icon-sm" as="a" :href="project.link" target="_blank" aria-label="View live" class="h-7 w-7">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
              </Button>
            </div>
          </div>

          <h4 class="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {{ project.title }}
          </h4>
          <p class="text-sm text-muted-foreground leading-relaxed mb-4">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="text-[11px] font-mono text-muted-foreground/60"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Dialog -->
    <Dialog v-model:open="isGalleryOpen">
      <DialogContent class="sm:max-w-[800px] bg-background/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle class="text-xl font-semibold">{{ selectedItem?.title }}</DialogTitle>
          <DialogDescription class="text-muted-foreground">{{ selectedItem?.description }}</DialogDescription>
        </DialogHeader>
        
        <div class="mt-6 relative px-8 pb-4">
          <Carousel class="w-full">
            <CarouselContent>
              <CarouselItem v-for="(img, idx) in selectedItem?.images" :key="idx">
                <div class="p-1">
                  <div class="overflow-hidden rounded-lg border border-border/50 bg-muted/50 flex items-center justify-center aspect-video relative group">
                    <img :src="img" alt="Gallery image" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.02]" />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="absolute -left-4 bg-background hover:bg-accent border-border" />
            <CarouselNext class="absolute -right-4 bg-background hover:bg-accent border-border" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  </section>
</template>
