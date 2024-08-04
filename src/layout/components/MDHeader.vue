<template>
    <a-layout-header>
        <div>Header {{ count }}</div>
        <a-button type="primary" @click="handleClick">Click me</a-button>
    </a-layout-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)

const handleClick = () => {
  console.log('Header clicked')
  count.value++
}
</script>