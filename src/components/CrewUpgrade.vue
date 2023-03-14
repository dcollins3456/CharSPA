<template>
    <div @click="toggleCrewgear">
      <img v-for="n in props.numBoxes" :key="n" :src="checkedImage" />
      <span>{{ props.desc }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { useSpaStore } from "@/stores/";
  
  const spaStore = useSpaStore();
  
  const props = defineProps({
    desc: String,
    numBoxes: Number,
    isChecked: Boolean,
  });
  // Use a computed property to get the currentShip object from the spaStore  
  const toggleCrewgear = () => {
    if (spaStore.currentShip.crew_upgrades.includes(props.desc)) {
      spaStore.currentShip.crew_upgrades.splice(spaStore.currentShip.crew_upgrades.indexOf(props.desc), 1)
      props.isChecked = false
    } else {
      spaStore.currentShip.crew_upgrades.push(props.desc)
      props.isChecked = true
    }
    spaStore.shipUpdate()
  }
  
  const checkedImage = computed(() => {
    return props.isChecked ? "graphics/checked-green.png" : "graphics/unchecked.png"
  })
  
  
  </script>
  