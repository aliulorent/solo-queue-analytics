<script setup>
import {ref} from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const {region, name, tag} = route.params;
const fetchStatus = ref(0);
const tempDisplay = ref({});
// 0 = Loading, 1 = Success, 2 = Not found, 3 = Error

const searchSummoner = async ()=>{
    try{
        const res = await fetch(`http://localhost:3000/getSummoner/${region}/${name}/${tag}`);
        switch(res.status){
            case 200:{
                // Successfully recieved data
                const data = await res.json();
                tempDisplay.value = data;
                fetchStatus.value = 1;
                break;
            }
            case 404:{
                //Not found!
                tempDisplay.value = "Player not found!";
                fetchStatus.value = 2;
                break;
            }
            default: {
                //Error block
                tempDisplay.value = "Something went wrong default";
                fetchStatus.value = 3;
            }
        }
    }   
    catch(error){
        tempDisplay.value = "Something went wrong catch";
        fetchStatus.value = 3;
    }
}

searchSummoner();

</script>
<template>
    <div v-if="fetchStatus===0">Loading Player...</div>
    <div v-if="fetchStatus===1">
        {{tempDisplay}}
    </div>
    <div v-if="fetchStatus===2">{{tempDisplay}}</div>
    <div v-if="fetchStatus===3">{{tempDisplay}}</div>
</template>