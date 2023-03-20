<template>
    <div class="file-input-container" >

      <img @click="editing = true" :src="imageURL" /> 

      <div @click.self="editing = false" class="modal-overlay" v-show="editing">
      <form
        class="edit-item"
        @submit.prevent
        @keyup.enter.prevent="if(hasInput){saveFile(); editing = false;}"
      >
        <label for="fileInput">Upload Image:</label>
        <input
          id="fileInput"
          type="file"
          ref="fileInput"
          @change="triggerInput"
          @keyup.enter.prevent="if(hasInput){saveFile()};" 
        />
        
        <button type="button" @click="if(hasInput){saveFile(); editing = false;}" >
          <img class="image-hover" src="/graphics/save-hover.png" />
          <img class="image-main" src="/graphics/save.png" />
        </button>
        <button type="button" @click="editing = false" >
          <img class="image-hover" src="/graphics/cancel-hover.png" />
          <img class="image-main" src="/graphics/cancel.png" />
        </button>
        <span class="info">Information about filesize/type.</span>
        
      </form>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSpaStore } from "@/stores/";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

const fileInput = ref(null)

let hasInput = false;

const triggerInput = computed(() => {
  hasInput = true;
})

const props = defineProps({
  type: String,
});
const spaStore = useSpaStore();

const currentCharacter = computed(() => {
  const character = spaStore.currentCharacter;
  return {
  ...character,
  };
}); 

const currentShip = computed(() => {
  const ship = spaStore.currentShip;
  return {
  ...ship,
  };
}); 

const editing = ref(false);

const saveFile = () => {
  //const fileInput = document.getElementById('fileInput');
  const file = fileInput.value.files.item(0);
  console.log("saveFile: SAVING ", file)
  spaStore.uploadImage(file, props.type);
};


const imageURL = computed(() => {
  if(props.type == "character"){
    return currentCharacter.value.portraitURL
  }
  else if (props.type == "ship1"){
    return currentShip.value.image1
  }
  else if (props.type == "ship2"){
    return currentShip.value.image2
  }
  else {
    return null
  }
})

const mounted = () => {
  fileInput.value = fileInput;
}
</script>

<style scoped>
.info{
  position: relative;
  right: 60px;
  bottom: 10px;
  color: #33CCff;
}

.file-input-container .edit-item{
  position: relative;
  width: 340px;

}
.file-input-container button{
  position: relative;
  left: 235px;
  top: 18px;
  float:right;
  margin:10px;
  margin-top:-10px;

}



</style>

