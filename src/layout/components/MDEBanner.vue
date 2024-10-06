<template>
    <div class="mde-banner" style="background-image: url(/imgs/default.jpg)">
        <div class="d-flex flex-column w-100 h-100 align-items-center justify-content-center text-light">
            <h1>h1h1h1h1h1h1h</h1>
            <p class="d-flex align-items-center">
                <MDESvg size="1rem" id="calendar2-day-fill" class="me-2" />
                <time datetime="2023-10-18 12:45">Wednesday, October 18,2023 12:45 PM</time>
            </p>
            <p class="d-flex align-items-center">
                <MDESvg size="1rem" id="file-earmark-word-fill" class="me-2" />
                <span>715 words</span>
                <MDESvg size="1rem" id="stopwatch-fill" class="ms-4 me-2" />
                <span>6 mins</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MDESvg from './MDESvg.vue'
</script>