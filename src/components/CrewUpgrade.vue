<template>
    <div @click="toggleCrewgear">
      <img v-for="n in props.numBoxes" :key="n" :src="checkedImage" />
      <span>{{ desc }}</span>
    </div>
</template>
<script setup>
import { ref, computed, } from 'vue'
import { useSpaStore } from "@/stores/";

const spaStore = useSpaStore();

const props = defineProps({
    desc: String,
    numBoxes: Number,
    });

const currentShip  = computed (() => {
    return spaStore.currentShip;
});

/* const isChecked = ref(spaStore.currentShip.crew_upgrades.includes(props.desc) == true) */
const isChecked = ref(spaStore.isCrewUpgradeSelected(props.desc));

const toggleCrewgear = () => {
    if (currentShip.value.crew_upgrades.includes(props.desc)) {
        currentShip.value.crew_upgrades.splice(currentShip.value.crew_upgrades.indexOf(props.desc), 1)
        isChecked.value = false
    } else {
        currentShip.value.crew_upgrades.push(props.desc)
        isChecked.value = true
    }
    spaStore.shipUpdate()
}

const checkedImage = computed(() => {
    return isChecked.value ? "graphics/checked-green.png" : "graphics/unchecked.png"
})
    
</script>