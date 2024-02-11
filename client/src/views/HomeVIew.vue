<script setup>
import SearchBar from "../components/SearchBar.vue"
</script>
<template>
    <div class="flex flex-col justify-center items-center gap-4 min-h-screen">
        <div class="font-Beaufort">
            <!-- Title Container -->
            <h1 class="text-5xl font-bold -mt-10">Solo <span class="text-secondary">Queue </span> Analytics</h1>
        </div>
        <SearchBar />
    </div>
</template>