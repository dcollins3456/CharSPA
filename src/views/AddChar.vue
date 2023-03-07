<template>
    <form v-on:submit.prevent="onSubmit" class="addchar">
        <div class="form-group">
        <label for="charname">Character Name:</label>
        <input v-model="newChar.charname" type="text" class="form-control" id="charname">
        </div>
        <div class="form-group">
        <label for="playbook">Playbook:</label>
        <input v-model="newChar.playbook" type="text" class="form-control" id="playbook">
        </div>
        <div class="form-group">
        <label for="pb_description">Playbook Description:</label>
        <input v-model="newChar.pb_description" type="text" class="form-control" id="pb_description">
        </div>
        <button @click="addCharacter({data: newChar})" type="submit" class="btn btn-primary">Submit</button>
        <button @click="randomizeFields" class="btn btn-success">Randomize</button>
        <button @click="clearForm">Clear Form</button>
    </form>
</template>

<script setup>
import {ref, onMounted} from "vue";
import randomCharacters from "@/assets/randos.js";
import { collection, addDoc } from "firebase/firestore";
import {db} from '@/firebase';
import { useSpaStore } from '@/stores/'

const spaStore = useSpaStore()
const myCrew = "myCrew123"
let submitted = false;



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

onMounted(() => {
  console.log('MOUNTED: newChar = ', newChar)
})
</script>
<style scoped>
.add{
    margin: 50px;
}
</style>