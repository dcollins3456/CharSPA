<template>
  <div class="splash3">
    <div class="signupSection">
        <div class="left-box">
        </div>
        <form @submit.prevent="addchar" class="signupForm">
            <h2>Add New Character</h2>
            <ul class="noBullet">
                <li>
                    <label for="charname"></label>
                    <input type="text" placeholder="Character Name" v-model="newChar.charname" id="charname" class="input-field" required/>
                </li>
                <li>
                    <label for="playbook"></label>
                    <input type="text" placeholder="Playbook"  v-model="newChar.playbook" id="playbook" class="input-field" required/>
                </li>
                <li>
                    <label for="pb_description"></label>
                    <input type="text" placeholder="Playbook Description..." v-model="newChar.pb_description" id="pb_description" class="input-field" />
                </li>
                <p class="statusMsg" v-if="statusMsg">{{ statusMsg }}</p>
            </ul>
            <div @click="addCharacter({data: newChar})" class="form-button">
              <img class="image-hover" src="graphics/form-button-hover.png" />
              <img class="image-main" src="graphics/form-button.png" />
              <p>Submit</p>
            </div>
            <div @click="randomizeFields" class="form-button">
              <img class="image-hover" src="graphics/form-button-hover.png" />
              <img class="image-main" src="graphics/form-button.png" />
              <p>Random</p>
            </div>
            <div @click="cancelAdding" class="form-button">
              <img class="image-hover" src="graphics/form-button-hover.png" />
              <img class="image-main" src="graphics/form-button.png" />
              <p>Cancel</p>
            </div>
            
        </form>
    </div>
  </div> 
</template>

<script setup>
import {ref, onMounted} from "vue";
import randomCharacters from "@/assets/randos.js";
import { collection, addDoc } from "firebase/firestore";
import {db} from '@/firebase';
import { useSpaStore } from '@/stores/'
import { useRouter } from 'vue-router'

const router = useRouter()

const spaStore = useSpaStore()
const myCrew = "myCrew123"
let submitted = false;
const statusMsg = ref("");


const newChar = ref({ 
  charname: "",
  playbook: "",
  pb_description: "",
  portraitURL: "",
  pbxp: 0,
  stress: 0,
  trauma: 0,
  traumatypes: [],
  alias: "",
  heritage: "",
  background: "", 
  vice: "", 
  look: "", 

  insight_xp: 0,
  prowess_xp: 0,
  resolve_xp: 0,

  doctor: 0,
  hack: 0,
  rig: 0,
  study: 0,

  helm: 0,
  scramble: 0,
  scrap: 0,
  skulk: 0,

  attune: 0,
  command: 0,
  consort: 0,
  sway: 0,

  harm3: "",
  harm2_2: "",
  harm2: "",
  harm1_2: "",
  harm1: "",
  healthclock: "",

  cred: 0,
  stash: 0, 

  armor: false,
  heavy: false,
  special: false,

  items: [],
  s_items: [],

  abilities: [],
  notes: []
});

const addCharacter = async ({data}) => {
  try {
    const characterData = {
        charname: data.charname,
        playbook: data.playbook,
        pb_description: data.pb_description,
        portraitURL: data.portraitURL,
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
    const docRef = await addDoc(collection(db, "Crews/"+myCrew, "Characters"), characterData);
    console.log("Character added successfully!, id: ", docRef.id);
    //console.log('character portraitURL = ', characterData.portraitURL)
    spaStore.fetchCharacters();
    statusMsg.value = "ADDED! REDIRECTING..."
    setTimeout(()=>{
      router.push("/ship-view")
    }, 3000)
    
  } catch (error) {
    console.error("Error adding character: ", error);
  }
};
const clearForm = () => {
    submitted = false;
    newChar.value.charname = "";
    newChar.value.playbook = "";
    newChar.value.pb_description = "";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const filename = `graphics/pictures/${timestamp}-${random}.png`;
    console.log("filename generated = ", filename)
};
const randomizeFields = () => {
    submitted = false;
    console.log('RANDOMIZE CALLED')
    const randomIndex = Math.floor(Math.random() * randomCharacters.length);
    const randomChar = randomCharacters[randomIndex];
    newChar.value = randomChar;
};
const cancelAdding = () => {
  router.push("/ship-view")
}
onMounted(() => {
  console.log('MOUNTED: newChar = ', newChar)
})
</script>
<style scoped>
.add{
    margin: 50px;
}
</style>