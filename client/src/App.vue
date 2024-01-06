<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="bg-base-300 min-h-screen">
    <RouterView :key="$route.fullPath"/>
  </main>
</template>

<style scoped>
</style>
