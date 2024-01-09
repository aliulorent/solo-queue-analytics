<script setup>
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/stores/playerStore";
import { useRankedStore} from "@/stores/rankedStore";
import { useMatchHistoryStore } from "@/stores/matchHistoryStore";
import UserDisplay from "../components/UserDisplay.vue"
import SearchBar from "@/components/SearchBar.vue";
import MatchHistoryDisplay from "@/components/MatchHistoryDisplay.vue";
import StatsPanel from "@/components/StatsPanel.vue";

const player = usePlayerStore();
const ranked = useRankedStore();
const matchHistory = useMatchHistoryStore();
const route = useRoute();
const {region, name, tag} = route.params;

const loadData = async ()=>{
    player.reset();
    ranked.reset();
    matchHistory.reset();
    player.setSearch(region, name, tag);
    await player.fetchPlayer();
    await ranked.fetchRankedStats();
    await matchHistory.fetchMatchHistory();
};
loadData();

</script>
<template>
    <div class="flex flex-row justify-center sticky top-0 bg-base-300 pb-2 pt-0 z-20 drop-shadow-lg">
        <SearchBar/>
    </div>
    <div v-if="player.isLoading===true && player.isError===false" class="flex justify-center">
        <span class="loading loading-ring loading-lg m-8"></span>
    </div>
    <div v-if="player.isLoading===false && player.isError===true">
        <h1 v-if="player.statusCode===404" class="text-3xl text-white text-center m-8">Player not found! Check for correct spelling.</h1>
        <h1 v-else class="text-3xl text-white text-center m-8">An unexpected error occurred! Please try again in a few minutes...</h1>
    </div>
    <div v-if="player.isLoading===false && player.isError===false" class="pt-4">
        <UserDisplay/>
        <div class="flex gap-3 justify-center mx-4">
            <StatsPanel/>
            <MatchHistoryDisplay/>
        </div>
    </div>
</template>