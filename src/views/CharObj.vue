<template>
  <div class="charcter-sheet-content">
    <div class="character-sheet-content">
    <!-- character Title -->
      <div class="title">
        <div class="charname">
          {{ spaStore.currentCharacter.charname }}
        </div>
        <div class="sub">
          <div class="the">
            THE
          </div>
          <div class="playbook">
            {{ spaStore.currentCharacter.playbook }}
          </div>
          <div class="pb_description">
            {{ spaStore.currentCharacter.pb_description }}
          </div>
        </div>
      </div>

    <!-- Playbook XP Bar -->
    <div class="pb_xpbar">
      <img @click="() =>{ if (spaStore.currentCharacter.pbxp < 8) { spaStore.currentCharacter.pbxp++ } else { spaStore.currentCharacter.pbxp = 0 }; }" :src="'graphics/pb_xp'+spaStore.currentCharacter.pbxp+'.png'" />
    </div> 

    <!-- Character Portrait -->
    <div class="portrait">
      <img src="graphics/portraits/portrait00.png" />
    </div>

    <!-- Stress Bar -->
    <div class="stressbar">
      <img @click="() =>{ if (spaStore.currentCharacter.stress < 8) { spaStore.currentCharacter.stress++ } else { spaStore.currentCharacter.stress = 0 }; }" :src="'graphics/stressbar'+spaStore.currentCharacter.stress+'.png'" />
    </div>

  </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { useSpaStore } from '@/stores/'

const spaStore = useSpaStore()
const currentCharacter = ref(spaStore.currentCharacter)

watch(() => spaStore.currentCharacter, (newValue) => {
  currentCharacter.value = newValue
})

onMounted(async () => {
  let id = "LPw0uKKc36yUyOWrCLNb";
  const data = await spaStore.selectCharacter(id);
  spaStore.currentCharacter = data;
})

</script>

<style>

</style>