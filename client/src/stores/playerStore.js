import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore('player', ()=> {
    // Data from 'users' table
    const puuid = ref("");
    const riot_name = ref("");
    const tag_line = ref("");
    const region = ref("");
    const account_id = ref("");
    const summoner_id = ref("");
    const level = ref(0);
    const icon_id = ref(0);

    const isLoading = ref(true);
    const isError = ref(false);
    const statusCode = ref(0);

    const reset = () =>{
        puuid.value ="";
        riot_name.value = "";
        tag_line.value = "";
        region.value ="";
        account_id.value = "";
        summoner_id.value = "";
        level.value = 0;
        icon_id.value = 0;
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
    }

    const setSearch = (regionInput, name, tag)=>{
        riot_name.value = name;
        region.value = regionInput;
        tag_line.value = tag;
    }
    const fetchPlayer = async ()=>{
        isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`https://solo-queue-analytics.onrender.com/getSummoner/${region.value}/${riot_name.value}/${tag_line.value}`, {method: 'GET', mode:'cors'});
            if(res.status && res.status===200){
                //Successfully recieved a response

                const data = await res.json();
                puuid.value= data.puuid;
                riot_name.value = data.riot_name;
                tag_line.value = data.tag_line;
                region.value = data.region;
                account_id.value = data.account_id;
                summoner_id.value = data.summoner_id;
                level.value = data.level;
                icon_id.value = data.icon_id;

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
    const updatePlayer = async ()=>{
        //isLoading.value = true;
        isError.value = false;
        statusCode.value = 0;
        try{
            const res = await fetch(`https://solo-queue-analytics.onrender.com/updateSummoner/${region.value}/${riot_name.value}/${tag_line.value}`, {method: 'PUT', mode:'cors'});
            if(res.status && res.status===200){
                //Successfully recieved a response
                const data = await res.json();
                puuid.value= data.puuid;
                riot_name.value = data.riot_name;
                tag_line.value = data.tag_line;
                region.value = data.region;
                account_id.value = data.account_id;
                summoner_id.value = data.summoner_id;
                level.value = data.level;
                icon_id.value = data.icon_id;

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

    return { puuid, riot_name, tag_line, region, account_id, summoner_id, level, icon_id, isLoading, isError, statusCode, reset, fetchPlayer, setSearch, updatePlayer }
})