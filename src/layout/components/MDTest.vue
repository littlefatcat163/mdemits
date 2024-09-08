<template>
    <Button label="md test btn" @click="xxx"></Button>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'

const xxx = () => {
    console.log('xxx')
}
</script>