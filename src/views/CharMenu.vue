<template>
  <div class="nav-log">
    <div :class="['log', showLog === 'active' ? 'active' : '', showLog === 'activetall' ? 'activetall' : '']">
      <div class="column1">
        <div class="log-display" ref="logDisplay">
          <div class="log-item" v-for="(e, index) in spaStore.crewLog" :key="index">
            <p class="timestamp">{{ e.timestamp }}</p>
            <span class="log-content" v-html="e.content"></span>
          </div>
        </div>
        <form @submit.prevent="addNote" class="log-entry">
          <input type="text" v-model="noteInput" id="noteInput" placeholder="Enter your message...">
          <button type="submit">add note</button>
        </form>
      </div>
      <div class="clock-list">
        <div class="add-clock">
          <input type="text" id="clockNameinput" maxLength=32 v-model="clockNameInput" placeholder="Clock description">
          <select v-model="clockTypeInput" id="clockTypeInput">
            <option value="">[select type]</option>
            <option value="magenta,4">Magenta [4]</option>
            <option value="magenta,6">Magenta [6]</option>
            <option value="magenta,8">Magenta [8]</option>
            <option value="magenta,12">Magenta [12]</option>
            <option value="magenta,18">Magenta [18]</option>
            <option value="green,4">Green [4]</option>
            <option value="green,6">Green [6]</option>
            <option value="green,8">Green [8]</option>
            <option value="green,12">Green [12]</option>
            <option value="green,18">Green [18]</option>
            <option value="teal,4">Teal [4]</option>
            <option value="teal,6">Teal [6]</option>
            <option value="teal,8">Teal [8]</option>
            <option value="teal,12">Teal [12]</option>
            <option value="teal,18">Teal [18]</option>
          </select>
          <button @click="newClock(clockNameInput, clockTypeInput.split(',')[0], parseInt(clockTypeInput.split(',')[1]))">add</button>
        </div>
        
        <div v-for="(clock) in spaStore.clockList" :key="clock.id" class="clock" :class="[clock.color, clock.ticksTicked >= clock.totalTicks ? 'pulsate' : '']" >
          <img :src="'/graphics/clock'+clock.totalTicks+'-'+clock.ticksTicked+'.png'"/>
          <span>{{ clock.clockName }}</span>
          
          <div v-if="clock.ticksTicked < clock.totalTicks" class="dropdown">
            <div class="dropdown-container">
              <button class="tick-btn">+</button>
              <div class="dropdown-content">
                <a v-for="i in 5" :key="i" @click="tickClock(clock, i)">+{{ i }}</a>
              </div>
            </div>
          </div>
          <div v-else class="dropdown">
            <button class="remove" @click="spaStore.removeClock(clock.id)">x</button>
          </div>
        </div>
        
        
        
      </div>
      
    </div>


    <!-- ROLL TABLE -->
    <div class="roll-container" :class="rollExpanded ? 'expanded' : '' ">
      <RollTable :thisUser="thisUser"/>
    </div>

    <!-- ROLL SUMMARY -->
    <div class="roll-statusbar" v-show="spaStore.currentRoll.activeRoll"> 
      <div class="rollSummary1" @click="rollExpand(1)">
        <span class="in-progress" >now rolling...</span><br>
        <a v-show="spaStore.currentRoll.char" @click="rollExpand(2)">{{ spaStore.currentRoll.char }}</a>
        
      </div>
      <div class="rollSummary2" @click="rollExpand(2)">
        <p class="upper" v-show="spaStore.currentRoll.rollType"> {{ spaStore.currentRoll.rollType }} roll</p><br>
        <p class="lower" v-show="spaStore.currentRoll.rating">{{ spaStore.currentRoll.rating }}</p>
      </div>
      
      <div class="rollSummary3" v-show="spaStore.currentRoll.position" @click="rollExpand(3)"><p class="upper"><span class="red" v-if="spaStore.currentRoll.position === 'desperate'">{{ spaStore.currentRoll.position }}</span><span v-else>{{ spaStore.currentRoll.position }}</span></p><p class="lower">{{ spaStore.currentRoll.effect }}</p></div>
      <div class="pe-bonuses">
        <a v-show="spaStore.currentRoll.pushEffect" @click="rollExpand(4)"><img src="/graphics/mini-e.png"/></a>
        <a v-show="spaStore.currentRoll.setupEffect" @click="rollExpand(4)"><img src="/graphics/mini-e.png"/></a>
        <a v-show="spaStore.currentRoll.setupPosition" @click="rollExpand(4)"><img src="/graphics/mini-p.png"/></a>
      </div>
      <div class="rollSummary4" @click="rollExpand(4)">
        <a class="base" v-show="spaStore.currentRoll.baseDice >= 0" @click="rollExpand(2)">{{ spaStore.currentRoll.baseDice }}d (base)  </a>
        <a v-for="(a, index) in spaStore.currentRoll.advantages.length" :key="index"><img src="/graphics/mini-plus.png"/></a>
        <a v-for="(d, index) in spaStore.currentRoll.disadvantages.length" :key="index"><img src="/graphics/mini-minus.png"/></a>
        <a v-show="spaStore.currentRoll.assist" @click="rollExpand(4)"><img src="/graphics/mini-plus.png"/></a>
        <a v-show="spaStore.currentRoll.useDevilsBargain" @click="rollExpand(4)"><img src="/graphics/mini-plus.png"/></a>
        <a v-show="spaStore.currentRoll.pushDice" @click="rollExpand(4)"><img src="/graphics/mini-plus.png"/></a>
        <a v-show="spaStore.currentRoll.useGambit" @click="rollExpand(4)"><img src="/graphics/mini-plus.png"/></a>
      </div>
      
      <div class="dp-container" v-show="spaStore.currentRoll.dicePool">
        = <img class="shimmer" v-for="(die, index) in spaStore.currentRoll.dicePool" :key="index" src="/graphics/small-die.png"/>
      </div>
    </div>
    
    
    <div class="nav">
        <div class="nav-item">
          <router-link to="/ship-view">{{spaStore.currentShip.designation}}</router-link>
        </div>
        <div class="nav-list" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave"> 
          <span>: Crew ▼</span>
          <ul :class="isOpen ? 'opened-menu' : 'closed-menu'" >
            <li v-for="(character, index) in spaStore.Characters" :key="character.id">
              <router-link to="/character-view" @click="()=>{isOpen = false; spaStore.selectCharacter(character)}">{{ spaStore.Charnames[index] }}</router-link>
            </li>
            <li>
              <router-link to="/add">+New</router-link>
            </li>
          </ul>
        </div>
        
        <div class="menu-buttons">
          <a class="roll-cancel-button" v-show="showCancelButton" @click="cancelRollIfOwner()">Cancel Roll</a>
        
          <div class="roll-buttons">
            
            <div class="non-marquee" v-show="!spaStore.currentRoll.activeRoll" @click="beginRollAndExpand()">
              <div class="slide-in"><img src="/graphics/dice.png" />
                Roll Some Dice...
              </div>
            </div>
            <div class="marquee" :class="rollExpanded ? 'expanded' : 'collapsed'" v-show="spaStore.currentRoll.activeRoll">
              <div class="marquee-scroll">
                <img src="/graphics/dice.png" />
                Rolling in Progress...
              </div>
              <div class="marquee-scroll2">
                <img src="/graphics/dice.png" />
                Rolling in Progress...
              </div>
            </div>
          </div>

          <div class="log-buttons">
             Log:
            <button @click="toggleLog('hide')" class="hide-log" :class="{ 'inactive-log': showLog === 'hide' }"></button>
            <button @click="toggleLog('active')" class="show-log" :class="{ 'inactive-log': showLog === 'active' }"></button>
            <button @click="toggleLog('activetall')" class="max-log" :class="{ 'inactive-log': showLog === 'activetall' }"></button>
          </div>  
        </div>  
       
        <a @click="handleSignOut" class="signout">
          Sign Out
        </a>
    </div>
  </div>
</template>


<script setup>

import GameClock from '@/components/GameClock.vue'
import RollTable from '@/components/RollTable.vue'
import { nextTick, computed, onMounted, ref, watch } from "vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { useSpaStore } from '@/stores/'
import { useRouter } from 'vue-router'
const router = useRouter()
const spaStore = useSpaStore()

const thisUser = ref('')

const myCrew = "myCrew123"
const isLoggedIn = ref(false)
const isOpen = ref(false)
const showLog = ref('')
const noteInput = ref('')
const clockNameInput = ref('')
const clockTypeInput = ref('')
const logDisplay = ref('')
const rollExpanded = ref(false)

const addNote = () => {
  spaStore.addLogEntry('note', {content: noteInput.value} )
  noteInput.value = ''
}

const showCancelButton = computed (() =>{
  if((spaStore.currentRoll.rollOwner === thisUser.value) && spaStore.currentRoll.activeRoll && !spaStore.currentRoll.diceRollGo){
    return true
  } else {
    return false
  }
})

let auth;

//Auto-scroll the log when new entries are added:
watch(
  () => spaStore.crewLog,
  () => {
    logDisplay.value.scrollTop = logDisplay.value.scrollHeight;
  }
);

function beginRollAndExpand() {
  if(!spaStore.currentRoll.activeRoll){
    rollExpanded.value = true;
    console.log ("beginRollAndExpand is setting rollExpanded to true?, ", rollExpanded.value)
    spaStore.beginRoll(thisUser.value);
  }
}

/* function toggleRollExpansion() {
  rollExpanded.value = !rollExpanded.value
} */
function rollExpand(step) {
  console.log("rollExpand is setting step to: ", step)
  //console.log(spaStore.currentRoll.diceRollGo)
  if(thisUser.value === spaStore.currentRoll.rollOwner){
    rollExpanded.value = true
    if(!spaStore.currentRoll.step1Completed && step >= 1){
      spaStore.currentRoll.rollStep = 1
    } else if (!spaStore.currentRoll.step2Completed && step >= 2){
      spaStore.currentRoll.rollStep = 2
    } else if (!spaStore.currentRoll.step3Completed && step >= 3){
      console.log("SOOO?")
      spaStore.currentRoll.rollStep = 3
    } else if (!spaStore.currentRoll.step4Completed && step >= 4){
      spaStore.currentRoll.rollStep = 4 
    } else {
        if(spaStore.currentRoll.diceRollGo){
        spaStore.currentRoll.rollStep = 5
      } else {
        spaStore.currentRoll.rollStep = step
      }
    }  
  } else {
    console.log("YOU ARE NOT THE ROLL OWNER")
  }
}

function cancelRollIfOwner() {
  console.log("OWNER: ", spaStore.currentRoll.rollOwner + "     thisUser.value: ", thisUser.value)
  if(spaStore.currentRoll.rollOwner === thisUser.value){
    spaStore.cancelRoll()
  }
}
watch(() => spaStore.currentRoll.activeRoll, (newValue) => {
  if (newValue === false){
    rollExpanded.value = false
  }
})
watch(() => spaStore.currentRoll.rollStep, (newValue) => {
  if (newValue === 5){
    rollExpanded.value = true
  } else {
    if(spaStore.currentRoll.rollOwner !== thisUser.value){
      rollExpanded.value = false
    }
  }
})

const newClock = (clockName, color, totalTicks) => {
  console.log('new clock', clockName, color, totalTicks)
  const clockData = {
    clockName: clockName,
    totalTicks: totalTicks,
    color: color,
    ticksTicked: 0,
    newTicks: 0,
  }
  spaStore.addClock({data: clockData})
  clockNameInput.value = ""
  clockTypeInput.value = null
  
  spaStore.addLogEntry('clocktick', clockData)
}

const tickClock = (clock, ticks) => {
  console.log("TICKS ADDED:", clock)
  clock.ticksTicked += ticks
  if (clock.ticksTicked >= clock.totalTicks){
    clock.ticksTicked = clock.totalTicks
  }
  clock.newTicks = ticks
  const clockData = {
    id: clock.id,
    clockName: clock.clockName,
    totalTicks: clock.totalTicks,
    color: clock.color,
    ticksTicked: clock.ticksTicked, 
  }
  spaStore.updateClock({id:clock.id, data:clockData})
  spaStore.addLogEntry('clocktick', clock)
}

const handleSignOut = () => {
  console.log("CharMenu: ________ SIGNING OUT!")
  signOut(auth).then(() => {
    router.push("/")
  })
}

const toggleLog=(state)=>{
  showLog.value = state
}

const mouseover=()=>{
  isOpen.value = true;
  
}
const mouseleave=()=>{
  isOpen.value = false;
  
}

onMounted(()=>{
  showLog.value = "hide"
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      thisUser.value = user.uid
      //console.log("CURRENTLY LOGGED-IN USER IS: ", thisUser.value)
    } else {
      isLoggedIn.value = false;
    }
  })
  
  console.log('CharMenu >>> ON MOUNT <<< | fetchCharacters called from MENU...')
  spaStore.fetchCharacters()
  spaStore.fetchShip()
  spaStore.fetchClockList()
  spaStore.fetchCrewLog()
  spaStore.fetchRoll()
  nextTick(() => {
      //console.log("SCROLLING")
      logDisplay.value.scrollTop = logDisplay.value.scrollHeight;
      console.log("CREWMENU ONMOUNTED:  thisUser.value: ", thisUser.value + "      spaStore.currentRoll.rollOwner: ", spaStore.currentRoll.rollOwner) 
      if(thisUser.value === spaStore.currentRoll.rollOwner || spaStore.currentRoll.rollStep === 5){
        
        rollExpanded.value = true
      }
    });
  console.log('CharMenu >>> END OF MOUNT <<< | spaStore.currentShip.designation ', spaStore.currentShip.designation)
})

</script>
