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
          :src="item.isChecked ? '/graphics/checked.png' : '/graphics/unchecked.png'"
          />
          {{ item.name }}
        </a>
        <div class="edit-button" @click="triggerEditing()">
            <img class="image-hover" src="/graphics/edit-hover.png" />
            <img class="image-main" src="/graphics/edit.png" />
        </div>
        <div v-on:click.self="cancelInput()" class="modal-overlay" v-show="editing">
            <form
              class="edit-item"
              @submit.prevent
              @keydown.enter.prevent="updateItemData(); editing = false;"
            >
              <label for="itemNameInput">Item Name:</label>
              <input
                id="itemNameInput"
                type="text"
                maxlength="17"
                ref="itemNameInput"
                v-model="itemNameValue"
                @keydown.enter.prevent="updateItemData(); editing = false;"
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
                <img class="image-hover" src="/graphics/cancel-hover.png" />
                <img class="image-main" src="/graphics/cancel.png" />
              </button>
              <button @click="updateItemData(); editing = false;" class="edit-item">
                <img class="image-hover" src="/graphics/save-hover.png" />
                <img class="image-main" src="/graphics/save.png" />
              </button>
              
            </form>
        </div>
    </div>
</template>

<script setup="props">
import { nextTick, ref, toRef, computed, watch, reactive} from "vue";
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
    item: Object,
    itemIndex: Number,
});

const editing = ref(false);
const itemNameInput = ref(null)
const itemNameValue = ref(spaStore.currentCharacter.items[props.itemIndex].name)
const itemBoxesInput = ref(null)

const originalFieldValue = ref("")
const originalBoxesValue = ref(spaStore.currentCharacter.items[props.itemIndex].boxes)
const item = toRef(props, 'item')

watch(() => item.name, (newValue) => {
  itemNameValue.value = newValue
});
watch(()=> item.boxes, (newValue) => {
  itemBoxesInput.value = newValue
})

const triggerEditing = () => {
  editing.value = true
  originalFieldValue.value = itemNameInput.value.value;
  console.log("ORIGINAL BOXES VALUE, ", originalBoxesValue.value)
  if (editing.value) {
  nextTick(() => {
    console.log("itemNameInput value: ", itemNameInput.value.value)
    itemNameInput.value.focus()
    itemNameInput.value.setSelectionRange(0, 0)
  });
  }
};

const updateItemData = () => {
  const newBoxesValue = Number(itemBoxesInput.value.value)
  originalFieldValue.value = itemNameInput.value.value
  console.log("updating item name, ", originalFieldValue)
  spaStore.currentCharacter.item.name = itemNameInput.value.value
  item.boxes = newBoxesValue
  editing.value = false
  spaStore.charUpdate()
};
const cancelInput = () => {
  itemNameInput.value = originalFieldValue.value
  item.boxes = originalBoxesValue.value
  itemBoxesInput.value = originalBoxesValue.value
  editing.value = false
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
