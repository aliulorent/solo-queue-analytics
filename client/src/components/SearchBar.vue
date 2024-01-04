<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router"

const selection = ref({
  region: "",
  name: "",
  tag: "",
})
const router = useRouter();
const updateRoute = async ()=>{
  await router.push(`/summoner/${selection.value.region}/${selection.value.name}/${selection.value.tag}`);
  router.go(0);
}
</script>

<template>
  <!-- <div class="flex flex-y justify-center flex-col items-center gap-1"> -->
    <form class="flex items-center gap-1" @submit.prevent="updateRoute">
      <select name="Region" v-model="selection.region">
        <option value="NA1">North America</option>
        <option value="EUW1">Europe West</option>
        <option value="EUN1">Europe Nordic & East</option>
        <option value="OC1">Oceania</option>
        <option value="KR">Korea</option>
        <option value="JP1">Japan</option>
        <option value="BR1">Brazil</option>
        <option value="LA1">LAS</option>
        <option value="LA2">LAN</option>
        <option value="RU">Russia</option>
        <option value="TR1">Turkey</option>
        <option value="SG2">Singapore</option>
        <option value="PH2">Phillippines</option>
        <option value="TW2">Taiwan</option>
        <option value="VN2">Vietnam</option>
        <option value="TH2">Thailand</option>
      </select>
      <label for="username">Riot Name: </label>
      <input id="username" v-model="selection.name"/>
      <label for="tagline">Tag: </label>
      <input id="tagline" v-model="selection.tag"/>
      <button type="submit" class="bg-gray-100 p-2">Submit</button>
  </form>
  <!-- </div> -->
</template>

<style scoped>

</style>