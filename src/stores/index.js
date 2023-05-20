import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import { collection, updateDoc, onSnapshot, deleteDoc, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import {db, storage} from '@/firebase'
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const myCrew = "myCrew123"
const crewCharsRef = collection(db, "Crews/"+myCrew, "Characters")
const crewLogRef = collection(db, "Crews/"+myCrew, "crewlog")
const clockListRef = collection(db, "Crews/"+myCrew, "clocks")
const crewShipRef = doc(db, "Crews/"+myCrew)
const rollDataRef = doc(db, "Crews/"+myCrew+"/Roll/", "rolldata123")

export const useSpaStore = defineStore({
  id: 'charspa',
  state: () => ({
    Characters: [],
    Charnames: [],
    currentShip: {},
    currentCharacter: {},
    currentUser: {},
    crewLog: [],
    clockList: [],
    currentRoll: {
      rollStep: 0,
      selectedWho: "",
      rollType: "",
      rating: "",
      char: "",
      position: "",
      effect: "",
      setupEffect: "",
      setupPosition: "",
      pushEffect: "",
      advantages: [],
      disadvantages: [],
      baseDice: 0,
      dicePool: 0,
      diceRollGo: false,
      outcome: [],
      rollOwner: '',
      step1Completed: false,
      step2Completed: false, 
      step3Completed: false,
      step4Completed: false,
    },
  }),
  getters: {
    isCrewUpgradeSelected: (state) => (desc) => {
      return state.currentShip.crew_upgrades.includes(desc)
    },
    isVault: (state) => {
      return state.currentShip.crew_upgrades.includes("Vault")
    },
    hasShields: (state) =>{
      return state.currentShip.crew_upgrades.includes("Shields")
    }
  },
  actions: {
    async beginRoll(thisUserId) {
      console.log("Roll Started");
      const docSnap = await getDoc(rollDataRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().activeRoll);
        await updateDoc(rollDataRef, {
          activeRoll: true,
          rollStep: 1,
          advantages: [],
          disadvantages: [],
          dicePool: 0,
          baseDice: 0,
          rollOwner: thisUserId,
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document, creating 'rolldata123' in Firestore");
    
        // Create a new roll data object with default values
        const newRollData = {
          activeRoll: true,
          rollStep: 1,
          advantages: [],
          disadvantages: [],
          dicePool: 0,
          baseDice: 0,
          rollOwner: thisUserId,
        };
    
        // Add the new roll data object to the roll document
        await setDoc(rollDataRef, newRollData);
      }
    },
    
    async updateRoll() {
      //console.log("Roll Updated")
      let updatedData = {}
      updatedData = this.currentRoll
      await updateDoc(rollDataRef, updatedData)
    },
    
    cancelRoll:async() => {
      console.log("Roll Cancelled")
      await deleteDoc(rollDataRef)
    },
    async fetchRoll() {
      onSnapshot(doc(db, "Crews/myCrew123/Roll/rolldata123"), (doc) => {
        const data = doc.data();
        if (data) {
          this.currentRoll = data;
          //console.log("spaStore.fetchRoll: >>> LOAD ROLL: <<< | fetchRoll complete, activeRoll = ", this.currentRoll.activeRoll);
        } else {
          // Set a default set of data when roll data is not found
          this.currentRoll = {
            activeRoll: false,
            rollStep: 0,
            advantages: [],
            disadvantages: [],
            dicePool: 0,
            baseDice: 0,
          };
        }
      });
    },
    
    async addLogEntry (type, data) {
      try {
        // Replace any text enclosed in asterisks with <b> tags
        let logData
        if(type === "note"){
          console.log('adding note', data.content)
          const noteData = data.content.replace(/\*(.*?)\*/g, "<b>$1</b>");
          logData = {
            type: "note",
            content: noteData,
            timestamp: new Date(),
          }
          noteInput.value = "";
        } else if (type === "clocktick"){
          //console.log('clock tick, total current ticks: ', data.ticksTicked)
          logData = {
            type: "clocktick", 
            clockName: data.clockName,
            clockTotal: data.totalTicks,
            currentTicks: data.ticksTicked,
            newTicks: data.newTicks,
            color: data.color,
            timestamp: new Date(),
          }
        } else if (type === "roll"){
          logData = {
            type: "roll",
            timestamp: new Date(),
            rollType: data.rollType,
            rating: data.rating,
            char: data.char,
            position: data.position,
            effect: data.effect,
            setupEffect: data.setupEffect,
            setupPosition: data.setupPosition,
            pushEffect: data.pushEffect,
            pushDice: data.pushDice,
            advantages: data.advantages,
            disadvantages: data.disadvantages,
            dicePool: data.dicePool,
            outcome: data.outcome,
            goal: data.goal,
            assist: data.assist,
            assistant: data.assistant,
            assistHow: data.assistHow,
            useGambit: data.useGambit,
            useDevilsBargain: data.useDevilsBargain,
            devilsBargain: data.devilsBargain,
          }
          //console.log("roll data: ", logData)
        } else {}
    
        const docRef = await addDoc(collection(db, "Crews/" + myCrew, "crewlog"), logData)
        
        //console.log("Log entry added successfully!, id: ", docRef.id)
        
        this.fetchCrewLog();
        
      } catch (error) {
        console.error("Error adding note: ", error);
      }
    },
    parseLogEntry(entry) {
      const { timestamp, type, id, ...rest } = entry;
      let template;
      let additionalInfo = '';
      let stressTaken = 0;
      switch (type) {
        case 'note':
          template = `<h1>[note]</h1> ${rest.content}`;
          break;
        case 'clocktick':
          let clockName = rest.clockName.toLowerCase();
          if(rest.currentTicks === rest.clockTotal){
            template = `<h1>[clock tick]</h1> CLOCK COMPLETED! <u>${clockName}</u>`
          } else if (rest.currentTicks === 0){
            template = `<h1>[new clock]</h1> New clock created: '<u>${clockName}</u>' [${rest.currentTicks}/${rest.clockTotal} total]`;
          } else{ 
            template = `<h1>[clock tick]</h1> +${rest.newTicks} ticks on '<u>${clockName}</u>' [${rest.currentTicks}/${rest.clockTotal} total]`;
          }
         break;
        case 'roll':
          let assistantStressTaken = '';
          switch (rest.rollType) {
            case 'Action':
              template = `<h1>[${rest.char} - action roll: ${rest.rating}]</h1>Attempting to ${rest.goal}
              Position: <b>${rest.position}</b>, Effect: <b>${rest.effect}</b>`
              
              if (rest.assist) {
                additionalInfo += `<br><u>Assisted by ${rest.assistant}</u>: ${rest.assistHow}`;
                assistantStressTaken = `<h2>${rest.assistant} takes 1 stress.</h2> `;
              }

              additionalInfo += '<br><br>';

              if(rest.useGambit || rest.assist || rest.setupPosition || rest.pushDice || rest.setupEffect || rest.pushEffect){
                additionalInfo += '<b>BONUSES:</b> ';
              }
              if (rest.pushEffect) {
                additionalInfo += 'pushed for effect · ';
                stressTaken += 2
              }

              if (rest.setupEffect) {
                additionalInfo += 'set-up for effect · ';
              }
              
              if (rest.setupPosition) {
                additionalInfo += 'set-up for position · ';
              }

              if (rest.pushDice) {
                additionalInfo += 'pushed for +1d · ';
                stressTaken += 2
              }
              
              if (rest.useGambit) {
                additionalInfo += 'gambit used · ';
              }
              
              

              if (rest.useDevilsBargain) {
                additionalInfo += `<h2><u>Devil's Bargain accepted</u>: ${rest.useDevilsBargain}</h2>`;
                additionalInfo += `<br> [${rest.devilsBargain}]`
              }
                         
              // assume $rest.outcome is an array of numbers
              const outcomes = rest.outcome;

              additionalInfo += "<h3>Dice Pool "+rest.dicePool+" | RESULT: [ ";

              // sort the array of outcomes in descending order, or ascending if dice pool is zero.
              if (rest.dicePool > 0) {
                outcomes.sort((a, b) => b - a)
              } else {
                outcomes.sort((a, b) => a - b)
              }
            

              // check if there are any 6s in the array and wrap them in <b></b> tags
              const hasSixes = outcomes.some(num => num === 6);
              const sixes = outcomes.map(num => num === 6 ? `<b>${num}</b>` : num);

              // add the sixes to the result string
              additionalInfo += sixes.join(", ");

              // check for at least 2 sixes and add "CRITICAL!!" if true
              const numSixes = outcomes.filter(num => num === 6).length;
              if (numSixes >= 2 && rest.dicePool > 1) {
                additionalInfo += " ] !! CRITICAL !!</h3>";
              } else if (outcomes[0] === 6) {
                // add "SUCCESS!" if there is a six
                additionalInfo += " ] SUCCESS!</h3>";
              } else if (outcomes[0] === 4 || outcomes[0] === 5) {
                // add "SUCCESS, with CONSEQUENCE" if highest number is 4 or 5
                additionalInfo += " ] SUCCESS, with CONSEQUENCE</h3>";
              } else {
                // add "FAILURE with CONSEQUENCE" if highest number is 1, 2, or 3
                additionalInfo += " ] FAILURE with CONSEQUENCE</h3>";
              }

              // check for "risky" effect and at least one 6 in outcomes, add bonus Gambit if true
              //console.log("POSITION: ", rest.position)
              if (rest.position === "risky" && hasSixes) {
                
                additionalInfo += '<h4>Plus, gain 1 bonus Gambit!</h4>';
              }
              if (rest.position === "desperate"){
                let bonusCategory
                if(rest.rating === "doctor" || rest.rating === "hack" || rest.rating === "rig" || rest.rating === "study"){
                  bonusCategory = "insight"
                } else if (rest.rating === "helm" || rest.rating === "scramble" || rest.rating === "scrap" || rest.rating === "skulk") {
                  bonusCategory = "prowess"
                } else if (rest.rating === "attune" || rest.rating === "command" || rest.rating === "consort" || rest.rating === "sway") {
                  bonusCategory = "resolve"
                }
                
                additionalInfo += '<h4>Also, gain 1 XP in '+bonusCategory+' for making a desperate roll!</h4>'
              }
              if(stressTaken>0){
                additionalInfo += `<h2>${rest.char} takes ${stressTaken} stress.</h2>`;
              }
              if (rest.assist) {
                additionalInfo += assistantStressTaken;
              }
                          
              template += additionalInfo;
              break;

            case 'Fortune':
              additionalInfo = '';
              template = `<h1>[${rest.char} - fortune roll: ${rest.rating}]</h1>${rest.goal}`
              
              if (rest.assist) {
                additionalInfo += `<br><br><u>Assisted by ${rest.assistant}</u>: ${rest.assistHow}`;
                assistantStressTaken = `<h2>${rest.assistant} takes 1 stress.</h2> `;
              }

              additionalInfo += '<br>';

              if (rest.useGambit) {
                additionalInfo += '<b>BONUSES:</b> ';
                additionalInfo += ' · gambit used';
              }
              
              for(let i=0; i<rest.advantages.length; i++){
                additionalInfo += `<h4>Advantage: ${rest.advantages[i]}</h4>`;
              }
              for(let i=0; i<rest.disadvantages.length; i++){
                additionalInfo += `<h2>Disadvantage: ${rest.disadvantages[i]}</h2>`;
              }

              if (rest.useDevilsBargain) {
                additionalInfo += `<h2><u>Devil's Bargain accepted</u>: ${rest.useDevilsBargain}</h2>`;
                additionalInfo += `<br> [${rest.devilsBargain}]`
              }

              const fortuneOutcome = rest.outcome;

              additionalInfo += "<h3>RESULT: [ ";

              if(rest.dicePool > 0){
                fortuneOutcome.sort((a, b) => b - a);
              } else {
                fortuneOutcome.sort((a, b) => a - b);
              }

              const fortuneSixes = fortuneOutcome.map(num => num === 6 ? `<b>${num}</b>` : num);

              additionalInfo += fortuneSixes.join(", ");

              const fortuneNumSixes = fortuneOutcome.filter(num => num === 6).length;
              //console.log("fortuneNumSixes = ", rest.dicePool)
              if (fortuneNumSixes >= 2 && rest.dicePool > 1) {
                additionalInfo += " ] </h3><h5>!! CRITICAL !! | Outstanding Results | Great/Extreme Effect | +5 Clock Ticks | +2 Quality</h5>";
              } else if (fortuneOutcome[0] === 6) {
                additionalInfo += " ] </h3><h5>Nice! | Good Results | Full/Standard Effect | +3 Clock Ticks | +1 Quality</h5>";
              } else if (fortuneOutcome[0] === 4 || fortuneOutcome[0] === 5) {
                additionalInfo += ` ] </h3><h5>Meh. | Mixed Results | Partial/Limited Effect | +2 Clock Ticks | Normal Quality</h5>`;
              } else{
                additionalInfo += ` ] </h3><h5>Poo. | Bad Results | Poor/No Effect | +1 Clock Tick | -1 Quality</h5>`;
              }

              if (rest.assist && rest.assistant !== "NPC") {
                additionalInfo += assistantStressTaken;
              }

              template += additionalInfo;
              break;
            case 'Resist':
              stressTaken = 6;
              additionalInfo = '';
              template = `<h1>[${rest.char} - resist roll: ${rest.rating}]</h1>Resisting ${rest.goal}...<br>`
                    
              if (rest.useDevilsBargain) {
                additionalInfo += `<h2><u>Devil's Bargain accepted</u>: ${rest.useDevilsBargain}</h2>`;
                additionalInfo += `<br> [${rest.devilsBargain}]`
              }

              // assume $rest.outcome is an array of numbers
              const resistOutcome = rest.outcome;

              additionalInfo += "<h3>RESULT: [ ";

              // sort the array of outcomes in descending order
              if(rest.dicePool > 0){
                resistOutcome.sort((a, b) => b - a);
              } else {
                resistOutcome.sort((a, b) => a - b);
              }

              // check if there are any 6s in the array and wrap them in <b></b> tags
              const resistSixes = resistOutcome.map(num => num === 6 ? `<b>${num}</b>` : num);

              // add the sixes to the result string
              additionalInfo += resistSixes.join(", ");

              const resistNumSixes = resistOutcome.filter(num => num === 6).length;

              if (resistNumSixes >= 2 && rest.dicePool > 1) {
                additionalInfo += " ] !! CRITICAL !! Resist consequence, recover stress!<h4>clear 1 stress</h4></h3>";
              } else if (resistOutcome[0] === 6) {
                additionalInfo += " ] Resist consequence, taking zero stress!</h3>";
              } else {
                stressTaken -= resistOutcome[0];
                additionalInfo += ` ] Resist consequence, <h2>take ${stressTaken} stress.</h2></h3>`;
              }

              template += additionalInfo;
              break;

            default:
              template = 'Unknown Roll Type';
          }
          break;
        default:
          template = 'Unknown Entry Type';
      }
      return template
    },
    getRatingValue: async (charID, rating) => {
      const docRef = doc(db, "Crews/myCrew123/Characters", charID);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        const data = docSnap.data();
        let ratingValue;
        const ratingLookup = {
          Insight: (data.doctor >= 1 ? 1 : 0) + (data.rig >= 1 ? 1 : 0) + (data.hack >= 1 ? 1 : 0) + (data.study >= 1 ? 1 : 0),
          Prowess: (data.helm >= 1 ? 1 : 0) + (data.scramble >= 1 ? 1 : 0) + (data.scrap >= 1 ? 1 : 0) + (data.skulk >= 1 ? 1 : 0),
          Resolve: (data.attune >= 1 ? 1 : 0) + (data.command >= 1 ? 1 : 0) + (data.consort >= 1 ? 1 : 0) + (data.sway >= 1 ? 1 : 0),
        };
        
        if(ratingLookup[rating]){
          ratingValue = ratingLookup[rating];
        } else if (data[rating]) {
          ratingValue = data[rating];
        } else {
          ratingValue = 0;
        }
        
        return ratingValue;
      } else {
        console.log("getRatingValue: No such document!");
      }
    
    },
    fetchCrewLog() {
      onSnapshot(crewLogRef, async (querySnapshot) => {
        const fbLogs = [];
        await querySnapshot.forEach(async (doc) => {
          const logEntry = doc.data();
          const timestamp = logEntry.timestamp;
          const type = logEntry.type;
    
          // Format the timestamp
          const date = new Date(timestamp.seconds * 1000);
          const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
          const content = await this.parseLogEntry(logEntry);
    
          fbLogs.push({timestamp: formattedDate, content});
        });
    
        this.crewLog = fbLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).reverse();
        console.log("spaStore: >>> RELOAD CREWLOG <<< | fetchCrewLog complete: ", this.crewLog.length, " entries detected");
      });
    },
    
    fetchClockList() {
      onSnapshot(clockListRef, async (querySnapshot) => {
        const fbClocks = [];
        await querySnapshot.forEach(async (doc) => {
          const clockEntry = {
            id: doc.id, // add the document ID to the clock entry object
            ...doc.data() // use object spread to add the document data to the clock entry object
          };
          fbClocks.push(clockEntry);
        });
    
        this.clockList = fbClocks
        console.log("spaStore: >>> RELOAD CLOCKS <<< | fetchClocks complete: ", this.clockList.length, " clocks detected");
      });
    },
    
    updateClock: async({id, data})=>{
      console.log('updating clock.', data)
      try {
        const clockData = {
          id: id,
          totalTicks: data.totalTicks,
          color: data.color,
          ticksTicked: data.ticksTicked,
          clockName: data.clockName,
        }
        const clockID = id
        const docRef = await setDoc(doc(db, "Crews/"+myCrew, "clocks", clockID), clockData);
      } catch (error) {
        console.error("Error updating clock: ", error);
      }
    },
    removeClock: async(id)=>{
      console.log("remove clock: ", id)
      await deleteDoc(doc(db, "Crews/"+myCrew, "clocks", id))
    },
    addClock: async ({data}) => {
      try {
        console.log('data.clockName:', typeof data.clockName)
        console.log('data.totalTicks:', typeof data.totalTicks)
        console.log('data.color:', typeof data.color)
        const clockData = {
          clockName: data.clockName,
          totalTicks: data.totalTicks,
          color: data.color,
          ticksTicked: 0,
        }
        const docRef = await addDoc(collection(db, "Crews/"+myCrew, "clocks"), clockData);
        console.log("Clock added successfully!, id: ", docRef.id);
        //this.fetchClockList()
        
      } catch (error) {
        console.error("Error adding clock: ", error);
      }
    },

    async fetchShip() {
      onSnapshot(doc(db, "Crews/myCrew123"), (doc) => {
          const data = doc.data();
          const ship = {
            id: doc.id,
            designation: data.designation,
            shipmodel: data.shipmodel,
            crew_description: data.crew_description,
            image1: data.image1,
            image2: data.image2,
            crew_xp: data.crew_xp,
            look: data.look,
            reputation: data.reputation,
            crewsize: data.crewsize,
            gambits: data.gambits,
            shipsize: data.shipsize,
            cred: data.cred,
            vault: data.vault,
            debt: data.debt,
            comms: data.comms,
            engines: data.engines,
            hull: data.hull,
            weapons: data.weapons,
            comms_dmg: data.comms_dmg,
            engines_dmg: data.engines_dmg,
            hull_dmg: data.hull_dmg,
            weapons_dmg: data.weapons_dmg,
            comms_mods: data.comms_mods,
            engines_mods: data.engines_mods,
            hull_mods: data.hull_mods,
            weapons_mods: data.weapons_mods,
            skips: data.skips,
            hyperfuel: data.hyperfuel,
            shields: data.shields,
            crew_upgrades: data.crew_upgrades,
            shields: data.shields,

            heat_brekk: data.heat_brekk,
            cool_brekk: data.cool_brekk,
            wanted_brekk: data.wanted_brekk,
            
            heat_rin: data.heat_rin,
            cool_rin: data.cool_rin,
            wanted_rin: data.wanted_rin,
            
            heat_iota: data.heat_iota,
            cool_iota: data.cool_iota,
            wanted_iota: data.wanted_iota,
            
            heat_holt: data.heat_holt,
            cool_holt: data.cool_holt,
            wanted_holt: data.wanted_holt,
            
            abilities: data.abilities,
            notes: data.notes,

          } 
          
          this.currentShip = ship
          console.log("spaStore.fetchShip: >>> LOAD SHIP: <<< | fetchCrewcomplete: ", this.currentShip.designation);
        });
      },
    updateShip: async ({id, data}) => {
      try {
        const shipData = {
          id: data.id,
          designation: data.designation,
          shipmodel: data.shipmodel,
          crew_description: data.crew_description,
          crew_xp: data.crew_xp,
          image1: data.image1,
          image2: data.image2,
          look: data.look,
          reputation: data.reputation,
          crewsize: data.crewsize,
          gambits: data.gambits,
          shipsize: data.shipsize,
          cred: data.cred,
          vault: data.vault,
          debt: data.debt,
          comms: data.comms,
          engines: data.engines,
          hull: data.hull,
          weapons: data.weapons,
          comms_dmg: data.comms_dmg,
          engines_dmg: data.engines_dmg,
          hull_dmg: data.hull_dmg,
          weapons_dmg: data.weapons_dmg,
          comms_mods: data.comms_mods,
          engines_mods: data.engines_mods,
          hull_mods: data.hull_mods,
          weapons_mods: data.weapons_mods,
          skips: data.skips,
          hyperfuel: data.hyperfuel,
          shields: data.shields,
          crew_upgrades: data.crew_upgrades,
          shields: data.shields,

          heat_brekk: data.heat_brekk,
          cool_brekk: data.cool_brekk,
          wanted_brekk: data.wanted_brekk,
            
          heat_rin: data.heat_rin,
          cool_rin: data.cool_rin,
          wanted_rin: data.wanted_rin,
          
          heat_iota: data.heat_iota,
          cool_iota: data.cool_iota,
          wanted_iota: data.wanted_iota,
          
          heat_holt: data.heat_holt,
          cool_holt: data.cool_holt,
          wanted_holt: data.wanted_holt,

          abilities: data.abilities,
          notes: data.notes,

        }
        let shipID = id
        console.log("SHIP ID: ", shipID)
        const docRef = await setDoc(doc(db, "Crews", shipID), shipData);
        console.log("SpaStore: updateShip: Ship updated successfully!, ID:", shipID);
      } catch (error) {
        console.error("Error adding ship: ", error);
      }
    },

    fetchCharacters() {
      onSnapshot(crewCharsRef, async (querySnapshot) => {
        const fbChars = []
        const nmChars = []
        await querySnapshot.forEach(async (doc) => {
          const charId = doc.id; // get the id of the character
          const charname = doc.data().charname
          fbChars.push(charId)
          nmChars.push(charname)
        });
        this.Characters = fbChars
        this.Charnames = nmChars
        
       if (fbChars.length > 0) {
        // If the following line is removed, reactivity of the global 'currentCharacter' is lost, why?
          this.currentCharacter = await this.fetchCharacterData(this.currentCharacter.id);
        }
        // end mysterious code
        console.log("spaStore: >>> RELOAD CHARACTER LIST <<< | fetchCharacters complete: ", this.Characters.length, " characters detected");
      });
    },
    
    async fetchCharacterData(id) {
      const docRef = doc(db, "Crews/"+myCrew, "Characters", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: id,
          charname: data.charname,
          playbook: data.playbook,
          portraitURL: data.portraitURL,
          pb_description: data.pb_description,
          pbxp: data.pbxp,
          stress: data.stress,
          trauma: data.trauma,
          traumatypes: data.traumatypes,
          alias: data.alias,
          heritage: data.heritage,
          background: data.background,
          vice: data.vice,
          look: data.look,
    
          insight_xp: data.insight_xp,
          prowess_xp: data.prowess_xp,
          resolve_xp: data.resolve_xp,
    
          doctor: data.doctor,
          hack: data.hack,
          rig: data.rig,
          study: data.study,
    
          helm: data.helm,
          scramble: data.scramble,
          scrap: data.scrap,
          skulk: data.skulk,
    
          attune: data.attune,
          command: data.command,
          consort: data.consort,
          sway: data.sway,
    
          harm3: data.harm3,
          harm2_2: data.harm2_2,
          harm2: data.harm2,
          harm1_2: data.harm1_2,
          harm1: data.harm1,
          healthclock: data.healthclock,
    
          cred: data.cred,
          stash: data.stash, 
    
          armor: data.armor,
          heavy: data.heavy,
          special: data.special,
    
          items: data.items,
          s_items: data.s_items,
    
          abilities:data.abilities,
          notes: data.notes
          // add any other fields you need here
        };
      } else {
        console.log("SpaStore: fetchCharacterData: No such document!");
        return null;
      }
    },

    updateCharacter: async ({id, data}) => {
      try {
        const characterData = {
          id: id,
          charname: data.charname,
          playbook: data.playbook,
          portraitURL: data.portraitURL,
          pb_description: data.pb_description,
          pbxp: data.pbxp,
          stress: data.stress,
          trauma: data.trauma,
          traumatypes: data.traumatypes,
          alias: data.alias,
          heritage: data.heritage,
          background: data.background,
          vice: data.vice,
          look: data.look,
    
          insight_xp: data.insight_xp,
          prowess_xp: data.prowess_xp,
          resolve_xp: data.resolve_xp,
    
          doctor: data.doctor,
          hack: data.hack,
          rig: data.rig,
          study: data.study,
    
          helm: data.helm,
          scramble: data.scramble,
          scrap: data.scrap,
          skulk: data.skulk,
    
          attune: data.attune,
          command: data.command,
          consort: data.consort,
          sway: data.sway,
    
          harm3: data.harm3,
          harm2_2: data.harm2_2,
          harm2: data.harm2,
          harm1_2: data.harm1_2,
          harm1: data.harm1,
          healthclock: data.healthclock,
    
          cred: data.cred,
          stash: data.stash, 
    
          armor: data.armor,
          heavy: data.heavy,
          special: data.special,
    
          items: data.items,
          s_items: data.s_items,
    
          abilities:data.abilities,
          notes: data.notes
        }
        let charID = id
        const docRef = await setDoc(doc(db, "Crews/"+myCrew, "Characters", charID), characterData);
        console.log("spaStore: updateCharacter >>> UPDATED CHARACTER <<< | Success!, ID:", characterData.charname);
      } catch (error) {
        console.error("spaStore: updateCharacter: Error adding character: ", error);
      }
    },
    
    async selectCharacter(id) {
      this.currentCharacter = await this.fetchCharacterData(id);
      console.log("spaStore.selectCharacter: [][][] NEW CHARACTER SELECTED [][][] | ", this.currentCharacter.charname )
      
    },

    charUpdate() {
      const spaStore = useSpaStore()
      console.log('spaStore.charUpdate: |||||||| CHARUPDATE ||||||||', this.currentCharacter.charname)
      spaStore.updateCharacter({id: this.currentCharacter.id, data: this.currentCharacter})
    },
    shipUpdate() {
      const spaStore = useSpaStore()
      spaStore.updateShip({id: this.currentShip.id, data: this.currentShip})
    },
    uploadImage(file, type) {
      console.log('uploadImage called, with file = ', file)
      const metadata = {
        contentType: 'image/png'
      }
      const storageRef = fbRef(storage, 'images/'+file.name)
      console.log('uploadImage: filename = ', file.name)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)

      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if(type == "character"){
              this.currentCharacter.portraitURL = downloadURL;
              console.log('File available at', this.currentCharacter.portraitURL);
              this.charUpdate();
            }
            else if (type == "ship1"){
              this.currentShip.image1 = downloadURL;
              console.log('File available at', this.currentShip.image1);
              this.shipUpdate();
            }
            else if (type == "ship2"){
              this.currentShip.image2 = downloadURL;
              console.log('File available at', this.currentShip.image2);
              this.shipUpdate();
            }
            else {
              console.log("uploadImage: getDownloadURL: ERROR")
            }
            
          });
        }
      );
    },  
    deleteAll() {
      console.log("deleteAll: this.Characters = ", this.Characters);
      this.Characters.forEach(character => {
        deleteDoc(doc(db, "Crews/"+myCrew, "Characters", character.id));
        console.log("spaStore: deleteAll: deleted ", character.id)
      });
    }
    
  }, 
  persist: {
    namespace: 'spa-store',
    // You can add additional options here if needed
  },
  
})
