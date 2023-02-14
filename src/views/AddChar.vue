<template>
    <div class="add">
        Add Character
    </div>
</template>
<script setup>
import {ref, onMounted} from "vue"
import {useSpaStore} from '@/stores/'

const spaStore = useSpaStore()

onMounted(() => {
  spaStore.fetchCharacters()
})
</script>
<style scoped>
.add{
    margin: 50px;
}
</style>