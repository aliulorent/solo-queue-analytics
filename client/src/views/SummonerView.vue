<script setup>
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/stores/playerStore";
import { useRankedStore} from "@/stores/rankedStore";
import { useMatchHistoryStore } from "@/stores/matchHistoryStore";
import UserDisplay from "../components/UserDisplay.vue"
import SearchBar from "@/components/SearchBar.vue";
import MatchHistoryDisplay from "@/components/MatchHistoryDisplay.vue";

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
        <UserDisplay/>
        <div class="flex">
            <div>Temp</div>
            <MatchHistoryDisplay/>
        </div>
    </div>
</template>