import { defineStore } from "pinia";
import { ref } from "vue";
import { usePlayerStore } from "./playerStore";

export const useRankedStore = defineStore('ranked', ()=> {

    const player = usePlayerStore();
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
    
    const isLoading = ref(false);
    const isError = ref(false);
    const statusCode = ref(0);

    const fetchRankedStats = async ()=>{
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`http://localhost:3000/getRankedStats/${player.puuid}`, {method: 'GET'});
            if(res.status && res.status===200){
                //Successfully recieved a response
                const data = await res.json();
                solo_tier.value = data.solo_tier;
                solo_rank.value = data.solo_rank;
                solo_lp.value = data.solo_lp;
                solo_wins.value = data.solo_wins;
                solo_losses.value = data.solo_losses;
                flex_tier.value = data.flex_tier;
                flex_rank.value = data.flex_rank;
                flex_lp.value = data.flex_lp;
                flex_wins.value = data.flex_wins;
                flex_losses.value = data.flex_losses;

                statusCode.value = res.status;
                isError.value = false;
                isLoading.value = false;
            }
            else if(res.status && res.status!=200){
                //Error with fetching data
                statusCode.value = res.status;
                isError.value = true;
                isLoading.value = false;
            }
            else{
                //Error without a status
                statusCode.value = 500;
                isError.value = true;
                isLoading.value = false;
            }
        }
        catch(error){
            if(error.status){
                statusCode.value = error.status;
            }
            else{
                statusCode.value = 500;
            }
            isError.value = true;
            isLoading.value = false;
        }
    }
    const updateRankedStats = async ()=>{
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`http://localhost:3000/updateRankedStats/${player.region}/${player.summoner_id}/${player.puuid}`, {method: 'PUT'});
            if(res.status && res.status===200){
                //Successfully recieved a response
                const data = await res.json();
                solo_tier.value = data.solo_tier;
                solo_rank.value = data.solo_rank;
                solo_lp.value = data.solo_lp;
                solo_wins.value = data.solo_wins;
                solo_losses.value = data.solo_losses;
                flex_tier.value = data.flex_tier;
                flex_rank.value = data.flex_rank;
                flex_lp.value = data.flex_lp;
                flex_wins.value = data.flex_wins;
                flex_losses.value = data.flex_losses;

                statusCode.value = res.status;
                isError.value = false;
                isLoading.value = false;
            }
            else if(res.status && res.status!=200){
                //Error with fetching data
                statusCode.value = res.status;
                isError.value = true;
                isLoading.value = false;
            }
            else{
                //Error without a status
                statusCode.value = 500;
                isError.value = true;
                isLoading.value = false;
            }
        }
        catch(error){
            if(error.status){
                statusCode.value = error.status;
            }
            else{
                statusCode.value = 500;
            }
            isError.value = true;
            isLoading.value = false;
        }
    };
    return { solo_tier, solo_rank, solo_lp, solo_wins, solo_losses, flex_tier, flex_rank, flex_lp, flex_wins, flex_losses, isLoading, isError, statusCode, fetchRankedStats, updateRankedStats}
})