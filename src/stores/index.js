import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { collection, onSnapshot, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import {db, storage} from '@/firebase'
import { getStorage, ref as fbRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from 'vue-router'

const myCrew = "myCrew123"
const crewCharsRef = collection(db, "Crews/"+myCrew, "Characters")
const crewShipRef = doc(db, "Crews/"+myCrew)

export const useSpaStore = defineStore({
  id: 'charspa',
  state: () => ({
    Characters: [],
    Charnames: [],
    currentShip: {},
    currentCharacter: {},
    currentUser: {},
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
        // if there are any characters, select the first one
       /*   if (fbChars.length > 0) {
          this.currentCharacter = await this.fetchCharacterData(this.currentCharacter.id);
        }  */
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
    
    async selectCharacter(id, router) {
      this.currentCharacter = await this.fetchCharacterData(id);
      console.log("spaStore.selectCharacter: [][][] NEW CHARACTER SELECTED [][][] | ", this.currentCharacter.charname )
      router.push('/character-view')
    },

    charUpdate() {
      const spaStore = useSpaStore()
      console.log('spaStore.charUpdate: |||||||| CHARUPDATE ||||||||', this.currentCharacter.charname)
      spaStore.updateCharacter({id: this.currentCharacter.id, data: this.currentCharacter})
    },
    shipUpdate() {
      const spaStore = useSpaStore()
      console.log('shipUpdate() for ship (comms_mod): ', spaStore.currentShip.comms_mod)
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
