<template>
  <div v-if="currentCharacter" class="character content_bg">
    <div class="sheet-content">
    
      <!-- character Title -->
      <div class="title">
        <div class="charname">
          <EditableInput type="character" value="charname" limit="18" />
        </div>
        <div class="sub">
          <div class="the">
            THE
          </div>
          <div class="playbook">
            <EditableInput type="character" value="playbook" limit="12" />
          </div>
          <div class="pb_description">
            <EditableInput type="character" value="pb_description" limit="40" />
          </div>
        </div>
      </div>

    <!-- Playbook XP Bar -->
    <div class="pb_xpbar">
      <img @click="() =>{ if (currentCharacter.pbxp < 8) { currentCharacter.pbxp++ } else { currentCharacter.pbxp = 0 }; spaStore.charUpdate(); }" :src="'/graphics/pb_xp'+currentCharacter.pbxp+'.png'" />
    </div> 

    <!-- Character Portrait -->
    <div class="portrait">
      <PictureFile type="character" /> 
    </div>

    <!-- Stress Bar -->
    <div class="stressbar">
      <img @click="() =>{ if (currentCharacter.stress < 8) { currentCharacter.stress++ } else { currentCharacter.stress = 0 }; spaStore.updateCharacter({id: currentCharacter.id, data:currentCharacter}) }" :src="'/graphics/stressbar'+currentCharacter.stress+'.png'" />
    </div>
    <div class="traumabar">
      <img @click="() =>{ if (currentCharacter.trauma < 4) { currentCharacter.trauma++ } else { currentCharacter.trauma = 0 }; spaStore.updateCharacter({id: currentCharacter.id, data:currentCharacter})}" :src="'/graphics/traumabar'+currentCharacter.trauma+'.png'" />
    </div>
    
    <!-- Trauma list -->
    <div class="traumalist">
      <div @click="currentCharacter.traumatypes.includes('cold') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('cold'), 1) : 
        currentCharacter.traumatypes.push('cold'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('cold'), normal: !currentCharacter.traumatypes.includes('cold') }"
      >Cold</div>
      <div @click="currentCharacter.traumatypes.includes('haunted') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('haunted'), 1) : 
        currentCharacter.traumatypes.push('haunted'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('haunted'), normal: !currentCharacter.traumatypes.includes('haunted') }"
      >Haunted</div>
      <div @click="currentCharacter.traumatypes.includes('obsessed') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('obsessed'), 1) : 
        currentCharacter.traumatypes.push('obsessed'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('obsessed'), normal: !currentCharacter.traumatypes.includes('obsessed') }"
      >Obsessed</div>
      <div @click="currentCharacter.traumatypes.includes('paranoid') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('paranoid'), 1) : 
        currentCharacter.traumatypes.push('paranoid'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('paranoid'), normal: !currentCharacter.traumatypes.includes('paranoid') }"
      >Paranoid</div>
      <div @click="currentCharacter.traumatypes.includes('reckless') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('reckless'), 1) : 
        currentCharacter.traumatypes.push('reckless'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('reckless'), normal: !currentCharacter.traumatypes.includes('reckless') }"
      >Reckless</div>
      <div @click="currentCharacter.traumatypes.includes('soft') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('soft'), 1) : 
        currentCharacter.traumatypes.push('soft'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('soft'), normal: !currentCharacter.traumatypes.includes('soft') }"
      >Soft</div>
      <div @click="currentCharacter.traumatypes.includes('unstable') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('unstable'), 1) : 
        currentCharacter.traumatypes.push('unstable'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('unstable'), normal: !currentCharacter.traumatypes.includes('unstable') }"
      >Unstable</div>
      <div @click="currentCharacter.traumatypes.includes('viscious') ? 
        currentCharacter.traumatypes.splice(currentCharacter.traumatypes.indexOf('viscious'), 1) : 
        currentCharacter.traumatypes.push('viscious'); spaStore.charUpdate();" 
        :class="{ i: currentCharacter.traumatypes.includes('viscious'), normal: !currentCharacter.traumatypes.includes('viscious') }"
      >Viscious</div>
    </div>

    <!-- Character Details -->
    <div class="character_description">
      <div class="container">
        <div class="alias hider">
          <EditableInput type="character" value="alias" limit="50" />
        </div>
      </div>
      <div class="container">
        <div class="heritage hider">
          <EditableInput type="character" value="heritage" limit="500" />
        </div>
      </div>
      <div class="container">
        <div class="background hider">
          <EditableInput type="character" value="background" limit="500" />
        </div>
      </div>
      <div class="container">
        <div class="vice hider">
          <EditableInput type="character" value="vice" limit="50" />
        </div>
      </div>
      <div class="container">
        <div class="look hider">
          <EditableInput type="character" value="look" limit="500" />
        </div>
      </div>
    </div>

    <!-- Attributes -->
    <div class="attributes">
      <div class="insight">
        <div id="doctor"><img class="pointer" @click="() =>{ if (currentCharacter.doctor < 3) { currentCharacter.doctor++ } else { currentCharacter.doctor = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.doctor+'.png'" /></div>
        <div id="hack"><img class="pointer" @click="() =>{ if (currentCharacter.hack < 3) { currentCharacter.hack++ } else { currentCharacter.hack = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.hack+'.png'" /></div>
        <div id="rig"><img class="pointer" @click="() =>{ if (currentCharacter.rig < 3) { currentCharacter.rig++ } else { currentCharacter.rig = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.rig+'.png'" /></div>
        <div id="study"><img class="pointer" @click="() =>{ if (currentCharacter.study < 3) { currentCharacter.study++ } else { currentCharacter.study = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.study+'.png'" /></div>
      </div>
      <div class="prowess">
        <div id="helm"><img class="pointer" @click="() =>{ if (currentCharacter.helm < 3) { currentCharacter.helm++ } else { currentCharacter.helm = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.helm+'.png'" /></div>
        <div id="scramble"><img class="pointer" @click="() =>{ if (currentCharacter.scramble < 3) { currentCharacter.scramble++ } else { currentCharacter.scramble = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.scramble+'.png'" /></div>
        <div id="scrap"><img class="pointer" @click="() =>{ if (currentCharacter.scrap < 3) { currentCharacter.scrap++ } else { currentCharacter.scrap = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.scrap+'.png'" /></div>
        <div id="skulk"><img class="pointer" @click="() =>{ if (currentCharacter.skulk < 3) { currentCharacter.skulk++ } else { currentCharacter.skulk = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.skulk+'.png'" /></div>
      </div>
      <div class="resolve">
        <div id="attune"><img class="pointer" @click="() =>{ if (currentCharacter.attune < 3) { currentCharacter.attune++ } else { currentCharacter.attune = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.attune+'.png'" /></div>
        <div id="command"><img class="pointer" @click="() =>{ if (currentCharacter.command < 3) { currentCharacter.command++ } else { currentCharacter.command = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.command+'.png'" /></div>
        <div id="consort"><img class="pointer" @click="() =>{ if (currentCharacter.consort < 3) { currentCharacter.consort++ } else { currentCharacter.consort = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.consort+'.png'" /></div>
        <div id="sway"><img class="pointer" @click="() =>{ if (currentCharacter.sway < 3) { currentCharacter.sway++ } else { currentCharacter.sway = 0 }; spaStore.charUpdate(); }" :src="'/graphics/att'+currentCharacter.sway+'.png'" /></div>
      </div>
    </div>

    <!-- Harm Table -->
    <div class="harmtable">

<!-- FIX EMPTY FIELD UNCLICKABLE AND CURSOR POINTER -->

      <div class="harm3">
        <EditableInput type="character" ref="harm3_1_input" value="harm3" limit="32" />
      </div>
      <div class="harm2_1">
        <EditableInput type="character" ref="harm2_1_input" value="harm2" limit="32" />
      </div>
      <div class="harm2_2">
        <EditableInput type="character" ref="harm3_2_input" value="harm2_2" limit="32" />
      </div>
      <div class="harm1_1">
        <EditableInput type="character" ref="harm1_1_input" value="harm1" limit="32" />
      </div>
      <div class="harm1_2">
        <EditableInput type="character" ref="harm1_2_input" value="harm1_2" limit="32" />
      </div>       
    </div>
    <div class="healthclock">
      <img @click="() =>{ if (currentCharacter.healthclock < 8) { currentCharacter.healthclock++ } else { currentCharacter.healthclock = 0 }; spaStore.charUpdate(); }" :src="'/graphics/healthclock'+currentCharacter.healthclock+'.png'" />
    </div>

    <!-- Cred / Stash -->
    <div class="cred">
      <img :src="'/graphics/cred'+currentCharacter.cred+'.png'" />
      <div class="cred_up" id="cred_up" @click="() => { if (currentCharacter.cred < 4) { currentCharacter.cred++ } else { currentCharacter.cred = 4 }; spaStore.charUpdate(); }"></div>
      <div class="cred_down" id="cred_down" @click="() => { if (currentCharacter.cred > 0) { currentCharacter.cred-- } else { currentCharacter.cred = 0 }; spaStore.charUpdate(); }"></div>
      
    </div>
    <div class="stash">
      <img v-for="i in 4" :key="i" :src="'/graphics/stash'+getStashColumn(i)+'.png'" />
      <div class="stash_up" id="stash_up" @click="() => { if (currentCharacter.stash < 40) { currentCharacter.stash++ } else { currentCharacter.stash = 40 }; spaStore.charUpdate(); }"></div>
      <div class="stash_down" id="stash_down" @click="() => { if (currentCharacter.stash > 0) { currentCharacter.stash-- } else { currentCharacter.stash = 0 }; spaStore.charUpdate(); }"></div>
    </div>

    <!-- Armor and Items -->
    <div class="armor">
      <div @click="() => { currentCharacter.armor = !currentCharacter.armor; spaStore.charUpdate() }">Armor: <img :src="`/graphics/${currentCharacter.armor ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
      <div @click="() => { currentCharacter.heavy = !currentCharacter.heavy; spaStore.charUpdate() }">Heavy: <img :src="`/graphics/${currentCharacter.heavy ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
      <div @click="() => { currentCharacter.special = !currentCharacter.special; spaStore.charUpdate() }">Special: <img :src="`/graphics/${currentCharacter.special ? 'checked_red.png' : 'unchecked2.png'}`" /></div>
    </div>
    
    <div class="regular_items">
      <div class="item-div" v-for="(item, index) in currentCharacter.items" :key="item.index">
        <RegularItem :itemIndex="index" />
      </div>      
    </div>
    
    <div class="special_items">
      <div class="s-item-div" v-for="(item, index) in currentCharacter.s_items" :key="item.index">
        <SpecialItem :itemIndex="index" />
      </div>
      <div @click="addItem()" class="s-add-button">
        <img class="image-main" src="/graphics/s-plus-add.png" />
        <img class="image-hover" src="/graphics/s-plus-add-hover.png" />
      </div>
    </div>
    
    <!-- Abilities and Notes -->
    <div class="char-column-right">
      <div class="char-abilities" >
          <div class="ability" v-for="(item, index) in currentCharacter.abilities" :key="item.index" >
              <AbilityItem type="character" :itemIndex="index" />
          </div>
      </div>
      <div @click="()=>addAbility()" class="char-ability-add-button">
          <button>
          <img class="image-hover" src="/graphics/char-add-button-hover.png" />
          <img class="image-main" src="/graphics/char-add-button.png" />
          </button>
          <img class="divider" src="/graphics/divider.png" />
      </div>
      
      
      <img class="char-notes-title" src="/graphics/char-notes-title.png" />
      <div class="char-notes">
          <div class="notelist">
            <div class="note" v-for="(item, index) in currentCharacter.notes" :key="item.index" >
                <NoteItem type="character" :itemIndex="index" />
            </div>
            <div @click="()=>addNote()" class="notes-add-button">
                <button>
                  <img class="image-hover" src="/graphics/plus-add2-hover.png" />
                  <img class="image-main" src="/graphics/plus-add2.png" />
                </button>
            </div>
          </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, } from "vue"
import { useSpaStore } from '@/stores/'
import { doc, getDoc } from "firebase/firestore";
import {db} from '@/firebase'
import EditableInput from '@/components/EditableInput.vue'
import RegularItem from '@/components/RegularItem.vue'
import SpecialItem from '@/components/SpecialItem.vue'
import AbilityItem from '@/components/AbilityItem.vue'
import NoteItem from '@/components/NoteItem.vue'
import PictureFile from '@/components/PictureFile.vue'
import router from '@/router'

const spaStore = useSpaStore()
const myCrew = "myCrew123"
const currentCharacter = ref()
currentCharacter.editCharname = false;
currentCharacter.editPlaybook = false;
currentCharacter.editPbDescription = false;
currentCharacter.traumatypes = currentCharacter.traumatypes || []

watch(() => spaStore.currentCharacter, (newValue) => {
  console.log("CharObj >>> WATCH UPDATE <<< | for spaStore.currentCharacter change to ", spaStore.currentCharacter.charname) // logs proper charname
  currentCharacter.value = newValue
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


const addItem = () => {
  if(currentCharacter.value.s_items.length < 7){
    const newItem = {
      "name": "",
      "description": "",
      "isSmall": false,
      "boxes": 1,
      "isChecked": false,
    }
    spaStore.currentCharacter.s_items.push(newItem)
    console.log("addItem: ", currentCharacter.value.id)
    spaStore.charUpdate()
  }
  else{
    console.log("ERROR: Max allowed special items.")
  }
}

const addAbility = () => {
  if(currentCharacter.value.abilities.length < 7){
    const newAbility = ""
    spaStore.currentCharacter.abilities.push(newAbility)
    console.log("addAbility: ", currentCharacter.value.id)
    spaStore.charUpdate()
  }
}

const addNote = () => {
  if(currentCharacter.value.notes.length < 7){
    const newNote = ""
    spaStore.currentCharacter.notes.push(newNote)
    console.log("addNote: ", currentCharacter.value.id)
    spaStore.charUpdate()
  }
}

onMounted(async () => {
  console.log("CharObj >>> MOUNT <<< | fetchCharacters called from CHAROBJ. ")
  spaStore.fetchCharacters();
  let id = "Nw31bansXkQ1R1o0Uazu";
  if(spaStore.currentCharacter.id){
    console.log("CharObj >>> MOUNT <<< | spaStore.currentCharacter.value.id = ", spaStore.currentCharacter.id)
    id = spaStore.currentCharacter.id
    loadCharacter(id)
  }
  else{
    console.log("CharObj >>> MOUNT <<< | redirect to '/'")
    router.push('/');
  }
  
})

/* // When we finally have user sessions, do this onMounted instead:
onMounted(async () => {
  spaStore.fetchCharacters();
  const userData = await spaStore.fetchUserData();
  let id = userData.lastViewedCharacterId || "5r1B5EeEgoDuoyZYcigM";
  await loadCharacter(id);
}) */

async function loadCharacter(id) {
  const docRef = doc(db, "Crews/"+myCrew, "Characters", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("loadCharacter loaded");
    spaStore.currentCharacter = docSnap.data();
  } else {
    console.log("No such document!");
  }
}

</script>

<style>

</style>