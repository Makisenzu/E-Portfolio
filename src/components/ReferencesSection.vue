<script setup lang="ts">
import { Separator } from '@/components/ui/separator'

const references = [
  {
    name: 'Irene May C. Escauso, Ph.D.',
    title: 'Philippine Society of Information Technology Educators President 2024',
    organization: 'Caraga State University Cabadbaran Campus',
    relationship: 'Former Program Head',
    email: 'irenemayce03@gmail.com',
    phone: '09778175694',
  },
  {
    name: 'Robert Jhun V. Lagang, MSIT',
    title: 'BSIT Program Head',
    organization: 'St. Francis Xavier College',
    relationship: 'Program Head',
    email: 'jrene2018@gmail.com',
    phone: '09090512043',
  },
  {
    name: 'James Raphael B. Ibay, MITc',
    title: 'BSIT Adviser',
    organization: 'St. Francis Xavier College',
    relationship: 'Adviser',
    email: 'jmsrplit@gmail.com',
    phone: '09156896866',
  },
  {
    name: 'Ronald D. Besinga',
    title: 'DSWD Programmer',
    organization: 'Department of Social Welfare and Development',
    relationship: 'Former Instructor',
    email: 'ronaldbesinga287@gmail.com',
    phone: '09090697390',
  },
]
</script>

<template>
  <section id="references" class="py-24 sm:py-32 bg-muted/30">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Section header -->
      <div class="flex items-center gap-4 mb-16">
        <h2
          class="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap"
        >
          References
        </h2>
        <Separator class="flex-1" />
      </div>

      <div class="max-w-4xl">
        <p class="text-muted-foreground leading-relaxed mb-12">
          Professional and character references available upon request. Below are individuals who
          can speak to my skills, work ethic, and character.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(ref, index) in references"
            :key="index"
            class="group relative p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-border/80 hover:shadow-sm transition-all duration-300"
          >
            <!-- Decorative accent line -->
            <div
              class="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <!-- Quote icon -->
            <div class="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary/40 group-hover:text-primary/60 transition-colors"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>

            <!-- Name -->
            <h3
              class="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
            >
              {{ ref.name }}
            </h3>

            <!-- Title & Organization -->
            <p class="text-sm text-muted-foreground mb-1">{{ ref.title }}</p>
            <p class="text-sm text-muted-foreground/70 mb-3">{{ ref.organization }}</p>

            <!-- Relationship badge -->
            <span
              class="inline-block text-xs font-medium text-muted-foreground/70 bg-accent/50 border border-border/50 px-2.5 py-1 rounded-md mb-5 group-hover:border-border/80 transition-colors"
            >
              {{ ref.relationship }}
            </span>

            <Separator class="mb-4 bg-border/40" />

            <!-- Contact info -->
            <div class="space-y-2.5">
              <a
                :href="`mailto:${ref.email}`"
                class="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
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
                  class="shrink-0 text-muted-foreground/50 group-hover/link:text-primary transition-colors"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span class="truncate">{{ ref.email }}</span>
              </a>
              <a
                :href="`tel:${ref.phone}`"
                class="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
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
                  class="shrink-0 text-muted-foreground/50 group-hover/link:text-primary transition-colors"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  />
                </svg>
                <span>{{ ref.phone }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
