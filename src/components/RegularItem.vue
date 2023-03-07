<template>
    <div>
        <a :class="{ small: item.isSmall }">
          <img
          @click="() => {
              item.isChecked = !item.isChecked;
              spaStore.charUpdate();
          }"
          v-for="i in item.boxes"
          :key="i"
          :src="item.isChecked ? 'graphics/checked.png' : 'graphics/unchecked.png'"
          />
          {{ item.name }}
        </a>
        <div class="edit-button" @click="triggerEditing()">
            <img class="image-hover" src="graphics/edit-hover.png" />
            <img class="image-main" src="graphics/edit.png" />
        </div>
        <div v-on:click.self="editing = false;" class="modal-overlay" v-show="editing">
            <form
              class="edit-item"
              @submit.prevent
              @keyup.enter.prevent="updateItemData(); editing = false;"
            >
              <label for="itemNameInput">Item Name:</label>
              <input
                id="itemNameInput"
                type="text"
                maxlength="28"
                ref="itemNameInput"
                v-model="item.name"
                @keyup.enter.prevent="updateItemData(); editing = false;"
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
                @keyup.enter.prevent="updateItemData(); editing = false;"
              />
              <button @click="editing = false;" class="edit-item">
                <img class="image-hover" src="graphics/cancel-hover.png" />
                <img class="image-main" src="graphics/cancel.png" />
              </button>
              <button @click="updateItemData(); editing = false;" class="edit-item">
                <img class="image-hover" src="graphics/save-hover.png" />
                <img class="image-main" src="graphics/save.png" />
              </button>
              
            </form>
        </div>
    </div>
</template>

<script setup="props">
import { nextTick, ref, computed, } from "vue";
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
    itemName: String,
    itemIndex: Number,
});

const currentCharacter = computed(() => {
    const character = spaStore.currentCharacter;
    const items = character.items;
    const item = items[props.itemIndex];
    return {
    ...character,
    items,
    item,
    };
});

const editing = ref(false);
const itemNameInput = ref(null);
const itemBoxesInput = ref(null);
const item = computed(() => currentCharacter.value.items[props.itemIndex]);

const triggerEditing = () => {
    editing.value = true;
    if (editing.value) {
    nextTick(() => {
        console.log("itemNameInput value: ", itemNameInput.value.value);
        itemNameInput.value.focus();
        itemNameInput.value.setSelectionRange(0, 0);
    });
    }
};

const updateItemData = () => {
  const newBoxes = itemBoxesInput.value.value
  
  currentCharacter.value.item.name = itemNameInput.value.value;
  currentCharacter.value.item.boxes = Number(newBoxes);
  editing.value = false;
  spaStore.charUpdate();
};


</script>

<style scoped>
.hidden {
    display: none;
    border: 5px solid red;
}
.visible {
    display: block;
}
</style>
