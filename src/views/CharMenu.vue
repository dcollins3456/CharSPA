<template>
  <div class="nav">
      <div v-for="character in spaStore.Characters" :key="character.id" class="nav-item">
        <router-link to="/" @click="spaStore.selectCharacter(character.id)">{{character.charname}}</router-link>
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



onMounted(() => {
  spaStore.fetchCharacters()
})

</script>

<style>


</style>
