<template>
    <div class="roll">
        <div class="bgbg" v-show="spaStore.currentRoll.rollStep === 5" ></div>
        <div class="bg-slide-container" ref="bgSlideRef">
            
        </div>
        
        <div class="roll-step" v-show="spaStore.currentRoll.rollStep === 1">
            
            <h1>Whose roll?</h1>

            
            <form class="step1">
                <div :class="spaStore.currentRoll.selectedWho === 'Character'? 'selected' : 'unselected'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.selectedWho" value="Character">
                        Character
                    </label>
                    <select v-show="spaStore.currentRoll.selectedWho === 'Character'"  v-model="spaStore.currentRoll.char" @change="handleSelect">
                        <option value="">
                            Select...
                        </option>
                        <option v-for="(character, index) in spaStore.Characters" :key="character.id" >
                            {{ spaStore.Charnames[index] }}
                        </option>
                    </select>
                </div>
                <div :class="spaStore.currentRoll.selectedWho === 'NPC'? 'selected' : 'unselected'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.selectedWho" value="NPC">
                        NPC
                    </label>
                    <input type="text" v-show="spaStore.currentRoll.selectedWho === 'NPC'" placeholder="NPC Name" v-model="spaStore.currentRoll.char" />
                </div>
                <div :class="spaStore.currentRoll.selectedWho === 'Faction'? 'selected' : 'unselected'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.selectedWho" value="Faction">
                        Faction
                    </label>
                    <input type="text" v-show="spaStore.currentRoll.selectedWho === 'Faction'" placeholder="Faction Name" v-model="spaStore.currentRoll.char"/>
                </div>
                <p v-show="formError" class="formErrorMsg">Please complete selection.</p>

            </form>

            <transition name="fade-in-and-flash">
                <div class="next-slide step1" @click="rollAdvance()" ><p>next</p></div>
            </transition>

        </div>

        <div class="roll-step" v-show="spaStore.currentRoll.rollStep === 2">

            <h1>What's the plan?</h1>

            <form class="step2">
                <div :class="spaStore.currentRoll.rollType === 'Action'? 'selected' : 'unselected'" v-show="spaStore.currentRoll.selectedWho === 'Character'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.rollType" value="Action">
                        Action Roll
                        <select v-model="spaStore.currentRoll.rating" v-show="spaStore.currentRoll.rollType === 'Action'" @change="handleSelect">
                            <option value="doctor">Doctor</option><option value="hack">Hack</option><option value="rig">Rig</option><option value="study">Study</option>
                            <option value="helm">Helm</option><option value="scramble">Scramble</option><option value="scrap">Scrap</option><option value="skulk">Skulk</option>
                            <option value="attune">Attune</option><option value="command">Command</option><option value="consort">Consort</option><option value="sway">Sway</option>
                        </select>
                    </label>
                </div>
                <div :class="spaStore.currentRoll.rollType === 'Fortune'? 'selected' : 'unselected'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.rollType" value="Fortune">
                        Fortune Roll 
                        <h2 v-if="(spaStore.currentRoll.selectedWho === 'Character' && spaStore.currentRoll.rollType === 'Fortune')" >
                          <label>Rating:</label>
                          <select v-model="spaStore.currentRoll.rating">
                            <option value="doctor">Doctor</option><option value="hack">Hack</option><option value="rig">Rig</option><option value="study">Study</option>
                            <option value="helm">Helm</option><option value="scramble">Scramble</option><option value="scrap">Scrap</option><option value="skulk">Skulk</option>
                            <option value="attune">Attune</option><option value="command">Command</option><option value="consort">Consort</option><option value="sway">Sway</option>
                          </select>
                        </h2>
                        <h2 v-else v-show="spaStore.currentRoll.rollType === 'Fortune'">
                          <label>Rating:</label>
                          <select v-model="spaStore.currentRoll.rating">
                            <option value="">Select...</option>
                            <option value="tier">Tier</option>
                            <option value="quality">Quality</option>
                            <option value="magnitude">Magnitude</option>
                            <option value="wanted level">Wanted Level</option>
                          </select>
                          <input class="base" v-model="spaStore.currentRoll.baseDice" type="number" min="0" max="6" />
                        </h2>
                    </label>
                </div>
                <div :class="spaStore.currentRoll.rollType === 'Resist'? 'selected' : 'unselected'" v-show="spaStore.currentRoll.selectedWho === 'Character'">
                    <label>
                        <input type="radio" v-model="spaStore.currentRoll.rollType" value="Resist">
                        Resist Roll
                        <select v-model="spaStore.currentRoll.rating" v-show="spaStore.currentRoll.rollType === 'Resist'">
                            <option>Insight</option><option>Prowess</option><option>Resolve</option>
                        </select>
                    </label>
                </div>
                <div class="goal">
                    <label>{{ goalAsk }}</label><br>
                    <textarea v-model="spaStore.currentRoll.goal" ref="inputGoal" />
                </div>
                

                <p v-show="formError" class="formErrorMsg">Please complete selection.</p>
            </form>

            <transition name="fade-in-and-flash">
                <div class="next-slide step2" @click="rollAdvance()" ><p>next</p></div>
            </transition>

        </div>

        <div class="roll-step" v-show="spaStore.currentRoll.rollStep === 3">

            <h1>How does it look?</h1>
        
            <form class="step3">
                
                <div v-show="spaStore.currentRoll.rollType === 'Action'" class="pos-eff"><img class="pe-title" src="graphics/poseff.png" />
                    <div class="ring-bearer" :style="ringPosition">
                        <div class="effect-arrows">
                            <img class="push-effect-arrow" :class="spaStore.currentRoll.pushEffect ? 'visible' : 'invisible'" src="/graphics/push-arrow.png" />
                            <img class="setup-effect-arrow" :class="spaStore.currentRoll.setupEffect ? 'visible' : 'invisible'" src="/graphics/push-arrow.png" />
                        </div>
                        <div class="position-arrow">
                            <img class="setup-position-arrow" :class="spaStore.currentRoll.setupPosition ? 'visible' : 'invisible'" src="/graphics/push-arrow-v.png" />
                        </div>
                        <img class="ring" src="/graphics/ring.png"  />
                    </div>
                    <div class="roll-grid">
                        <div v-for="(effect, index) in effects" :key="index">
                            <div v-for="(position, index) in positions" :key="index"
                                :class="{ selected: isSelected(position, effect) }"
                                @click="setPE(position, effect)">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="effect-labels">
                        <p style="margin-left: 9px" :class="spaStore.currentRoll.effect === 'none' ? 'white' : ''">None</p>
                        <p style="margin-left: 6px" :class="spaStore.currentRoll.effect === 'limited' ? 'white' : ''">Limited</p>
                        <p style="margin-left: -9px" :class="spaStore.currentRoll.effect === 'standard' ? 'white' : ''">Standard</p>
                        <p style="margin-left: -30px" :class="spaStore.currentRoll.effect === 'greater' ? 'white' : ''">Greater</p>
                        <p style="margin-left: -18px" :class="spaStore.currentRoll.effect === 'extreme' ? 'white' : ''">Extreme</p>
                    </div>
                    <div class="position-labels">
                        <p :class="spaStore.currentRoll.position === 'controlled' ? 'white' : ''">Controlled</p>
                        <p :class="spaStore.currentRoll.position === 'risky' ? 'white' : ''">Risky</p>
                        <p :class="spaStore.currentRoll.position === 'desperate' ? 'red' : ''">Desperate</p>
                    </div>
                </div>

                <div v-show="spaStore.currentRoll.rollType === 'Action'" class="pe-bonus">
                  <div>
                    <h3>modifiers:</h3>
                    <p>Successful Setup Action:</p>
                    <button @click.prevent="toggleSetupPosition">
                      <img :src="spaStore.currentRoll.setupPosition ? '/graphics/plus-pos-on.png' : '/graphics/plus-pos-off.png'">
                      
                    </button>
                    <button @click.prevent="toggleSetupEffect">
                      <img :src="spaStore.currentRoll.setupEffect ? '/graphics/plus-eff-on.png' : '/graphics/plus-eff-off.png'">
                      
                    </button>
                    
                  </div>
                  <div>
                      <p>Push for Effect:</p>
                    <button @click.prevent="togglePushEffect">
                      <img :src="spaStore.currentRoll.pushEffect ? '/graphics/plus-eff-on.png' : '/graphics/plus-eff-off.png'">
                      
                    </button>
                  </div>
                </div>
                  
                
                <p v-show="spaStore.currentRoll.rollType === 'Action'" class="tip">Note: Position may be traded for effect, and visa versa. </p>  
                <p v-show="formError" class="formErrorMsg">Please complete selection.</p>
            </form>

            <transition name="fade-in-and-flash">
                <div class="next-slide step3" @click="rollAdvance()" ><p>next</p></div>
            </transition>
            
        </div>

        <div class="roll-step" v-show="spaStore.currentRoll.rollStep === 4">
            <h1>Load your Dice...</h1>
            <p class="dice-pool-title">Dice Pool</p>
            <p class="base-dice">(base {{ spaStore.currentRoll.baseDice }}  d6):</p> 
            <div class="dice-pool">
              <img class="die shimmer" v-for="index in 12" ref="dieElements" :key="index" :class="{ 'die-transparent': index > spaStore.currentRoll.dicePool }" src="/graphics/die.png" />
            </div>  
            <form class="step3">
              <div v-if="spaStore.currentRoll.selectedWho !== 'Character'" class="adv-disadv">
                <table class="advantages">
                  <tr>
                    <td colspan="2"><label>Major Advantages:</label></td>
                  </tr>
                  <tr v-for="(adv, index) in 4" :key="index" :class="(index-1) >= spaStore.currentRoll.advantages.length ? 'faded' : ''">
                    <td>
                      <button @click.prevent="toggleAdvantage(index)">
                        <img :src="(spaStore.currentRoll.advantages[index] ? '/graphics/plus-1d-on.png' : '/graphics/plus-1d-off.png')" />
                      </button>
                      
                    </td>
                    <td>
                      <input type="text" v-model="spaStore.currentRoll.advantages[index]"/>
                    </td>
                  </tr>
                </table>
                <table class="disadvantages">
                  <tr>
                    <td colspan="2"><label>Major Disadvantages:</label></td>
                  </tr>
                  <tr v-for="(dis, index) in 4" :key="index" :class="(index-1) >= spaStore.currentRoll.disadvantages.length ? 'faded' : ''">
                    <td>
                      <button @click.prevent="toggleDisadvantage(index)">
                        <img :src="(spaStore.currentRoll.disadvantages[index] ? '/graphics/minus-1d-on.png' : '/graphics/minus-1d-off.png')" />
                      </button>
                      
                    </td>
                    <td>
                      <input type="text" v-model="spaStore.currentRoll.disadvantages[index]"/>
                    </td>
                  </tr>
                </table>
              </div>
              <div v-else class="dice-bonuses">
                <div class="col1">
                  <p v-show="spaStore.currentRoll.rollType === 'Resist'" class="resist-tip">Note: Devil's Bargain is the only bonus available on Resist type rolls. </p>
                    
                  <div class="row" v-show="spaStore.currentRoll.rollType !== 'Resist'">
                    <button @click.prevent="toggleAssist">
                      <img :src="spaStore.currentRoll.assist ? '/graphics/plus-1d-on.png' : '/graphics/plus-1d-off.png'">
                    </button><p>Assistance</p>
                    <table>
                      <tr>
                        <td class="labels">
                          <label :class="assistError? 'assist-error' : ''">
                            assisted by?
                          </label>
                        </td>
                        <td class="inputs">                  
                          <select v-model="spaStore.currentRoll.assistant">
                            <option value="">
                              Select...
                            </option>
                            <option value="NPC">
                              NPC
                            </option>
                            <option v-for="(character, index) in spaStore.Characters" :key="character.id" >
                                {{ spaStore.Charnames[index] }}
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td class="labels">
                          <label :class="assistError? 'assist-error' : ''">assisted how?</label>
                        </td>
                        <td class="inputs">
                            <input type="text" v-model="spaStore.currentRoll.assistHow" ref="inputGoal" />
                        </td>
                      </tr>
                    </table>
                    
                  </div>
                  <div class="row2" v-show="spaStore.currentRoll.rollType === 'Action'">
                    <button @click.prevent="toggleGambit">
                      <img :src="spaStore.currentRoll.useGambit ? '/graphics/plus-1d-on.png' : '/graphics/plus-1d-off.png'">
                    </button><p>Use a Gambit</p>

                  </div>
                </div>
                <div class="col2">
                  <div class="row">
                    <button @click.prevent="toggleDevilsBargain">
                      <img :src="spaStore.currentRoll.useDevilsBargain ? '/graphics/plus-1d-on.png' : '/graphics/plus-1d-off.png'">
                    </button><p>Devil's Bargain</p>
                    <table>
                      <tr>
                        <td class="labels">
                          <label :class="dbError? 'db-error' : ''">what deal?</label>
                        </td>
                        <td class="inputs">
                            <input type="text" v-model="spaStore.currentRoll.devilsBargain" ref="inputGoal" />
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <div class="row2" v-show="spaStore.currentRoll.rollType === 'Action'">
                    <button @click.prevent="togglePushDice">
                      <img :src="spaStore.currentRoll.pushDice ? '/graphics/plus-1d-on.png' : '/graphics/plus-1d-off.png'">
                    </button><p>Push Yourself</p><p class="subtext">[take 2 stress]</p>

                  </div>
                </div>
              </div>

            </form>

            <transition name="fade-in-and-flash">
                <div class="next-slide step4" @click="rollAdvance()" ><p>next</p></div>
            </transition>
            
        </div>

        <div class="roll-step" v-show="spaStore.currentRoll.rollStep === 5">
          <h1>Ready to Roll!</h1>
          <div class="ready-info">
            <p><span class="highlight">{{ spaStore.currentRoll.char }}</span>: </p>
            <p>Making a <span class="highlight">{{ spaStore.currentRoll.rollType }}</span> roll 
            based on <span class="highlight">{{ spaStore.currentRoll.rating }}</span></p>
            
            <p><span>{{ goalPresent }}</span><span class="highlight">{{ spaStore.currentRoll.goal }}</span></p>
            
          </div>
          <div class="roll-area" >
            <transition-group 
              v-if="!spaStore.currentRoll.diceRollGo" 
              name="die-transition" 
              tag="div" 
              ref="diceContainer" 
              class="dice-container" 
              id="dice-container"
              @before-leave="beforeLeave" 
              @leave="leave" 
              @after-leave="afterLeave" 
            >
              <div class="die-box" :class="spaStore.currentRoll.dicePool === 0 ? 'red-dice' : ''" v-for="(die, index) in diceArray" :key="index" >
                <img class="die shimmer" ref="dieElements" src="/graphics/die.png" />
              </div>
            </transition-group>
            <div class="rolls" >
              <transition-group 
                v-if="spaStore.currentRoll.diceRollGo" 
                appear 
                @before-enter="beforeEnter" 
                @enter="enter"
                @after-enter="afterEnter"
              >
                <DiceRoller class="roller" v-for="(roll, index) in outcome" :targetNumber="spaStore.currentRoll.outcome[index]" :data-index="index" :key="index" />  
              </transition-group> 
            </div>
          </div>  
          <div v-show="showResult" :class="spaStore.currentRoll.clearRoll ? 'clearing' : ''" class="result-area" @click="clearRoll">
            <div class="results" :class="(spaStore.currentRoll.rollOwner === props.thisUser)? 'clickable' : ''">
              <div class="result-content" v-html="outcomeMessage">
                
              </div>
              
            </div>
            
          </div>

          <transition name="fade-in-and-flash">
              <div class="next-slide step5" @click="commitDiceRoll" ><p>roll</p></div>
          </transition>
          <a v-show="showResult && spaStore.currentRoll.rollOwner === props.thisUser" class="cancelX">[{{ dismissMessage }}]</a>
      </div>
    
    </div>
</template>

<script setup>
import { ref, nextTick, computed, watch, watchEffect, onMounted, getCurrentInstance } from 'vue'
import { useSpaStore } from '@/stores/'
import DiceRoller from '@/components/DiceRoller.vue'
import gsap from 'gsap'
const spaStore = useSpaStore()

const formError = ref(false)
const assistError = ref(false)
const dbError = ref(false)

const diceRollers = ref(false)

const diceArray = ref([])
let leaveCount = 0
let enterCount = 0

const diceContainer = ref(null)
const diceElems = ref([])

const dismissMessage = computed(() =>{
  if (spaStore.currentRoll.clearRoll){
    return 'logging data, please wait...'
  } else {
    return 'click to dismiss'
  }
})

const outcomeMessage = computed(() =>{
  let message
  if (spaStore.currentRoll.rollType === 'Action') {
    switch(spaStore.currentRoll.outcomeResult) {
      case 'critical':
        message = "<span class='crit' data-header='!! CRITICAL !!'>!! CRITICAL !!</span> <p>(no consequence)</p>"
        break
      case 'success':
        message = "<span class='nice'>Success!</span><p>(no consequence)</p>"
        break
      case 'partial': 
        message = "<span class='meh'>Success,</span> <p style='font-size: 22px'>with <span class='pulsate'>consequence</span></p>"
        break
      case 'failure':
        message = "<span class='poo' data-heading='FAILURE!'>FAILURE!</span><p style='font-size: 20px;'>with <span class='pulsate'>consequence</span></p>"
        break
      default: 
        message = "Action - default outcome"
        break
    }
  } else if (spaStore.currentRoll.rollType === 'Fortune') {
    switch(spaStore.currentRoll.outcomeResult) {
      case 'critical':
        message = "<span class='crit' data-header='!! CRITICAL !!'>!! CRITICAL !!</span> <p>Outstanding Results | Great/Extreme Effect | +5 Clock Ticks | +2 Quality</p>"
        break
      case 'success':
        message = "<span class='nice'>Nice!</span><p>Good Results | Full/Standard Effect | +3 Clock Ticks | +1 Quality</p>"
        break
      case 'partial': 
        message = "<span class='meh'>Meh...</span><p>Mixed Results | Partial/Limited Effect | +2 Clock Ticks | Normal Quality</p>"
        break
      case 'failure':
        message = "<span class='poo' data-heading='POO!'>POO!</span><p class='red'>Bad Results | Poor/No Effect | +1 Clock Tick | -1 Quality</p>"
        break
      default: 
        message = "Fortune - default outcome"
        break
    }
  } else if (spaStore.currentRoll.rollType === 'Resist') {
    switch(spaStore.currentRoll.outcomeResult) {
      case 'critical': 
        message = "<span class='crit' data-header='!! CRITICAL !!'>!! CRITICAL !!</span><p style='font-size: 16px;'>[Critical resist: recover 1 STRESS point.]</p>"
        break
      case 'success': 
        message = "<span class='nice'>Resisted!</span><p>[Take zero STRESS.]</p>"
        break
      case 'partial':
      case 'failure':
        const stressAmount = 6 - spaStore.currentRoll.outcomeNumber
        message = `<span class='meh'>Resisted!</span><p>[Take ${stressAmount} STRESS.]</p>`
        break
      default:
      message = "Resist - default outcome"
    }
  } else {
    message = "No outcome detected. (error 2)"
  }
  return message
})

const props = defineProps({
  thisUser: String,
});


const outcome = computed (() => {
  return spaStore.currentRoll.outcome
})

const showResult = ref(false)

const rolls = ref(null)

const setDiceSpacing = () => {
  //console.log("spacing set!")
    const rollCount = spaStore.currentRoll.diceNum
    const minWidth = 40
    const maxWidth = 100
    const width = `${minWidth + (maxWidth - minWidth) * (rollCount - 2) / 10}%`
    if (rolls.value) {
      rolls.value.style.width = width
      //console.log(spaStore.currentRoll.diceNum)
    }
}

watch(() => spaStore.currentRoll.diceNum, setDiceSpacing)
const beforeLeave = (el) => {
  //console.log("beforeLeave", el)
  gsap.set(el, {
    x: 0,
    opacity: 1,
  });
};

const leave = async (el, done) => {
  //console.log("leave triggered, diceArray = ", diceArray.value.length)
  if(diceArray.value.length < spaStore.currentRoll.diceNum) {
    await gsap.to(el, {
      x: '+=500',
      opacity: 0,
      duration: 2/6,
      ease: 'power2.inOut',
    })
    const index = diceArray.value.indexOf(el)
    diceArray.value.splice(index, 1)
  }
  done()
}


const afterLeave = (el) => {  
  leaveCount++
  //console.log("afterLeave, leaveCount = ", leaveCount)
  if (leaveCount === spaStore.currentRoll.diceNum) {
    //console.log("ALL ELEMENTS CLEAR, ANIMATION FINISHED! DiceRollGo = ")
    spaStore.currentRoll.diceRollGo = true
    spaStore.updateRoll()
  } 
}

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateX(1000px)'
  
}
const enter = (el, done) => {
  //console.log("enter")
   gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 2/6,
    onComplete: done,
    delay: .5 + el.dataset.index * 0.2
  })
}
const afterEnter = (el) => {  
  enterCount++
  //console.log("ENTER COUNT = ", enterCount)
  if (enterCount === spaStore.currentRoll.diceNum) {
    setTimeout(()=>{
      console.log("DISPLAYING RESULTS!! (from enterCount in afterEnter)")
      showResult.value = true
      
    }, 5000)
    enterCount = false
    spaStore.updateRoll()
  } 
}

const commitDiceRoll = () => {
  if(spaStore.currentRoll.rollOwner === props.thisUser){
    leaveCount = 0
    //console.log("BEGINNING ANIMATION, diceArray.length = ", diceArray.value.length)
    if(!spaStore.currentRoll.diceRollGo) {
      //console.log("DICE ROLL COMMITTED!")
      //create array for outcome
      let targetNumber
      let sixes = 0
      if(!spaStore.currentRoll.outcome){
        const outcome = ref([])
        if(spaStore.currentRoll.dicePool === 0){  //// ROLL TWO DICE & TAKE LOWEST (Zero Dice in Pool)
          //console.log("ROLLING ZERO DICE")
          for (let i = 0; i < 2; i++){
            targetNumber = Math.floor(Math.random() * 6) + 1;
            outcome.value.push(targetNumber)
            
          }
          outcome.value.sort((a, b) => a - b)
        } else {
          //console.log("ROLLING " + spaStore.currentRoll.dicePool + " DICE")
          for(let i = 0; i < spaStore.currentRoll.dicePool; i++) {
            targetNumber = Math.floor(Math.random() * 6) + 1;
            if(targetNumber === 6){
              sixes++
            }
            outcome.value.push(targetNumber)
          }
          outcome.value.sort((a, b) => b - a)
        }
        
        //console.log("OUTCOME: ", outcome.value + "       SELECTED: ", outcome.value[0])  
        
        //SETTING outcomeResult: //////////////////////////////////////
        if(sixes>1){
          spaStore.currentRoll.outcomeResult = "critical"
        } else if (outcome.value[0] === 6){
          spaStore.currentRoll.outcomeResult = "success"
          //console.log(" SINGLE 6 HAS BEEN DETECTED! ")
        } else if (outcome.value[0] === 5 || outcome.value[0] === 4){
          spaStore.currentRoll.outcomeResult = "partial"
          //console.log(" 4 OR 5 HAS BEEN DETECTED! ")
        } else {
          spaStore.currentRoll.outcomeResult = "failure"
          //console.log(" 1, 2, or 3 HAS BEEN DETECTED! ")
        }
        spaStore.currentRoll.outcome = outcome
        spaStore.currentRoll.outcomeNumber = outcome.value[0]
        //console.log("OUTCOME RESULT: ", spaStore.currentRoll.outcomeResult)
        spaStore.updateRoll()

      }
      diceArray.value.splice(0, 1)
    }
  } else {
    console.log("YOU ARE NOT THE ROLL OWNER!")
  }
}



const clearRoll= () => {
  if(spaStore.currentRoll.rollOwner === props.thisUser){
    spaStore.currentRoll.clearRoll = true;

    if (typeof spaStore.currentRoll.setupEffect === 'undefined') {
      spaStore.currentRoll.setupEffect = false
    }
    if (typeof spaStore.currentRoll.setupPosition === 'undefined') {
      spaStore.currentRoll.setupPosition = false
    }
    if (typeof spaStore.currentRoll.position === 'undefined') {
      spaStore.currentRoll.position = ''
    }
    if (typeof spaStore.currentRoll.effect === 'undefined') {
      spaStore.currentRoll.effect = ''
    }
    if (typeof spaStore.currentRoll.pushEffect === 'undefined') {
      spaStore.currentRoll.pushEffect = false
    }
    if (typeof spaStore.currentRoll.pushDice === 'undefined') {
      spaStore.currentRoll.pushDice = false
    }
    if (typeof spaStore.currentRoll.advantages === 'undefined') {
      spaStore.currentRoll.advantages = []
    }
    if (typeof spaStore.currentRoll.disadvantages === 'undefined') {
      spaStore.currentRoll.disadvantages = []
    }
    if (typeof spaStore.currentRoll.assist === 'undefined') {
      spaStore.currentRoll.assist = false
    }
    if (typeof spaStore.currentRoll.assistant === 'undefined') {
      spaStore.currentRoll.assistant = ''
    }
    if (typeof spaStore.currentRoll.assistHow === 'undefined') {
      spaStore.currentRoll.assistHow = ''
    }
    if (typeof spaStore.currentRoll.useGambit === 'undefined') {
      spaStore.currentRoll.useGambit = false
    }
    if (typeof spaStore.currentRoll.useDevilsBargain === 'undefined') {
      spaStore.currentRoll.useDevilsBargain = false
    }
    if (typeof spaStore.currentRoll.devilsBargain === 'undefined') {
      spaStore.currentRoll.devilsBargain = ''
    } 

    spaStore.updateRoll()
    spaStore.addLogEntry('roll', spaStore.currentRoll)
    setTimeout(()=>{
      spaStore.cancelRoll()
    }, 5000) 
  }
}

const toggleAdvantage = (index) => {
  if (spaStore.currentRoll.advantages[index]) {
    spaStore.currentRoll.advantages.splice(index, 1);
  } 
  spaStore.updateRoll()
}
const toggleDisadvantage = (index) => {
  if (spaStore.currentRoll.disadvantages[index]) {
    spaStore.currentRoll.disadvantages.splice(index, 1);
  } 
  spaStore.updateRoll()
}



// WATCH FOR MODIFICATIONS FOR DEPENDENCIES TO DICEPOOL:
watchEffect(() => {

  spaStore.currentRoll.dicePool = spaStore.currentRoll.baseDice
  spaStore.currentRoll.dicePool += spaStore.currentRoll.advantages.length
  spaStore.currentRoll.dicePool -= spaStore.currentRoll.disadvantages.length

  if (spaStore.currentRoll.assist) {
    spaStore.currentRoll.dicePool += 1
  }

  if (spaStore.currentRoll.useGambit) {
    spaStore.currentRoll.dicePool += 1
  }

  if (spaStore.currentRoll.useDevilsBargain) {
    spaStore.currentRoll.dicePool += 1
  }

  if (spaStore.currentRoll.pushDice) {
    spaStore.currentRoll.dicePool += 1
  }
  //console.log("DICE POOL UPDATED TO THE FOLLOWING: ", spaStore.currentRoll.dicePool)
});


// NEXT BUTTON FUNCTIONALITY ////////////////////////////////////////////////////////////////////////////////////

const rollAdvance = async () => {
  //console.log("rollAdvance called!!!!")
  formError.value = false
  showResult.value = false
  switch (spaStore.currentRoll.rollStep) {
    case 1:  // WHOSE ROLL?
        if (!spaStore.currentRoll.char){
            formError.value = true
            break
        } else{
            spaStore.currentRoll.step1Completed = true
            if (spaStore.currentRoll.selectedWho === 'Character') {
                spaStore.currentRoll.rollStep = 2
            } else {
                spaStore.currentRoll.rollType = "Fortune"
                spaStore.currentRoll.rollStep = 2
            }
            break;
        }
    case 2: // WHAT'S THE PLAN?
        if ((!spaStore.currentRoll.rollType || !spaStore.currentRoll.goal || !spaStore.currentRoll.rating) || 
            (spaStore.currentRoll.selectedWho !== 'Character' && (!(spaStore.currentRoll.baseDice >= 0) || !spaStore.currentRoll.rating))) {
            formError.value = true
            break
        } else { 
            spaStore.currentRoll.step2Completed = true
            switch (spaStore.currentRoll.rollType) {
                case "Action": 
                    spaStore.currentRoll.position = "risky"
                    spaStore.currentRoll.effect = "standard"
                    const charIndex = spaStore.Charnames.indexOf(spaStore.currentRoll.char)
                    const charID = spaStore.Characters[charIndex]
                    console.log("RESIST ROLL ADVANCE STEP 2: RATING: ", spaStore.currentRoll.rating)  
                    spaStore.currentRoll.baseDice = await spaStore.getRatingValue(charID, spaStore.currentRoll.rating)
                    spaStore.currentRoll.rollStep = 3
                    break
                case "Fortune":   
                  if(!spaStore.currentRoll.advantages){
                    spaStore.currentRoll.advantages = []
                  }
                  if(!spaStore.currentRoll.disadvantages){
                    spaStore.currentRoll.disadvantages = []
                  }                
                    if(spaStore.currentRoll.selectedWho === 'Character'){
                      const charIndex = spaStore.Charnames.indexOf(spaStore.currentRoll.char)
                      const charID = spaStore.Characters[charIndex]
                      spaStore.currentRoll.baseDice = await spaStore.getRatingValue(charID, spaStore.currentRoll.rating)
                    } 
                    spaStore.currentRoll.rollStep = 4
                    break
                case "Resist":
                    if(spaStore.currentRoll.selectedWho === 'Character'){
                      const charIndex = spaStore.Charnames.indexOf(spaStore.currentRoll.char);
                      const charID = spaStore.Characters[charIndex];
                      spaStore.currentRoll.baseDice = await spaStore.getRatingValue(charID, spaStore.currentRoll.rating)
                    }
                    
                    spaStore.currentRoll.rollStep = 4
                    break
                default: 
                    break
            }
        }
        break
    
    case 3:  // HOW DOES IT LOOK?  
        if (spaStore.currentRoll.rollType === 'Action'){ 
          if(!spaStore.currentRoll.position || !spaStore.currentRoll.effect) {
            formError.value = true
            break 
          } else {

            const charIndex = spaStore.Charnames.indexOf(spaStore.currentRoll.char)
            const charID = spaStore.Characters[charIndex]
            
            spaStore.currentRoll.step3Completed = true
            spaStore.currentRoll.rollStep = 4
          }
        } else {
          //Fortune Roll
          
          spaStore.currentRoll.step3Completed = true
          spaStore.currentRoll.rollStep = 4
        }
        break
    case 4: // LOAD YOUR DICE... 
    
        spaStore.currentRoll.step4Completed = true
        spaStore.currentRoll.rollStep = 5
        calibrateShimmer()
        if (spaStore.currentRoll.dicePool === 0){
          spaStore.currentRoll.diceNum = 2
          diceArray.value = Array.from({ length: 2 }).map(() => null)
        } else {
          spaStore.currentRoll.diceNum = spaStore.currentRoll.dicePool
          diceArray.value = Array.from({ length: spaStore.currentRoll.diceNum }).map(() => null)
          //console.log("case 4 load has set diceArray to length = ", diceArray.value.length)
        }
        break
    default:
      // Handle other cases here
      break;
  }
  
  spaStore.updateRoll()
}

//  ^^ NEXT BUTTON FUNCTIONALITY ^^  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// BACKGROUND ANIMATIONS //
// ???????????????????????????????????????????????????????????????? //

const bgSlideRef = ref(null)
const slidePositions = {
    step0: 'translateX(-1000px)',
    step1: 'translateX(-550px)',
    step2: 'translateX(-350px)',
    step3: 'translateX(-250px)',
    step4: 'translateX(-350px)',
    step5: 'translateX(-550px)',
}

watch(() => spaStore.currentRoll.rollStep, (newVal, oldVal) => {
  const slidePos = slidePositions[`step${newVal}`]
  if (bgSlideRef.value) {
    bgSlideRef.value.style.transform = slidePos
  }
}),
onMounted(() => {
  showResult.value = false
  const slidePos = slidePositions[`step${spaStore.currentRoll.rollStep}`]
  if (bgSlideRef.value) {
    bgSlideRef.value.style.transform = slidePos
  }
  diceArray.value = Array.from({ length: spaStore.currentRoll.diceNum }).map(() => null)
  rolls.value = document.querySelector('.rolls')
  calibrateShimmer()  
  setDiceSpacing()
  
})

//////////////////////////////////////////////////////////////////////

watch([() => spaStore.currentRoll.advantages.length, () => spaStore.currentRoll.disadvantages.length], () => {
  let newDicePool = spaStore.currentRoll.baseDice + spaStore.currentRoll.advantages.length - spaStore.currentRoll.disadvantages.length
  if(newDicePool < 0){
    spaStore.currentRoll.dicePool = 0;
  } else{
    spaStore.currentRoll.dicePool = newDicePool
  }
})

// POSITION & EFFECT GRID //

let currentEffectIndex = null
let currentPositionIndex = null

const toggleSetupPosition = () => {
    currentPositionIndex = positions.indexOf(spaStore.currentRoll.position)
    currentEffectIndex = effects.indexOf(spaStore.currentRoll.effect) 
    if(spaStore.currentRoll.setupPosition === true){
        //toggle off
        if(currentPositionIndex < positions.length - 1){
            spaStore.currentRoll.position = positions[currentPositionIndex + 1]
        }
        spaStore.currentRoll.setupPosition = false
    } else{
        //toggle on
        if (currentPositionIndex > 0){
            spaStore.currentRoll.position = positions[currentPositionIndex - 1]
            spaStore.currentRoll.setupPosition = true;
            if(spaStore.currentRoll.setupEffect === true){
                spaStore.currentRoll.setupEffect = false;
                if (currentEffectIndex > 0){
                    spaStore.currentRoll.effect = effects[currentEffectIndex - 1]
                } else{
                    spaStore.currentRoll.effect = "none"
                }
            }
        } else{
            spaStore.currentRoll.position = "controlled"
        }
    }
    
  spaStore.updateRoll()
}

const toggleSetupEffect = () => {
    currentEffectIndex = effects.indexOf(spaStore.currentRoll.effect);
    currentPositionIndex = positions.indexOf(spaStore.currentRoll.position)
    // if toggled on, already:
    if(spaStore.currentRoll.setupEffect === true){
        spaStore.currentRoll.setupEffect = false
        if (currentEffectIndex > 0){
            spaStore.currentRoll.effect = effects[currentEffectIndex - 1]
        } else{
            spaStore.currentRoll.effect = "none"
        }
    }else{
        // if toggled off, already: 
        if (currentEffectIndex < effects.length - 1){
            spaStore.currentRoll.setupEffect = true
            spaStore.currentRoll.effect = effects[currentEffectIndex + 1]
            if(spaStore.currentRoll.setupPosition === true){
                spaStore.currentRoll.setupPosition = false
                spaStore.currentRoll.position = positions[currentPositionIndex + 1]
            }
        } else{
            spaStore.currentRoll.effect = "extreme"
        }
    }
    spaStore.updateRoll()
}

const togglePushEffect = () => {
    currentEffectIndex = effects.indexOf(spaStore.currentRoll.effect)
    if(spaStore.currentRoll.pushEffect === true){
        spaStore.currentRoll.pushEffect = false
        if (currentEffectIndex > 0){
            spaStore.currentRoll.effect = effects[currentEffectIndex - 1]
        } else{
            spaStore.currentRoll.effect = "none"
        }
    } else{        
        if (currentEffectIndex < effects.length - 1){
            spaStore.currentRoll.effect = effects[currentEffectIndex + 1]
            spaStore.currentRoll.pushEffect = true
        } else{
            spaStore.currentRoll.effect = "extreme"
        }
    }
    spaStore.updateRoll()
}

const positions = ['controlled', 'risky', 'desperate'];
const effects = ['none', 'limited', 'standard', 'greater', 'extreme'];

const positionCoords = {
    'desperate': '176px',
    'controlled': '96px',
    'risky': '136px',
}

const effectCoords = {
    'none': '206px',
    'limited': '251px',
    'standard': '296px',
    'greater': '341px',
    'extreme': '386px',
}

const goalAsk = computed(() => {
  switch (spaStore.currentRoll.rollType) {
    case 'Action':
      return 'What are they attempting to do?'
    case 'Fortune':
      return 'What are we finding out?'
    case 'Resist':
      return 'What are they resisting?'
    default:
      return 'Goal:'
  }
})
const goalPresent = computed(() => {
  switch (spaStore.currentRoll.rollType) {
    case 'Action':
      return 'Attempting to '
    case 'Fortune':
      return 'Determining '
    case 'Resist':
      return 'Resisting '
    default:
      return 'Goal:'
  }
})

const isSelected = (position, effect) => {
  return position === spaStore.currentRoll.position && effect === spaStore.currentRoll.effect
}

const setPE = (position, effect) => {
    spaStore.currentRoll.setupEffect = false
    spaStore.currentRoll.setupPosition = false
    spaStore.currentRoll.pushEffect = false
    if(spaStore.currentRoll.position === null){
        spaStore.currentRoll.position = "risky"
        spaStore.currentRoll.effect = "standard"
    }
  spaStore.currentRoll.position = position
  spaStore.currentRoll.effect = effect
  spaStore.updateRoll()
}

const ringPosition = computed(() => {
    const yPos = positionCoords[spaStore.currentRoll.position]
    const xPos = effectCoords[spaStore.currentRoll.effect]
    return {
        left: `${xPos}`,
        top: `${yPos}`,
    }
})

// ROLL BONUSES 

const toggleAssist = () =>{
  if(spaStore.currentRoll.assist){
    assistError.value = false;
    spaStore.currentRoll.assist = false
    spaStore.currentRoll.assistHow = ""
    spaStore.currentRoll.assistant = ""
    spaStore.currentRoll.dicePool -= 1
  } else {
    if (!spaStore.currentRoll.assistant || !spaStore.currentRoll.assistHow){
      assistError.value = !assistError.value;
    } else {
      assistError.value = false;
      spaStore.currentRoll.assist = true
      spaStore.currentRoll.dicePool += 1
    }
  }
  
  spaStore.updateRoll()
}
const toggleDevilsBargain = () =>{
  if(spaStore.currentRoll.useDevilsBargain){
    dbError.value = false;
    spaStore.currentRoll.useDevilsBargain = false
    spaStore.currentRoll.devilsBargain = ""
    spaStore.currentRoll.dicePool -= 1
  } else{
    if(!spaStore.currentRoll.devilsBargain){
      dbError.value = !dbError.value
    } else {
      dbError.value = false;
      spaStore.currentRoll.useDevilsBargain = true
      spaStore.currentRoll.dicePool += 1
    }
  }
  
  spaStore.updateRoll()
}
const toggleGambit = () =>{
    if(spaStore.currentRoll.useGambit){
      spaStore.currentShip.gambits++
      spaStore.shipUpdate()
      spaStore.currentRoll.useGambit = false
      spaStore.currentRoll.dicePool -= 1
    } else{
      if(spaStore.currentShip.gambits > 0){
        spaStore.currentShip.gambits--
        spaStore.shipUpdate()
        spaStore.currentRoll.useGambit = true
        spaStore.currentRoll.dicePool += 1
      }
    }
  spaStore.updateRoll()
}

const togglePushDice = () =>{
  if(spaStore.currentRoll.pushDice){
    spaStore.currentRoll.pushDice = false
    spaStore.currentRoll.dicePool -= 1
  } else{
    spaStore.currentRoll.pushDice = true
    spaStore.currentRoll.dicePool += 1
  }
  spaStore.updateRoll()
}

const dieElements = ref(null)

const calibrateShimmer = () =>{
  nextTick(()=> {
    const elements = dieElements.value;
    elements.forEach((elem) => {
    const duration = Math.random() * 3 + 1 // Random duration between 1 and 4 seconds
    const delay = Math.random() * 3 // Random delay between 0 and 3 seconds
    const brightness = Math.random() * 0.1 + 0.4 // Random brightness between 0.8 and 1
    elem.style.setProperty('--shimmer-duration', `${duration}s`)
    elem.style.setProperty('--shimmer-delay', `${delay}s`)
    elem.style.setProperty('--shimmer-brightness', brightness)
  })
  //console.log("SHIMMER CALIBRATED ON DICE!")
  })
  
}

const handleSelect = () => {
  spaStore.updateRoll()
}
</script>

<style>

span.meh {
  position: relative;
  top: 10px;
  margin: auto;
  font-size: 35px;
  color: #cccccc;
  animation: meh 3s linear infinite;
}
span.meh p{
  text-align: center;
}
span.pulsate{
  animation: pulsate 1s 3 forwards;
}

@keyframes meh {
  0% {
    color: #00bf66;
  }
  50%{
    color: #aaaaaa;
    text-shadow: 0 0 15px rgba(155, 0, 155, .5);
  }
  100%{
    color: #00bf66;
  }
}


span.crit, span.crit::after, span.crit::before {
  position: absolute;
  margin: auto;
  text-align: center;
  font-size: 40px;
  font: "metro";
  color: #dd00dd00;  
  
}

span.crit::before{
  content: attr(data-header);
  position: absolute;
  top: 0;
  left: 0;
  background: url("graphics/crit-bg3.png") repeat;
  height: 500px;
  -webkit-background-clip: text;
  animation: aitf 6s linear infinite;
  /* HARDWARE ACCELERATION */
  -webkit-transform: translate3d(0,0,0);
	-webkit-backface-visibility: hidden;
  filter: brightness(10);
}
span.crit{
  position: relative;
  top: 10px;
  left: 0;
  margin:auto;
  background: url("graphics/crit-bg4.png") repeat-x;
  opacity: 1;
  -webkit-background-clip: text;
  animation: aitf2 10s linear infinite;
  /* HARDWARE ACCELERATION */
  -webkit-transform: translate3d(0,0,0);
	-webkit-backface-visibility: hidden;
} 
span.crit::after{
  content: attr(data-header);
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  animation: glows 4s ease-in-out infinite;
  mix-blend-mode: screen;
  filter: brightness(3);
}
span.crit p{
  color: #00ace5;
}

/* Animate Background Image */

@keyframes aitf {
	0% { background-position: 0% 650px; }
  100% { background-position: 0% 0%; }
}
@keyframes aitf2 {
	0% { background-position: 650px 0%; }
  100% { background-position: -650px 0%; }
}

@keyframes glows {
  0% {
    text-shadow: 0 0 15px #1d29d2FF;
    
  }
  50% {
    text-shadow: 0 0 5px #1d29d266;
  }
  100% {
    text-shadow: 0 0 15px #1d29d2FF;
  }
}


.result-content .poo {
  position: relative;
  top: 10px;
  margin: auto;
  text-align: center;
  font-size: 40px;
  color: transparent;
}



.result-content .poo:focus {
    outline: none;
}

.result-content .poo::before, .result-content .poo::after {
  content: attr(data-heading);
  position: absolute;
  top: 0;
  left: 0;  
}

.result-content .poo::before {
  color: #ff0065;
  clip-path: polygon(0% 100%, 100% 100%, 100% 40%, 0 60%);
  animation: slide2 5s infinite;
  animation-delay: 2s;
}

.result-content .poo::after {
  color: #ff0065;
  clip-path: polygon(0 0, 100% 0%, 100% 36%, 0 56%);
  animation: slide 5s infinite;
  animation-delay: 2s;
}


@keyframes slide {
  0% {
    transform: translateX(0);
  }
  1% {
    transform: translate(2px, 1%);
    filter: brightness(.55);
  }
  2% {
    transform: translate(-3px, -3%);
  }
  6% {
    transform: translate(5px, 2%);
    filter: brightness(.85);
  }
  30% {
    filter: brightness(1);
    filter: blur(1px);
    color: white;
  }
  45% {
    color: #ff006577;
  }
  50%{
    color: #ff0065;
  }
  100% {
    filter: brightness(1);
    transform: translateY(2px);
    color: #ff0065
  }
}
@keyframes slide2{
  0% {
    filter: blur(2px);
    transform: translateX(3px);
    color: #ff0065;
  }
  10%{
    filter: blur(0);
    transform: translateX(-1px);
  }
  30%{
    color: white;
  }
  50%{
    color: #ff006599;
  }
  70%{
    
    filter: blur(1px) brightness(1.5);
  }
  100%{
    filter: blur(0);
  }
}



span.nice {
  position: relative;
  top: 10px;
  margin: auto;
  text-align: center;
  font-size: 40px;
  font-weight: 300;
  color: hsl(230, 40%, 80%);
  animation: lights 4s 750ms linear infinite;
}
span.nice p{
  font-size: 15px;
  font-variant: normal;
}

@keyframes lights {
  0% {
    color: hsl(230, 40%, 80%);
    text-shadow:
      0 0 1em rgba(166, 0, 169, 0.2),
      0 0 0.125em rgba(255, 0, 255, 0.3),
      -1em -0.125em 0.5em rgba(255, 0, 255, 0),
      1em 0.125em 0.5em rgba(16, 187, 255, 0);
  }
  
  30% { 
    color: hsl(230, 80%, 90%);
    text-shadow:
      0 0 1em rgba(166, 0, 169, 0.5),
      0 0 0.125em rgba(255, 0, 255, 0.5),
      -0.5em -0.125em 0.25em rgba(255, 0, 255, 0.2),
      0.5em 0.125em 0.25em rgba(16, 187, 255, 0.4);
  }
  
  40% { 
    color: hsl(230, 100%, 95%);
    text-shadow:
      0 0 1em rgba(166, 0, 169, 0.5),
      0 0 0.125em rgba(255, 0, 255, 0.5),
      -0.25em -0.125em 0.125em rgba(255, 0, 255, 0.2),
      0.25em 0.125em 0.125em rgba(16, 187, 255, 0.4);
  }
  
  70% {
    color: hsl(230, 80%, 90%);
    text-shadow:
      0 0 1em rgba(166, 0, 169, 0.5),
      0 0 0.125em rgba(255, 0, 255, 0.5),
      0.5em -0.125em 0.25em rgba(255, 0, 255, 0.2),
      -0.5em 0.125em 0.25em rgba(16, 187, 255, 0.4);
  }
  
  100% {
    color: hsl(230, 40%, 80%);
    text-shadow:
      0 0 1em rgba(166, 0, 169, 0.2),
      0 0 0.125em rgba(255, 0, 255, 0.3),
      1em -0.125em 0.5em rgba(255, 0, 255, 0),
      -1em 0.125em 0.5em rgba(16, 187, 255, 0);
  }
}



.results{
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.clickable {
  cursor: pointer;
}

.result-area .result-content{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  font-family: metro;
  font-size: 18px;
  color: white;
}
.result-area .result-content p{
  margin: auto;
  color: #cccccc;
  position: relative;
  top: -10px;
  font-size: 14px;
  font-weight: normal;
  font-family: quicksand;
}

.roll a.cancelX {
  position: absolute;
  font-weight: bold;
  color: purple;
  width: 350px;
  text-align: right;
  top: 188px;
  left: 718px;
  font: zekton;
  right: 0;
  opacity: .5;
  font-size: 16px;
  cursor: pointer;
  animation: ghost-pulse 5s infinite;
}
@keyframes ghost-pulse {
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }
} 

.clearing {
  animation: pulsate-border .5s 5 forwards;
  
}

@keyframes pulsate-border {
  0% {
    border-color: #ff0065;
    border-style: solid;
    background-color: #00000033;
  }
  50% {
    border-color: white;
    border-style: solid;
    border-width: 3px;
    
    background-color: #00000066;
  }
  100% {
    border-color: #ff0065;
    border-style: solid;
    
    background-color: #00000033;
  }
}

.result-area{
  position: absolute;
  cursor: default;
  display: flex;
  flex-direction: column;
  background-color: #00000033;
  justify-content: center;
  align-items: center;
  top: 100px;
  left: 580px;
  background: #00000055;
  border: 3px double purple;
  width: 487px;
  height: 104px;
}

.red-dice {
  filter: hue-rotate(135deg) brightness(.8) contrast(1.5);
}



.die-transition-leave-active {
  opacity: 0;
}

.dice-container{
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 7px;
}


.rolls {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 9px;
}



.bgbg{
  background: linear-gradient(to top, rgba(0, 0, 0, .5), rgba(36, 0, 67, .5));
  height: 60px;
  width: 1080px;
  position: absolute;
  top:30px;
  left: 0;
  opacity: 0;
  animation: fade-in 2s forwards;
  animation-delay: 1s;
}
@keyframes fade-in{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes fade-out{
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.roll-area{
  position: absolute;
  top: 32px;
  left: 600px;
  width: 460px;
  height: 55px;
  opacity: 0;
  animation: form-fade-in-from-right 1s ease-in forwards;
  animation-delay: 2s;
}
.roll-area img{
  margin-right: 3px;
}

.ready-info{
  position: relative;
  top: -10px;
  left: 0;
  height: 170px;
  width: 340px;
  font-weight: normal;
  font-variant: none;
}

.ready-info .highlight{
  font-weight: bold;
  font-variant: small-caps;
  color: white;
}

.resist-tip{
  position: absolute;
  top: 0;
  left: 40px;
  border: 5px double #a600a9;
  padding: 15px;
  font-family: quicksand;
  width: 170px;
  color: magenta;
}
.faded{
  opacity: .3;
  pointer-events: none;
}

.advantages input, .disadvantages input{
  position: relative;
  left: -12px;
  width: 235px;
  
}
.advantages{
  position: absolute;
  top: -5px;
}
.disadvantages{
  position: absolute;
  left: 325px;
  top: -5px;
}


.roll {
    position: relative;
    height: 198px;
    overflow: hidden;
    transition: height .5s ease-out, background-size .5s ease-out;
    background-image: url("/graphics/roll-bg.png");
    background-repeat: repeat-x;
    color: #10ff83;
    font: bold small-caps 18px/1 Quicksand;
    padding: 10px;
    z-index: 1;
  }
  
  .roll .roll-step {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    width: 1060px;
    height: 219px;
    z-index: 5;
  }
  
  .roll .roll-step form {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 40px;
    padding-left: 10px;
    width: 1060px;
    height: 200px;
  }

  .roll form .tip {
    position: absolute;
    bottom: 10px;
    color: #cccccc;
    font-size: 14px;
    opacity: 0;
    animation: tip-fade-in .5s ease forwards;
    animation-delay: 1.5s;
  }
  @keyframes tip-fade-in {
    0% {
        opacity: 0;
    }
    50% {
        color: white;
        opacity: 1;
    }
    100% {
        color: #cccccc;
        opacity: 1;
    }
  }

  .roll h1{
    display: flex;
    align-items: center;
    margin-left: -10px;
    margin-top: -10px;
    padding-left: 10px;
    color: #00ace5;
    font: bold 16px/1 metro;
    color: black;
    background: #00ace5;
    width: 300px;
    padding-right: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: left;
    clip-path: polygon(0 0, 100% 0, calc(100% - 35px) 100%, 0 100%);
  }
  .roll h2 {
    font-size: 14px;
    font-weight: normal;
    margin-top: -10px;
    margin-left: 30px;
  }

  .roll h7{
    position: relative;
    color: #00ace5;
    border: 1px solid #00ace5;
    padding: 10px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    font-family: zekton;
    font-size: 48px;
  }
  
  .roll a {
    position: relative;
    z-index: 5;
    left: 250px;
  }
  
  .roll .goal {
    position: absolute;
    top: 10px;
    left: 300px;
    height: 100%;
    width: 100%;
  }
  
  .roll input[type="number"].base {
    height: 20px;
    position: relative;
    top: -2px;
    color: #a600a9;
  }

  .roll .goal textarea {
    width: 280px;
    height: 70px;
    padding: 10px;
    background: black;
    border: 1px solid #10ff83;
    resize: none;
    font: 16px/1 Quicksand;
    color: #10bbff;
  }
  
  .roll .goal textarea:focus {
    outline: none;
  }
  
  .roll form select,
  .roll form input[type="text"],
  .roll form input[type="number"] {
    margin: 3px;
    height: 24px;
    margin-left: 10px;
    padding-left: 5px;
    background-color: black;
    font: 16px/1 zekton small-caps;
    color: #10ff83;
    border: 1px solid #10ff83;
    outline: none;
    transition: opacity 5s ease-out;
  }
  
  .roll form input[type="number"] {
    width: 40px;
    position: relative;
    top: -8px;
  }
  
  .roll form label {
    cursor: pointer;
  }
  
  .roll form input {
    margin: 5px;
    height: 30px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  
  .roll select option {
    color: #a600a9;
    background: black;
    font-variant: small-caps;
  }
  .roll .selected {
    color: #10ff83;
    transition: color 0.2s ease-in-out;
  }
  
  .roll .unselected {
    color: #a600a9;
    font-size: 14px;
    transition: color 0.2s ease-in-out;
  }
  
  .roll .formErrorMsg {
    position: absolute;
    bottom: 25px;
    color: #ff0065;
    font-size: 16px;
    font-family: quicksand;
    font-variant: small-caps;
    animation: flash .5s ease 3 forwards;
  }
  @keyframes flash {
    0% {
        color: white;
    }
    100%{
        color: #ff0065;
    }
  }

/* BACKGROUND & NEXT BUTTON ANIMATIONS */
/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?**?*?*?*?*?*?*?*?*?*/

  .roll .bg-slide-container {
    position: absolute;
    transform: translateX(-110%);
    left: 0;
    top: 0;
    width: 100%;
    height: 219px;
    background-image: url("/graphics/roll-bg-slide.png");
    background-repeat: no-repeat;
    transition: transform 0.3s ease-in;
    z-index: 1;
  }
  
  .next-slide {
    position: absolute;
    background: rgba(53, 255, 53, 0.633);
    left: -1000px;
    top: 0;
    height: 219px;
    width: 200px;
    cursor: pointer;
    opacity: 0;
    animation: fade-in-and-flash 0.7s ease forwards;
    animation-delay: 0.9s;
    clip-path: polygon(0 0, 100px 0, 170px 60px, 124px 219px, 24px 219px, 70px 60px);
  }
  
  .next-slide.step1 {
    left: 434px;
  }
  
  .next-slide.step2 {
    left: 633px;
  }
  
  .next-slide.step3 {
    left: 733px;
  }
  
  .next-slide.step4 {
    left: 633px;
  }
  .next-slide.step5 {
    left: 434px;
  }

  @keyframes form-fade-in-from-right {
    0% {
      opacity: 0;
      transform: translateX(20%);
    }
    50% {
      transform: translateX(-1%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes form-fade-in-from-left {
    0% {
      opacity: 0;
      transform: translateX(-20%);
    }
    50% {
      transform: translateX(1%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-in-and-flash {
    0% {
      opacity: 0;
      clip-path: polygon(0 0, 0 0, 70px 60px, 24px 219px, 24px 219px, 70px 60px);
    }
  
    15% {
      filter: brightness(4);
      clip-path: polygon(0 0, 120px 0, 180px 60px, 134px 219px, 24px 219px, 70px 60px);
      opacity: 1;
    }
  
    100% {
      filter: brightness(1);
      opacity: 1;
      clip-path: polygon(0 0, 80px 0, 150px 60px, 104px 219px, 24px 219px, 70px 60px);
    }
  }

/*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?*?**?*?*?*?*?*?*?*?*?*/

  
  .next-slide:hover {
    background-color: rgba(100, 255, 100, 0.77);
  }
  
  .next-slide p {
    margin-left: -32px;
    margin-top: 55px;
    font-family: zekton;
    font-size: 100px;
    color: #ffffff22;
    font-variant: small-caps;
    transform: rotate(-73deg);
  }
  
  .roll .roll-step form {
    animation: form-fade-in-from-left 1s linear forwards;
    animation-delay: 0.25s;
    opacity: 0;
  }
  
  .roll .roll-step h1 {
    animation: form-fade-in-from-left 0.5s ease forwards;
    opacity: 0;
  }
  
  .visible {
    display: normal;
  }
  
  .invisible {
    display: none;
  }
  
  .pos-eff {
    border: 1px solid firebrick;
    position: absolute;
    top: -50px;
    left: -5px;
  }
  
  .pos-eff p {
    font-family: zekton;
    font-size: 18px;
    color: #0099ff;
  }
  
  .pos-eff .red {
    color: #ff0065;
  }
  
  .pos-eff .white {
    color: #cccccc;
  }
  
  .position-labels {
    position: absolute;
    top: 82px;
    left: 425px;
  }
  
  .effect-labels {
    display: flex;
    position: absolute;
    top: 65px;
    left: 200px;
    z-index: 1;
  }
  
  .effect-labels p {
    transform: rotate(-45deg);
    transform-origin: top left;
  }
  
  .pe-title {
    position: absolute;
    top: 110px;
    left: 30px;
  }
  
  .ring-bearer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    transition: left 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), top 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  
  .effect-arrows {
    position: absolute;
    top: 7px;
    left: -28px;
    display: flex;
    width: 28px;
    justify-content: end;
    animation: mod-arrow 1s ease-out infinite;
  }
  
  .position-arrow {
    position: absolute;
    top: 32px;
    left: 7px;
    width: 14px;
    animation: mod-arrow2 1s ease-out infinite;
  }
  
  .setup-effect-arrow {
    width: 14px;
    height: 18px;
  }
  
  .push-effect-arrow {
    width: 14px;
    height: 18px;
  }
  
  @keyframes mod-arrow {
    0% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(0);
    }
  }
  
  @keyframes mod-arrow2 {
    0% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .roll-grid {
    position: absolute;
    top: 90px;
    left: 200px;
    display: flex;
    background-image: url("graphics/grid2.png");
    background-repeat: no-repeat;
    background-position: 13px 13px;
    z-index: 2;
  }
  
  .roll-grid > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
  
  .roll-grid > div > div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: rgba(128, 0, 128, 0);
    margin-bottom: 15px;
    cursor: pointer;
  }
  
  .roll-grid > div > div.selected {
    background: transparent;
  }
  
  .circle {
    width: 100%;
    height: 100%;
  }
  
  .pe-bonus {
    position: absolute;
    left: 550px;
  
    margin-top: -25px;
    
    width: 220px;
  }
  
  .pe-bonus h3 {
    color: #00ace5;
    margin-bottom: 20px;
  }
  
  .roll button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .roll button:hover {
    filter: brightness(1.3);
  }
  .dice-bonuses{
    position: relative; 
    top:0;
    left: 5px;
    width: 750px;
    height: 100%;
  }
  .dice-bonuses .col1{
    position: absolute;
    top: 0;
    left: 0;
  }
  .dice-bonuses .col2{
    position: absolute;
    top: 0;
    left: 310px;
  }
  .dice-bonuses table{
    position: relative;
    left: 10px;
    top: -15px;
    margin-bottom: -20px;
  }
  .dice-bonuses .labels{
    width: 50px;
    height: 20px;
    font-size: 14px;
    text-align: right;
    
  }
  .dice-bonuses tr{
    height: 35px;
  }
  
  .dice-bonuses .row{
    position: absolute;
    width: 300px;
  }
  .dice-bonuses .row2{
    position: absolute;
    top: 115px;
    width: 300px;
  }
  .roll form select{
    color: #a600a9;
  }
  .roll form input[type="text"]{
    color: #a600a9;
  }
  .roll .dice-bonuses input[type="text"], .roll .dice-bonuses select{
    position: relative;
    left: -10px;
    
    color:#a600a9;
    
    margin-left: 15px;
    height: 22px;
    width: 200px;
  }
  .roll .dice-bonuses select{
    width: 209px;
    height: 25px;
  }
  
  .dice-bonuses button{
    float: left;
    position: relative;
    top: 13px;
  }
  .dice-bonuses .subtext{
    position: relative;
    left: -15px;
    font-size: 14px;
    margin-top: -33px;
    float: right;
    color: magenta;
  }
  .pe-bonus p {
    color: magenta;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 0;
    margin-top: 5px;
    
  }
  .dice-pool{
    position: absolute;
    right: 20px;
    top: 70px;
    width: 260px;
    height: 55px;
    opacity: 0;
    animation: form-fade-in-from-right 1s ease-in forwards;
    animation-delay: 1s;
  }
  .dice-pool-title{
    position: absolute;
    right: 0;
    top: 0;
    background: #005d7b;
    height: 20px;
    width: 200px;
    padding: 10px;
    padding-right: 120px;
    text-align: right;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 47px 100%);
    margin: 0;
    margin-bottom: 10px;
    color: white;
    font-family: metro;
    font-size: 18px;
    opacity: 0;
    animation: form-fade-in-from-right 1s ease-in forwards;
    animation-delay: 1.5s;
  }
  .base-dice{
    position: absolute;
    color: white;
    font-family: quicksand;
    font-variant: small-caps;
    right: 10px;
    top: -8px;
    opacity: 0;
    animation: form-fade-in-from-right 1s ease-in forwards;
    animation-delay: 2s;
  }
  
 
    
  .die {
    opacity: 1;
  }
  
  .die-transparent {
    opacity: 0.5;
  }
  .dice-pool .die-transparent{
    opacity: .3;
    filter: brightness(.5);
    animation: none;
  }
  .dice-pool .die, .dice-pool .die-transparent{
    margin-top: -9px;
    margin-left: 3px;
  }
  .dice-pool .die:first-child{
    margin-left: 21px;
  }

  
  

  .assist-error, .db-error{
    animation: pulsate 1s infinite;
  }
  @keyframes pulsate {
    0% {
      color: #ff0065;
    }
    50% {
      color: white;
    }
    100% {
      color: #ff0065;
    }
}
</style>
  