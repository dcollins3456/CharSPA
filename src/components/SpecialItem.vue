<template>
  <div>
    <a :class="{ small: item.isSmall }">

        <img @click="() => { 
            item.isChecked = !item.isChecked; 
            spaStore.charUpdate();
        }" 
        v-for="i in item.boxes" 
        :key="i" 
        :src="item.isChecked ? '/graphics/checked.png' : '/graphics/unchecked.png'" 
        />

        <p class="s_item_name">{{ item.name }}</p>

        <div @click="triggerEditing()" class="edit-button">
            <img class="image-hover" src="/graphics/edit-hover.png" />
            <img class="image-main" src="/graphics/edit.png" />
        </div>

        <p>{{ item.description }}</p>
    </a>
    <div v-on:click.self="cancelInput();" class="modal-overlay" v-show="editing">
      <form
        class="edit-item"
        @submit.prevent
        @keyup.enter.prevent="updateItemData(); if(!message){editing = false};"
      >
        <label for="itemNameInput">Item Name:</label>
        <input
          id="itemNameInput"
          type="text"
          maxlength="28"
          ref="itemNameInput"
          v-model="item.name"
          @keyup.enter.prevent="updateItemData(); if(!message){editing = false};"
        />
        <div class="edit-button">
          <img class="image-hover" src="/graphics/edit-hover.png" />
          <img class="image-main" src="/graphics/edit.png" />
        </div>
        <br />
        <label for="itemDescInput">Description:</label>
        <input
          id="itemDescInput"
          type="text"
          maxlength="75"
          ref="itemDescInput"
          v-model="item.description"
          @keyup.enter.prevent="updateItemData(); if(!message){editing = false};"
        />
        <br />
        <label for="itemBoxesInput"># of Boxes:</label>
        <input
          id="itemBoxesInput"
          class="boxes"
          ref="itemBoxesInput"
          v-model.number="item.boxes"
          type="number"
          min="1"
          max="2"
          @keyup.enter.prevent="updateItemData(); if(!message){editing = false};"
        />
        <button type="button" @click="updateItemData(); if(!message){editing = false};" class="edit-item">
          <img class="image-hover" src="/graphics/save-hover.png" />
          <img class="image-main" src="/graphics/save.png" />
        </button>
        <button type="button" @click="cancelInput();" class="edit-item">
          <img class="image-hover" src="/graphics/cancel-hover.png" />
          <img class="image-main" src="/graphics/cancel.png" />
        </button>
        <button type="button" @click="deleteItem();" class="edit-item">
          <img class="image-hover" src="/graphics/delete-hover.png" />
          <img class="image-main" src="/graphics/delete.png" />
        </button> <br><br>
        <span class="message" v-if="message">Please enter item name and description.</span>
      </form>
    
      
    </div>
</div>
</template>

<script setup="props">
import { nextTick, ref, toRef, reactive, computed, watch, onMounted} from "vue";
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
    item: Object,
    itemIndex: Number,
});

const editing = ref(false);
const itemNameInput = ref(null);
const itemNameValue = ref(spaStore.currentCharacter.items[props.itemIndex].name)
const itemDescValue = ref(spaStore.currentCharacter.items[props.itemIndex].desc)
const itemDescInput = ref(null);
const itemBoxesInput = ref(null);

const originalFieldValue = ref("")
const originalDescValue = ref("")
const originalBoxesValue = ref(spaStore.currentCharacter.s_items[props.itemIndex].boxes)
const item = toRef(props, 'item')

const message = ref(false);

watch(() => item.name, (newValue) => {
  itemNameValue.value = newValue
});
watch(()=> item.description, (newValue) => {
  console.log("WATCH DESC")
  itemDescValue.value = newValue
})
watch(()=> item.boxes, (newValue) => {
  itemBoxesInput.value = newValue
})


const triggerEditing = () => {
    editing.value = true;
    originalFieldValue.value = itemNameInput.value.value
    originalDescValue.value = itemDescInput.value.value
    if (editing.value) {
    nextTick(() => {
        console.log("itemNameInput value: ", itemNameInput.value.value);
        itemNameInput.value.focus();
        itemNameInput.value.setSelectionRange(0, 0);
    });
    }
};

const deleteItem = () => {
  spaStore.currentCharacter.s_items.splice(props.itemIndex, 1);
  spaStore.charUpdate();
  editing.value = false;
}
const updateItemData = () => {
    console.log("updateItemData NAME: ", item.name)
    
    if(!itemNameInput.value.value || !itemDescInput.value.value){
      console.log("updateItemData: LOCKED", !itemNameInput.value.value)
    }
    else{
      console.log("MESASAGE SET TO FALSE.")
      const newBoxesValue = Number(itemBoxesInput.value.value)
      originalFieldValue.value = itemNameInput.value.value
      originalDescValue.value = itemDescInput.value.value
      item.boxes = newBoxesValue
      message.value = false;
      editing.value = false;
      spaStore.currentCharacter.s_items[props.itemIndex].name = itemNameInput.value.value;
      spaStore.currentCharacter.s_items[props.itemIndex].description = itemDescInput.value.value;
      spaStore.currentCharacter.s_items[props.itemIndex].boxes = newBoxesValue;
      spaStore.charUpdate();
    }
};
const cancelInput = () => {
  item.name = originalFieldValue.value
  item.description = originalDescValue.value
  item.boxes = originalBoxesValue.value
  itemBoxesInput.value = originalBoxesValue.value
  editing.value = false
  
  console.log("CANCEL INPUT CALLED", originalDescValue.value)
};
onMounted(() => {
  if (!spaStore.currentCharacter.s_items[props.itemIndex].name || !spaStore.currentCharacter.s_items[props.itemIndex].description){
    console.log("MOUNTED: ITEM HAS NO NAME")
    message.value = true;
    editing.value = true;
  }
})

</script>

<style>



</style>

