<template>
  <div class="clock">
    <div class="slice" v-for="i in 6" :key="i" :style="getSliceStyle(i)" :filled="i <= filledSegments"></div>
    <div class="bar" v-for="i in 6" :key="i" :style="getBarStyle(i)">
      <div class="paint" :style="{ backgroundColor: getColor(i) }"></div>
    </div>
  </div>
</template>

<script setup>
const filledSegments = 3;
const angle = 60;

const getSliceStyle = (i) => {
  const o = '10%';
  const transform = `rotate(${(i - 1) * angle}deg) skewY(${-90 + angle}deg)`;
  const background = i <= filledSegments ? '#FFDAB9' : '#ccc';
  return {
    '--o': o,
    '--i': i - 1,
    '--angle': angle + 'deg',
    'background-color': background,
    'transform': transform,
  };
};

const getBarStyle = (i) => {
  const transform = `rotate(${(i - 1) * angle}deg)`;
  return {
    '--i': i - 1,
    '--angle': angle + 'deg',
    'transform': transform,
  };
};

const getColor = (i) => {
  return i <= filledSegments ? '#8B0000' : '#ccc';
};
</script>

<style>
.clock {
  position: relative;
  height: 100px;
  width: 100px;
}

.clock .slice {
  --o: 10%;
  position: absolute;
  top: calc(-1 * var(--o));
  left: 50%;
  height: calc(50% + var(--o));
  width: calc(50% + var(--o));
  background: var(--color-mid);
  transform-origin: bottom left;
  transform: rotate(calc(var(--i) * var(--angle))) skewY(calc(-90deg + var(--angle)));
}

.clock .bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: top left;
}

.clock .bar .paint {
  height: 100%;
  width: 100%;
  border-radius: 50% 50% 0 0;
}
</style>
