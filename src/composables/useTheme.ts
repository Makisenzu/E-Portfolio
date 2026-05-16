import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  function applyTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  function initTheme() {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      isDark.value = true
    } else if (stored === 'light') {
      isDark.value = false
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme(isDark.value)
  }

  onMounted(() => {
    initTheme()
  })

  watch(isDark, (val) => {
    applyTheme(val)
  })

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
}
