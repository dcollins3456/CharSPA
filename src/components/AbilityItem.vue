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
          <button v-if="currentObject.abilities.length > 1" type="button" @click="deleteItem();" class="edit-item">
            <img class="image-hover" src="/graphics/delete-hover.png" />
            <img class="image-main" src="/graphics/delete.png" />
          </button> <br><br>
          <span class="message" v-if="message">Enter text, *asterisks* to bold.</span>
        </form>
      
        
      </div>
  </div>
  </template>
  
  <script setup>
  import { nextTick, ref, computed, onMounted} from "vue";
  import { useSpaStore } from "@/stores/";
  
  const spaStore = useSpaStore();
  
  const props = defineProps({
      itemIndex: Number,
      type: String,
  });
  
  const currentObject = computed(() => {
    if (props.type === "character") {
      return spaStore.currentCharacter;
    } else if (props.type === "ship") {
      return spaStore.currentShip;
    } else {
      return null; 
    }
  });
  
  const editing = ref(false);
  const abilityTextInput = ref(null);
  const ability = ref(currentObject.value.abilities[props.itemIndex])
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
  console.log("DELETING>..........")
  currentObject.value.abilities.splice(props.itemIndex, 1);
  if(props.type === "character"){
    spaStore.charUpdate()
  }
  else if(props.type === "ship") {
    spaStore.shipUpdate()
  }
  else{
    console.log("AbilityItem ERROR!!")
  }
  editing.value = false;
}

const updateItemData = () => {
    console.log("updateItemData VALUE: ", ability.value)
    if(!abilityTextInput.value.value){
      console.log("updateItemData: LOCKED", !abilityTextInput.value.value)
      message.value = true;
    }
    else{
      console.log("MESASAGE SET TO FALSE. currentObject.value.ability = ", ability.value)
      message.value = false;
      editing.value = false;
      currentObject.value.abilities[props.itemIndex] = abilityTextInput.value.value;
      originalAbilityText.value = abilityTextInput.value.value;
      if(props.type === "character"){
        spaStore.charUpdate();
      }
      else if (props.type === "ship"){
        spaStore.shipUpdate();
      }
      else{
        console.log('AbilityItem ERROR !!!')
      }
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
    if (!currentObject.value.abilities[props.itemIndex]){
      console.log("MOUNTED: ITEM HAS NO TEXT: ")
      message.value = true;
      editing.value = true;
    }
  })
  
  </script>
  
  <style>
  
  
  
  </style>
  
  