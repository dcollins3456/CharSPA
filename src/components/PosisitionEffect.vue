<template>
    <div class="roll-grid">
      <div v-for="(position, index) in positions" :key="index">
        <div v-for="(effect, index) in effects" :key="index"
             :class="{ active: isActive(position, effect) }"
             @click="setRoll(position, effect)">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { spaStore } from '@/store/spaStore';
  
  const positions = ['desperate', 'risky', 'controlled'];
  const effects = ['none', 'limited', 'standard', 'greater', 'extreme'];
  
  const isActive = (position, effect) => {
    return position === spaStore.currentRoll.position && effect === spaStore.currentRoll.effect;
  };
  
  const setRoll = (position, effect) => {
    spaStore.currentRoll.position = position;
    spaStore.currentRoll.effect = effect;
  };
  
  const activeRoll = computed(() => {
    return {
      position: spaStore.currentRoll.position,
      effect: spaStore.currentRoll.effect,
    };
  });
  </script>
  
  <style scoped>
  .roll-grid {
    display: flex;
    flex-wrap: wrap;
  }
  
  .roll-grid > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
  }
  
  .roll-grid > div > div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: purple;
    margin-bottom: 5px;
    cursor: pointer;
  }
  
  .roll-grid > div > div.active {
    border: 2px solid white;
  }
  
  .circle {
    width: 100%;
    height: 100%;
  }
  </style>
  