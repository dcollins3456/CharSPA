<template>
  <div v-if="currentCharacter" class="charcter-sheet-content">
    <div class="character-sheet-content">
    <!-- character Title -->
      <div class="title">
        <div class="charname">
          <span @click="toggleEditCharname()">
            {{ currentCharacter.charname }}
          </span>
          <div v-if="currentCharacter.editCharname" @keyup.enter="{ currentCharacter.editCharname = false; doUpdate(); }">
            <input ref="inputCharname" v-model="currentCharacter.charname" @blur="{ currentCharacter.editCharname = false; doUpdate(); }" >
          </div>
        </div>
        <div class="sub">
          <div class="the">
            THE
          </div>
          <div class="playbook">
            <span @click="toggleEditPlaybook()">
              {{ currentCharacter.playbook }}
            </span>
            <div v-if="currentCharacter.editPlaybook" @keyup.enter="{ currentCharacter.editPlaybook = false; doUpdate(); }">
              <input ref="inputPlaybook" v-model="currentCharacter.playbook" @blur="{ currentCharacter.editPlaybook = false; doUpdate(); }" >
            </div>
          </div>
          <div class="pb_description">
            <span @click="toggleEditPbDescription()">
              {{ currentCharacter.pb_description }}
            </span>
            <div v-if="currentCharacter.editPbDescription" @keyup.enter="{ currentCharacter.editPbDescription = false; doUpdate(); }">
              <input ref="inputPbDescription" v-model="currentCharacter.pb_description" @blur="{ currentCharacter.editPbDescription = false; doUpdate(); }" >
            </div>
          </div>
        </div>
      </div>

    <!-- Playbook XP Bar -->
    <div class="pb_xpbar">
      <img @click="() =>{ if (currentCharacter.pbxp < 8) { currentCharacter.pbxp++ } else { currentCharacter.pbxp = 0 }; doUpdate() }" :src="'graphics/pb_xp'+currentCharacter.pbxp+'.png'" />
    </div> 

    <!-- Character Portrait -->
    <div class="portrait">
      <img src="graphics/portraits/portrait00.png" />
    </div>

    <!-- Stress Bar -->
    <div class="stressbar">
      <img @click="() =>{ if (currentCharacter.stress < 8) { currentCharacter.stress++ } else { currentCharacter.stress = 0 }; spaStore.updateCharacter({id: currentCharacter.id, data:currentCharacter}) }" :src="'graphics/stressbar'+currentCharacter.stress+'.png'" />
    </div>
    <div class="traumabar">
      <img @click="() =>{ if (currentCharacter.trauma < 4) { currentCharacter.trauma++ } else { currentCharacter.trauma = 0 }; spaStore.updateCharacter({id: currentCharacter.id, data:currentCharacter})}" :src="'graphics/traumabar'+currentCharacter.trauma+'.png'" />
    </div>
    
    <!-- Trauma list -->
    <div class="traumalist">
      <div @click="currentCharacter.traumatypes.includes('cold') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('cold'), 1) : 
        currentCharacter.traumatypes.push('cold'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('cold') }"
      >Cold</div>
      <div @click="currentCharacter.traumatypes.includes('haunted') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('haunted'), 1) : 
        currentCharacter.traumatypes.push('haunted'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('haunted') }"
      >Haunted</div>
      <div @click="currentCharacter.traumatypes.includes('obsessed') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('obsessed'), 1) : 
        currentCharacter.traumatypes.push('obsessed'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('obsessed') }"
      >Obsessed</div>
      <div @click="currentCharacter.traumatypes.includes('paranoid') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('paranoid'), 1) : 
        currentCharacter.traumatypes.push('paranoid'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('paranoid') }"
      >Paranoid</div>
      <div @click="currentCharacter.traumatypes.includes('reckless') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('reckless'), 1) : 
        currentCharacter.traumatypes.push('reckless'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('reckless') }"
      >Reckless</div>
      <div @click="currentCharacter.traumatypes.includes('soft') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('soft'), 1) : 
        currentCharacter.traumatypes.push('soft'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('soft') }"
      >Soft</div>
      <div @click="currentCharacter.traumatypes.includes('unstable') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('unstable'), 1) : 
        currentCharacter.traumatypes.push('unstable'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('unstable') }"
      >Unstable</div>
      <div @click="currentCharacter.traumatypes.includes('viscious') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('viscious'), 1) : 
        currentCharacter.traumatypes.push('viscious'); doUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('viscious') }"
      >Viscious</div>
    </div>

    <!-- Character Details -->
    <div class="character_description">
      <div class="alias">
        {{ currentCharacter.alias }}
      </div>
      <div class="heritage">
        {{ currentCharacter.heritage }}
      </div>
      <div class="background">
        {{ currentCharacter.background }}
      </div>
      <div class="vice">
        {{ currentCharacter.vice }}
      </div>
      <div class="look">
        {{ currentCharacter.look }}  
      </div>
    </div>

    <!-- Attributes -->
    <div class="attributes">
      <div class="insight">
        <div id="doctor"><img class="pointer" @click="() =>{ if (currentCharacter.doctor < 3) { currentCharacter.doctor++ } else { currentCharacter.doctor = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.doctor+'.png'" /></div>
        <div id="hack"><img class="pointer" @click="() =>{ if (currentCharacter.hack < 3) { currentCharacter.hack++ } else { currentCharacter.hack = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.hack+'.png'" /></div>
        <div id="rig"><img class="pointer" @click="() =>{ if (currentCharacter.rig < 3) { currentCharacter.rig++ } else { currentCharacter.rig = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.rig+'.png'" /></div>
        <div id="study"><img class="pointer" @click="() =>{ if (currentCharacter.study < 3) { currentCharacter.study++ } else { currentCharacter.study = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.study+'.png'" /></div>
      </div>
      <div class="prowess">
        <div id="helm"><img class="pointer" @click="() =>{ if (currentCharacter.helm < 3) { currentCharacter.helm++ } else { currentCharacter.helm = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.helm+'.png'" /></div>
        <div id="scramble"><img class="pointer" @click="() =>{ if (currentCharacter.scramble < 3) { currentCharacter.scramble++ } else { currentCharacter.scramble = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.scramble+'.png'" /></div>
        <div id="scrap"><img class="pointer" @click="() =>{ if (currentCharacter.scrap < 3) { currentCharacter.scrap++ } else { currentCharacter.scrap = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.scrap+'.png'" /></div>
        <div id="skulk"><img class="pointer" @click="() =>{ if (currentCharacter.skulk < 3) { currentCharacter.skulk++ } else { currentCharacter.skulk = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.skulk+'.png'" /></div>
      </div>
      <div class="resolve">
        <div id="attune"><img class="pointer" @click="() =>{ if (currentCharacter.attune < 3) { currentCharacter.attune++ } else { currentCharacter.attune = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.attune+'.png'" /></div>
        <div id="command"><img class="pointer" @click="() =>{ if (currentCharacter.command < 3) { currentCharacter.command++ } else { currentCharacter.command = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.command+'.png'" /></div>
        <div id="consort"><img class="pointer" @click="() =>{ if (currentCharacter.consort < 3) { currentCharacter.consort++ } else { currentCharacter.consort = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.consort+'.png'" /></div>
        <div id="sway"><img class="pointer" @click="() =>{ if (currentCharacter.sway < 3) { currentCharacter.sway++ } else { currentCharacter.sway = 0 }; doUpdate(); }" :src="'graphics/att'+currentCharacter.sway+'.png'" /></div>
      </div>
    </div>

    <!-- Harm Table -->
    <div class="harmtable">
      <div class="harm3">
        {{ currentCharacter.harm3 }}
      </div>
      <div class="harm2_1">
        {{ currentCharacter.harm2 }}
      </div>
      <div class="harm2_2">
        {{ currentCharacter.harm2_2 }}
      </div>
      <div class="harm1_1">
        {{ currentCharacter.harm1 }}
      </div>
      <div class="harm1_2">
        {{ currentCharacter.harm1_2 }}
      </div>       
    </div>
    <div class="healthclock">
      <img @click="() =>{ if (currentCharacter.healthclock < 8) { currentCharacter.healthclock++ } else { currentCharacter.healthclock = 0 }; doUpdate(); }" :src="'graphics/healthclock'+currentCharacter.healthclock+'.png'" />
    </div>

    <!-- Cred / Stash -->
    <div class="cred">
      <img :src="'graphics/cred'+currentCharacter.cred+'.png'" />
      <div class="cred_up" id="cred_up" @click="() => { if (currentCharacter.cred < 4) { currentCharacter.cred++ } else { currentCharacter.cred = 4 }; doUpdate(); }"></div>
      <div class="cred_down" id="cred_down" @click="() => { if (currentCharacter.cred > 0) { currentCharacter.cred-- } else { currentCharacter.cred = 0 }; doUpdate(); }"></div>
      
    </div>
    <div class="stash">
      <img v-for="i in 4" :key="i" :src="'graphics/stash'+getStashColumn(i)+'.png'" />
      <div class="stash_up" id="stash_up" @click="() => { if (currentCharacter.stash < 40) { currentCharacter.stash++ } else { currentCharacter.stash = 40 }; doUpdate(); }"></div>
      <div class="stash_down" id="stash_down" @click="() => { if (currentCharacter.stash > 0) { currentCharacter.stash-- } else { currentCharacter.stash = 0 }; doUpdate(); }"></div>
      
    </div>

    <!-- Armor and Items -->
    <div class="armor">
      <div @click="() => { currentCharacter.armor = !currentCharacter.armor; doUpdate() }">Armor: <img :src="`graphics/${currentCharacter.armor ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
      <div @click="() => { currentCharacter.heavy = !currentCharacter.heavy; doUpdate() }">Heavy: <img :src="`graphics/${currentCharacter.heavy ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
      <div @click="() => { currentCharacter.special = !currentCharacter.special; doUpdate() }">Special: <img :src="`graphics/${currentCharacter.special ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
    </div>
    
    <div class="regular_items">
      <div v-for="item in currentCharacter.items" :key="item.name" :class="{ small: item.isSmall }">
        <a><img @click="() => { item.isChecked = !item.isChecked; doUpdate() }" v-for="i in item.boxes" :key="i" :src="item.isChecked ? 'graphics/checked.png' : 'graphics/unchecked.png'" />
        {{ item.name }}</a>
        <button class="edit-button">
          <img class="image-hover" src="graphics/edit-hover.png" />
          <img class="image-main" src="graphics/edit.png" />
        </button>
      </div>
      
    </div>
    
    <div class="special_items">
      <div v-for="item in currentCharacter.s_items" :key="item.name" :class="{ small: item.isSmall }">
        <a><img @click="() => { item.isChecked = !item.isChecked;}" v-for="i in item.boxes" :key="i" :src="item.isChecked ? 'graphics/checked.png' : 'graphics/unchecked.png'" />
          <p class="s_item_name">{{ item.name }}</p>
          <button @click="currentCharacter.editItem()" class="edit-button">
            <img class="image-hover" src="graphics/edit-hover.png" />
            <img class="image-main" src="graphics/edit.png" />
          </button>
          <p>{{ item.description }}</p>
          <div v-if="currentCharacter.editItems" @keyup.enter="{ currentCharacter.editItems = false; doUpdate(); }">
            <input ref="inputItem" v-model="currentCharacter.playbook" @blur="{ currentCharacter.editItem = false; doUpdate(); }" >
          </div>
        </a>
         
      </div>
    </div>
    
    <!-- Abilities and Notes -->
    <div class="column_right">
      <div v-for="ability in currentCharacter.abilities" :key="ability.index" class="abilities">
        <div class="ability">
          <p v-html="ability.replace(/\*(.*?)\*/g, '<b>$1</b>')"></p>
        </div>
      </div>
      

      <img src="graphics/notes_title.png" />
      <div class="notes">
        <div class="notelist">
          <div v-for="note in currentCharacter.notes" :key="note.index" class="note">
            <p v-html="note.replace(/\*(.*?)\*/g, '<b>$1</b>')"></p>
          </div>
          <div class="addnote">
            <!-- <form>
              <input type=text placeholder="[ADD_NOTE - *asterisks* denote bold text.]" />
              <button @click="() => { let inputValue=event.target.value; currentCharacter.notes.push(inputValue); doUpdate(); }" type=submit >submit</button>
            </form> -->
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from "vue"
import { useSpaStore } from '@/stores/'
import { doc, getDoc } from "firebase/firestore";
import {db} from '@/firebase'

const spaStore = useSpaStore()
const currentCharacter = ref(spaStore.fetchFirstCharacter)
currentCharacter.editCharname = false;
currentCharacter.editPlaybook = false;
currentCharacter.editPbDescription = false;
currentCharacter.traumatypes = currentCharacter.traumatypes || []

watch(() => spaStore.currentCharacter, (newValue) => {
  currentCharacter.value = newValue
  console.log("CharObj Watch: currentCharacter = ", newValue.charname) // logs proper charname
  console.log("CharObj Watch: currentCharacter = ", currentCharacter.value.charname) // logs "undefined"
})

const getStashColumn = (i) => {
  let stash = currentCharacter.value.stash
  const quotient = Math.floor(stash / 10)
  const remainder = stash % 10
  if (i <= quotient) {
    return 10
  } else if (i > quotient + 1) {
    return 0
  } else {
    return remainder
  }
}

const inputCharname = ref(null)
const inputPlaybook = ref(null)
const inputPbDescription = ref(null)


const toggleEditCharname = () => {
  currentCharacter.value.editCharname = !currentCharacter.value.editCharname
  console.log("currentCharacter editCharname: ", currentCharacter.value.editCharname)
  if (currentCharacter.value.editCharname){
    nextTick(() => {
      console.log("input ref: ", inputCharname.value)
      inputCharname.value.focus();
      inputCharname.value.setSelectionRange(0, 0);
    });
  }
}
const toggleEditPlaybook = () => {
  currentCharacter.value.editPlaybook = !currentCharacter.value.editPlaybook
  console.log("currentCharacter editPlaybook: ", currentCharacter.value.editPlaybook)
  if (currentCharacter.value.editPlaybook){
    nextTick(() => {
      console.log("input ref: ", inputPlaybook.value)
      inputPlaybook.value.focus();
      inputPlaybook.value.setSelectionRange(0, 0);
    });
  }
}
const toggleEditPbDescription = () => {
  currentCharacter.value.editPbDescription = !currentCharacter.value.editPbDescription
  console.log("currentCharacter editPbDescription: ", currentCharacter.value.editPbDescription)
  if (currentCharacter.value.editPbDescription){
    nextTick(() => {
      console.log("input ref: ", inputPbDescription.value)
      inputPbDescription.value.focus();
      inputPbDescription.value.setSelectionRange(0, 0);
    });
  }
}
const doUpdate = () => {
  console.log('passing currentCharacter.id for update: ', currentCharacter.value.id)
  spaStore.updateCharacter({id: currentCharacter.value.id, data: currentCharacter.value})
}

onMounted(async () => {
  spaStore.fetchCharacters();
  let id = "5r1B5EeEgoDuoyZYcigM";
  await loadCharacter(id);
  
})

/* // When we finally have user sessions, do this onMounted instead:
onMounted(async () => {
  spaStore.fetchCharacters();
  const userData = await spaStore.fetchUserData();
  let id = userData.lastViewedCharacterId || "5r1B5EeEgoDuoyZYcigM";
  await loadCharacter(id);
}) */

async function loadCharacter(id) {
  const docRef = doc(db, "Characters", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("loadCharacter loaded:", docSnap.data());
    spaStore.currentCharacter = docSnap.data();
  } else {
    console.log("No such document!");
  }
}

</script>

<style>

</style>