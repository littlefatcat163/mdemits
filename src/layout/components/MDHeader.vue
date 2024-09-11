<template>
    <header class="shadow-lg" style="position: sticky; top: 0; left: 0;">
        <Toolbar>
            <template #start>
                <Button label="MDEMITS" text size="large" style="--p-button-lg-font-size: 1.25rem"></Button>
            </template>
            <template #end>
                <div class="hidden md:block">
                    <Button
                        :icon="PrimeIcons.QRCODE"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Qrcode"
                    ></Button>
                    <Button
                        :icon="PrimeIcons.SEARCH"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Search"
                    ></Button>
                    <Button
                        :icon="themeIcon"
                        severity="secondary"
                        size="large"
                        text
                        aria-label="Filter"
                        @click="toggleTheme"
                    ></Button>
                </div>
            </template>
        </Toolbar>
    </header>
    <div class="block lg:hidden" style="position: sticky; top: 82px;">
        <Toolbar>
            <template #start>
                <Button
                    :icon="PrimeIcons.ALIGN_LEFT"
                    severity="secondary"
                    size="small"
                    text
                    aria-label="Bars"
                    label="菜单"
                ></Button>
            </template>
            <template #end>
                <Button
                    :icon="PrimeIcons.ALIGN_RIGHT"
                    iconPos="right"
                    severity="secondary"
                    size="small"
                    text
                    aria-label="Toc"
                    label="页面导航"
                ></Button>
            </template>
        </Toolbar>
    </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import { PrimeIcons } from '@primevue/core/api'
import { ref } from 'vue'
const themeIcon = ref(PrimeIcons.SUN)

function toggleTheme() {
    const element = document.querySelector('html')
    element!.classList.toggle('p-dark')
    themeIcon.value = themeIcon.value === PrimeIcons.SUN ? PrimeIcons.MOON : PrimeIcons.SUN
}
</script>
