<script setup>
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/stores/playerStore";
import { useRankedStore} from "@/stores/rankedStore";
import { useMatchHistoryStore } from "@/stores/matchHistoryStore";

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

const updateData = async ()=>{
    await player.updatePlayer();
    await ranked.updateRankedStats();
    await matchHistory.updateMatchHistory();
}

</script>
<template>
    <div v-if="player.isLoading===true && player.isError===false">Loading Player...</div>
    <div v-if="player.isLoading===false && player.isError===true">Error occurred</div>
    <div v-if="player.isLoading===false && player.isError===false">
        {{ player.puuid }}
        {{ player.level }}
        {{ ranked.solo_tier }}
        {{ ranked.solo_rank }}
        {{ matchHistory.matches[0] }}
        {{ matchHistory.last_update }}
    </div>
    {{ matchHistory.isLoading }}
    {{ matchHistory.isError }}
    {{ matchHistory.statusCode }}
    <button @click="updateData" class="bg-blue-500 rounded-md p-2">Update</button>
</template>