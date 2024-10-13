<template>
    <div class="mde-banner" :style="`background-image: url(${bannerImg})`">
        <div class="d-flex flex-column w-100 h-100 align-items-center justify-content-center text-light">
            <h1 class="mb-4">{{ title }}</h1>
            <p class="d-flex align-items-center mb-1">
                <MDESvg size="1rem" id="calendar2-day-fill" class="me-1" />
                <time :datetime="dateTime">{{ birthTime }}</time>
            </p>
            <p class="d-flex align-items-center mb-0">
                <MDESvg size="1rem" id="file-earmark-word-fill" class="me-1" />
                <span>{{ words }} words</span>
                <MDESvg size="1rem" id="stopwatch-fill" class="ms-4 me-1" />
                <span>{{ minutes }} mins</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MDESvg from './MDESvg.vue'
defineProps<{
    title: string
    dateTime: string
    birthTime: string
    bannerImg: string
    words: string
    minutes: number
}>()
</script>