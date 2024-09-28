<template>
    <header class="mde-header border-bottom border-body-secondary text-light d-flex align-items-center px-4">
        <div class="fw-bold fs-2 flex-fill" role="button">MDEMITS</div>
        <div class="d-grid column-gap-3" style="grid-template-columns: auto auto auto">
            <MDESvg id="qr-code" size="1.5em" class="point-hover" />
            <MDESvg id="search" size="1.5em" class="point-hover" />
            <div class="mde-theme-switch" role="button" @click="toggleTheme">
                <MDESvg id="sun-fill" size="1.5em" class="point-hover" />
                <MDESvg id="moon-stars-fill" size="1.5em" class="point-hover" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import MDESvg from './MDESvg.vue'
let isDark = false
function toggleTheme() {
    isDark = !isDark
    const $html = document.querySelector('html')!
    const $lightCss = document.getElementById('highlight-css')!
    const $darkCss = document.getElementById('highlight-css-dark')!
    if (isDark) {
        $html.setAttribute('data-bs-theme', 'dark')
        $lightCss.setAttribute('disabled', '')
        $darkCss.removeAttribute('disabled')
    } else {
        $html.setAttribute('data-bs-theme', 'light')
        $darkCss.setAttribute('disabled', '')
        $lightCss.removeAttribute('disabled')
    }
}
</script>
