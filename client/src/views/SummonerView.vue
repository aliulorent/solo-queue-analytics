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
    player.setSearch(region, name, tag);
    await player.fetchPlayer();
    await ranked.fetchRankedStats();
    await matchHistory.fetchMatchHistory();
};

loadData();

</script>
<template>
    <div class="flex flex-row justify-center">
        <SearchBar/>
    </div>
    <div v-if="player.isLoading===true && player.isError===false">Loading Player...</div>
    <div v-if="player.isLoading===false && player.isError===true">Error occurred</div>
    <div v-if="player.isLoading===false && player.isError===false">
        <div v-if="matchHistory.isLoading===false && matchHistory.isError===false">
            <UserDisplay/>
        </div>
        <div class="flex">
            <div class="" v-if="matchHistory.isLoading===false && matchHistory.isError===false">
                <StatsPanel/>
            </div>
            <div v-if="matchHistory.isLoading===false && matchHistory.isError===false" class="w-[70%]">
                <MatchHistoryDisplay/>
            </div>
        </div>
    </div>
</template>