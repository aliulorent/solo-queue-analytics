<script setup>
import SearchBar from "../components/SearchBar.vue"
</script>
<template>
    <div class="flex flex-col justify-center items-center gap-4 min-h-screen">
        <div>
            <!-- Title Container -->
            <h1 class="text-5xl font-bold -mt-20">Solo <span class="text-secondary">Queue </span> Analytics</h1>
        </div>
        <SearchBar />
    </div>
</template>