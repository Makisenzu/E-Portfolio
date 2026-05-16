<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-8 border-t border-border">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-muted-foreground">
        &copy; {{ currentYear }} Denmark Rivera. All rights reserved.
      </p>
      
      <div class="flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#" class="hover:text-foreground transition-colors">GitHub</a>
        <a href="#" class="hover:text-foreground transition-colors">LinkedIn</a>
        <a href="#" class="hover:text-foreground transition-colors">Twitter</a>
      </div>
    </div>
  </footer>
</template>
