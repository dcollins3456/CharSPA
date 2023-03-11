<template>
    <div>
        <p @click="triggerEditing()" v-html="note.replace(/\*(.*?)\*/g, '<b>$1</b>')"></p>
  
        <div v-on:click.self="cancelInput()" class="modal-overlay" v-show="editing">
        <form
          class="edit-item"
          @submit.prevent
        >
          <label for="noteTextInput">Note Text:</label>
          <textarea
            id="noteTextInput"
            type="text"
            maxlength="500"
            ref="noteTextInput"
            v-model="note"
          ></textarea>
          
          <button type="button" @click="updateItemData(); if(!message){editing = false};" class="edit-item">
            <img class="image-hover" src="/graphics/save-hover.png" />
            <img class="image-main" src="/graphics/save.png" />
          </button>
          <button type="button" @click="cancelInput()" class="edit-item">
            <img class="image-hover" src="/graphics/cancel-hover.png" />
            <img class="image-main" src="/graphics/cancel.png" />
          </button>
          <button v-if="currentObject.notes.length > 1" type="button" @click="deleteItem();" class="edit-item">
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
      type:String,
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
  const noteTextInput = ref(null);
  const note = ref(currentObject.value.notes[props.itemIndex]);
  const originalNoteText = ref(note.value);
  const message = ref(false);
  
  const triggerEditing = () => {
      editing.value = true;
      if (editing.value) {
      nextTick(() => {
          noteTextInput.value.focus();
          noteTextInput.value.setSelectionRange(0, 0);
      });
      }
  };
  
  const deleteItem = () => {
    console.log('NoteItem: DELETE ITEM CALLED')
    currentObject.value.notes.splice(props.itemIndex, 1);
    if(props.type === "character"){
      spaStore.charUpdate()
    }
    else if(props.type === "ship") {
      spaStore.shipUpdate()
    }
    else{
      console.log("NoteItem ERROR!!")
    }
    editing.value = false;
  }
  
  const updateItemData = () => {
      console.log("updateItemData NAME: ", note.value)
      if(!noteTextInput.value.value){
        console.log("updateItemData: LOCKED", !noteTextInput.value.value)
        message.value = true;
      }
      else{
        console.log("MESASAGE SET TO FALSE. note.value = ", note.value)
        message.value = false;
        editing.value = false;
        currentObject.value.notes[props.itemIndex] = noteTextInput.value.value;
        originalNoteText.value = noteTextInput.value.value;
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
    note.value = originalNoteText.value;
    editing.value = false;
    if(note.value === ""){
      deleteItem()
    }
  };
  
  
  onMounted(() => {
    if (!currentObject.value.notes[props.itemIndex]){
      console.log("MOUNTED: ITEM HAS NO TEXT: ")
      message.value = true;
      editing.value = true;
    }
  })
  
  </script>
  
  <style>
  
  
  
  </style>
  
  