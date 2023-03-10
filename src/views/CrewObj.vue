<template>
    <div v-if="currentShip" class="ship content_bg">
        <div class="sheet-content">
            <!-- character Title -->
            <div class="title">
                <div class="designation">
                    <EditableInput type="ship" value="designation" limit="18" />
                </div>
                <div class="sub">
                
                <div class="shipmodel">
                    <EditableInput type="ship" value="shipmodel" limit="12" />
                </div>
                <div class="crew_description">
                    <EditableInput type="ship" value="crew_description" limit="40" />
                </div>
                </div>
            </div>
    
            <!-- Playbook XP Bar -->
            <div class="pb_xpbar">
                <img @click="() =>{ if (currentShip.crew_xp < 8) { currentShip.crew_xp++ } else { currentShip.crew_xp = 0 }; spaStore.shipUpdate(); }" :src="'graphics/pb_xp'+currentShip.crew_xp+'.png'" />
            </div>

            <!-- Ship Images -->
            <div class="image1">
                <div class="image-border" />
                <PictureFile type="ship1" /> 
            </div>
            <div class="image2">
                <div class="image-border" />
                <PictureFile type="ship2" /> 
            </div>
            
            
            <!-- Ship Details -->
            <div class="ship_description">
                <div class="look">
                    <EditableInput type="ship" value="look" limit="40" />
                </div>
                <div class="reputation">
                    <EditableInput type="ship" value="reputation" limit="40" />
                </div>
                <div class="crewsize">
                    <img @click="() =>{ if (currentShip.crewsize < 3) { currentShip.crewsize++ } else { currentShip.crewsize = 0 }; spaStore.shipUpdate(); }" :src="'graphics/crewsize'+currentShip.crewsize+'.png'" />
                </div>
                <div class="shipsize">
                    <EditableInput type="ship" value="shipsize" limit="30" />
                </div>
            </div>

            <!-- Cred & Debt -->
            <div class="cred_debt">
                <div>Cred <span :class="spaStore.isVault ? 'cred_vault' : 'cred_novault'">/ Vault</span></div>
                <div class="cred_up" id="shipcred_up" @click="() => increaseCred()"></div>
                <div class="cred_down" id="shipcred_down" @click="() => decreaseCred()"></div>
                <div class="stash_up" id="debt_up" @click="() => increaseDebt()"></div>
                <div class="stash_down" id="debt_down" @click="() => decreaseDebt()"></div>
            </div>
            <div class="creds">
                <img :src="credImage1" />
                <img :src="credImage2" />
            </div>
            <div class="debt">
                <img v-for="i in 8" :key="i" :src="i <= Math.ceil(currentShip.debt/2) ? 'graphics/debt' + Math.min(currentShip.debt - (i-1)*2, 2) + '.png' : 'graphics/debt0.png'">
            </div>

            <!-- Gambits -->
            <div class="gambits" >
                <img @click="()=>{if(currentShip.gambits > 0){currentShip.gambits--; spaStore.shipUpdate();}}" :src="'graphics/gambits'+currentShip.gambits+'.png'" />
                <img class="gambits-button" src="graphics/gambits_button.png" @click="()=>{if(currentShip.gambits < 8){currentShip.gambits++; spaStore.shipUpdate();}}" />
            </div>

            <!-- Systems -->
            <div class="systems">
                <div class="comms">
                    <img @click="()=>{if(currentShip.comms_dmg < currentShip.comms){currentShip.comms_dmg++}else{currentShip.comms_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/sys'+currentShip.comms+'of4.png'" />
                    <div class="sys-add-button" @click="()=>{if(currentShip.comms<4){currentShip.comms++;}else{currentShip.comms = 0}; spaStore.shipUpdate();}" />
                    <img class="damage" @click="()=>{if(currentShip.comms_dmg < currentShip.comms){currentShip.comms_dmg++}else{currentShip.comms_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/dmg'+currentShip.comms_dmg+'.png'" />
                    <div class="mods">
                        <div v-for="(mod, index) in currentShip.comms_mods" :key="mod.index">
                            <SystemsMod type="comms_mods" :itemIndex="index" />
                        </div>
                    </div>
                </div>
                <div class="engines">
                    <img @click="()=>{if(currentShip.engines_dmg < currentShip.engines){currentShip.engines_dmg++}else{currentShip.engines_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/sys'+currentShip.engines+'of3.png'" />
                    <div class="sys-add-button" @click="()=>{if(currentShip.engines<3){currentShip.engines++;}else{currentShip.engines = 0}; spaStore.shipUpdate();}" />
                    <img class="damage" @click="()=>{if(currentShip.engines_dmg < currentShip.engines){currentShip.engines_dmg++}else{currentShip.engines_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/dmg'+currentShip.engines_dmg+'.png'" />
                    <div class="mods">
                        <div v-for="(mod, index) in currentShip.engines_mods" :key="mod.index">
                            <SystemsMod type="engines_mods" :itemIndex="index" />
                        </div>
                    </div>
                </div>
                <div class="hull">
                    <img @click="()=>{if(currentShip.hull_dmg < currentShip.hull){currentShip.hull_dmg++}else{currentShip.hull_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/sys'+currentShip.hull+'of2.png'" />
                    <div class="sys-add-button" @click="()=>{if(currentShip.hull<2){currentShip.hull++;}else{currentShip.hull = 0}; spaStore.shipUpdate();}" />
                    <img class="damage" @click="()=>{if(currentShip.hull_dmg < currentShip.hull){currentShip.hull_dmg++}else{currentShip.hull_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/dmg'+currentShip.hull_dmg+'.png'" />
                    <div class="mods">
                        <div v-for="(mod, index) in currentShip.hull_mods" :key="mod.index">
                            <SystemsMod type="hull_mods" :itemIndex="index" />
                        </div>
                    </div>
                </div>
                <div class="weapons">
                    <img @click="()=>{if(currentShip.weapons_dmg < currentShip.weapons){currentShip.weapons_dmg++}else{currentShip.weapons_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/sys'+currentShip.weapons+'of3.png'" />
                    <div class="sys-add-button" @click="()=>{if(currentShip.weapons<3){currentShip.weapons++;}else{currentShip.weapons = 0}; spaStore.shipUpdate();}" />
                    <img class="damage" @click="()=>{if(currentShip.weapons_dmg < currentShip.weapons){currentShip.weapons_dmg++}else{currentShip.weapons_dmg=0}; spaStore.shipUpdate();}" :src="'graphics/dmg'+currentShip.weapons_dmg+'.png'" />
                    <div class="mods">
                        <div v-for="(mod, index) in currentShip.weapons_mods" :key="mod.index">
                            <SystemsMod type="weapons_mods" :itemIndex="index" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- UPKEEP -->
            <div class="upkeep">
                {{ upkeep }}
                <img 
                    class="upkeep-image"
                    :src="'graphics/skip'+currentShip.skips+'.png'"
                    @click="()=>{if(currentShip.skips<4){currentShip.skips++} else {currentShip.skips = 0}; spaStore.shipUpdate();}"
                />
            </div>

            <!-- FUEL/SHIELDS -->
            <div class="hyperfuel">
                <img 
                    :src="'graphics/hyperfuel'+currentShip.hyperfuel+'.png'"
                    @click="()=>{if(currentShip.hyperfuel>0){currentShip.hyperfuel--}else{currentShip.hyperfuel=2}; spaStore.shipUpdate();}" 
                />
            </div>
            <div class="shields">
                <img v-if="spaStore.hasShields"
                    :src="currentShip.shields? 'graphics/shields-checked.png' : 'graphics/shields-unchecked.png'"
                    @click="()=>{currentShip.shields = !currentShip.shields; spaStore.shipUpdate();}"
                />
                <img v-else class="noshields"
                    src="graphics/shields-none.png"
                />
            </div>
            
            <!-- CREW UPGRADES -->
            <div class="crew-gear crew-upgrade">
                <CrewUpgrade :numBoxes=2 desc="Alien Pet" />
                <CrewUpgrade :numBoxes=1 desc="Land Transport" />
                <CrewUpgrade :numBoxes=1 desc="Recon Drone" />
                <CrewUpgrade :numBoxes=1 desc="Survival Gear" />
                <CrewUpgrade :numBoxes=1 desc="Workshop" />
                <img class="gloss" src="graphics/gloss-crewgear.png" />
            </div>
            <div class="upgrades crew-upgrade">
                <CrewUpgrade :numBoxes=1 desc="Tracers/Bugs" />
                <CrewUpgrade :numBoxes=1 desc="Stun Weapons" />
                <CrewUpgrade :numBoxes=2 desc="Personal Vehicles" />
                <CrewUpgrade :numBoxes=2 desc="Hard Knocks" />
                <CrewUpgrade :numBoxes=3 desc="Smooth Criminals" />
                <img class="gloss" src="graphics/gloss-upgrades.png" />
            </div>
            <div class="auxiliary crew-upgrade">
                <CrewUpgrade :numBoxes=1 desc="AI Module" />
                <CrewUpgrade :numBoxes=1 desc="Armoury" />
                <CrewUpgrade :numBoxes=1 desc="Brig" />
                <CrewUpgrade :numBoxes=1 desc="Galley" />
                <CrewUpgrade :numBoxes=1 desc="Medical Bay" />
                <CrewUpgrade :numBoxes=1 desc="Science Bay" />
                <CrewUpgrade :numBoxes=2 desc="Shields" />
                <img class="gloss" src="graphics/gloss-auxiliary.png" />
            </div>
            <div class="ship-gear crew-upgrade">
                <CrewUpgrade :numBoxes=1 desc="Holo-Emitters" />
                <CrewUpgrade :numBoxes=1 desc="Intruder Alarm" />
                <CrewUpgrade :numBoxes=1 desc="Land Rover" />
                <CrewUpgrade :numBoxes=1 desc="Power Reserves" />
                <CrewUpgrade :numBoxes=1 desc="Shuttle" />
                <CrewUpgrade :numBoxes=1 desc="Stasis Pods" />
                <CrewUpgrade :numBoxes=1 desc="Vault" />
                <img class="gloss" src="graphics/gloss-shipgear.png" />
            </div>
            <div class="training crew-upgrade">
                <CrewUpgrade :numBoxes=1 desc="Insight" />
                <CrewUpgrade :numBoxes=1 desc="Prowess" />
                <CrewUpgrade :numBoxes=1 desc="Resolve" />
                <CrewUpgrade :numBoxes=1 desc="Playbook" />
                <img class="gloss" src="graphics/gloss-training.png" />
            </div>

            <!-- HEAT/WANTED -->
            <div class="heat">
                <div class="system-heat rin">
                    <span class="system">Rin:</span>
                    <img class="heatbar" @click="()=>{ if(currentShip.heat_rin < 8){ currentShip.heat_rin++ } else { currentShip.heat_rin = 0; if(currentShip.wanted_rin < 3){ currentShip.wanted_rin++ }}; spaStore.shipUpdate();}" :src="'graphics/heat'+currentShip.heat_rin+'.png'" />
                    <img class="coolbar" @click="()=>{ if(currentShip.cool_rin < 8){ currentShip.cool_rin++ } else { currentShip.cool_rin = 0; if(currentShip.wanted_rin > 0){ currentShip.wanted_rin-- }}; spaStore.shipUpdate();}" :src="'graphics/cool'+currentShip.cool_rin+'.png'" />
                    <span class="wanted">{{ currentShip.wanted_rin }}</span>
                </div>
                <div class="system-heat iota">
                    <span class="system">Iota:</span>
                    <img class="heatbar" @click="()=>{ if(currentShip.heat_iota < 8){ currentShip.heat_iota++ } else { currentShip.heat_iota = 0; if(currentShip.wanted_iota < 3){ currentShip.wanted_iota++ }}; spaStore.shipUpdate();}" :src="'graphics/heat'+currentShip.heat_iota+'.png'" />
                    <img class="coolbar" @click="()=>{ if(currentShip.cool_iota < 8){ currentShip.cool_iota++ } else { currentShip.cool_iota = 0; if(currentShip.wanted_iota > 0){ currentShip.wanted_iota-- }}; spaStore.shipUpdate();}" :src="'graphics/cool'+currentShip.cool_iota+'.png'" />
                    <span class="wanted">{{ currentShip.wanted_iota }}</span>
                </div>
                <div class="system-heat holt">
                    <span class="system">Holt:</span>
                    <img class="heatbar" @click="()=>{ if(currentShip.heat_holt < 8){ currentShip.heat_holt++ } else { currentShip.heat_holt = 0; if(currentShip.wanted_holt < 3){ currentShip.wanted_holt++ }}; spaStore.shipUpdate();}" :src="'graphics/heat'+currentShip.heat_holt+'.png'" />
                    <img class="coolbar" @click="()=>{ if(currentShip.cool_holt < 8){ currentShip.cool_holt++ } else { currentShip.cool_holt = 0; if(currentShip.wanted_holt > 0){ currentShip.wanted_holt-- }}; spaStore.shipUpdate();}" :src="'graphics/cool'+currentShip.cool_holt+'.png'" />
                    <span class="wanted">{{ currentShip.wanted_holt }}</span>
                </div>
                <div class="system-heat brekk">
                    <span class="system">Brekk:</span>
                    <img class="heatbar" @click="()=>{ if(currentShip.heat_brekk < 8){ currentShip.heat_brekk++ } else { currentShip.heat_brekk = 0; if(currentShip.wanted_brekk < 3){ currentShip.wanted_brekk++ }}; spaStore.shipUpdate();}" :src="'graphics/heat'+currentShip.heat_brekk+'.png'" />
                    <img class="coolbar" @click="()=>{ if(currentShip.cool_brekk < 8){ currentShip.cool_brekk++ } else { currentShip.cool_brekk = 0; if(currentShip.wanted_brekk > 0){ currentShip.wanted_brekk-- }}; spaStore.shipUpdate();}" :src="'graphics/cool'+currentShip.cool_brekk+'.png'" />
                    <span class="wanted">{{ currentShip.wanted_brekk }}</span>           
                </div>
            </div>

            <!-- ABILITIES: -->
            <div class="ship-column-right">
                <div class="ship-abilities" >
                    <div class="ability" v-for="(item, index) in currentShip.abilities" :key="item.index" >
                        <AbilityItem type="ship" :itemIndex="index" />
                    </div>
                </div>
                <div @click="()=>addAbility()" class="ship-ability-add-button">
                    <button>
                    <img class="image-hover" src="graphics/ship-add-button-hover.png" />
                    <img class="image-main" src="graphics/ship-add-button.png" />
                    </button>
                </div>
            </div>

            <!-- NOTES: -->
            <div class="column-left">
                <img class="ship-notes-title" src="graphics/ship-notes-title.png" />
                <div class="ship-notes">
                    <div class="notelist">
                    <div class="note" v-for="(item, index) in currentShip.notes" :key="item.index" >
                        <NoteItem type="ship" :itemIndex="index" />
                    </div>
                    <div @click="()=>addNote()" class="notes-add-button">
                        <button>
                            <img class="image-hover" src="graphics/plus-add2-hover.png" />
                            <img class="image-main" src="graphics/plus-add2.png" />
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from "vue"
import { useSpaStore } from '@/stores/'
import EditableInput from '@/components/EditableInput.vue'
import PictureFile from '@/components/PictureFile.vue'
import SystemsMod from '@/components/SystemsMod.vue'
import CrewUpgrade from '@/components/CrewUpgrade.vue'
import AbilityItem from '@/components/AbilityItem.vue'
import NoteItem from '@/components/NoteItem.vue'

const spaStore = useSpaStore()

const currentShip = ref(spaStore.currentShip)



watch(() => spaStore.currentShip, (newValue) => {
  currentShip.value = newValue
  console.log("ShipObj >>> WATCH UPDATE <<< | for spaStore.currentShip.engines_mods change to ", spaStore.currentShip.hull_mods) 
    
})

const upkeep = computed(() => {
  const total = currentShip.value.comms + currentShip.value.engines + currentShip.value.hull + currentShip.value.weapons + currentShip.value.crewsize;
  return Math.floor(total / 4);
});

const increaseCred=()=>{
    let credLimit = spaStore.isVault? 8 : 4
    if(currentShip.value.cred < credLimit){
        currentShip.value.cred++
        spaStore.shipUpdate()
    }
}
const decreaseCred=()=>{
    if(currentShip.value.cred > 0){
        currentShip.value.cred--
        spaStore.shipUpdate()
    }
}
const credImage1 = computed(()=>{
    if(currentShip.value.cred <= 4){
        return "graphics/shipcred"+currentShip.value.cred+".png"
    }
    else{
        return "graphics/shipcred4.png"
    }
})
const credImage2 = computed(()=>{
    if(spaStore.isVault){
        if(currentShip.value.cred <= 4){
            return "graphics/shipcred0.png"
        }
        else{
            return "graphics/shipcred"+(currentShip.value.cred - 4)+".png"
        }
    }
    else{
        if(currentShip.value.cred <= 4){
            return "graphics/novault0.png"
        }
        else{
            return "graphics/novault"+(currentShip.value.cred - 4)+".png"
        }
    }
    
})

const increaseDebt = () => {
    
    if(currentShip.value.debt < 15){
        currentShip.value.debt = currentShip.value.debt + 2
        spaStore.shipUpdate()
    }

}
const decreaseDebt = () => {
    if(currentShip.value.debt > 0){
        currentShip.value.debt--
        spaStore.shipUpdate()
    }
}

const addAbility = () => {
  if(currentShip.value.abilities.length < 7){
    const newAbility = ""
    spaStore.currentShip.abilities.push(newAbility)
    console.log("addAbility: ", currentShip.value.id)
  }
}

const addNote = () => {
  if(currentShip.value.notes.length < 7){
    const newNote = ""
    spaStore.currentShip.notes.push(newNote)
    console.log("addNote: ", currentShip.value.id)
  }
}

onMounted(async () => {
  spaStore.fetchShip();
})


</script>

<style>

</style>