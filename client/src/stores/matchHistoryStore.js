import { defineStore } from "pinia";
import { ref} from "vue";
import { usePlayerStore } from "./playerStore";

export const useMatchHistoryStore = defineStore('matchHistory', ()=> {

    const player = usePlayerStore();
    // Data from 'match_history' table
    const matches= ref([]);
    const last_update = ref("");

    const isLoading = ref(true);
    const isError = ref(false);
    const statusCode = ref(0);

    const reset = () =>{
        matches.value = [];
        last_update.value = "";
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
    }

    const fetchMatchHistory =  async ()=>{
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`https://solo-queue-analytics.onrender.com/getMatchHistory/${player.puuid}`, {method: 'GET', mode:'cors'});
            if(res.status && res.status===200){
                //Successfully recieved a response
                const data = await res.json();
                matches.value = data.matches;
                last_update.value = data.last_update;

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
    const updateMatchHistory = async ()=>{
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`https://solo-queue-analytics.onrender.com/updateMatchHistory/${player.region}/${player.puuid}`, {method: 'PUT', mode:'cors'});
            if(res.status && res.status===200){
                //Successfully recieved a response
                const data = await res.json();
                matches.value = data.matches;
                last_update.value = data.last_update;

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

    return {  matches, last_update, isLoading, isError, statusCode, reset, fetchMatchHistory, updateMatchHistory }
})