<template>
  <div class="editable-input">
    <span @click="triggerEditing()">
      {{ editableValue }}
    </span>
    <div class="editable-placehold" v-if="!editableValue" @click="()=>triggerEditing()"></div>
    <div v-on:click.self="cancelInput();" class="modal-overlay" v-show="editing">
      <form
        class="edit-item"
        @submit.prevent
        @keyup.enter.prevent="callUpdate(); editing = false;"
      >
        <label for="editableInputField">Enter Text:</label>
        <input
          v-if="characterLimit<=50"
          id="editableInputField"
          type="text"
          :maxlength="characterLimit"
          ref="editableInputField"
          v-model="editableValue"
          @keyup.enter.prevent="callUpdate(); editing = false;"
        />
        <textarea
          v-else
          id="editableInputField"
          type="text"
          :maxlength="characterLimit"
          ref="editableInputField"
          v-model="editableValue"
          @keyup.enter.prevent="callUpdate(); editing = false;"
        />
        <button type="button" @click="cancelInput('hello from cancel button');" class="edit-item">
          <img class="image-hover" src="graphics/cancel-hover.png" />
          <img class="image-main" src="graphics/cancel.png" />
        </button>
        <button type="button" @click="callUpdate(); editing = false;" class="edit-item">
          <img class="image-hover" src="graphics/save-hover.png" />
          <img class="image-main" src="graphics/save.png" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { nextTick, ref, computed, watchEffect, watch } from "vue";
  import { useSpaStore } from "@/stores/";

  const spaStore = useSpaStore();

  const props = defineProps({
    type: String,
    value: String,
    limit: String,
  });

  const characterLimit = props.limit;

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
  
  const editableInputField = ref(null);
  const editableValue = ref(currentObject.value[props.value]);
  const originalFieldValue = ref("");

  watch(() => currentObject.value[props.value], (newValue) => {
    editableValue.value = newValue;
  });

  const triggerEditing = () => {
    editing.value = true;
    originalFieldValue.value = currentObject.value[props.value];
    console.log("triggerEditing: ", editing.value);
    if (editing.value) {
      nextTick(() => {
        console.log("editableInput editing: ", editableInputField.value.value);
        editableInputField.value.focus();
        editableInputField.value.setSelectionRange(0, 0);
      });
    }
  };

  const cancelInput = () => {
    editableValue.value = originalFieldValue.value;
    editing.value = false;
  };

  const callUpdate = () => {
    console.log('callUpdate: editableInputField = ', editableInputField.value.value)
    console.log('callUpdate: currentObject.value[props.value] = ', currentObject.value[props.value])
    currentObject.value[props.value] = editableInputField.value.value
    if (props.type == "character") {
      spaStore.charUpdate()
    } else if (props.type == "ship") {
      console.log("EI: Calling Update")
      spaStore.shipUpdate()
    } else {
      console.log('EI: callUpdate: ERROR')
    }
    
  }

</script>

<style scoped>

</style>
