<template>
  <div class="nav">
      <div class="nav-item">
        <router-link to="/crew">{{spaStore.currentShip.designation}}</router-link>
      </div>
      <div v-for="character in spaStore.Characters" :key="character.id" class="nav-item">
        <router-link to="/:id" @click="spaStore.selectCharacter(character.id)">{{character.charname}}</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/add">+New</router-link>
      </div>
      <button class="button" @click="spaStore.deleteAll">
          Clear Char List
      </button>
  </div>
</template>

<script setup>
import {onMounted} from "vue"
import {useSpaStore} from '@/stores/'

const spaStore = useSpaStore()

onMounted(()=>{
  console.log('CharMenu >>> ON MOUNT <<< | fetchCharacters called from MENU...')
  spaStore.fetchCharacters()
  spaStore.fetchShip()
  console.log('CharMenu >>> END OF MOUNT <<< | spaStore.currentShip.designation ', spaStore.currentShip.designation)
})
</script>

<style>


</style>
