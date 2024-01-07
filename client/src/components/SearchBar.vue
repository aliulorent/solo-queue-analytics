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
}
</script>

<template>
  <!-- <div class="flex flex-y justify-center flex-col items-center gap-1"> -->
    <form class="flex items-end justify-center gap-0 text-base-content" name="searchform" autocomplete="off" @submit.prevent="updateRoute">
      <div class="form-control z-10" autocomplete="off">
        <label for="region" class="label label-text font-semibold pl-5 pb-1">Region:</label>
        <select id="region" v-model="selection.region" autocomplete="off" class="select select-bordered border-r-0 rounded-r-none rounded-l-full focus:-outline-offset-1">
          <option value="NA1" selected autocomplete="off" name="North America">North America</option>
          <option value="EUW1" autocomplete="off">Europe West</option>
          <option value="EUN1" autocomplete="off">Europe Nordic & East</option>
          <option value="OC1" autocomplete="off">Oceania</option>
          <option value="KR" autocomplete="off">Korea</option>
          <option value="JP1" autocomplete="off">Japan</option>
          <option value="BR1" autocomplete="off">Brazil</option>
          <option value="LA1" autocomplete="off">LAS</option>
          <option value="LA2" autocomplete="off">LAN</option>
          <option value="RU" autocomplete="off">Russia</option>
          <option value="TR1" autocomplete="off">Turkey</option>
          <option value="SG2" autocomplete="off">Singapore</option>
          <option value="PH2" autocomplete="off">Phillippines</option>
          <option value="TW2" autocomplete="off">Taiwan</option>
          <option value="VN2" autocomplete="off">Vietnam</option>
          <option value="TH2" autocomplete="off">Thailand</option>
        </select>
      </div>
      <div class="form-control px-0 mx-0 border-x-0 rounded-none z-10">
        <label for="username" class="label label-text font-semibold pl-5 pb-1">Riot Name: </label>
        <input id="username" class="input input-bordered rounded-none border-x-0 focus:-outline-offset-1" v-model="selection.name"/>
      </div>
      <div class="form-control z-10">
        <label for="tagline" class="label label-text font-semibold pl-5 pb-1">Tag: </label>
        <div class="relative">
          <div class="absolute left-0 top-0 bottom-0 text-center pl-2 flex items-center"><h3>#</h3></div>
          <input id="tagline" class="input input-bordered border-l-0 rounded-l-none rounded-r-full focus:-outline-offset-1 pl-6" v-model="selection.tag">
        </div>
      </div>
      <button type="submit" class="bg-primary p-[0.88rem] rounded-full z-10 ml-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
  </form>
  <!-- </div> -->
</template>

<style scoped>

</style>