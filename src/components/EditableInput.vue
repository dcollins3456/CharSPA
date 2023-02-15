<template>
<div class="input-field">
    <span v-if="!editing" @click="edit">{{ value }}</span>
    <input
        v-else
        ref="input"
        v-model="value"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
    >
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

const props = {
    value: String
}

const data = () => ({
    editing: false,
    currentValue: ''
})

const methods = {
    edit() {
        this.currentValue = this.value
        this.editing = true
        nextTick(() => {
        inputRef.value.focus()
        inputRef.value.select()
        })
    },
    finishEditing() {
        this.editing = false
        this.$emit('update', this.currentValue)
    }
}

onMounted(() => {
    inputRef.value.addEventListener('click', () => {
        if (!this.editing) {
        this.edit()
        }
    })
})
</script>
