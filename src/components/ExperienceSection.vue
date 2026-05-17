<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import dashboardImg from '@/assets/images/dashboard.png'
import ecommerceImg from '@/assets/images/ecommerce.png'
import kanbanImg from '@/assets/images/kanban.png'

import hack4gov4Img1 from '@/assets/images/hack4gov4_1.png'
import hack4gov4Img2 from '@/assets/images/hack4gov4_2.jpg'
import hack4gov4Img3 from '@/assets/images/hack4gov4_3.jpg'
import hack4gov4Img4 from '@/assets/images/hack4gov4_4.jpg'

import flutterImg1 from '@/assets/images/flutter_1.png'
import flutterImg2 from '@/assets/images/flutter_2.jpg'
import flutterImg3 from '@/assets/images/flutter_3.jpg'

import hack4gov3Img1 from '@/assets/images/hack4gov3_1.png'
import hack4gov3Img8 from '@/assets/images/hack4gov3_2.jpg'
import hack4gov3Img3 from '@/assets/images/hack4gov3_3.jpg'
import hack4gov3Img4 from '@/assets/images/hack4gov3_4.jpg'
import hack4gov3Img5 from '@/assets/images/hack4gov3_5.jpg'
import hack4gov3Img6 from '@/assets/images/hack4gov3_6.jpg'
import hack4gov3Img7 from '@/assets/images/hack4gov3_7.jpg'
import hack4gov3Img2 from '@/assets/images/hack4gov3_8.png'

import psiteImg1 from '@/assets/images/psite_1.jpg'
import psiteImg2 from '@/assets/images/psite_2.jpg'
import psiteImg3 from '@/assets/images/psite_3.jpg'

import ojtImg1 from '@/assets/images/intern_1.jpg'
import ojtImg2 from '@/assets/images/intern_2.jpg'

const experiences = [
  {
    role: 'Web Developer Intern',
    company: 'St. Francis Xavier College',
    period: '2026 - Present',
    description:
      'Contributed to the development of the school official website (sfxc.edu.ph), focusing on improving front-end design and user experience. ',
    skills: ['Vue.js', 'Laravel', 'MySQL'],
    images: [ojtImg1, ojtImg2],
  },
  {
    role: 'Hack4Gov4 Capture the Flag Competition',
    company: 'Department of Information and Communications Technology',
    period: '2025',
    description:
      'Competed in the Hack4Gov4 CTF Competition, securing 5th place in a regional cybersecurity competition hosted by the Department of Information and Communications Technology. Focused on Web Exploitation, Digital Forensics, Cryptography, and General Skills—a challenging discipline that tests participants’ ability to identify, analyze, and exploit vulnerabilities in-order to capture the flag.',
    skills: ['Linux', 'Web Exploitation', 'Digital Forensics', 'Cryptography', 'General Skills'],
    images: [hack4gov4Img1, hack4gov4Img2, hack4gov4Img3, hack4gov4Img4],
  },
  {
    role: 'Mobile App Development Using Flutter Framework Training',
    company: 'Department of Information and Communications Technology',
    period: '2025',
    description:
      'Learned the basics of mobile app development using the Flutter framework. Gained knowledge in building responsive and user-friendly mobile applications with clean architecture and intuitive user interfaces.',
    skills: ['Flutter', 'Firebase'],
    images: [flutterImg1, flutterImg2, flutterImg3],
  },
  {
    role: 'Hack4Gov3 Capture the Flag Competition',
    company: 'Department of Information and Communications Technology',
    period: '2024',
    description:
      'Competed in the Hack4Gov3 CTF Competition, securing 4th place in a regional cybersecurity competition hosted by the Department of Information and Communications Technology. Focused on Web Exploitation, Digital Forensics, Cryptography, and General Skills—a challenging discipline that tests participants’ ability to identify, analyze, and exploit vulnerabilities in-order to capture the flag.',
    skills: ['Linux', 'Web Exploitation', 'Digital Forensics', 'Cryptography', 'General Skills'],
    images: [
      hack4gov3Img1,
      hack4gov3Img2,
      hack4gov3Img3,
      hack4gov3Img4,
      hack4gov3Img5,
      hack4gov3Img6,
      hack4gov3Img7,
      hack4gov3Img8,
    ],
  },
  {
    role: 'PSITE Programming Competition',
    company: 'Philippine Society of Information Technology Students',
    period: '2024',
    description:
      'Competed in the PSITE Programming Competition, securing 7th place in the regional level. Focused on programming challenges that tested participants’ ability to identify, analyze, and solve problems.',
    skills: ['Python'],
    images: [psiteImg1, psiteImg2, psiteImg3],
  },
]

const selectedItem = ref<(typeof experiences)[0] | null>(null)
const isGalleryOpen = ref(false)
const fullScreenImage = ref<string | null>(null)

function openGallery(item: (typeof experiences)[0]) {
  selectedItem.value = item
  isGalleryOpen.value = true
}
</script>

<template>
  <section id="experience" class="py-24 sm:py-32 bg-muted/30">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center gap-4 mb-16">
        <h2
          class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap"
        >
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
                <div
                  class="text-base font-medium text-foreground group-hover:text-primary transition-colors"
                >
                  {{ exp.company }}
                </div>

                <div
                  class="text-xs text-primary font-medium mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  View systems
                </div>
              </div>

              <!-- Role & Description -->
              <div class="sm:w-2/3 relative">
                <h3 class="text-xl sm:text-2xl font-semibold text-foreground mb-3">
                  {{ exp.role }}
                </h3>
                <p
                  class="text-sm text-muted-foreground leading-relaxed mb-5 group-hover:text-muted-foreground/90"
                >
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

            <Separator
              v-if="index !== experiences.length - 1"
              class="absolute bottom-0 left-8 right-8 bg-border/40 group-hover:opacity-0 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Dialog -->
    <Dialog v-model:open="isGalleryOpen">
      <DialogContent
        class="w-[95vw] sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border"
      >
        <DialogHeader>
          <DialogTitle class="text-xl font-semibold pr-6"
            >{{ selectedItem?.role }} @ {{ selectedItem?.company }}</DialogTitle
          >
          <DialogDescription class="text-muted-foreground">{{
            selectedItem?.description
          }}</DialogDescription>
        </DialogHeader>

        <div class="mt-6 relative px-4 sm:px-8 pb-4">
          <Carousel class="w-full">
            <CarouselContent>
              <CarouselItem v-for="(img, idx) in selectedItem?.images" :key="idx">
                <div class="p-1">
                  <div
                    class="overflow-hidden rounded-lg border border-border/50 bg-muted/50 flex items-center justify-center aspect-video relative group cursor-zoom-in"
                    @click="fullScreenImage = img"
                  >
                    <img
                      :src="img"
                      alt="Gallery image"
                      class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div
                      class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="drop-shadow-lg"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                        <path d="M8 11h6" />
                        <path d="M11 8v6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              class="absolute left-0 sm:-left-4 bg-background/80 hover:bg-accent border-border"
            />
            <CarouselNext
              class="absolute right-0 sm:-right-4 bg-background/80 hover:bg-accent border-border"
            />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>

    <!-- Full Screen Image Viewer -->
    <Dialog :open="!!fullScreenImage" @update:open="(val) => { if (!val) fullScreenImage = null }">
      <DialogContent class="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0 border-none bg-transparent shadow-none [&>button]:hidden">
        <DialogTitle class="sr-only">Full Screen Image</DialogTitle>
        <DialogDescription class="sr-only">A full screen view of the selected gallery image.</DialogDescription>
        <div
          class="w-full h-full flex items-center justify-center bg-background/95 backdrop-blur-xl p-2 sm:p-6 cursor-zoom-out"
          @click="fullScreenImage = null"
        >
          <img
            v-if="fullScreenImage"
            :src="fullScreenImage"
            alt="Full screen view"
            class="max-w-full max-h-full object-contain rounded-md shadow-2xl"
          />
          <!-- Close button -->
          <Button
            variant="ghost"
            size="icon"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-background/50 hover:bg-background z-50"
            @click.stop="fullScreenImage = null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </section>
</template>
