<script setup lang="ts">
import { Github, Linkedin, Twitter, Facebook } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-8 border-t border-border">
    <div
      class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p class="text-sm text-muted-foreground">
        <!-- &copy; {{ currentYear }} Denmark Rivera. All rights reserved. -->
      </p>

      <div class="flex items-center gap-6 text-sm text-muted-foreground">
        <a
          href="https://github.com/Makisenzu"
          class="hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/denmark-rivera-2a7904263/"
          class="hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin class="w-5 h-5" />
        </a>
        <a
          href="https://x.com/melorinteamo"
          class="hover:text-foreground transition-colors"
          aria-label="Twitter"
        >
          <Twitter class="w-5 h-5" />
        </a>
        <a
          href="https://www.facebook.com/makisenzu"
          class="hover:text-foreground transition-colors"
          aria-label="Facebook"
        >
          <Facebook class="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
</template>
