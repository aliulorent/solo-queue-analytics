<script setup>
import { useMatchHistoryStore } from "@/stores/matchHistoryStore";
import { usePlayerStore } from "../stores/playerStore";
const matchHistory = useMatchHistoryStore();
const player = usePlayerStore();

function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' second(s) ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minute(s) ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hour(s) ago';   
    }
    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' day(s) ago';   
    }
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' month(s) ago';   
    }
    else {
         return Math.round(elapsed/msPerYear ) + ' year(s) ago';   
    }
}
const summonerSpellMap ={
    21 : "SummonerBarrier",
    1 : "SummonerBoost",
    14 : "SummonerDot",
    3 : "SummonerExhaust",
    4 : "SummonerFlash",
    6 : "SummonerHaste",
    7 : "SummonerHeal",
    13 : "SummonerMana",
    11 : "SummonerSmite",
    12: "SummonerTeleport"
}
</script>
<template>
    <!-- Container for the whole match history -->
    <div class="">
        <!-- Container for each match -->
        <div v-for="(match, index) in matchHistory.matches" :key="match.info.gameId" class="flex flex-row gap-3 bg-blue-800 rounded-xl m-4 p-4">
            <!-- Text container: Queue, Win/Loss, Duration, Data -->
            <div class="flex flex-col justify-center items-center text-white">
                <h3>{{ match.info.queueId===420 ? "Ranked Solo/Duo" : "Ranked Flex" }}</h3>
                <h3>{{ timeDifference(Date.now() , match.info.gameEndTimestamp) }}</h3>
                <h2>{{ match.info.participants.find(p=>(p.puuid===player.puuid)).win ? "WIN" : "LOSS"  }}</h2>
                <h3>{{ Math.floor(match.info.gameDuration/60) + "m " + match.info.gameDuration % 60 + "s" }}</h3>
            </div>
            <!-- Picture container: Champion played icon -->
            <div class="relative flex items-center">
                <img 
                :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants.find(p=>(p.puuid===player.puuid)).championName}.png`" 
                :alt="`Champion Square Icon`" 
                width="100px" 
                height="100px">
                <h3 class="absolute bottom-1 left-1 text-white font-bold">{{ match.info.participants.find(p=>(p.puuid===player.puuid)).champLevel }}</h3>
            </div>
            <!-- Summoner Spells & potentially Runes Container -->
            <div class="flex flex-col justify-center">
                <img
                :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${summonerSpellMap[match.info.participants.find(p=>(p.puuid===player.puuid)).summoner1Id]}.png`"
                :alt="`Summoner Spell Icon`"
                width="20px"
                height="20px">
                <img
                :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${summonerSpellMap[match.info.participants.find(p=>(p.puuid===player.puuid)).summoner2Id]}.png`"
                :alt="`Summoner Spell Icon`"
                width="20px"
                height="20px">
            </div>
            <!-- KDA Container -->
            <div class="flex flex-col justify-center items-center m-3 text-white">
                <h2>{{ `${match.info.participants.find(p=>(p.puuid===player.puuid)).kills} / ${match.info.participants.find(p=>(p.puuid===player.puuid)).deaths} / ${match.info.participants.find(p=>(p.puuid===player.puuid)).assists}` }}</h2>
                <h3>{{ "KDA: " + match.info.participants.find(p=>(p.puuid===player.puuid)).challenges.kda.toFixed(2)}}</h3>
            </div>
            <!-- Items Container -->
            <div class="flex flex-row items-center gap-1">
                <div v-for="i in 7" :key="i" class="rounded-sm ">
                    <img v-if="match.info.participants.find(p=>(p.puuid===player.puuid))[`item${i-1}`]!=0"
                    :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${match.info.participants.find(p=>(p.puuid===player.puuid))[`item${i-1}`]}.png`"
                    :alt="`Picture of an item slot`"
                    width="30px"
                    height="30px">
                    <div v-else class="w-[30px] h-[30px] bg-blue-400"></div>
                </div>
            </div>
            <!-- Participants container -->
            <div class="flex flex-row gap-4">
                <!-- Team 1 -->
                <div class="flex flex-col">
                    <div v-for="n in 5" :key="n" class="flex items-center">
                        <img 
                        :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[n-1].championName}.png`" 
                        :alt="`Champion Square Icon`" 
                        class="w-[20px] h-[20px]">
                        <h3 class="text-white">{{ match.info.participants[n-1].riotIdGameName }}</h3>
                    </div>
                </div>
                <!-- Team 2 -->
                <div class="flex flex-col">
                    <div v-for="n in 5" :key="n" class="flex items-center">
                        <img 
                        :src="`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${match.info.participants[n+4].championName}.png`" 
                        :alt="`Champion Square Icon`" 
                        class="w-[20px] h-[20px]">
                        <h3 class="text-white">{{ match.info.participants[n+4].riotIdGameName }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>