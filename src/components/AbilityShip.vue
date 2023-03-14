<template>
  <div class="ability-content">
      <p @click="triggerEditing()" v-html="ability.replace(/\*(.*?)\*/g, '<b>$1</b>')"></p>

      <div v-on:click.self="cancelInput();" class="modal-overlay" v-show="editing">
      <form
        class="edit-item"
        @submit.prevent
      >
        <label for="abilityTextInput">Ability Text:</label>
        <textarea
          id="abilityTextInput"
          type="text"
          maxlength="500"
          ref="abilityTextInput"
          v-model="ability"
        ></textarea>
        
        <button type="button" @click="updateItemData(); if(!message){editing = false};" class="edit-item">
          <img class="image-hover" src="/graphics/save-hover.png" />
          <img class="image-main" src="/graphics/save.png" />
        </button>
        <button type="button" @click="cancelInput();" class="edit-item">
          <img class="image-hover" src="/graphics/cancel-hover.png" />
          <img class="image-main" src="/graphics/cancel.png" />
        </button>
        <button v-if="spaStore.currentShip.abilities.length > 1" type="button" @click="deleteItem();" class="edit-item">
          <img class="image-hover" src="/graphics/delete-hover.png" />
          <img class="image-main" src="/graphics/delete.png" />
        </button> <br><br>
        <span class="message" v-if="message">Enter text, *asterisks* to bold.</span>
      </form>
    
      
    </div>
</div>
</template>

<script setup>
import { nextTick, ref, toRef, computed, onMounted} from "vue";
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
itemIndex: Number,
ability: String,
})

const editing = ref(false);
const abilityTextInput = ref(null);
const ability = toRef(props, 'ability');
const originalAbilityText = ref(ability.value);
const message = ref(false);


const triggerEditing = () => {
  editing.value = true;
  if (editing.value) {
  nextTick(() => {
      abilityTextInput.value.focus();
      abilityTextInput.value.setSelectionRange(0, 0);
  });
  }
};

const deleteItem = () => {
console.log("DELETING>.......... currentShip = ", spaStore.currentShip.designation)
spaStore.currentShip.abilities.splice(props.itemIndex, 1);
editing.value = false;
spaStore.shipUpdate()
}

const updateItemData = () => {
console.log("updateItemData VALUE: ", ability.value)
if(!abilityTextInput.value.value){
  console.log("updateItemData: LOCKED", !abilityTextInput.value.value)
  message.value = true;
}
else{
  console.log("MESASAGE SET TO FALSE. currentShip.value.ability = ", ability.value)
  message.value = false;
  editing.value = false;
  spaStore.currentShip.abilities[props.itemIndex] = abilityTextInput.value.value;
  originalAbilityText.value = abilityTextInput.value.value;
  spaStore.shipUpdate();
}
};

const cancelInput = () => {
console.log("CANCEL INPUT CALLED")
ability.value = originalAbilityText.value;
editing.value = false;
if(ability.value === ""){
  deleteItem()
}
};

onMounted(() => {
if (!spaStore.currentShip.abilities[props.itemIndex]){
  console.log("MOUNTED: ITEM HAS NO TEXT: ")
  message.value = true;
  editing.value = true;
}
})

</script>

<style>



</style>

