<template>
  <div class="nav">
      <div class="nav-item">
        <router-link to="/ship-view">{{spaStore.currentShip.designation}}</router-link>
      </div>
      <div v-for="(character, index) in spaStore.Characters" :key="character.id" class="nav-item">
        <router-link to="/character-view" @click="spaStore.selectCharacter(character)">{{ spaStore.Charnames[index] }}</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/add">+New</router-link>
      </div>
      <a @click="handleSignOut" class="signout">
        Sign Out
      </a>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import {useSpaStore} from '@/stores/'
import { useRouter } from 'vue-router'

const router = useRouter()
const spaStore = useSpaStore()

const isLoggedIn = ref(false);

const handleSignOut = () => {
  console.log("CharMenu: ________ SIGNING OUT!")
  signOut(auth).then(() => {
    router.push("/")
  })
}

let auth;
onMounted(()=>{
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
  console.log('CharMenu >>> ON MOUNT <<< | fetchCharacters called from MENU...')
  spaStore.fetchCharacters()
  spaStore.fetchShip()
  console.log('CharMenu >>> END OF MOUNT <<< | spaStore.currentShip.designation ', spaStore.currentShip.designation)
})
</script>

<style>


</style>
