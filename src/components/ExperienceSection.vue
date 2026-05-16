<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import dashboardImg from '@/assets/images/dashboard.png'
import ecommerceImg from '@/assets/images/ecommerce.png'
import kanbanImg from '@/assets/images/kanban.png'

const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Leading the development for an enterprise SaaS platform. Architected the transition to modern frameworks, improving application performance by 40% and significantly reducing bug rates.',
    skills: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    images: [dashboardImg, kanbanImg]
  },
  {
    role: 'Software Engineer',
    company: 'Digital Solutions LLC',
    period: '2019 - 2022',
    description: 'Developed and maintained various client web applications. Implemented robust RESTful APIs and seamlessly integrated third-party payment gateways for e-commerce clients.',
    skills: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    images: [ecommerceImg, dashboardImg]
  },
  {
    role: 'Web Developer Intern',
    company: 'Creative Agency',
    period: '2018 - 2019',
    description: 'Assisted in building responsive marketing websites. Learned industry best practices for web accessibility, semantic HTML, and performance optimization.',
    skills: ['HTML/CSS', 'JavaScript', 'PHP', 'WordPress'],
    images: [kanbanImg, ecommerceImg]
  }
]

const selectedItem = ref<typeof experiences[0] | null>(null)
const isGalleryOpen = ref(false)

function openGallery(item: typeof experiences[0]) {
  selectedItem.value = item
  isGalleryOpen.value = true
}
</script>

<template>
  <section id="experience" class="py-24 sm:py-32 bg-muted/30">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-16">
        <h2 class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          Experience
        </h2>
        <Separator class="flex-1" />
      </div>

      <div class="max-w-4xl">
        <div class="space-y-6">
          <div 
            v-for="(exp, index) in experiences" 
            :key="index"
            class="group relative cursor-pointer bg-transparent hover:bg-card/40 p-6 sm:p-8 rounded-xl transition-all duration-300 border border-transparent hover:border-border/60 hover:shadow-sm overflow-hidden"
            @click="openGallery(exp)"
          >
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 relative z-10">
              <!-- Period & Company -->
              <div class="sm:w-1/3 shrink-0 pt-1">
                <div class="text-sm font-mono text-muted-foreground mb-1.5">{{ exp.period }}</div>
                <div class="text-base font-medium text-foreground group-hover:text-primary transition-colors">{{ exp.company }}</div>
                
                <div class="text-xs text-primary font-medium mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  View systems
                </div>
              </div>

              <!-- Role & Description -->
              <div class="sm:w-2/3 relative">
                <h3 class="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                  {{ exp.role }}
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed mb-5 group-hover:text-muted-foreground/90">
                  {{ exp.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="skill in exp.skills" 
                    :key="skill"
                    class="text-xs font-medium text-muted-foreground/70 bg-accent/50 border border-border/50 px-2.5 py-1 rounded-md group-hover:border-border/80 transition-colors"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            
            <Separator v-if="index !== experiences.length - 1" class="absolute bottom-0 left-8 right-8 bg-border/40 group-hover:opacity-0 transition-opacity" />
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Dialog -->
    <Dialog v-model:open="isGalleryOpen">
      <DialogContent class="sm:max-w-[800px] bg-background/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle class="text-xl font-semibold">{{ selectedItem?.role }} @ {{ selectedItem?.company }}</DialogTitle>
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
