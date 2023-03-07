<template>
  <div class="mod-div">
    <div v-if="mod.modname != 'empty'">
      <img 
        :src="mod.isChecked ? 'graphics/mod-checked.png' : 'graphics/mod-unchecked.png'" 
        @click="() => {
          mod.isChecked = !mod.isChecked; 
          updateModData();
        }"
      />
      <span @click="triggerEditing()">{{mod.modname}}</span>
    </div>
    <div v-else>
      <img @click="triggerEditing()" src="graphics/mod-empty.png" />
    </div>
    <div v-on:click.self="cancelInput(); editing = false;" class="modal-overlay" v-show="editing">
      <form
        class="edit-item"
        @submit.prevent
        @keydown.enter.prevent="updateModData(); editing = false;"
      >
        <label for="modNameInput">Mod Name:</label>
        <input
          id="modNameInput"
          type="text"
          maxlength="18"
          ref="modNameInput"
          v-model="mod.modname"
          @keydown.enter.prevent="updateModData(); editing = false;"
        />
        <button @keydown.enter.prevent @click="cancelInput(); editing = false;" class="edit-item">
          <img class="image-hover" src="graphics/cancel-hover.png" />
          <img class="image-main" src="graphics/cancel.png" />
        </button>
        <button @keydown.enter.prevent @click="updateModData(); editing = false;" class="edit-item">
          <img class="image-hover" src="graphics/save-hover.png" />
          <img class="image-main" src="graphics/save.png" />
        </button>
        <button @keydown.enter.prevent @click="deleteMod();" class="edit-item">
          <img class="image-hover" src="graphics/delete-hover.png" />
          <img class="image-main" src="graphics/delete.png" />
        </button>
      </form>
    </div>
  </div>
        
</template>
<script setup>
import { ref, computed, nextTick} from "vue";
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
  type: String,
  itemIndex: Number,
});

const currentShip  = computed(() => {
  return spaStore.currentShip;
});

const mod = ref(spaStore.currentShip[props.type][props.itemIndex])

const editing = ref(false);
const modNameInput = ref(null);
const originalModName = ref(mod.value.modname);

const triggerEditing = () => {
  editing.value = true;
  originalModName.value = mod.value.modname;
    if (editing.value) {
    nextTick(() => {
        console.log("modNameInput value: ", modNameInput.value.value);
        modNameInput.value.focus();
        modNameInput.value.setSelectionRange(0, 0);
    });
    }
}

const updateModData = () => { 
  console.log("MOD.ISCHECKED = ", mod.value.isChecked)
  currentShip.value[props.type][props.itemIndex].isChecked = mod.value.isChecked
  currentShip.value[props.type][props.itemIndex].modname = modNameInput.value.value;
  
  editing.value = false;
  spaStore.shipUpdate();
};
const deleteMod = () => {
  console.log("DELETING MOD: ", currentShip.value[props.type][props.itemIndex].modname)
  currentShip.value[props.type][props.itemIndex].isChecked = false
  currentShip.value[props.type][props.itemIndex].modname = "empty"
  mod.value.isChecked = false
  mod.value.modname = "empty"
  editing.value = false;   
  spaStore.shipUpdate();
}
const cancelInput = () => {
  console.log("CANCEL INPUT CALLED")
  mod.value.modname = originalModName.value;
  editing.value = false;
};


</script>