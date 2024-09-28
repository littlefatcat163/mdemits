<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    id: string
    size: number | string
}>()
const style = computed(() => {
    if (typeof props.size === 'number') {
        return {
            width: `${props.size}px`,
            height: `${props.size}px`,
        }
    }
    return {
        width: props.size,
        height: props.size,
    }
})
</script>

<template>
    <svg :width="size" :height="size" :style="style">
        <use :xlink:href="`#${id}`" />
    </svg>
</template>
