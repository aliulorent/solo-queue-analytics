<script setup>
import { usePlayerStore } from "@/stores/playerStore";
import { useRankedStore} from "@/stores/rankedStore";
import { computed } from "vue";
const player = usePlayerStore();
const ranked = useRankedStore();
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
</script>
<template>
    <!-- Main Container for header section that displays user info -->
    <div v-if="!player.isLoading && !player.isError" class="flex justify-center items-center">
        <!-- Container for picture + name stuff -->
        <div class="flex flex-row justify-end">
            <!-- Icon Wrapper -->
            <div class="flex flex-col items-center">
                <div class="bg-gray-900 px-1 py-0 rounded-t-md rounded-b-none text-white">{{ player.level }}</div>
                <img 
                :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${player.icon_id}.png`" 
                :alt="`Icon ${player.icon_id} from League of Legends.`"
                width="100px"
                height="100px">
            </div>
            <div class="flex flex-col justify-center">
                <div class="flex gap-2 m-3 text-3xl">
                    <h1 class="font-bold text-white">{{ player.riot_name }}</h1>
                    <h1 class="font-bold text-gray-400">{{ "#"+player.tag_line }}</h1>
                </div>
                <div class="">
                    <button class="rounded-lg bg-blue-500 text-white p-1 px-2 mx-3">Update</button>
                </div>
            </div>
        </div>
        <!-- Container for ranked information -->
        <div v-if="!ranked.isLoading && !ranked.isError" class="flex flex-row">
            <!-- Solo Queue Info -->
            <div v-if="ranked.solo_tier" class="flex flex-col items-center">
                <div class="ml-3">
                    <h3 class="font-semibold text-gray-300">Ranked Solo/Duo</h3>
                </div>
                <div class="flex flex-row p-3 gap-4">
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
            </div>
            <!-- Flex Queue Info -->
            <div v-if="ranked.flex_tier" class="flex flex-col items-center">
                <div class="ml-3">
                    <h3 class="font-semibold text-gray-300">Ranked Flex</h3>
                </div>
                <div class="flex flex-row p-3 gap-4">
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
            </div>
        </div>
    </div>
</template>