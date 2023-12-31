import { defineStore } from "pinia";
import { ref } from "vue";

export const useSummonerStore = defineStore('summoner', ()=> {
    // Data from 'users' table
    const puuid = ref("");
    const riot_name = ref("");
    const tag_line = ref("");
    const region = ref("");
    const account_id = ref("");
    const summoner_id = ref("");
    const level = ref(0);
    const icon_id = ref(0);

    // Data from 'ranked_stats' table
    const solo_tier = ref("");
    const solo_rank = ref("");
    const solo_lp = ref(0);
    const solo_wins = ref(0);
    const solo_losses = ref(0);
    const flex_tier = ref("");
    const flex_rank = ref("");
    const flex_lp = ref(0);
    const flex_wins = ref(0);
    const flex_losses = ref(0);

    // Data from 'match_history' table
    const matches= ref([]);
    const last_update = ref("");

    const setSearch = (regionInput, name, tag)=>{
        riot_name.value = name;
        region.value = regionInput;
        tag_line.value = tag;
    }
    const getSummoner = async ()=>{
        
    }
    const getRankedStats = async ()=>{

    }
    const getMatchHistory = async ()=>{

    }

    return { puuid, riot_name, tag_line, region, account_id, summoner_id, level, icon_id, solo_tier, solo_rank, solo_lp, solo_wins, solo_losses, flex_tier, flex_rank, flex_lp, flex_wins, flex_losses, matches, last_update, getSummoner, getRankedStats, getMatchHistory, setSearch }
})