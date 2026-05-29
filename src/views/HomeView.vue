<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ReferencesSection from '@/components/ReferencesSection.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <ReferencesSection />
    <TheFooter />
  </main>
</template>
