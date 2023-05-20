<template>
  <div class="dice-roller" :class="{ isfinished: finished.value, issix: isSix.value }">
    <div class="border-container" >
      <div class="border" :class="{ 'paused': finished.value }"></div>
      <div class="border" :class="{ 'paused': finished.value }"></div>
    </div>
    <span>{{ displayedNumber }}</span>
    <span class="dupe">{{ displayedNumber }}</span>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  targetNumber: Number,
});

const displayedNumber = ref(1);
let animationId = null;
let cycles = 0;
let targetNum = null;
let isRolling = false;
const isSix = reactive({ value: false });
const finished = reactive({ value: false });

function rollDice() {
  isSix.value = false;
  if (isRolling) {
    return;
  }
  if (!props.targetNumber){
    targetNum = 0
  } else{
    targetNum = props.targetNumber
  }
  //targetNumber = Math.floor(Math.random() * 6) + 1;
  cycles = Math.floor(Math.random() * 50 + 70);
  isRolling = true;
  animate().then(() => {
    isRolling = false;
    finished.value = true;
    if(targetNum === 6){
      isSix.value = true;
    } 
  });
}

function animate() {
  return new Promise((resolve) => {
    const animateFrame = () => {
      if (cycles <= 0) {
        displayedNumber.value = targetNum;
        return resolve();
      }

      const t = cycles / (cycles + Math.random() * 300 + 200);
      const speed = easeOut(t) * (Math.random() * 1000 + 200);
      const duration = Math.floor(1000 / speed);

      displayedNumber.value = (displayedNumber.value % 6) + 1;
      cycles--;

      animationId = setTimeout(animateFrame, duration);
    };
    animateFrame();
  });
}

function easeOut(t) {
  return t;
}

onMounted(() => {
  rollDice();
});
</script>

<style>
.dice-roller {
  font-family: zekton;
  font-size: 1.5em;
  color: purple;
  border: 1px solid purple;
  width: 30px;
  height: 29px;
  padding-top: 1px;
  margin: 3px;
  align-content: center;
  justify-content: center;
  display: flex;
  
}
.dice-roller span{
  z-index: 2;
}
.isfinished {
  animation: glow-fade 0.5s ease forwards;
}

@keyframes glow-fade {
  0% {
    color: white;
  }

  100% {
    color: #00ace5;
  }
}


.border-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
  border: 1px solid #00000000;
}

.border {
  position: absolute; 
  width: 28px;
  height: 28px;
  border: 2px solid rgb(0, 110, 169);
  opacity: 0;
  animation: wawawa 1s ease-out infinite;
  
}

.border:nth-child(2) {
  animation-delay: .5s;
}



@keyframes wawawa {
  0% {
    transform: scale(1.1);
    box-shadow: 0 0 2px rgb(0, 110, 169);
    opacity: 1;
  }
  50% {
    transform: scale(.8);
    box-shadow: none;
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    box-shadow: none;
    opacity: 0;
  }
}

.border.paused{
  animation: wawawa 1.5s ease-out forwards;
  
}

.issix span.dupe{
  animation: six-dupe 1s ease-out forwards;
  z-index: 3;
}
.issix {
  animation: six 3s ease-out forwards, pulsate-blue 3s infinite;
  z-index: 5;
}
.dupe {
  position: absolute;
  opacity: 0;
}
@keyframes six-dupe{
  0% {
    opacity: 1;
    color: blue;
  }
  40%{
    opacity: .5;
    scale: 2;
    color: #00ace5;
  }
  50%{
    opacity: 1;
    color: white;
    scale: 1.5;
  }
  100%{
    opacity: 0;
    scale: 10;
    color: white;
  }
}
@keyframes six{
  0% {
    color: magenta;
  }
  100% {
    color: white;
  }
}
@keyframes pulsate-blue {
  0% {
    color: white;
  }
  50% {
    color: #00ff91;
  }
  100% {
    color: white;
  }
}
</style>
