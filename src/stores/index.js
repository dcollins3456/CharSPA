import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { collection, onSnapshot, deleteDoc, doc, setDoc } from "firebase/firestore";
import {db} from '@/firebase'

export const useSpaStore = defineStore({
  id: 'charspa',
  state: () => ({
    Characters: [],
    currentCharacter: {
      id: '',
      charname: '',
      playbook: '',
      pb_description: '',
      pbxp: '',
      stress: ''
    },
  }),
  getters: {
    
  },
  actions: {
    fetchCharacters() {
      onSnapshot(collection(db, "Characters"), async (querySnapshot) => {
        const fbChars = [];
        await querySnapshot.forEach(async (doc) => {
          const data = await doc.data();
          const char = {
            id: doc.id,
            charname: data.charname,
            playbook: data.playbook,
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
          fbChars.push(char)
        });
        this.Characters = fbChars        
        if(!this.currentCharacter){
          this.currentCharacter = fbChars[0]
        }
        console.log("fetchCharacters complete: ", this.Characters);
      });
    },
    selectCharacter(id) {
      this.currentCharacter = this.Characters.find(c => c.id === id);
    },
    updateCharacter: async ({id, data}) => {
      console.log("DATA: ", data)
      try {
        const characterData = {
          id: id,
          charname: data.charname,
          playbook: data.playbook,
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
        const docRef = await setDoc(doc(db, "Characters", charID), characterData);
        console.log("Character updated successfully!, ID:", charID);
      } catch (error) {
        console.error("Error adding character: ", error);
      }
    },
    deleteAll() {
      console.log("deleteAll: this.Characters = ", this.Characters);
      this.Characters.forEach(character => {
        deleteDoc(doc(db, "Characters", character.id));
        console.log("deleted ", character.id)
      });
    }
    
  }
})
