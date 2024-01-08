<script setup>
import { usePlayerStore } from "@/stores/playerStore";
import { useRankedStore} from "@/stores/rankedStore";
import { useMatchHistoryStore } from "@/stores/matchHistoryStore";
import { computed } from "vue";
const player = usePlayerStore();
const ranked = useRankedStore();
const matchHistory = useMatchHistoryStore();
const soloWinRate = computed(()=>{
    if(ranked && ranked.solo_wins){
        return Math.round((ranked.solo_wins / (ranked.solo_wins + ranked.solo_losses) * 100));
    }
    else{
        return 0;
    }
})
const flexWinRate = computed(()=>{
    if(ranked && ranked.flex_wins){
        return Math.round((ranked.flex_wins / (ranked.flex_wins + ranked.flex_losses) * 100));
    }
    else{
        return 0;
    }
})
const updateData = async ()=>{
    console.log("Updating Data...");
    await player.updatePlayer();
    await ranked.updateRankedStats();
    await matchHistory.updateMatchHistory();
}
</script>
<template>
    <!-- Main Container for header section that displays user info -->
    <div v-if="!player.isLoading && !player.isError" class="flex justify-center items-center bg-base-100 p-2">
        <!-- Container for picture + name stuff -->
        <div class="flex flex-row justify-end">
            <!-- Icon Wrapper -->
            <div class="flex flex-col items-center relative">
                <div class="px-1 py-0 rounded-t-md rounded-b-none text-white absolute -bottom-3 inset-x-0 flex justify-center"><h3 class="bg-base-100 rounded-full p-2 py-0 outline outline-2 outline-base-300 text-xs">{{ player.level }}</h3></div>
                <img 
                :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${player.icon_id}.png`" 
                :alt="`Icon ${player.icon_id} from League of Legends.`"
                width="100px"
                height="100px"
                class="outline outline-3 outline-base-300">
            </div>
            <div class="flex flex-col justify-center">
                <div class="flex gap-2 m-3 text-3xl">
                    <h1 class="font-bold text-white">{{ player.riot_name }}</h1>
                    <h1 class="font-bold text-gray-500">{{ "#"+player.tag_line }}</h1>
                </div>
                <div class="">
                    <button @click="updateData" class="rounded-lg bg-primary text-primary-content p-1 px-2 mx-3" >Update</button>
                </div>
            </div>
        </div>
        <!-- Container for ranked information -->
        <div class="flex flex-row">
            <!-- Solo Queue Info -->
            <div class="flex flex-col items-center">
                <div class="ml-3 pb-0">
                    <h3 class="font-semibold text-gray-500">Ranked Solo/Duo</h3>
                </div>
                <div v-if="ranked && ranked.solo_tier" class="flex flex-row p-3 gap-4">
                    <div>
                        <img 
                        :src="`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/${ranked.solo_tier.toLowerCase()}.png`"
                        :alt="`${ranked.solo_tier} tier for League of Legends.`"
                        width="80px"
                        height="80px">
                    </div>
                    <div class="flex flex-col justify-center">
                        <div class="flex gap-2 text-3xl">
                            <h1 class="font-bold text-white">{{ ranked.solo_tier }}</h1>
                            <h1 class="font-bold text-white">{{ ranked.solo_rank }}</h1>
                        </div>
                        <div class="font-semibold text-white">
                            <h3> {{ ranked.solo_lp + " LP" }} </h3>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center text-sm text-right ml-2">
                        <h3 class="font-semibold text-white">
                            {{ ranked.solo_wins + "W " + ranked.solo_losses +  "L" }}
                        </h3>
                        <h3 class="font-semibold text-white"> {{ soloWinRate + "% Win Rate" }} </h3>
                    </div>
                </div>
                <div v-else class="flex flex-row p-3 gap-4">
                    <div>
                        <img 
                        :src="`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/unranked.png`"
                        :alt="`${ranked.solo_tier} tier for League of Legends.`"
                        width="80px"
                        height="80px">
                    </div>
                    <div class="flex flex-col justify-center">
                        <div class="flex gap-2 text-3xl">
                            <h1 class="font-bold text-white">{{ "Unranked" }}</h1>
                        </div>
                        <div class="font-semibold text-white">
                            <h3> {{ "0" + " LP" }} </h3>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center text-sm text-right ml-2">
                        <h3 class="font-semibold text-white">
                            {{ "0" + "W " + "0" +  "L" }}
                        </h3>
                        <h3 class="font-semibold text-white"> {{ "0" + "% Win Rate" }} </h3>
                    </div>
                </div>
            </div>
            <!-- Flex Queue Info -->
            <div class="flex flex-col items-center">
                <div class="ml-3">
                    <h3 class="font-semibold text-gray-500">Ranked Flex</h3>
                </div>
                <div v-if="ranked && ranked.flex_tier" class="flex flex-row p-3 gap-4">
                    <div>
                        <img 
                        :src="`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/${ranked.flex_tier.toLowerCase()}.png`"
                        :alt="`${ranked.flex_tier} tier for League of Legends.`"
                        width="80px"
                        height="80px">
                    </div>
                    <div class="flex flex-col justify-center">
                        <div class="flex gap-2 text-3xl">
                            <h1 class="font-bold text-white">{{ ranked.flex_tier }}</h1>
                            <h1 class="font-bold text-white">{{ ranked.flex_rank }}</h1>
                        </div>
                        <div class="font-semibold text-white">
                            <h3> {{ ranked.flex_lp + " LP" }} </h3>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center text-sm text-right ml-2">
                        <h3 class="font-semibold text-white">
                            {{ ranked.flex_wins + "W " + ranked.flex_losses +  "L" }}
                        </h3>
                        <h3 class="font-semibold text-white"> {{ flexWinRate + "% Win Rate" }} </h3>
                    </div>
                </div>
                <div v-else class="flex flex-row p-3 gap-4">
                    <div>
                        <img 
                        :src="`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/extras/tier/unranked.png`"
                        :alt="`${ranked.solo_tier} tier for League of Legends.`"
                        width="80px"
                        height="80px">
                    </div>
                    <div class="flex flex-col justify-center">
                        <div class="flex gap-2 text-3xl">
                            <h1 class="font-bold text-white">{{ "Unranked" }}</h1>
                        </div>
                        <div class="font-semibold text-white">
                            <h3> {{ "0" + " LP" }} </h3>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center text-sm text-right ml-2">
                        <h3 class="font-semibold text-white">
                            {{ "0" + "W " + "0" +  "L" }}
                        </h3>
                        <h3 class="font-semibold text-white"> {{ "0" + "% Win Rate" }} </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>